import { ValidationError } from 'yup';

interface IErrors {
  [key: string]: string;
}

export default function getValidationError(error: ValidationError): IErrors {
  const validationErrors: IErrors = {};

  error.inner.forEach((err) => {
    validationErrors[err.path] = err.message;
  });

  return validationErrors;
}
