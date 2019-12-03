import { useState } from 'react';
import { isRequired, isEmail, minLength, maxLength, validateForm, checkForm, getFormErrors, getFormValues } from './validate';

type isRequired = {
  isRequired?: boolean, 
  message: string,
};

type isEmail = {
  isEmail?: boolean, 
  message: string,
};

type isNumber = {
  isNumber?: boolean, 
  message: string,
};

type minLength = {
  min: number,
  message: string,
};

type maxLength = {
  max: number,
  message: string,
};

type validateType = isRequired | isEmail | isNumber | minLength | maxLength

type InitialFormType = {
  [key:string]: {
    value: string,
    error?: string,
    validate?: validateType[],
  }
}

interface Props {
  initialForm: InitialFormType;
  onPressTrigger: Function;
  children: any;
};

const Form = (props: Props) => {
  const [form, setForm] = useState(props.initialForm);

  const updateFormKey = (key, value) => {
    const newForm = {
      ...form,
      [key]: {
        ...form[key],
        value,
      }
    }
    setForm(newForm)
  };

  const setFormKeys = Object.keys(props.initialForm).reduce(
    (prev, key) => ({
      ...prev,
      [key]: updateFormKey.bind(this, key)
    }), {});

  

  const onPress = () => {
    const newForm = validateForm(form);
    setForm(newForm);
    if (!checkForm(newForm)) {
      const values = getFormValues(newForm);
      props.onPressTrigger(false, values);
    } else {
      const errors = getFormErrors(newForm);
      props.onPressTrigger(true, errors)
    }
  };
  
  return (
    props.children(form, setFormKeys, onPress)
  )
}
export default Form;