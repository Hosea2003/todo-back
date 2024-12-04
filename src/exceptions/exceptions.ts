import { StatusCodes } from "http-status-codes";

export class APIException extends Error{
    statusCode:number;
    error:any;

    constructor(statusCode:number, error:any){
        super(error)
        this.statusCode=statusCode
        this.error = error
    }
}

export class BadRequestException extends APIException{
    constructor(error:any){
        super(StatusCodes.BAD_REQUEST, error)
    }
}

export class NotFoundException extends APIException{
    constructor(error:any){
        super(StatusCodes.NOT_FOUND, error)
    }
}

export class UnauthorizedException extends APIException{
    constructor(error:any){
        super(StatusCodes.UNAUTHORIZED, error)
    }
}