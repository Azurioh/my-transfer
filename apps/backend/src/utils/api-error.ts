import type { Errors } from '@edge-trading/shared/enums/errors';
import type { HttpStatusCode } from '@edge-trading/shared/enums/http-status';

/**
 * @class ApiError
 * @description Api error class
 */
export default class ApiError extends Error {
  /**
   * @property httpCode
   * @description The http status code
   */
  public httpCode: HttpStatusCode;
  /**
   * @property statusCode
   * @description The status code
   */
  public statusCode: Errors;
  /**
   * @property data
   * @description The data
   */
  public data: Record<string, unknown> | undefined;

  /**
   * @constructor
   * @param httpCode - The http status code
   * @param statusCode - The status code
   * @param message - The message
   * @param data - The data
   */
  constructor(httpCode: HttpStatusCode, statusCode: Errors, message: string, data?: Record<string, unknown>) {
    super(message);
    this.httpCode = httpCode;
    this.statusCode = statusCode;
    this.data = data;
  }
}
