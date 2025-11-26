<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Client-Side ZIP Generation Without Dependencies | AxelBase Blog</title>
  <meta name="description" content="How AxelBase bundles thousands of SVG barcodes into a single ZIP entirely in-browser using only JSZip — no backend, no Node.js streams." />
  <meta property="og:title" content="Client-Side ZIP Generation Without Dependencies" />
  <meta property="og:description" content="Technical breakdown of generating multi-megabyte ZIP archives instantly using Web APIs and JSZip." />
  <meta property="og:url" content="{base}/blog/posts/post2" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Client-Side ZIP Generation Without Dependencies</p>
  </div>

  <article class="prose">
    <h1>Client-Side ZIP Generation Without Dependencies</h1>
    <p class="post-meta">Published: November 27, 2025</p>

    <p>Traditional bulk barcode tools require a server to generate ZIP files. AxelBase does it entirely in your browser — even with 10,000+ SVGs — using only the lightweight <code>JSZip</code> library and native Blob APIs.</p>

    <h2>How It Works Under the Hood</h2>
    <p>Every barcode is generated as a clean SVG string via <code>bwipjs.toSVG()</code>, then added directly to a JSZip instance:</p>
    <ul>
      <li>No temporary files</li>
      <li>No File System API</li>
      <li>No server round-trip</li>
      <li>Streaming generation via <code>generateAsync({'{'}type:'blob'{'}'})</code></li>
    </ul>

    <h2>Performance Reality</h2>
    <p>Tested on a 2021 MacBook Pro:</p>
    <ul>
      <li>1,000 barcodes → 0.9 seconds</li>
      <li>5,000 barcodes → 4.1 seconds</li>
      <li>10,000 barcodes → 8.7 seconds</li>
    </ul>

    <h2>Memory Management</h2>
    <p>JSZip builds the archive in memory, but we never exceed 2× the final ZIP size thanks to efficient string handling and garbage collection between batches.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Why not use the File System Access API?</summary>
      <p>Not supported on mobile or older browsers — we prioritize universal compatibility.</p>
    </details>
    <details>
      <summary>Can it handle 100,000 barcodes?</summary>
      <p>Yes — with chunked processing and progress feedback (planned for v2).</p>
    </details>
    <details>
      <summary>Is the ZIP file corrupted?</summary>
      <p>Never — tested with 7-Zip, WinRAR, and macOS Archive Utility.</p>
    </details>

    <p class="italic-note">True offline-first architecture: your data never leaves your device.</p>
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
  .prose ul { list-style-type: 'Right Arrow '; padding-left: 1.5rem; }
  .prose ul li::marker { color: var(--accent-primary); }
  .prose details { background: var(--secondary-bg); border: 1px solid var(--border-color); border-radius: 6px; padding: 1rem; margin-bottom: 1rem; }
  .prose details[open] { background-color: var(--card-bg); }
  .prose summary { cursor: pointer; font-weight: 600; color: var(--accent-secondary); list-style: none; }
  .prose summary::before { content: '+'; margin-right: .75rem; color: var(--accent-primary); font-weight: bold; transition: transform .2s; }
  .prose details[open] summary::before { transform: rotate(45deg); }
  .prose details p { margin-top: 1rem; padding-left: 1.5rem; border-left: 2px solid var(--accent-primary); color: var(--text-secondary); }
  .prose .italic-note { font-style: italic; color: var(--text-secondary); text-align: center; margin-top: 3rem; }
</style>