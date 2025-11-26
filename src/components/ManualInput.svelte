<script lang="ts">
  import BarcodeEntryRow from './BarcodeEntryRow.svelte';
  import LivePreview from './LivePreview.svelte';

  export let entries;           // writable store from +page
  export let barcodeType: string = 'code128';
  export let showText: boolean = true;

  let nextId = 2;

  function addRow() {
    if ($entries.length < 100) {
      entries.update(e => [...e, { id: nextId++, value: '' }]);
    }
  }

  function removeRow(id: number) {
    entries.update(e => e.filter(x => x.id !== id));
    if ($entries.length === 0) {
      entries.set([{ id: nextId++, value: '' }]);
    }
  }
</script>

<div class="card mb-4">
  <div class="card-body">
    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <label for="typeSelect" class="form-label fw-bold">Barcode Type</label>
        <select id="typeSelect" class="form-select" bind:value={barcodeType}>
          <option value="code128">Code 128</option>
          <option value="code39">Code 39</option>
          <option value="ean13">EAN-13</option>
          <option value="ean8">EAN-8</option>
          <option value="upca">UPC-A</option>
          <option value="pdf417">PDF417</option>
        </select>
      </div>

      <div class="col-md-6">
        <div class="form-label fw-bold mb-2">Options</div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" bind:checked={showText} id="showText">
          <label class="form-check-label" for="showText">
            Show human-readable text
          </label>
        </div>
      </div>
    </div>

    <h5 class="mb-3">{$entries.length} / 100 barcodes</h5>

    <div class="border rounded p-3 mb-4 bg-white" style="max-height: 420px; overflow-y: auto;">
      {#each $entries as entry (entry.id)}
        <BarcodeEntryRow
          bind:value={entry.value}
          on:remove={() => removeRow(entry.id)}
        />
      {/each}
    </div>

    <button
      class="btn btn-outline-primary btn-sm"
      on:click={addRow}
      disabled={$entries.length >= 100}
    >
      + Add barcode
    </button>
  </div>
</div>

<LivePreview entries={$entries} type={barcodeType} showText={showText} />