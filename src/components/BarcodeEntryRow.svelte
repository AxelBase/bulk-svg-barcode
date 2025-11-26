<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let value = '';

  const dispatch = createEventDispatcher();

  function remove() {
    dispatch('remove');
  }
</script>

<div class="input-group mb-2">
  <input
    type="text"
    class="form-control"
    placeholder="Enter barcode data..."
    bind:value
  />
  <button class="btn btn-outline-danger" type="button" on:click={remove}>
    ×
  </button>
</div>