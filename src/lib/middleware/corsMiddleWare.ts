
import { IncomingMessage, ServerResponse } from "http";
function useCors(req:IncomingMessage,res:ServerResponse<IncomingMessage>,handler:(req:IncomingMessage,res:ServerResponse<IncomingMessage>)=>any){
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers","*")
    res.setHeader('Access-Control-Allow-Methods',"POST,GET");

    if(req.method === "OPTIONS"){

        res.end()
    }else{


        handler(req,res);
    }

}

export default useCors;