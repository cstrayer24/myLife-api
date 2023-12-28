
export default function getBMIFreedomUnits(weight:number,height:number){
const CONVERSION_RATE = 703
    return(CONVERSION_RATE * (weight/height**2))
}