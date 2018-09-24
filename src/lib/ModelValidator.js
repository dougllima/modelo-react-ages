import * as Ajv from "ajv";

/**
 * @param {Object} object Valor a ser válidado.
 * @param {Object} schema Schema da classe para ser válidado.
 * @param {Object|function} target Objeto/Construtor que será iniciado com o object
 *
 * @returns {Object} Objeto do tipo target contendo os valores de object
 */
function ModelValidator(object, schema, target) {
  try {
    const ajv = new Ajv({ allErrors: true });
    let objectParsed; // Objeto resultante do parse de JSON ou de um objeto para o target.

    // Verifica o tipo de dado e se string, faz parse para um objecto.
    if (typeof object === "string") {
      objectParsed = JSON.parse(object);
    } else if (typeof object === "object") {
      objectParsed = object;
    } else {
      throw Error("Informado um valor que não é suportado.");
    }

    // Verifica a validade do schema.
    if (schema === null)
      throw Error("Não foi informado um schema para validar.");
    if (typeof schema !== "object")
      throw Error("O schema informado não é válido.");

    let validator = ajv.compile(schema); // Gera um validador que trabalhará a partir das regras de schema informadas.

    // Valida o objeto.
    if (validator(objectParsed)) {
      // Verifica se o target é de um tipo válido.
      if (typeof target !== "object" && typeof target !== "function")
        throw Error(
          "Foi informado um target, porém ele não é um objeto ou construtor válido."
        );

      // Se target for uma função, transforma ela em objeto.
      if (typeof target === "function") target = new target();

      // Coloca o que veio do parse e foi validado dentro do target e o retorno de volta dento do objeto do parse.
      objectParsed = Object.assign(target, objectParsed);

      return objectParsed;
    } else {
      throw Error(
        "O objeto não possui um schema válido: " +
          ajv.errorsText(validator.errors)
      );
    }
  } catch (e) {
    throw e;
  }
}

export default ModelValidator;
