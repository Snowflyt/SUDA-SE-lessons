import { createMixin } from 'schemix';

export default createMixin((IDMixin) => {
  IDMixin.int('id', { id: true, default: { autoincrement: true } });
});
