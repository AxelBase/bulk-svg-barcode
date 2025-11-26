<script lang="ts">
  // This works perfectly with your current svelte.config.js
  // base is always '/bulk-svg-barcode' (dev + prod)
  const sampleCsvUrl = '/bulk-svg-barcode/sample-barcodes.csv';

  function downloadSample() {
    const a = document.createElement('a');
    a.href = sampleCsvUrl;
    a.download = 'sample-barcodes.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
</script>

<button class="btn btn-outline-secondary btn-sm mb-3" on:click={downloadSample}>
  Download Sample CSV Template
</button>

<div class="text-muted small">
  Includes header row + 6 example barcodes (one of each type)
</div>