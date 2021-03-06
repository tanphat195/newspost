export const isRequired = value => {
  if (!value) return 'field_is_required';
  return '';
};

export const isEmail = email => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
  if (!reg.test(String(email).toLocaleLowerCase())) return 'email_invalid';
  return '';
};

export const isNumber = number => {
  const reg = /^-?\d+\.?\d*$/;
  if (!reg.test(number)) return 'number_invalid';
  return '';
}

export const minLength = (value, length) => {
  if (String(value).length < length) return `minimum_${length}_characters`;
  return '';
};

export const maxLength = (value, length) => {
  if (String(value).length > length) return `maximum_${length}_characters`;
  return '';
};

export const validateForm = form => Object.keys(form).reduce(
  (prev, key) => ({
    ...prev,
    [key]: {
      ...form[key],
      error: form[key].validate ? ((value) => {
        return form[key].validate.map(rules => {
          return Object.keys(rules).filter(item => item !== 'message').reduce((prevRule, keyRule) => {
            let msg = '';
            switch(keyRule) {
              case 'isRequired': {
                const errorResult = rules[keyRule] ? isRequired(value) : '';
                msg = errorResult ? (rules['message'] || errorResult) : errorResult;
                break;
              }
              case 'isEmail': {
                const errorResult = rules[keyRule] ? isEmail(value) : '';
                msg = errorResult ? (rules['message'] || errorResult) : errorResult;
                break;
              }
              case 'isNumber': {
                const errorResult = rules[keyRule] ? isNumber(value) : '';
                msg = errorResult ? (rules['message'] || errorResult) : errorResult;
                break;
              }
              case 'min': {
                const errorResult = minLength(value, rules[keyRule]);
                msg = errorResult ? (rules['message'] || errorResult) : errorResult;
                break;
              }
              case 'max': {
                const errorResult = maxLength(value, rules[keyRule]);
                msg = errorResult ? (rules['message'] || errorResult) : errorResult;
                break;
              }
              default: {
                msg = '';
                break;
              }
            }

            return [...prevRule, msg];
          }, [])[0];
        }).filter(item => !!item)[0];
      })(form[key].value) : '',
    },
  }), {});

export const checkForm = form => Object.keys(form).find(key => !!form[key].error);

export const getFormErrors = form => Object.keys(form).reduce((prev, key) => ({
  ...prev,
  [key]: form[key].error,
}), {});

export const getFormValues = form => Object.keys(form).reduce((prev, key) => ({
  ...prev,
  [key]: form[key].value,
}), {});