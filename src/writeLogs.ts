import {mkdirSync,appendFileSync, lstatSync, fstatSync,existsSync} from "fs"







function writeLogs(log:string){
    if(!existsSync("logs")){
    
    mkdirSync("logs");
    
    
    }
    

    appendFileSync(`logs/${new Date().toDateString().split(" ").join("_")}.txt`,log)
}


export default writeLogs;