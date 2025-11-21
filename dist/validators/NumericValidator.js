import ValidationError from '../errors/ValidationError';
export const NUMERIC_RE = /^[+-]?(?:\d+|\d+\.\d+|\.\d+)$/;
export default class NumericValidator {
    static parseNumber(token) {
        if (!NUMERIC_RE.test(token)) {
            throw new ValidationError(`Invalid numeric token: ${token}`);
        }
        const value = Number(token);
        if (Number.isNaN(value)) {
            throw new ValidationError(`Parsed NaN for token: ${token}`);
        }
        return value;
    }
}
