import { IncomingMessage,ServerResponse } from "http";
import useCors from "../../lib/middleware/corsMiddleWare";
import getBMIFreedomUnits from "../../lib/utilitys/getBMIFreedomUnits";
import prsima from "../../prisma";
import {poundToKg,inchTocm} from "../../lib/utilitys/unitConversions"
import getBMR from "../../lib/utilitys/getBMR";
import getAMR from "../../lib/utilitys/getAMR";
import { Prisma } from "@prisma/client";
export default async function step3(req:IncomingMessage,res:ServerResponse<IncomingMessage>){

useCors(req,res,(req,res)=>{

const chunks = []

let success = true;

req.on("data",(chunk)=>{

    chunks.push(chunk)
}).on("end",async()=>{

    if(req.method !== "POST"){
        success = false
        res.writeHead(405,"wrong method")
        res.write("")
        res.end()
        return
    }
    const bodyStr = Buffer.concat(chunks).toString()
    const bodyObj = JSON.parse(bodyStr)
    console.log(bodyObj)
    const currentUser = await prsima.user.findFirst({where:{
        id:bodyObj.userID
    }})
    const heightVals = bodyObj.height.split(",")
    let height_inches = 0;
for(let i =0;i<parseInt(heightVals[0]);i++){

    height_inches+=12;
}

height_inches+= parseInt(heightVals[1]);

    const bmi = getBMIFreedomUnits(parseInt(bodyObj.weight),height_inches)
    const weightKg = poundToKg(parseInt(bodyObj.weight))
    const heightCm = inchTocm(height_inches)
    const BMR = getBMR(currentUser.sex,weightKg,heightCm,currentUser.age);
    const AMR = getAMR(BMR,bodyObj.workout_frequency)

    try{
        const prof = await prsima.physical_profile.create({
            data:{
                useriD:bodyObj.userID,
                weight:parseInt(bodyObj.weight),
                height_str:bodyObj.height,
                height_inches,
                hasDisabilities:bodyObj.hasDisabilities == "true",
                disabilites:Array.from(bodyObj.disabilities),
                strength:parseInt(bodyObj.strength),
                endurance:parseInt(bodyObj.endurance),
                bmi
            }
        })

    const current_user_diet_prof = await prsima.diet_profile.findFirst({where:{userId:bodyObj.userID}})

    await prsima.diet_profile.update({
        where:{
            id:current_user_diet_prof.id
        },
        data:{

            BMR,
            AMR
        }
    })

    await prsima.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            diet_profile:prof.id
        }
    })
    }catch(e){

        console.log(e)
        success = false;
        res.writeHead(500,"err creating user")
        res.write("")
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