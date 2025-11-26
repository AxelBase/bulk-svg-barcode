<script lang="ts">
  import { base } from '$app/paths';

  const posts = [
    { href: '/blog/posts/post1', title: 'How AxelBase Generates Perfect SVG Barcodes', description: 'Deep dive into bwip-js toSVG() method and why it produces print-ready, scannable vector output.' },
    { href: '/blog/posts/post2', title: 'Client-Side ZIP Generation Without Dependencies', description: 'How JSZip runs entirely in-browser to bundle thousands of SVGs instantly with zero backend.' },
    { href: '/blog/posts/post3', title: 'Barcode Type Auto-Detection in CSV Uploads', description: 'Regex-based heuristics that accurately guess EAN-13, UPC-A, Code 39, and more from raw data.' },
    { href: '/blog/posts/post4', title: 'Why We Use Canvas → SVG Instead of PNG', description: 'Technical comparison: SVG vs raster formats for laser cutting, vinyl plotting, and infinite scaling.' },
    { href: '/blog/posts/post5', title: 'Batch Processing 10,000+ Barcodes in Browser', description: 'Memory management, chunked rendering, and progress feedback when handling massive CSV files.' },
    { href: '/blog/posts/post6', title: 'Making It Work Offline & on GitHub Pages', description: 'Static asset loading, base path handling, and PWA-ready architecture explained.' },
    { href: '/blog/posts/post7', title: 'Stress Testing: 100 Manual + 50,000 CSV Rows', description: 'Real-world performance results and the optimizations that made it possible.' },
  ];
</script>

<svelte:head>
  <title>Blog | AxelBase Insights</title>
  <meta name="description" content="Technical deep dives, performance insights, and development stories behind AxelBase Bulk Barcode SVG Generator." />
</svelte:head>

<div class="container py-5 blog-index">
  <header class="text-center mb-5 pb-4 border-bottom">
    <h1 class="display-5 fw-bold text-primary">AxelBase Technical Blog</h1>
    <p class="lead text-muted col-lg-8 mx-auto">
      In-depth articles on barcode generation, client-side performance, SVG workflows, and the engineering behind the fastest bulk barcode tool on the web.
    </p>
  </header>

  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    {#each posts as post}
      <a href="{base}{post.href}" class="col text-decoration-none">
        <div class="card h-100 border-0 shadow-sm hover-shadow transition">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title h5 fw-bold text-primary mb-3">{post.title}</h3>
            <p class="card-text text-muted flex-grow-1 small">{post.description}</p>
            <span class="text-success fw-semibold mt-3">Read Article →</span>
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .hover-shadow { transition: all 0.3s ease; }
  .hover-shadow:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(30,58,138,0.15) !important; }
  .transition { transition: all 0.3s ease; }
</style>