export const isFloat = (value:any) => {
    return Number(value) == value && value % 1 != 0;
}

export const Round = (number: any)=>{
    return Math.round((number + Number.EPSILON) * 100) / 100;
}