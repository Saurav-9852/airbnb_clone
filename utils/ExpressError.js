class ExpressError extends Error{
    constructor(statusCode, message){
        super();
        this.statusCpde = statusCode;
        this.message = message;
    }
}




module.exports = ExpressError;
