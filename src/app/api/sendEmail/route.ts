import { BodySendEmailRequest } from "@/models/bodySendEmailRequest.model";
import { NextRequest, NextResponse } from "next/server";
import { ValidationBodySendEmailRequest } from "./validator";
import { sendEmail } from "@/services/sendEmail/sendEmail.service";

export async function POST(request: NextRequest) {
    const body: BodySendEmailRequest = await request.json();
    const isValid = ValidationBodySendEmailRequest(body);
    if (isValid.status !== 200) {
        return NextResponse.json({ message: isValid.message, success: false }, { status: 400 });
    }
    const result = await sendEmail(body);
    if(!result.success){
        return NextResponse.json(result, { status: 500 });
    }
    return NextResponse.json(result, { status: 201 });
}