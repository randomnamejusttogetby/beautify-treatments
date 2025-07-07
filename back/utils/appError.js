class AppError extends Error {
    constructor(message, statusCode) {
      super(message); //message parametras priklauso tėvinei klasei Error, super yra tėvinės klasės konstruktoriaus kvietimas
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor); //išsaugome klaidos kilmės vietą
    }
  }
export default AppError;
  
  