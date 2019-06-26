'use strict';

import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import * as HttpStatus from 'http-status';
import * as jwt from 'jwt-simple';

// Class that has the methods responsible for the API response

class Handlers {
  authFail (req: Request, res: Response) {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
  }

  authSuccess (res: Response, data: any) {
    const payload = { id: data.id };
    res.json({
      token: jwt.encode(payload, process.env.SECRET)
    });
  }

  onError (res: Response, message: string, err: any) {
    console.log(`Error: ${err}`);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(message);
  }

  onSucess (res: Response, data: any) {
    res.status(HttpStatus.OK).json({ payload: data });
  }

  errorHandlerApi (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    console.error(`API error handler execute: ${err}`);
    res.status(500).json({
      errorCode: 'ERR-001',
      message: 'Internal Server Error'
    });
  }

  dbErrorHandler (res: Response, err: any) {
    console.log(`Error: ${err}`);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: 'ERR-01',
      message: 'Error create user'
    });
  }
}

export default new Handlers();
