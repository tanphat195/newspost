const changeCase = require('change-case');

module.exports = {
  helpers: {
    toPascalCase(name) {
      return changeCase.pascalCase(name);
    },
    createBaseClassName(level, name) {
      const atomicPrefix = level.slice(0, 1);
      return `${atomicPrefix}-${name.toLocaleLowerCase()}`;
    }
  }
}