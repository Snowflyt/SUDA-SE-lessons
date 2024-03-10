<script lang="ts">
  import { Link } from 'svelte-routing';

  import { routes } from '@/router';

  import MenuButton from './MenuButton';

  let selectedRoute: string = routes[0].name;
</script>

<div
  class="fixed left-0 top-8 z-40 flex h-full w-12 flex-col items-start justify-start bg-light p-1">
  {#each routes as route (route.name)}
    <div class="w-full">
      <Link to={route.path}>
        <MenuButton
          selected={route.name === selectedRoute}
          on:click={() => {
            selectedRoute = route.name;
          }}>
          {route.icon && typeof route.icon === 'string' ? route.icon : ''}
          {#if route.icon !== undefined && typeof route.icon !== 'string'}
            <div class="h-4">
              <svelte:component this={route.icon} />
            </div>
          {/if}
        </MenuButton>
      </Link>
    </div>
  {/each}
</div>
