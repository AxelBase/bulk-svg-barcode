<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Making It Work Offline & on GitHub Pages | AxelBase Blog</title>
  <meta name="description" content="How AxelBase runs 100% client-side with zero backend — perfect for GitHub Pages, Netlify, and offline use." />
  <meta property="og:title" content="Making It Work Offline & on GitHub Pages" />
  <meta property="og:description" content="Architecture decisions that make AxelBase truly static, private, and instantly deployable." />
  <meta property="og:url" content="{base}/blog/posts/post6" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Making It Work Offline & on GitHub Pages</p>
  </div>

  <article class="prose">
    <h1>Making It Work Offline & on GitHub Pages</h1>
    <p class="post-meta">Published: November 27, 2025</p>

    <p>AxelBase has no backend, no database, no API keys. It’s a pure static site — deployable anywhere in seconds — yet performs like a full web app.</p>

    <h2>100% Static Architecture</h2>
    <ul>
      <li>Built with SvelteKit + @sveltejs/adapter-static</li>
      <li>All libraries (bwip-js, JSZip) loaded from /static</li>
      <li>Works perfectly on GitHub Pages, Netlify, Vercel, Cloudflare Pages</li>
      <li>Zero server costs</li>
    </ul>

    <h2>Offline-First by Design</h2>
    <p>After first visit, everything is cached. Open the site with no internet — generate 10,000 barcodes. Works.</p>

    <h2>Base Path Handling</h2>
    <p>Deploys correctly whether at root or in a subfolder (e.g. <code>/your-repo</code>) thanks to SvelteKit’s <code>paths.base</code> and <code>import.meta.env.BASE_URL</code>.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Can I host it on my company intranet?</summary>
      <p>Yes — just copy the built <code>docs/</code> folder to any web server.</p>
    </details>
    <details>
      <summary>Is it secure?</summary>
      <p>100% — no data ever leaves your device. No tracking. No analytics.</p>
    </details>
    <details>
      <summary>Can I add a custom domain?</summary>
      <p>Yes — works perfectly with CNAME and HTTPS.</p>
    </details>

    <p class="italic-note">Privacy + performance + portability — the holy trinity of modern web tools.</p>
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