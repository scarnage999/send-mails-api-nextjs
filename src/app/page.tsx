"use client";
import { useState } from "react";


export default function Home() {

  const [emailInfo, setEmailInfo] = useState({
    from: "",
    to: "",
    subject: "",
    content: ""
  });

  const [alertMessage, setAlertMessage] = useState({
    message: "",
    status: "",
  });

  const sendEmail = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    e.preventDefault();
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailInfo)
    });
    const data = await response.json();
    if(data.success){
      setEmailInfo({
        from: "",
        to: "",
        subject: "",
        content: ""
      })
      setAlertMessage({
        message: data.message,
        status: "success"
      });
    }
    else{
      setAlertMessage({
        message: data.message,
        status: "error al enviar el correo"
      });
    }
  }
  
  return (
    <div className="w-full h-full flex items-center justify-center">
     
      <div className="max-w-lg mt-10">
       <h1 className="text-center">Envio de correos</h1>
       <form>
        <input onChange={(e) => {
          setEmailInfo({
            ...emailInfo,
            from: e.target.value
          });
        }} type="text" name="From" value={emailInfo.from} placeholder="from" className="w-full border-1 mt-2 border-gray-300 rounded-md p-2"/>
        <input onChange={(e) => {
          setEmailInfo({
            ...emailInfo,
            to: e.target.value
          });
        }} type="text" value={emailInfo.to} name="To" placeholder="to" className="w-full border-1 mt-2 border-gray-300 rounded-md p-2"/>
        <input onChange={(e) => {
          setEmailInfo({
            ...emailInfo,
            subject: e.target.value
          });
        }} type="text" name="Subject" value={emailInfo.subject} placeholder="subject" className="w-full border-1 mt-2 border-gray-300 rounded-md p-2"/>
        <textarea onChange={(e) => {
          setEmailInfo({
            ...emailInfo,
            content: e.target.value
          });
        }} name="content" value={emailInfo.content} placeholder="Content" rows={5} className="w-full border-1 mt-2 border-gray-300 rounded-md p-2"></textarea>
        {alertMessage.message && (
          <div className={`w-full mt-2 p-2 text-white rounded-md ${alertMessage.status === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {alertMessage.message}
          </div>
        )}
        <button onClick={(e) => sendEmail(e)} className="w-full bg-blue-500 rounded mt-5 p-2 text-white">Enviar</button>     
       </form>
      </div>
    </div>
  );
}
