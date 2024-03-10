<script lang="ts">
  import { appWindow } from '@tauri-apps/api/window';
  import { TiPin as PinIcon } from 'svelte-icons/ti';

  import PinButton from './PinButton';
  import TitleButton from './TitleButton';

  let pinned = false;
</script>

<div
  class="fixed left-0 top-0 z-40 flex h-8 w-full items-center justify-end bg-light"
  data-tauri-drag-region>
  <PinButton
    {pinned}
    on:click={() => {
      pinned = !pinned;
      appWindow.setAlwaysOnTop(pinned);
    }}
    ><div class="flex h-full w-4 items-center justify-center">
      <PinIcon />
    </div></PinButton>
  <TitleButton on:click={() => appWindow.minimize()}>🗕︎</TitleButton>
  <TitleButton on:click={() => appWindow.close()}>🗙︎</TitleButton>
</div>
