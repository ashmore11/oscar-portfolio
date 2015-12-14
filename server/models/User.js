var keystone = require('keystone');
var types    = keystone.Field.Types;

/**
 * User Model
 */
var user = new keystone.List('User');

user.add({
	name: {
    type: types.Name, 
    required: true, 
    index: true
  },
	email: {
    type: types.Email,
    initial: true,
    required: true,
    index: true
  },
	password: {
    type: types.Password,
    initial: true,
    required: true
  }
}, 'Permissions', {
	isAdmin: {
    type: Boolean,
    label: 'Can access Keystone',
    index: true
  }
}); 

/**
 * Provide access to Keystone
 */
user.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});

/**
 * Registration
 */
user.defaultColumns = 'name, email, isAdmin';
user.register();
