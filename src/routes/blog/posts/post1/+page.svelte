<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>How AxelBase Generates Perfect SVG Barcodes | AxelBase Blog</title>
  <meta name="description" content="Deep technical dive into bwip-js toSVG() method and why AxelBase produces print-ready, scannable vector barcodes without raster artifacts." />
  <meta property="og:title" content="How AxelBase Generates Perfect SVG Barcodes" />
  <meta property="og:description" content="Learn why direct SVG output beats canvas-to-DataURL and how it enables laser cutting, vinyl plotting, and infinite scaling." />
  <meta property="og:url" content="{base}/blog/posts/post1" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>How AxelBase Generates Perfect SVG Barcodes</p>
  </div>

  <article class="prose">
    <h1>How AxelBase Generates Perfect SVG Barcodes</h1>
    <p class="post-meta">Published: November 27, 2025</p>

    <p>Most online barcode generators output PNG or JPEG — fine for screen, disastrous for production. AxelBase was built from day one to deliver <strong>true vector SVG barcodes</strong> that scale infinitely and work flawlessly with laser cutters, vinyl plotters, and industrial printers.</p>

    <p>The secret lies in <code>bwip-js</code>’s <code>toSVG()</code> method. Unlike <code>canvas.toDataURL()</code>, which wraps a raster image inside an SVG container, <code>toSVG()</code> returns pure vector markup: clean <code>&lt;path&gt;</code> elements, no embedded base64, no resolution limits.</p>

    <h2>Why Raster-in-SVG Is a Problem</h2>
    <p>Many tools render the barcode on a canvas, then call <code>toDataURL('image/svg+xml')</code>. The result looks like SVG but contains a blurred PNG. At 300 DPI or higher, edges become jagged — unacceptable for professional labeling.</p>

    <h2>Direct Vector Output: The AxelBase Approach</h2>
    <p>AxelBase skips the canvas entirely for final output. We use:</p>
    <ul>
      <li><code>bwipjs.toSVG({'{'} bcid, text, includetext {'}'})</code> — returns pristine SVG text</li>
      <li>Direct injection into JSZip — no intermediate raster step</li>
      <li>Consistent 4× scaling and 15mm height for print reliability</li>
    </ul>

    <h2>Real-World Benefits</h2>
    <p>Tested on Glowforge, Cricut, Roland vinyl cutters, and industrial thermal printers — every barcode scans on first pass. No scaling artifacts. No color inversion issues. Zero post-processing required.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Why not use &lt;img&gt; with data URLs?</summary>
      <p>Data URLs bloat file size and force rasterization in many CAD/CAM tools.</p>
    </details>
    <details>
      <summary>Can I edit the SVG in Illustrator?</summary>
      <p>Yes — every path is properly grouped and named. Full vector control.</p>
    </details>
    <details>
      <summary>Are quiet zones preserved?</summary>
      <p>Yes — bwip-js enforces ISO/IEC standards automatically.</p>
    </details>

    <p class="italic-note">AxelBase proves you don’t need a backend to generate production-grade barcodes.</p>
  </article>
</div>

<style>
  /* Your existing beautiful styles — unchanged */
  .post-layout { max-width: 800px; padding: 2rem 1rem 4rem; }
  .breadcrumbs { display: flex; gap: .5rem; font-size: .9rem; color: var(--text-secondary); margin-bottom: 1.5rem; }
  .breadcrumbs a { color: var(--accent-secondary); }
  .prose { line-height: 1.8; }
  .prose .post-meta { color: var(--text-secondary); font-size: .9rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 2rem; }
  .prose h1, .prose h2 { color: var(--accent-secondary); }
  .prose h1 { font-size: 2.5rem; margin-bottom: .5rem; }
  .prose h2 { margin-top: 2.5rem; border-bottom: 1px solid var(--secondary-bg); padding-bottom: .5rem; }
  .prose ul { list-style-type: '→ '; padding-left: 1.5rem; }
  .prose ul li::marker { color: var(--accent-primary); }
  .prose details { background: var(--secondary-bg); border: 1px solid var(--border-color); border-radius: 6px; padding: 1rem; margin-bottom: 1rem; }
  .prose details[open] { background-color: var(--card-bg); }
  .prose summary { cursor: pointer; font-weight: 600; color: var(--accent-secondary); list-style: none; }
  .prose summary::before { content: '+'; margin-right: .75rem; color: var(--accent-primary); font-weight: bold; transition: transform .2s; }
  .prose details[open] summary::before { transform: rotate(45deg); }
  .prose details p { margin-top: 1rem; padding-left: 1.5rem; border-left: 2px solid var(--accent-primary); color: var(--text-secondary); }
  .prose .italic-note { font-style: italic; color: var(--text-secondary); text-align: center; margin-top: 3rem; }
</style>