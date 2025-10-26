const bcrypt = require('bcryptjs');

const password = 'admin123'; // la contraseña que quieras
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then(hash => {
  console.log('Password encriptada:', hash);
});