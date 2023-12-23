
import { IncomingMessage, ServerResponse } from "http";
function useCors(req:IncomingMessage,res:ServerResponse<IncomingMessage>,handler:(req:IncomingMessage,res:ServerResponse<IncomingMessage>)=>any,exposedHeaders?:string[]){
    
    
    
    res.setHeader('Access-Control-Allow-Methods',"POST,GET");
    res.setHeader("Access-Control-Expose-Headers",`*`)
    // res.setHeader("Access-Control-Allow-Methods","true");
    res.setHeader("Access-Control-Allow-Headers","*")
    res.setHeader("Access-Control-Allow-Origin","*")
    if(req.method === "OPTIONS"){
        res.write("preflight")
        res.end()
    }else{


        handler(req,res);
    }

}

export default useCors;