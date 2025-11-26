<script lang="ts">
  import { onMount } from 'svelte';

  export let entries: { id: number; value: string }[] = [];
  export let type: string = 'code128';
  export let showText: boolean = true;

  let container: HTMLDivElement;
  let ready = false;

  // Wait for bwip-js to be available (loaded from static/bwip-js.min.js)
  function waitForBwIP() {
    const start = performance.now();
    const check = () => {
      if ((window as any).bwipjs || (window as any).BWIPJS) {
        ready = true;
        renderAll();
        console.log('bwip-js loaded and ready');
      } else if (performance.now() - start < 5000) {
        setTimeout(check, 50);
      } else {
        container.innerHTML = '<p class="text-danger">Failed to load barcode engine</p>';
        console.error('bwip-js failed to load after 5s');
      }
    };
    check();
  }

  function renderAll() {
    if (!container || !ready) return;

    const BWIPJS = (window as any).bwipjs || (window as any).BWIPJS;
    container.innerHTML = '';

    const valid = entries.filter(e => e.value?.trim()).slice(0, 10);
    if (valid.length === 0) {
      container.innerHTML = '<p class="text-muted">Start typing above to see live preview</p>';
      return;
    }

    valid.forEach((entry, i) => {
      const canvas = document.createElement('canvas');
      try {
        BWIPJS.toCanvas(canvas, {
          bcid:            type,
          text:            entry.value,
          scale:           3,
          height:          10,
          includetext:     showText,
          textxalign:      'center',
          backgroundcolor: 'FFFFFF'
        });

        const div = document.createElement('div');
        div.className = 'text-center p-3 border rounded mb-3 bg-white shadow-sm';
        div.innerHTML = `<strong>#${i + 1}</strong><br><small class="text-muted">${entry.value}</small><br>`;
        div.appendChild(canvas);
        container.appendChild(div);
      } catch (err) {
        const errDiv = document.createElement('div');
        errDiv.className = 'text-danger p-3 border rounded mb-3';
        errDiv.textContent = `Invalid ${type.toUpperCase()}: ${entry.value}`;
        container.appendChild(errDiv);
      }
    });
  }

  // React to changes
  $: entries, type, showText, ready && renderAll();

  // Start loading when component mounts
  onMount(() => {
    container.innerHTML = '<p class="text-muted">Loading barcode engine...</p>';
    waitForBwIP();
  });
</script>

<div class="card mt-4">
  <div class="card-header bg-primary text-white fw-bold">
    Live Preview – First 10 barcodes
  </div>
  <div class="card-body" bind:this={container}>
    <p class="text-muted">Loading barcode engine...</p>
  </div>
</div>