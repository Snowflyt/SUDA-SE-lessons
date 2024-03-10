import { createModel } from 'schemix';

import DateTimeMixin from '../mixins/DateTime.mixin';
import IDMixin from '../mixins/ID.mixin';

import RoleModel from './Role.model';

export default createModel((UserModel) => {
  UserModel.mixin(IDMixin)
    .mixin(DateTimeMixin)
    .string('username', { unique: true })
    .string('password')
    .relation('roles', RoleModel, { list: true });
});
