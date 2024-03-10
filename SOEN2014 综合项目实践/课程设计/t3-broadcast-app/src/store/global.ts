import { createReactiveStore } from 'react-reactive-hooks';

const globalStore = createReactiveStore({
  roomId: '',
  menuTabIndex: 0,
});

export default globalStore;
