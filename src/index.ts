import {createServer} from "http"


const server = createServer((req,res)=>{

switch(req.url){
case "/test":
res.write("hi")
res.end()
break;





}

})

server.listen(3000);