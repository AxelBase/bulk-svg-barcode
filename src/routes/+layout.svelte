<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { slide, fly } from 'svelte/transition';
  import { onMount } from 'svelte';

  // --- Buy Me A Coffee Logic ---
  const paypalUsername = 'AxelLab427'; // UPDATE THIS
  const donationAmounts = [1, 3, 5, 10];
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

  // --- Theme Toggle Logic ---
  let isDarkMode = false;
  
  function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-bs-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-bs-theme', next);
    isDarkMode = next === 'dark';
    // Optional: Save to local storage
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
      
      <div class="d-flex align-items-center gap-3">
        <a href="{base}/" class="d-flex align-items-center gap-2 logo-group text-decoration-none">
          <img src="{base}/AxelLab-Logo.ico" alt="Logo" class="navbar-logo" />
          <span class="brand-text d-none d-sm-inline">AxelBase</span>
        </a>

        <div class="position-relative d-none d-md-block ms-2" use:clickOutside on:click_outside={closeDropdown}>
          <button class="btn btn-coffee d-flex align-items-center gap-2" on:click={toggleDropdown}>
            <i class="bi bi-cup-hot-fill coffee-icon"></i>
            <span>Buy me a coffee</span>
          </button>

          {#if isDropdownOpen}
            <div class="bmac-dropdown glass" transition:slide={{ duration: 200 }}>
              {#each donationAmounts as amount}
                <a href="https://paypal.me/{paypalUsername}/{amount}" target="_blank" 
                   rel="noopener noreferrer" on:click={closeDropdown} class="donation-link">
                  ${amount}
                </a>
              {/each}
            </div>
          {/if}
        </div>
      </div>

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

      <div class="d-lg-none d-flex align-items-center gap-2">
        <button class="btn btn-icon" on:click={toggleTheme} aria-label="Toggle Dark Mode">
          {#if isDarkMode} <i class="bi bi-moon-stars-fill text-warning"></i> {:else} <i class="bi bi-sun-fill text-warning"></i> {/if}
        </button>
        
        <button class="navbar-toggler border-0" type="button" on:click={() => isMobileMenuOpen = !isMobileMenuOpen} aria-label="Toggle navigation menu">
          <i class="bi bi-list fs-2" style="color: var(--color-text-main);"></i>
        </button>
      </div>
    </nav>

    {#if isMobileMenuOpen}
      <div class="container mt-2" transition:slide>
        <div class="glass rounded-4 p-3 d-flex flex-column gap-2 text-center">
          <a class="nav-link-custom" on:click={() => isMobileMenuOpen = false} href="{base}/">Home</a>
          <a class="nav-link-custom" on:click={() => isMobileMenuOpen = false} href="{base}/#about">About</a>
          <a class="nav-link-custom" on:click={() => isMobileMenuOpen = false} href="{base}/#how-to">How to use</a>
          <a class="nav-link-custom" on:click={() => isMobileMenuOpen = false} href="{base}/#faq">FAQ</a>
          <a class="nav-link-custom" on:click={() => isMobileMenuOpen = false} href="{base}/blog">Blog</a>
          <hr class="m-1 opacity-25">
           <div class="d-flex justify-content-center gap-2 py-2">
             <small class="text-muted">Donate:</small>
             {#each donationAmounts as amount}
              <a href="https://paypal.me/{paypalUsername}/{amount}" target="_blank" class="badge bg-warning text-dark text-decoration-none">${amount}</a>
             {/each}
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
        &copy; {new Date().getFullYear()} AxelBase Bulk Barcode SVG Generator
      </div>
      <div class="d-flex gap-4">
        <a href="{base}/privacy" class="footer-link">Privacy</a>
        <a href="{base}/terms" class="footer-link">Terms</a>
      </div>
    </div>
  </footer>
</div>

<style>
  /* Navbar Specifics */
  .navbar-logo { height: 36px; width: auto; transition: transform 0.3s ease; }
  .logo-group:hover .navbar-logo { transform: rotate(10deg); }
  
  .brand-text {
    font-size: 1.4rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--brand-navy), var(--brand-green));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Nav Links */
  .nav-link-custom {
    position: relative;
    padding: 0.5rem 1rem;
    color: var(--color-text-main);
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .nav-link-custom:hover { color: var(--brand-green); }
  
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
  
  .nav-link-custom:hover::after { width: 60%; }

  /* Coffee Button */
  .btn-coffee {
    background: #ffdd00;
    color: #3d3d3d;
    font-weight: 700;
    border: none;
    box-shadow: 0 4px 10px rgba(255,221,0,0.3);
    font-size: 0.9rem;
  }
  
  .btn-coffee:hover {
    background: #ffe54c;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(255,221,0,0.4) !important;
  }

  .bmac-dropdown {
    position: absolute;
    top: 120%;
    left: 0;
    min-width: 140px;
    padding: 0.5rem;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .donation-link {
    display: block;
    text-align: center;
    padding: 0.5rem;
    border-radius: 10px;
    color: var(--brand-navy);
    text-decoration: none;
    font-weight: 700;
    transition: background 0.2s;
  }
  
  .donation-link:hover {
    background: rgba(16, 185, 129, 0.2);
    color: var(--brand-green);
  }

  /* Footer Link */
  .footer-link { color: var(--color-text-muted); text-decoration: none; transition: color 0.2s; }
  .footer-link:hover { color: var(--brand-green); }

  /* Icon Button (Theme) */
  .btn-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    transition: background 0.2s;
  }
  .btn-icon:hover { background: rgba(255,255,255,0.2); }
</style>