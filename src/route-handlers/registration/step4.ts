import { IncomingMessage,ServerResponse } from "http";
import useCors from "../../lib/middleware/corsMiddleWare";
import prsima from "../../prisma";
import writeLogs from "../../writeLogs";
export default async function step4(req:IncomingMessage,res:ServerResponse<IncomingMessage>){
useCors(req,res,(req,res)=>{


    const chuncks = [];


    let success = true;
    req.on("data",(c)=>{

        chuncks.push(c)
    }).on("end",async()=>{
        
        
        if(req.method !== "POST"){
            success = false;
            res.writeHead(405,"wrong method")
            res.write("");
            res.end()
        }
        const bodyStr = Buffer.concat(chuncks).toString();
        const bodyObj = JSON.parse(bodyStr);
        console.log(bodyObj)
        if(parseInt(bodyObj.happinessLevel) > 5 || parseInt(bodyObj.happinessLevel) < 0){
            res.writeHead(422,"err bad data")
            res.write("")
            success = false;
            res.end()
        }


        /*
        create new row in db 
        update userTable 
        end request process
        test
        */
       

try {


const newMentalProf = await prsima.mental_profile.create({
    data:{
       userID:bodyObj.userID,
       hasMentalIllness:bodyObj.hasMentalIllness == "true",
       mental_illneses:Array.from(bodyObj.mental_illnesses),
       happinessLevel:parseInt(bodyObj.happinessLevel),
       isReligious:bodyObj.isReligious == "true",
       current_religion:bodyObj.current_religion,
       relationship_status:bodyObj.relationship_status,
       employment_status:bodyObj.employment_status
    }
})


await prsima.user.update({
    where:{
        id:newMentalProf.userID
    },
    data:{
        mental_profile:newMentalProf.id
    }
})
} catch (error) {
  writeLogs(error.message) 
  res.writeHead(400,"db error")
  res.write("") 
  success = false;
  res.end()
}
    

if(success){
    res.writeHead(200,"success")
    res.write("")
    res.end()
}
    })
})


}