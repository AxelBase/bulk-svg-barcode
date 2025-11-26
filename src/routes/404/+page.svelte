<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>404 – Page Not Found | AxelBase</title>
  <meta name="description" content="The page you're looking for doesn't exist. Return to AxelBase Bulk Barcode SVG Generator." />
  <meta property="og:title" content="404 – Page Not Found | AxelBase" />
  <meta property="og:description" content="Oops! This page doesn't exist. Let's get you back to generating barcodes." />
  <meta property="og:url" content="{base}{$page.url.pathname}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="container py-5 text-center">
  <div class="my-5">
    <h1 class="display-1 fw-bold text-primary">404</h1>
    <p class="lead mb-4">Page Not Found</p>
    <p class="text-muted col-lg-6 mx-auto">
      The page you’re looking for has been moved, deleted, or — let’s be honest — probably never existed.  
      But your barcodes are safe and waiting for you.
    </p>
  </div>

  <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center my-5">
    <a href="{base}/" class="btn btn-success btn-lg px-5">
      Generate Barcodes
    </a>
    <a href="{base}/blog" class="btn btn-outline-primary btn-lg px-5">
      Read the Blog
    </a>
  </div>

  <div class="mt-5 text-muted small">
    <p>Still lost? Try these:</p>
    <div class="d-flex flex-wrap justify-content-center gap-4 mt-3">
      <a href="{base}/privacy">Privacy Policy</a>
      <span>•</span>
      <a href="{base}/terms">Terms & Conditions</a>
      <span>•</span>
      <a href="https://github.com/axelbase/bulk-svg-barcode" target="_blank" rel="noopener">
        GitHub Repository
      </a>
    </div>
  </div>

  <p class="italic-note mt-5 text-muted">
    <em>No data was lost in the making of this 404.</em>
  </p>
</div>

<style>
  .display-1 {
    font-size: 8rem;
    font-weight: 900;
    background: linear-gradient(135deg, #1E3A8A, #10B981);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .btn-success {
    background-color: #10B981;
    border-color: #10B981;
  }

  .btn-success:hover {
    background-color: #059669;
    border-color: #059669;
  }

  .italic-note {
    font-size: 1.1rem;
  }

  @media (max-width: 576px) {
    .display-1 { font-size: 5.5rem; }
  }
</style>