import { ErrorRequestHandler } from "express";

/**
 * see https://expressjs.com/en/guide/error-handling.html
 */
export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    console.log(
        `[custom error handler]: error happened while proccessing '${req.method} ${req.url}'`
    );
    next(err);
};
