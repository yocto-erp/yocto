interface ErrorResponse {
  message: string;
  code: string;
}

export class ApiError extends Error {
  private errors: ErrorResponse[];
  private type: number;

  constructor(message: string, errors: ErrorResponse[], type: number) {
    super(message);
    this.errors = errors;
    this.type = type;
  }

  getMessage() {
    return this.errors.map((t) => t.message || t.code).join('\n');
  }
}
