//https://myaccount.google.com/lesssecureapps   past tihs link in url and allow less secure apps ...for locolhost if you run app https no need to allow this link
import nodemailer from 'nodemailer'

export const emailsender = async (email, msg,subject="SpotiViral Songs Promotion") => {
    console.log("email");
    try {
        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,//465
            secure: false,
            requireTLS: true,
            auth: {
                user: "spotiviral@gmail.com",
                pass: "cmyv mlnb xrtf xzhc"
            }
    
        });
        
        let mailDetails = {
            from: "spotiviral@gmail.com",
            to: email,
            subject: subject,
            html: msg,
        }
        return await mailTransporter.sendMail(mailDetails)
    } catch (error) {
        console.log(error);
        return false
    }
}