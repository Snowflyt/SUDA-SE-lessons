import { createModel } from 'schemix';

import DateTimeMixin from '../mixins/DateTime.mixin';
import IDMixin from '../mixins/ID.mixin';

import RoleModel from './Role.model';

export default createModel((PermissionModel) => {
  PermissionModel.mixin(IDMixin)
    .mixin(DateTimeMixin)
    .string('name', { unique: true })
    .string('description', { optional: true })
    .relation('roles', RoleModel, { list: true });
});
