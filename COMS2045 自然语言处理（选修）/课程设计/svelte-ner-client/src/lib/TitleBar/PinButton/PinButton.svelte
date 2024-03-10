<script lang="ts">
  export let pinned = false;
</script>

<div class="flex h-full items-center justify-center p-1">
  <button
    class={`flex h-full w-6 items-center justify-center rounded hover:bg-[#dedddd] ${
      pinned ? 'bg-[#d8d7d7]' : ''
    }
`}
    on:click>
    <slot />
  </button>
</div>
