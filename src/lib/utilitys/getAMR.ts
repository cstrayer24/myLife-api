export default function getAMR(BMR:number,activeness:string){



const activenessResolves = new Map<string,number>([
    ["Sedentary",1.2],
    ["Lightly_active",1.375],
    ["Moderately_active",1.55],
    ["active",1.752]
])

return BMR * activenessResolves.get(activeness)
}