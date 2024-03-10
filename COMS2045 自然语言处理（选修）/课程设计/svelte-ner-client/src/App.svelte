<script lang="ts">
  import { Router, Route } from 'svelte-routing';

  import Layout from './lib/Layout';
  import NavBar from './lib/NavBar';
  import TitleBar from './lib/TitleBar';
  import { routes } from './router';

  export let url = '/';
</script>

<Router {url}>
  <TitleBar />
  <NavBar />
  <Layout>
    {#each routes as route (route.name)}
      <Route path={route.path} component={route.component} />
    {/each}
  </Layout>
</Router>
