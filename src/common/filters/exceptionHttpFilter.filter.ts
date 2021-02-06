import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";
import { response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    private httpAdapter: AbstractHttpAdapter

    constructor (private adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        const { status, body } = exception instanceof HttpException ? (
            {
                status: exception.getStatus(),
                body: exception.getResponse()
            }
        ) : (
            {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                body: {
                    message: exception.message,
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    timestamp: new Date().toISOString(),
                    path: request.path
                }
            }
        );

        this.httpAdapter.reply(response, body, status);
    }
}