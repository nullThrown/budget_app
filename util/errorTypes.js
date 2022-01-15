// change these to obj -> {error: 'unauthenticated' }
// perhaps create both failure and success response types
// structure...
//  const { type: failure, name: invalid_data, msg: 'data is not valid' }

const unauthenticated = 'unauthenticated';
const invalid_data = 'invalid_data';
const invalid_credentials = 'invalid_credentials';
const server_error = 'server_error';
const email_already_exists = 'email_already_exists';
module.exports = {
  unauthenticated,
  invalid_data,
  invalid_credentials,
  server_error,
  email_already_exists,
};
