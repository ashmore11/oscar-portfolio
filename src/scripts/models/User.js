import keystone from 'keystone';

const types = keystone.Field.Types;
const user = new keystone.List('User');

user.add({
  name: {
    type: types.Name,
    required: true,
    index: true,
  },
  email: {
    type: types.Email,
    initial: true,
    required: true,
    index: true,
  },
  password: {
    type: types.Password,
    initial: true,
    required: true,
  },
}, 'Permissions', {
  isAdmin: {
    type: Boolean,
    label: 'Can access Keystone',
    index: true,
  },
});

user.schema.virtual('canAccessKeystone').get(() => true);

user.defaultColumns = 'name, email, isAdmin';
user.register();
