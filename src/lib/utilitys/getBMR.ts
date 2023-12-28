export default function getBMR(sex:string,weight:number,height:number,age:number):number{



if(sex==="male"){
const MAGICADDEDNUM =  66.47;
const WEIGHT_MULTIPLIER = 13.75;
const HEIGHT_MULTIPLIER = 5.003;
const AGE_MULTIPLIER = 6.755;

return MAGICADDEDNUM + (WEIGHT_MULTIPLIER * weight) + (HEIGHT_MULTIPLIER * height) - (AGE_MULTIPLIER * age)
}else if(sex === "female"){

    const MAGICADDEDNUM =  655.1;
    const WEIGHT_MULTIPLIER = 9.563;
    const HEIGHT_MULTIPLIER = 1.850;
    const AGE_MULTIPLIER = 4.676;
    return MAGICADDEDNUM + (WEIGHT_MULTIPLIER * weight) + (HEIGHT_MULTIPLIER * height) - (AGE_MULTIPLIER * age)
}else{

    return 0
}
}