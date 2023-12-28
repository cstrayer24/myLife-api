const conversionRates ={
    poundToKg:2.205,
    inchTocm:2.54
}

export const poundToKg = (poundValue:number)=> poundValue/conversionRates.poundToKg
export const inchTocm = (inchValue:number)=>inchValue * conversionRates.inchTocm