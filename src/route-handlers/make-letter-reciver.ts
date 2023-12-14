import { IncomingMessage, ServerResponse } from "http";
import useCors from "../lib/middleware/corsMiddleWare";
import prsima from "../prisma";
export default function makeLetterReciver(req:IncomingMessage,res:ServerResponse<IncomingMessage>){

    
   useCors(req,res,(req,res)=>{





       
       
       let success = true;
       const chuncks:any[] = [];
       
       
       
       
       
       req.on("data",(chunck)=>{
           
           chuncks.push(chunck);
        })
        
        
        req.on("end",async()=>{
            
            if(req.method !== "POST"){
                success = false;
                res.writeHead(403,"wrong method");
                
                res.end()
            }
            
            
            const body = Buffer.concat(chuncks).toString();
            const jsonBody = JSON.parse(body);
            
            
            console.log(jsonBody)
            
            if(jsonBody.name === "" || jsonBody.emailAdress === ""){
                success = false;
                res.writeHead(400,"invalid  data");
                res.end();
            }
            try{
                
                
                
                const letterReciver = await prsima.letter_reciver.create({
                    data:{
                        email:jsonBody.emailAdress ,
                        name:jsonBody.name
                    }
                })
            }catch(e){
                success = false
                res.writeHead(403,"query fail")
                res.end()
                
                
            }
            if(success){
                res.writeHead(200,"sucess");
                res.end()
            } 
        })
    })
    }
    