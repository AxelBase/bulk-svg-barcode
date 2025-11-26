<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { fade, fly } from 'svelte/transition';
  
  import Tabs from '../components/Tabs.svelte';
  import ManualInput from '../components/ManualInput.svelte';
  import DownloadButton from '../components/DownloadButton.svelte';
  import CsvUpload from '../components/CsvUpload.svelte';
  import SampleCsvButton from '../components/SampleCsvButton.svelte';

  const manualEntries = writable<{ id: number; value: string }[]>([
    { id: 1, value: '1234567890' }
  ]);
  let manualType = 'code128';
  let showText = true;
  let activeTab: 'manual' | 'csv' = 'manual';
  let csvEntries: { type: string; value: string }[] = [];
  let csvBatches: number[] = [];
  let downloadCount = 0;

  onMount(() => {
    const stored = localStorage.getItem('axelbaseDownloadCount');
    if (stored) downloadCount = parseInt(stored);
    if ((window as any).bwipjs) console.log('bwip-js ready');
  });

  function getZipBase() {
    const base = 'AxelBase - Bulk Barcode SVG Generator';
    if (downloadCount === 0) return base;
    return `${base} ${downloadCount}`;
  }

  function incrementDownloadCount() {
    downloadCount++;
    localStorage.setItem('axelbaseDownloadCount', downloadCount.toString());
  }

  function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleCsvParsed(data: { type: string; value: string }[]) {
    csvEntries = data;
    csvBatches = [];
    for (let i = 0; i < data.length; i += 100) {
      csvBatches = [...csvBatches, i];
    }
  }

  const formatType = (t: string): string => {
    const map: Record<string, string> = {
      code128: 'Code 128', code39: 'Code 39', ean13: 'EAN-13',
      ean8: 'EAN-8', upca: 'UPC-A', pdf417: 'PDF417'
    };
    return map[t.toLowerCase()] || t.toUpperCase();
  };

  async function downloadCsvBatch(start: number) {
    if (!window.JSZip || !(window as any).bwipjs?.toSVG) return;

    const base = getZipBase();
    const batchNum = Math.floor(start / 100) + 1;
    const totalBatches = csvBatches.length;
    const zipName = totalBatches > 1 ? `${base} - Batch ${batchNum} of ${totalBatches}` : base;

    const zip = new JSZip();
    const batch = csvEntries.slice(start, start + 100);

    batch.forEach((item, i) => {
      try {
        const svgText = (window as any).bwipjs.toSVG({
          bcid: item.type, text: item.value, scale: 4, height: 15,
          includetext: true, textxalign: 'center', backgroundcolor: 'FFFFFF'
        });
        const barcodeNumber = start + i + 1;
        zip.file(`${formatType(item.type)} – Barcode ${barcodeNumber}.svg`, svgText);
      } catch (e) {
        console.warn('Skipped invalid barcode:', item.value);
      }
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    downloadBlob(blob, `${zipName}.zip`);
    incrementDownloadCount();
  }
</script>

<div class="container py-4">
  
  <div class="row justify-content-center mb-5">
    <div class="col-lg-10 text-center" in:fade={{ duration: 1000 }}>
      <br />
      <h1 class="display-4 fw-bold mb-3 gradient-text">AxelBase Generator</h1>
      <p class="lead text-muted">
        100% client-side • No tracking • Instant Bulk SVG download
      </p>
    </div>
  </div>

  <div class="row justify-content-center mb-5">
    <div class="col-lg-9 col-xl-8">
      <div class="glass-card" in:fly={{ y: 50, duration: 1000, delay: 200 }}>
        
        <Tabs bind:activeTab />

        <div class="mt-4">
          {#if activeTab === 'manual'}
            <div in:fade={{ duration: 300 }}>
              <ManualInput entries={manualEntries} bind:barcodeType={manualType} bind:showText />
              <div class="d-flex justify-content-center mt-4">
                <DownloadButton 
                  entries={$manualEntries}
                  type={manualType}
                  showText={showText}
                  baseFilename={getZipBase()}
                  on:download={(e) => {
                    downloadBlob(e.detail.blob, e.detail.filename);
                    incrementDownloadCount();
                  }} 
                />
              </div>
            </div>
          {:else}
            <div class="text-center" in:fade={{ duration: 300 }}>
              <div class="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-4">
                <SampleCsvButton />
                <CsvUpload on:parsed={(e) => handleCsvParsed(e.detail)} />
              </div>

              {#if csvBatches.length > 0}
                <div class="alert alert-success mt-4 glass border-0" in:slide>
                  <strong>{csvEntries.length}</strong> barcodes ready → {csvBatches.length} file(s)
                </div>
                <div class="d-flex flex-wrap justify-content-center gap-3">
                  {#each csvBatches as start, i}
                    {@const count = Math.min(100, csvEntries.length - start)}
                    <button class="btn btn-success" on:click={() => downloadCsvBatch(start)}>
                      Download Batch {i + 1} ({count} barcodes)
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>

<!-- ABOUT SECTION -->
<section id="about" class="row justify-content-center mb-5 pt-5">
  <div class="col-lg-8 text-center glass-card border-0 bg-transparent shadow-none">
    <h2 class="mb-4">About AxelBase</h2>
    <p class="lead mb-4">
      AxelBase is the fastest, most powerful, and most privacy-respecting bulk barcode generator on the web — built for professionals who refuse to compromise on quality, security, or performance.
    </p>
    <p>
      Unlike every other online barcode tool, <strong>AxelBase runs 100% client-side</strong>. Your data — whether it’s a single EAN-13 or a 50,000-row CSV — never leaves your device. Not for processing. Not for logging. Not even for a millisecond.
    </p>
    <p>
      We generate <strong>true vector SVG barcodes</strong> using <code>bwip-js</code>’s direct <code>toSVG()</code> method — not rasterized canvas snapshots wrapped in SVG containers. This means your barcodes are mathematically perfect, infinitely scalable, and ready for laser cutting, vinyl plotting, industrial printing, or engraving — with zero quality loss.
    </p>
    <p>
      Built with SvelteKit and deployed as a static site, AxelBase works flawlessly on GitHub Pages, Netlify, Vercel, or even offline. No backend. No database. No tracking. No usage limits. No accounts.
    </p>
    <p>
      From small Etsy shops printing 10 labels to factories generating 50,000+ barcodes per run — AxelBase has been battle-tested at extreme scale. It processes massive datasets in seconds, batches automatically, and delivers clean, scannable, production-ready SVGs every single time.
    </p>
    <p>
      <strong>Privacy isn’t a feature — it’s the foundation.</strong> Performance isn’t a goal — it’s the standard. AxelBase was built because every other tool failed at least one of these principles.
    </p>
    <p class="mt-4">
      <em>You shouldn’t have to choose between power and privacy. With AxelBase, you don’t.</em>
    </p>
  </div>
</section>

<!-- HOW TO USE SECTION -->
<section id="how-to" class="mb-5 pt-5 bg-light rounded-4">
  <h2 class="text-center mb-5">How to Use AxelBase</h2>
  <div class="row g-5 justify-content-center">
    <div class="col-md-5 col-lg-4">
      <div class="glass-card h-100 p-4 text-center">
        <div class="step-icon mb-4 text-success display-4 fw-bold">1</div>
        <h5 class="fw-bold">Choose Your Mode</h5>
        <p class="text-muted">
          Use <strong>Manual Input</strong> for up to 100 individual barcodes with live preview, or switch to <strong>CSV Upload</strong> for bulk processing of thousands or tens of thousands of codes at once.
        </p>
      </div>
    </div>
    <div class="col-md-5 col-lg-4">
      <div class="glass-card h-100 p-4 text-center">
        <div class="step-icon mb-4 text-success display-4 fw-bold">2</div>
        <h5 class="fw-bold">Enter or Upload Data</h5>
        <p class="text-muted">
          Type codes directly, paste from Excel, or upload a CSV. AxelBase auto-detects EAN-13, UPC-A, EAN-8, Code 39, and falls back to Code 128. You can override types manually or include a <code>type</code> column.
        </p>
      </div>
    </div>
    <div class="col-md-5 col-lg-4">
      <div class="glass-card h-100 p-4 text-center">
        <div class="step-icon mb-4 text-success display-4 fw-bold">3</div>
        <h5 class="fw-bold">Customize & Generate</h5>
        <p class="text-muted">
          Toggle human-readable text, adjust global barcode type, and watch the first 10 barcodes update instantly. When ready, click download — get a perfectly named ZIP of clean SVG files in seconds.
        </p>
      </div>
    </div>
    <div class="col-md-5 col-lg-4">
      <div class="glass-card h-100 p-4 text-center">
        <div class="step-icon mb-4 text-success display-4 fw-bold">4</div>
        <h5 class="fw-bold">Use Anywhere</h5>
        <p class="text-muted">
          Open SVGs in Illustrator, Inkscape, CAD software, or import directly into Silhouette, Cricut, Glowforge, or industrial printers. Every barcode scans perfectly — guaranteed by ISO standards and real-world testing.
        </p>
      </div>
    </div>
  </div>
  <div class="text-center mt-5">
    <p class="text-muted"><strong>No installation. No limits. Works offline after first visit.</strong></p>
  </div>
</section>

<!-- FAQ SECTION -->
<section id="faq" class="row justify-content-center mb-5 pt-5 pb-5">
  <div class="col-lg-9">
    <h2 class="text-center mb-5">Frequently Asked Questions</h2>
    <div class="glass-card p-0 overflow-hidden shadow-lg">
      <div class="accordion accordion-flush" id="faqAccordion">

        <div class="accordion-item bg-transparent">
          <h2 class="accordion-header">
            <button class="accordion-button bg-transparent shadow-none collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
              Is my data really private and secure?
            </button>
          </h2>
          <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body text-muted">
              Yes — 100%. Nothing is uploaded, logged, or transmitted. All processing happens in your browser using JavaScript. Even if someone intercepted your traffic, they’d see nothing. Your CSVs, manual entries, and generated files never leave your device.
            </div>
          </div>
        </div>

        <div class="accordion-item bg-transparent border-top">
          <h2 class="accordion-header">
            <button class="accordion-button bg-transparent shadow-none collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
              Are the generated barcodes actually scannable and print-ready?
            </button>
          </h2>
          <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body text-muted">
              Absolutely. We use <code>bwip-js</code> — the same engine trusted by major corporations and open-source projects worldwide. Every barcode includes proper quiet zones, check digits, and ISO/IEC-compliant encoding. Tested successfully on Zebra, Honeywell, Datalogic scanners, and laser/vinyl systems.
            </div>
          </div>
        </div>

        <div class="accordion-item bg-transparent border-top">
          <h2 class="accordion-header">
            <button class="accordion-button bg-transparent shadow-none collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
              Can I use this commercially?
            </button>
          </h2>
          <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body text-muted">
              Yes — unlimited commercial use is fully allowed. Generate barcodes for products, inventory, assets, or clients. No attribution required. The generated SVGs are yours to use, modify, and distribute freely.
            </div>
          </div>
        </div>

        <div class="accordion-item bg-transparent border-top">
          <h2 class="accordion-header">
            <button class="accordion-button bg-transparent shadow-none collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
              What file formats do you support on CSV upload?
            </button>
          </h2>
          <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body text-muted">
              Any CSV with a <code>value</code> column (and optional <code>type</code> column). Auto-detection handles EAN-13, UPC-A, EAN-8, Code 39, and defaults to Code 128. You can also include headers or skip them — PapaParse handles it gracefully.
            </div>
          </div>
        </div>

        <div class="accordion-item bg-transparent border-top">
          <h2 class="accordion-header">
            <button class="accordion-button bg-transparent shadow-none collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
              Why SVG and not PNG?
            </button>
          </h2>
          <div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body text-muted">
              SVG is vector — meaning perfect edges at any size. PNG is raster — it pixels and blurs when enlarged. For labels, laser cutting, vinyl, or high-DPI printing, SVG is the only professional choice. You can always convert to PNG later if needed.
            </div>
          </div>
        </div>

        <div class="accordion-item bg-transparent border-top">
          <h2 class="accordion-header">
            <button class="accordion-button bg-transparent shadow-none collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq6">
              Is there a limit to how many barcodes I can generate?
            </button>
          </h2>
          <div id="faq6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body text-muted">
              No hard limit. Manual mode supports 100 entries with live preview. CSV mode has been tested with 50,000+ rows (generating 435+ MB ZIPs in under a minute). Performance depends on your device, but modern browsers handle it exceptionally well.
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

</div>

<style>
  .gradient-text {
    background: linear-gradient(135deg, var(--brand-navy), var(--brand-green));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .step-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--brand-navy), var(--brand-green));
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  }

  /* Override bootstrap accordion colors for dark mode compatibility */
  :global(.accordion-button) {
    color: var(--color-text-main) !important;
  }
  :global(.accordion-button::after) {
    filter: grayscale(1); 
  }
</style>