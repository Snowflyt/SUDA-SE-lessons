import { FaHome as HomeIcon } from 'svelte-icons/fa';
import { GiSettingsKnobs as SettingsIcon } from 'svelte-icons/gi';

import Home from '@/routes/Home.svelte';
import Settings from '@/routes/Settings.svelte';
import { createRoutes } from '@/utils/route';

export const routes = createRoutes([
  {
    name: 'Home',
    path: '/',
    component: Home,
    icon: HomeIcon,
  },
  {
    name: 'Settings',
    path: '/settings',
    component: Settings,
    icon: SettingsIcon,
  },
]);
