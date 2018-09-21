import ModelValidator from "./../lib/ModelValidator";

/**
 * @class
 * @property {Object} code - Código do erro.
 * @property {Object} message - Mensagem do erro.
 */
class Exception {
  code;
  message;

  /**
   * @param {Object} obj - Objeto a ser instanciado.
   * @param {Object} obj.code - Código do erro.
   * @param {Object} obj.message - Mensagem do erro.
   */
  constructor(obj) {
    ModelValidator(obj, schema, this);
  }
}

/**
 * Schema para validação de informações postas no objeto.
 * @ignore
 */
let schema = {
  properties: {
    code: { type: "integer" },
    message: { type: "string" }
  },
  required: ["message", "code"]
};

export default Exception;
