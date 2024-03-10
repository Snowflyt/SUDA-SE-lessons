<script lang="ts">
  export let selected = false;
</script>

<button
  class={`relative flex h-10 w-full items-center justify-center rounded hover:bg-[${
    selected ? '#ededed' : '#eaeaea'
  }] ${selected ? 'bg-[#eaeaea]' : 'bg-transparent'} ${
    selected
      ? 'before:absolute before:inset-y-[20%] before:left-0 before:w-1 before:rounded before:bg-primary'
      : ''
  }`}
  on:click>
  <slot />
</button>
