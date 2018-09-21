import ModelValidator from "./../lib/ModelValidator";

/**
 * @class
 * @property {Object} code - Código do erro.
 */
class User {
  /**
   * @param {Object} obj - Objeto a ser instanciado.
   */
  constructor(obj) {
    ModelValidator(obj, schema, this);
  }
}

/**
 * Schema para validação de informações postas no objeto.
 * @ignore
 */
let schema = {};

export default User;
