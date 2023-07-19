class ApiError extends Error {
   code: number;
   constructor(code: number, message?: string, stack = "") {
      super(message);
      this.code = code;
      if (stack) this.stack = stack;
      else Error.captureStackTrace(this, this.constructor);
   }
}
class InternalServerError extends Error {
   code: number = 500;
   constructor(message: string = `Internal server error`, stack = "") {
      super(message);
      if (stack) this.stack = stack;
      else Error.captureStackTrace(this, this.constructor);
   }
}
class BadRequest extends Error {
   code: number = 400;
   constructor(message: string = `Bad request`, stack = "") {
      super(message);
      if (stack) this.stack = stack;
      else Error.captureStackTrace(this, this.constructor);
   }
}
class Forbidden extends Error {
   code: number = 403;
   constructor(message: string = `Forbidden`, stack = "") {
      super(message);
      if (stack) this.stack = stack;
      else Error.captureStackTrace(this, this.constructor);
   }
}
class Unauthorized extends Error {
   code: number = 401;
   constructor(message: string = `You don't have permission to do that`, stack = "") {
      super(message);
      if (stack) this.stack = stack;
      else Error.captureStackTrace(this, this.constructor);
   }
}

export { ApiError, Forbidden, Unauthorized, InternalServerError, BadRequest };
