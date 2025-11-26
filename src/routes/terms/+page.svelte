<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms & Conditions | AxelBase – Bulk Barcode SVG Generator</title>
  <meta name="description" content="Legal terms for using AxelBase – a free, open-source, client-side bulk barcode generator." />
  <meta property="og:title" content="Terms & Conditions | AxelBase" />
  <meta property="og:description" content="By using AxelBase, you agree to these simple, fair terms." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}">Home</a>
    <span>/</span>
    <p>Terms & Conditions</p>
  </div>

  <article class="prose">
    <h1>Terms & Conditions</h1>
    <p class="post-meta">Effective Date: November 27, 2025</p>

    <p>By using <strong>AxelBase – Bulk Barcode SVG Generator</strong> ("the Service"), you agree to these Terms.</p>

    <h2>1. Nature of Service</h2>
    <p>AxelBase is a <strong>free, open-source</strong>, client-side web application. All processing occurs in your browser. We do not host, store, or transmit your data.</p>

    <h2>2. License to Use</h2>
    <p>You are granted a worldwide, non-exclusive, royalty-free license to use the Service for personal or commercial purposes, including generating unlimited barcodes.</p>

    <h2>3. Accuracy & Liability</h2>
    <p><strong>Barcodes are generated using the industry-standard bwip-js library.</strong> While highly reliable, we provide <strong>no warranty</strong> that generated barcodes will scan correctly in every environment. You are solely responsible for validating output in your specific use case (printer, scanner, material).</p>

    <h2>4. Prohibited Use</h2>
    <p>You may not:</p>
    <ul>
      <li>Use the Service to generate illegal, harmful, or fraudulent barcodes</li>
      <li>Attempt to reverse-engineer, overload, or interfere with the Service</li>
      <li>Remove or alter copyright notices in generated SVGs</li>
    </ul>

    <h2>5. Limitation of Liability</h2>
    <p>To the fullest extent permitted by law, AxelBase and its developers shall not be liable for any indirect, incidental, or consequential damages arising from use of the Service — including misprinted labels, production delays, or scanning failures.</p>

    <h2>6. Intellectual Property</h2>
    <p>The Service is licensed under the MIT License. Generated SVGs belong to you. You may modify, distribute, and use them freely.</p>

    <h2>7. Termination</h2>
    <p>We reserve the right to suspend access to the Service (e.g., GitHub Pages takedown) without notice if these Terms are violated.</p>

    <h2>8. Governing Law</h2>
    <p>These Terms are governed by the laws of the Republic of Cyprus.</p>

    <p class="italic-note"><strong>AxelBase is provided as-is, for free, forever.</strong> Use it with confidence — and responsibility.</p>
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