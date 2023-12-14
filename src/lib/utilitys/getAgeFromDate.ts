export default function getAgeFromDate(dateStr:string){

const dateNums = dateStr.split('-')
const year = parseInt(dateNums[0])
const month = parseInt(dateNums[1])
const days = parseInt(dateNums[2])

let yearsOld = new Date().getFullYear() - year;
if(month < new Date().getMonth()){
    yearsOld-=1;
}


return yearsOld;


}