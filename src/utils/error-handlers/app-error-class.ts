export class AppError extends Error {
  message!: string;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

// the "message" property also exists in the Error class
// so are we creating a new 2nd "message" property ? I currently
// think know (lack of knowledge), i think it overwrite afaik from
// the C++ behaviours
