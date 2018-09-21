import ModelValidator from "./../lib/ModelValidator";

/**
 * @class
 * @property {Object} data - Resultado da chamada caso bem sucedida.
 * @property {Object} error - Resultado da chamada caso erro.
 * @property {string} status - status da chamada.
 */
class Response {
  data;
  error;
  status;

  /**
   * @param {Object} obj - Objeto a ser instanciado.
   * @param {Object} obj.data - Resultado da chamada caso bem sucedida.
   * @param {Object} obj.error - Resultado da chamada caso erro.
   * @param {string} obj.status - status da chamada.
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
    data: { type: "object" },
    error: { type: "object" },
    status: { type: "string" }
  },
  required: ["data", "error", "status"]
};

export default Response;
