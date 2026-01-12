<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { slide, fly } from 'svelte/transition';
  import { onMount } from 'svelte';

  // ── Donation / Support Configuration ─────────────────────────────────────
  const bmacUsername = 'axelbase';  // ← Change if your BMC username is different
  const bitcoinAddress = 'bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9';

  let isDropdownOpen = false;
  let isMobileMenuOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  // ── Theme Toggle ────────────────────────────────────────────────────────────
  let isDarkMode = false;

  function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-bs-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-bs-theme', next);
    isDarkMode = next === 'dark';
    localStorage.setItem('axelbase-theme', next);
  }

  onMount(() => {
    const savedTheme = localStorage.getItem('axelbase-theme');
    if (savedTheme) {
      document.body.setAttribute('data-bs-theme', savedTheme);
      isDarkMode = savedTheme === 'dark';
    }
  });
</script>

<div class="app-wrapper">

  <header class="fixed-top p-3 w-100" style="pointer-events: none; z-index: 1040;">
    <nav class="container glass rounded-pill px-4 py-2 d-flex justify-content-between align-items-center"
         style="pointer-events: auto;">

      <!-- Logo + Support Button -->
      <div class="d-flex align-items-center gap-3">
        <a href="{base}/" class="d-flex align-items-center gap-2 logo-group text-decoration-none">
          <img src="{base}/AxelLab-Logo.ico" alt="Logo" class="navbar-logo" />
          <span class="brand-text d-none d-sm-inline">AxelBase</span>
        </a>

        <!-- Buy Me a Coffee Button + Dropdown (desktop) -->
        <div class="position-relative d-none d-md-block ms-2" use:clickOutside on:click_outside={closeDropdown}>
          <button
            class="bmac-button d-flex align-items-center gap-2 text-white border-0 px-4 py-2 rounded-pill shadow-sm"
            on:click={toggleDropdown}
            aria-label="Support the project"
          >
            <i class="bi bi-cup-hot-fill coffee-icon"></i>
            <span class="d-none d-sm-inline fw-semibold">Buy me a Coffee</span>
          </button>

          {#if isDropdownOpen}
            <div
              class="bmac-dropdown glass mt-2"
              transition:fly={{ y: -10, duration: 250 }}
            >
              <a
                href="https://buymeacoffee.com/{bmacUsername}"
                target="_blank"
                rel="noopener noreferrer"
                on:click={closeDropdown}
              >
                <span class="amount">$3</span> One Coffee
              </a>

              <a
                href="https://buymeacoffee.com/{bmacUsername}"
                target="_blank"
                rel="noopener noreferrer"
                on:click={closeDropdown}
              >
                <span class="amount">$5</span> Two Coffees
              </a>

              <a
                href="https://buymeacoffee.com/{bmacUsername}"
                target="_blank"
                rel="noopener noreferrer"
                on:click={closeDropdown}
              >
                <span class="amount">$10</span> Three Coffees
              </a>

              <a
                href="https://buymeacoffee.com/{bmacUsername}"
                target="_blank"
                rel="noopener noreferrer"
                on:click={closeDropdown}
                class="custom-amount"
              >
                Custom Amount
              </a>

              <a
                href="bitcoin:{bitcoinAddress}?label=AxelBase&message=Buy%20me%20a%20coffee"
                target="_blank"
                rel="noopener noreferrer"
                on:click={closeDropdown}
                class="custom-amount bitcoin-option"
              >
                Buy via Crypto (Bitcoin)
              </a>
            </div>
          {/if}
        </div>
      </div>

      <!-- Desktop nav + theme toggle -->
      <div class="d-none d-lg-flex align-items-center gap-1">
        <a class="nav-link-custom" href="{base}/">Home</a>
        <a class="nav-link-custom" href="{base}/#about">About</a>
        <a class="nav-link-custom" href="{base}/#how-to">How to use</a>
        <a class="nav-link-custom" href="{base}/#faq">FAQ</a>
        <a class="nav-link-custom" href="{base}/blog">Blog</a>

        <button class="btn btn-icon ms-2" on:click={toggleTheme} aria-label="Toggle Dark Mode">
          {#if isDarkMode}
            <i class="bi bi-moon-stars-fill text-warning"></i>
          {:else}
            <i class="bi bi-sun-fill text-warning"></i>
          {/if}
        </button>
      </div>

      <!-- Mobile: theme + hamburger -->
      <div class="d-lg-none d-flex align-items-center gap-2">
        <button class="btn btn-icon" on:click={toggleTheme} aria-label="Toggle Dark Mode">
          {#if isDarkMode}
            <i class="bi bi-moon-stars-fill text-warning"></i>
          {:else}
            <i class="bi bi-sun-fill text-warning"></i>
          {/if}
        </button>

        <button
          class="navbar-toggler border-0"
          type="button"
          on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <i class="bi bi-list fs-2" style="color: var(--color-text-main);"></i>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    {#if isMobileMenuOpen}
      <div class="container mt-2" transition:slide>
        <div class="glass rounded-4 p-3 d-flex flex-column gap-2 text-center">
          <a class="nav-link-custom" on:click={() => (isMobileMenuOpen = false)} href="{base}/">Home</a>
          <a class="nav-link-custom" on:click={() => (isMobileMenuOpen = false)} href="{base}/#about">About</a>
          <a class="nav-link-custom" on:click={() => (isMobileMenuOpen = false)} href="{base}/#how-to">How to use</a>
          <a class="nav-link-custom" on:click={() => (isMobileMenuOpen = false)} href="{base}/#faq">FAQ</a>
          <a class="nav-link-custom" on:click={() => (isMobileMenuOpen = false)} href="{base}/blog">Blog</a>

          <hr class="m-1 opacity-25" />

          <div class="d-flex flex-column gap-3 py-2">
            <small class="text-muted fw-semibold">Support the project:</small>

            <a
              href="https://buymeacoffee.com/{bmacUsername}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline-success btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
              on:click={() => (isMobileMenuOpen = false)}
            >
              <i class="bi bi-cup-hot-fill"></i> Buy me a Coffee
            </a>

            <a
              href="bitcoin:{bitcoinAddress}?label=AxelBase&message=Buy%20me%20a%20coffee"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline-warning btn-sm w-100 d-flex align-items-center justify-content-center gap-2"
              on:click={() => (isMobileMenuOpen = false)}
            >
              <i class="bi bi-currency-bitcoin"></i> Donate Bitcoin
            </a>
          </div>
        </div>
      </div>
    {/if}
  </header>

  <main style="padding-top: 100px;">
    <slot />
  </main>

  <footer class="glass border-top py-4 mt-auto">
    <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center text-muted small">
      <div class="mb-2 mb-md-0">
        © {new Date().getFullYear()} AxelBase Bulk Barcode SVG Generator
      </div>
      <div class="d-flex gap-4">
        <a href="{base}/privacy" class="footer-link">Privacy</a>
        <a href="{base}/terms" class="footer-link">Terms</a>
      </div>
    </div>
  </footer>
</div>

<style>
  /* ── Buy Me a Coffee Button (mostly File 1 style + glass adaptation) ── */
  .bmac-button {
    background: var(--brand-green);
    font-size: 0.95rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
  }

  .bmac-button:hover {
    background: var(--brand-green-hover);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
  }

  .coffee-icon {
    font-size: 1.3rem;
  }

  /* ── Dropdown (File 1 layout + glass + dark mode support) ── */
  .bmac-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 240px;
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    box-shadow: var(--glass-shadow);
    overflow: hidden;
    z-index: 1000;
    padding: 0.5rem 0;
  }

  .bmac-dropdown a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    color: var(--color-text-main);
    text-decoration: none;
    font-size: 0.98rem;
    transition: all 0.2s ease;
  }

  .bmac-dropdown a:hover {
    background: rgba(16, 185, 129, 0.15);
    color: var(--brand-green);
    padding-left: 28px;
  }

  .bmac-dropdown .amount {
    font-weight: 700;
    color: var(--brand-green);
    font-size: 1.1rem;
  }

  .bmac-dropdown .custom-amount {
    font-weight: 600;
    color: var(--brand-green);
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    justify-content: center !important;
    margin-top: 6px;
    padding-top: 14px;
  }

  .bitcoin-option {
    color: #f59e0b !important;
  }

  .bitcoin-option:hover {
    color: #fbbf24 !important;
    background: rgba(245, 158, 11, 0.1) !important;
  }

  /* Keep all your original styles below */
  .navbar-logo {
    height: 36px;
    width: auto;
    transition: transform 0.3s ease;
  }

  .logo-group:hover .navbar-logo {
    transform: rotate(10deg);
  }

  .brand-text {
    font-size: 1.4rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--brand-navy), var(--brand-green));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .nav-link-custom {
    position: relative;
    padding: 0.5rem 1rem;
    color: var(--color-text-main);
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s;
  }

  .nav-link-custom:hover {
    color: var(--brand-green);
  }

  .nav-link-custom::after {
    content: '';
    position: absolute;
    width: 0;
    height: 3px;
    bottom: 0px;
    left: 50%;
    background-color: var(--brand-green);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: translateX(-50%);
    border-radius: 2px;
  }

  .nav-link-custom:hover::after {
    width: 60%;
  }

  .btn-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    transition: background 0.2s;
  }

  .btn-icon:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .footer-link {
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-link:hover {
    color: var(--brand-green);
  }
</style>