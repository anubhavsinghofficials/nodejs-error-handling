import { AppError } from './app-error-class.js';

export const getErrorDetails = (err: unknown) => {
  let message = 'An Error occured at the Server';
  let statusCode = 500;

  if (err) {
    // App Errors
    if (err instanceof AppError) {
      message = err.message;
      statusCode = err.statusCode;
    }

    // MongoDb Errors
    else if (
      typeof err === 'object' &&
      'name' in err &&
      err.name === 'CastError' &&
      'value' in err &&
      'path' in err
    ) {
      message = `Invalid value ${err.value} for the field ${err.path}`;
      statusCode = 400;
    } else if (
      typeof err === 'object' &&
      'code' in err &&
      err.code === 11000 &&
      'keyValue' in err
    ) {
      let field: unknown, fieldValue: unknown;
      for (const [key, value] of Object.entries(err.keyValue as 'object')) {
        field = key;
        fieldValue = value;
      }
      message = `There already exists a User with ${field} = ${fieldValue}, Enter a different value for ${field}`;
      statusCode = 400;
    } else if (
      typeof err === 'object' &&
      'name' in err &&
      err.name === 'ValidationError' &&
      'message' in err
    ) {
      console.log(err.message);
      message = err.message as string;
      statusCode = 400;
      // console.log(Object.values(err.errors).map((val) => val.message));
    }

    // Other Generic Errors
    else if (err instanceof Error) {
      message = message;
      // think about this again, but the reason i did message = message is because, we are
      // always throwing the AppError, MongoDb/Third party errors are handled, so the only
      // reason this kind of error will be thrown is because things in our application logics
      // like console.log(a) in one of controller without declaring a etc etc.. in that case
      // error messages like "a is not defined" should not be sent to the users..
    } else if (typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
      message = err.message;
    } else if (typeof err === 'string') {
      message = err;
    }
  }

  return { message, statusCode };
};

// you may add more conditions based on what 3rd party
// services u are using and what kind of error they throw
