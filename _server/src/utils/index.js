const validate = require('validate.js');

const isEmail = (email) => {
  const constraints = {
    from: {
      email: true,
    }
  };

  return !validate({ from: email }, constraints);
}

const getFormData = (form) => {
  if (form._parts) {
    return Object.values(form._parts).reduce((prev, key) => ({
      ...prev,
      [key[0]]: key[1],
    }), {})
  }
}

module.exports = {
  isEmail,
  getFormData
};