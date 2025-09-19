import Ajv, { type JSONSchemaType } from 'ajv';

export default class AjvService {
  private ajv: Ajv;

  constructor() {
    this.ajv = new Ajv({ coerceTypes: false, strict: true });
  }

  public validate<T>(schema: JSONSchemaType<T>, data: any): data is T {
    return this.ajv.validate(schema, data);
  }
}
