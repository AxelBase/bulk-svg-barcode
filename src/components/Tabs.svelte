<script lang="ts">
  export let activeTab: 'manual' | 'csv' = 'manual';
</script>

<ul class="nav nav-tabs mb-4" role="tablist">
  <li class="nav-item" role="presentation">
    <button
      class="nav-link {activeTab === 'manual' ? 'active' : ''}"
      class:active={activeTab === 'manual'}
      on:click={() => activeTab = 'manual'}
      type="button"
    >
      Manual Input
    </button>
  </li>
  <li class="nav-item" role="presentation">
    <button
      class="nav-link {activeTab === 'csv' ? 'active' : ''}"
      class:active={activeTab === 'csv'}
      on:click={() => activeTab = 'csv'}
      type="button"
    >
      CSV Bulk
    </button>
  </li>
</ul>