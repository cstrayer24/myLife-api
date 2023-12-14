import { IncomingMessage, ServerResponse } from "http";
import useCors from "../../lib/middleware/corsMiddleWare";
import prsima from "../../prisma"
import getAgeFromDate from "../../lib/utilitys/getAgeFromDate";
import * as argon2 from "argon2"
interface incomingMakeUser{
    firstname:string;
    lastname:string;
    username:string;
    mail:string;
    password:string;
    sex:string;
    birthday:string;
}
export default function step1(req:IncomingMessage,res:ServerResponse<IncomingMessage>){

useCors(req,res,(req,res)=>{
let success=true;

    const chuncks = [];


    req.on("data",(chunck)=>{
        chuncks.push(chunck);
    })
    
    req.on("end",async()=>{
        const data = Buffer.concat(chuncks).toString();

// console.log(data)
    if(req.method != "POST"){
        success = false;
        res.writeHead(405,"wrong method")
        res.end()
        return;
    }

    
const{firstname,lastname,mail,username,birthday,sex,password} = JSON.parse(data) as incomingMakeUser;
if(!["male","female"].includes(sex)){
res.writeHead(406,"bad data");
res.end()
return;

}
const age = getAgeFromDate(birthday)
try {
    
    const hashedPass = await argon2.hash(password);
    const User = await prsima.user.create({data:{
        firstname,lastname,email:mail,username,birthday,age,sex,password:hashedPass
    }})

    if(!User){
        success = false;
        res.writeHead(500,"user create failed")
        res.end();
        return;
    }

    res.setHeader("Set-Cookie",[`userid=${User.id};path=/;HttpOnly;`]);
    
    
} catch (error) {
    success = false;
    console.log(error)
res.writeHead(500,"error creating user");
res.end(); 
return;   
}

if(success){

    res.writeHead(200,"success");
    res.end();
}


})

})

}