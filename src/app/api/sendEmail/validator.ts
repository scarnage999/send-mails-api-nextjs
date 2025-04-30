import { BodySendEmailRequest } from "@/models/bodySendEmailRequest.model";

export const ValidationBodySendEmailRequest = (body: BodySendEmailRequest) =>{
    if(body.from === undefined || body.from === null || body.from === ""){
        return {status: 400, message: "from is required"}
    } else if(!body.from.includes("@")){
        return {status: 400, message: "from format is not correct"}
    }
    if(body.to === undefined || body.to === null || body.to === ""){
        return {status: 400, message: "to is required"}
    }
    else if(!body.to.includes("@")){
        return {status: 400, message: "to is not a valid email"}
    }
    if(body.subject === undefined || body.subject === null || body.subject === ""){
        return {status: 400, message: "subject is required"}
    }
    if(body.content === undefined || body.content === null || body.content === ""){
        return {status: 400, message: "content is required"}
    }
    return {status: 200, message: "ok"}
}