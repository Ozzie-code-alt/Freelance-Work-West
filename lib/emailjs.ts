import emailjs from '@emailjs/browser';

type emailProps ={
    to_name:string,
    contact:string
    user_email:string,
    subject:string,
    type:string,
    reply_to?:string
    message:string
}
const sendEmail = ({
  to_name,
  contact,
  reply_to,
  user_email,
  subject,
  type,
  message,
}:emailProps) => {


  emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    {
      to_name,
      contact,
      reply_to,
      user_email,
      subject,
      type,
      message,
    },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string,
  )



    .then(function(response) {
      console.log(to_name, contact, user_email, subject, message);
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      console.log('FAILED...', error);
    });
};

export default sendEmail;
