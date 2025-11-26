<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy | AxelBase – Bulk Barcode SVG Generator</title>
  <meta name="description" content="AxelBase processes all barcode data 100% client-side. No data is collected, stored, or transmitted. Your privacy is absolute." />
  <meta property="og:title" content="Privacy Policy | AxelBase" />
  <meta property="og:description" content="Zero data collection. Zero tracking. Your barcodes never leave your device." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}">Home</a>
    <span>/</span>
    <p>Privacy Policy</p>
  </div>

  <article class="prose">
    <h1>Privacy Policy</h1>
    <p class="post-meta">Effective Date: November 27, 2025</p>

    <p><strong>AxelBase – Bulk Barcode SVG Generator</strong> is a fully client-side web application. This means <strong>your data never leaves your device</strong> — not even for a millisecond.</p>

    <h2>We Collect Nothing</h2>
    <p>We do <strong>not</strong> collect, store, log, or transmit:</p>
    <ul>
      <li>Barcode values or CSV content</li>
      <li>IP addresses, browser fingerprints, or location data</li>
      <li>Usage analytics, heatmaps, or session recordings</li>
      <li>Cookies, localStorage persistence, or tracking pixels</li>
    </ul>
    <p><em>All barcode generation, SVG rendering, and ZIP creation happen exclusively in your browser using JavaScript.</em></p>

    <h2>How Your Data Is Handled</h2>
    <p>When you use AxelBase:</p>
    <ul>
      <li>Manual entries and CSV uploads are processed in memory</li>
      <li><code>bwip-js</code> and <code>JSZip</code> run locally from static assets</li>
      <li>Generated SVGs and ZIP files are created on-the-fly and offered via <code>Blob</code> URLs</li>
      <li>Nothing is uploaded to any server — ever</li>
    </ul>

    <h2>No Third-Party Services</h2>
    <p>We do not use Google Analytics, Meta Pixel, Hotjar, Cloudflare Insights, or any external logging. The only external resources are optional CDN-hosted Bootstrap CSS/JS (which collect no personal data).</p>

    <h2>Security & Responsibility</h2>
    <p>Because no data reaches our servers, we cannot be breached, subpoenaed, or hacked for your information. You retain full control and responsibility for the data you input and the files you download.</p>

    <h2>Children’s Privacy</h2>
    <p>AxelBase does not knowingly collect data from children under 13. The tool is intended for general use in business and manufacturing contexts.</p>

    <h2>Changes to This Policy</h2>
    <p>Any updates will appear on this page with a revised effective date.</p>

    <p class="italic-note"><strong>Your privacy is not a feature — it’s the foundation.</strong> AxelBase was built for professionals who demand absolute data sovereignty.</p>
  </article>
</div>

<style>
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
  .prose .italic-note { font-style: italic; color: var(--text-secondary); text-align: center; margin-top: 3rem; font-weight: 500; }
</style>