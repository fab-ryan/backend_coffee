import { Injectable, Scope, Inject, HttpStatus } from '@nestjs/common';
import { ResponseDto } from './response.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PartialType } from '@nestjs/swagger';

export class IResponseData {
  success = true;
  statusCode: number = HttpStatus.OK;
  data: any = null;
  path: any;
  method: string;
  requestId?: string;
  timestamp: number = Date.now();
  message: string;
}

export class IRequest extends PartialType(IResponseData) {}

@Injectable({ scope: Scope.REQUEST })
export class ResponseService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public Response(result: IRequest): ResponseDto {
    const { route, method } = this.request;

    const response: ResponseDto = {
      success: result.success,
      statusCode: result.statusCode,
      data: result.data,
      path: route.path,
      method: method,
      requestId: result.requestId,
      message: result.message,
      timestamp: Date.now(),
    };
    return response;
  }
}
