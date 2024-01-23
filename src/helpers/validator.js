

import { defineRule } from 'vee-validate';

export const setupValidationRules = () => {
  defineRule('required', value => {
    if (!value || !value.length) {
      return 'This field is required';
    }
    return true;
  });

  defineRule('email', value => {
    if (!value || !value.length) {
      return true;
    }
    if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(value)) {
      return 'This field must be a valid email';
    }
    return true;
  });

  defineRule('password', (value, [target], ctx) => {
    if (value === ctx.form[target]) {
      return true;
    }
    return 'Passwords do not match';
  });

  defineRule('minLength', (value, [limit]) => {
    if (!value || !value.length) {
      return true;
    }
    if (value.length < limit) {
      return `This field must be at least ${limit} characters`;
    }
    return true;
  });

  defineRule('confirmed', (value, [target]) => {
    if (value === target) {
      return true;
    }
    return 'Passwords must match';
  });
  
  defineRule('numeric', value => {
    if (!value || !value.length) {
      return true;
    }
    if (!/^\d+$/.test(value)) {
      return 'This field must be a numeric value';
    }
    return true;
  });
};