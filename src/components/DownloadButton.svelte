<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  export let entries: { id: number; value: string }[] = [];
  export let type: string = 'code128';
  export let showText: boolean = true;
  export let baseFilename: string = 'AxelBase - Bulk Barcode SVG Generator';

  let librariesReady = false;

  const formatType = (t: string): string => {
    const map: Record<string, string> = {
      code128: 'Code 128',
      code39: 'Code 39',
      ean13: 'EAN-13',
      ean8: 'EAN-8',
      upca: 'UPC-A',
      pdf417: 'PDF417'
    };
    return map[t.toLowerCase()] || t.toUpperCase();
  };

  onMount(() => {
    const check = () => {
      if (window.JSZip && (window as any).bwipjs?.toSVG) {
        librariesReady = true;
      } else {
        setTimeout(check, 50);
      }
    };
    check();
  });

  $: validCount = entries.filter(e => e.value?.trim()).length;

  async function download() {
    if (!librariesReady || validCount === 0) return;

    const zip = new JSZip();

    entries.filter(e => e.value?.trim()).forEach((entry, i) => {
      try {
        const svgText = (window as any).bwipjs.toSVG({
          bcid:            type,
          text:            entry.value.trim(),
          scale:           3,              // Reduced scale for compact size
          height:          12,             // 12mm height (~40–50mm wide for most codes)
          includetext:     showText,
          textxalign:      'center',
          textyoffset:     showText ? 8 : 0,
          backgroundcolor: 'FFFFFF',
          paddingwidth:    5,              // Clean padding
          paddingheight:   5
        });

        const safeName = `${formatType(type)} – Barcode ${i + 1}.svg`;
        zip.file(safeName, svgText);
      } catch (err) {
        console.warn('Skipped invalid barcode:', entry.value);
      }
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    dispatch('download', { blob, filename: `${baseFilename}.zip` });
  }
</script>

<button
  class="btn btn-success btn-lg w-100 mt-4"
  on:click={download}
  disabled={!librariesReady || validCount === 0}
>
  {#if librariesReady}
    Download {validCount} Barcode{validCount !== 1 ? 's' : ''} as ZIP
  {:else}
    Loading libraries...
  {/if}
</button>