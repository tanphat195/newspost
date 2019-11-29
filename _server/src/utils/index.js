const validate = require('validate.js');

const isEmail = (email) => {
  const constraints = {
    from: {
      email: true,
    }
  };

  return !validate({ from: email }, constraints);
}

module.exports = {
  isEmail,
};