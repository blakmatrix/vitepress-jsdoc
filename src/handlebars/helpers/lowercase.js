/* eslint-disable unicorn/prefer-module */
const Handlebars = require('handlebars');

Handlebars.registerHelper('lowercase', function (value) {
  if (!value) return value; // Return early if value is undefined or falsy

  if (typeof value === 'string') {
    const result = value.startsWith('#')
      ? '#' + value.slice(1).toLowerCase()
      : value.toLowerCase();
    return result;
  }

  return value;
});
