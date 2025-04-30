import nodeMailer from "nodemailer";
import { BodySendEmailRequest } from "@/models/bodySendEmailRequest.model";

const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }

})

export const sendEmail = async ( body: BodySendEmailRequest) => {
    try {
        await transporter.sendMail({
            from: body.from,
            to: body.to,
            subject: body.subject,
            text: body.content,    
        })
        return  { success: true, message: "Email sent successfully"};
    } catch (error) {
        return  { success: false, message: error };
    } 
    

   
}