<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let files: FileList;
  let status = '';

  const supported = ['code128','code39','ean13','ean8','upca','pdf417'];

  function guessType(value: string): string {
    const v = value.trim();
    if (/^\d{13}$/.test(v)) return 'ean13';
    if (/^\d{12}$/.test(v)) return 'upca';
    if (/^\d{8}$/.test(v)) return 'ean8';
    if (/^[A-Za-z0-9!*+\-./\s]+$/.test(v)) return 'code39';
    return 'code128';
  }

  function process() {
    if (!files?.[0]) return;

    const file = files[0];
    Papa.parse(file, {
      complete: (res) => {
        const rows = res.data as string[][];
        if (rows.length === 0) {
          status = 'Empty CSV';
          return;
        }

        const hasHeader = rows[0].length >= 2 && supported.includes(rows[0][0].toString().toLowerCase());
        const start = hasHeader ? 1 : 0;

        const result: { type: string; value: string }[] = [];

        for (let i = start; i < rows.length; i++) {
          const row = rows[i];
          if (!row[1]?.toString().trim()) continue;

          let type = row[0]?.toString().trim().toLowerCase() || '';
          const value = row[1].toString().trim();

          if (!supported.includes(type)) type = guessType(value);
          if (supported.includes(type)) result.push({ type, value });
        }

        if (result.length === 0) {
          status = 'No valid barcodes found';
        } else {
          status = `Success: ${result.length} barcodes ready`;
          dispatch('parsed', result);
        }
      },
      error: () => status = 'Failed to read file'
    });
  }
</script>

<div class="card">
  <div class="card-body">
    <h5 class="card-title">CSV Bulk Upload</h5>
    <p class="text-muted small">
      Optional first column = type · First row can be header<br>
      Supported types: code128, code39, ean13, ean8, upca, pdf417
    </p>

    <input
      type="file"
      accept=".csv,text/csv"
      class="form-control"
      bind:files
      on:change={process}
    />

    {#if status}
      <div class="alert {status.includes('Success') ? 'alert-success' : 'alert-danger'} mt-3">
        {status}
      </div>
    {/if}
  </div>
</div>