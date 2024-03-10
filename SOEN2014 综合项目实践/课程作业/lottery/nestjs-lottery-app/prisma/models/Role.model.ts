import { createModel } from 'schemix';

import DateTimeMixin from '../mixins/DateTime.mixin';
import IDMixin from '../mixins/ID.mixin';

import PermissionModel from './Permission.model';
import UserModel from './User.model';

export default createModel((RoleModel) => {
  RoleModel.mixin(IDMixin)
    .mixin(DateTimeMixin)
    .string('name', { unique: true })
    .string('description', { optional: true })
    .relation('permissions', PermissionModel, { list: true })
    .relation('users', UserModel, { list: true });
});
