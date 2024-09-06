
// ------------------------this classn type code 
class ApiResponse{
    constructor(statusCode,data,message="success"){
        this.statusCode=statusCode,
        this.data=data,
        this.message=message,
        this.success=success<400
    }
}
export {ApiResponse}


//---------------------- this function type code
// function createApiResponse(statusCode, data, message = "success") {
//     return {
//         statusCode: statusCode,
//         data: data,
//         message: message,
//         success: statusCode < 400
//     };
// }

// export { createApiResponse };
