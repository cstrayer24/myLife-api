import { IncomingMessage,ServerResponse } from "http";
import useCors from "../../lib/middleware/corsMiddleWare";
import prsima from "../../prisma";
export default function step2(req:IncomingMessage,res:ServerResponse<IncomingMessage>){

useCors(req,res,(req,res)=>{

    const chunks = [];
let success = true;

    req.on("data",(chunck)=>{
        chunks.push(chunck)
        console.log("data")
    }).on("end",async()=>{
        console.log("test")
if(req.method !== "POST"){
    success = false;
    res.writeHead(405,"wrong method")
    res.write("")
    res.end()
}

const dataStr = Buffer.concat(chunks).toString();
const data = JSON.parse(dataStr);
console.log(data)




try {
    const diet_prof = await prsima.diet_profile.create({
        data:{
            userId:data.userID,
            hasAllergies:data.hasAllergies === "true",
            hasDisease:data.hasDisease === "true",
            allergies:Array.from(data.allergies),
            diseases:Array.from(data.diseases),
            existingDiet:data.currentDiet,
            religiousDiet:data.religiousDiet
        }
    })
    const upadatingUser =  await prsima.user.update({
        where:{
            id:diet_prof.userId
        },
        data:{
            diet_profile:diet_prof.id
        }
    })
    
} catch (error) {
    console.log(error);
    success = false
    res.writeHead(500,"error creating user");
    res.write("")
    res.end()
}
if(success){

    res.writeHead(200,"success");
    res.write("")
    res.end()
}
    })
})
    
}