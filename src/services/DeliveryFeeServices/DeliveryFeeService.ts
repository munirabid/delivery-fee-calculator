
import { Round } from "../../utils/HelperMethods";

export const calculateSurchargeOnCartValue = (minCartValue: number, cartValue:number)=> {
    console.log("Cart value: ", cartValue);
    let surchargeOnCartValue = 0;
    if(cartValue < minCartValue && cartValue !=0){
        surchargeOnCartValue = minCartValue - cartValue;
    };

    console.log("surchargeOnCartValue: ", surchargeOnCartValue);
    
    return Round(surchargeOnCartValue);
}

export const calculateSurchargeOnDistance = (minDistance: number, deliveryDistance:number)=>{
    console.log("deliveryDistance:", deliveryDistance);
    let distanceInRounds = deliveryDistance % minDistance;
    let baseDistance = deliveryDistance / minDistance;
    let surchargeOnDistance = parseInt(baseDistance.toString().split(".")[0]);
    if(distanceInRounds > 0){
        surchargeOnDistance = surchargeOnDistance + 1;
    }
    console.log("surchargeOnDistance:", surchargeOnDistance);
    return surchargeOnDistance;
}

export const calculateSurchargeOnItems = (minItems:number, surchargePerItem:number, amoutOfItems: number)=>{
    console.log("amoutOfItems", amoutOfItems);
    let surchargeOnItems = 0;
    if(amoutOfItems > 4){
        let surchargebleItems = amoutOfItems - minItems;
        surchargeOnItems = surchargebleItems * surchargePerItem;
    }
    console.log("surchargeOnItems", surchargeOnItems);
    return Round(surchargeOnItems);
}

export const calculateSurchargeOnRushHours = (rushHoursDay:number, rushHoursStartTime:number, rushHoursEndTime:number, feeOnRushHours:number, orderTime:string, deliveryFee:number)=>{
    console.log("orderTime", orderTime);

    let surchargeOnRushHours = 0;
    const deliveryDateTime = new Date(orderTime);
    const deliveryDay = deliveryDateTime.getUTCDay();
    const deliveryTime = deliveryDateTime.getHours();

    if(deliveryDay === rushHoursDay && (deliveryTime>= rushHoursStartTime && deliveryTime <= rushHoursEndTime))
    {
        if(deliveryFee === 0)
        {
            return surchargeOnRushHours = 1.1;
        }
        surchargeOnRushHours = (deliveryFee * feeOnRushHours) - deliveryFee;
    }

    console.log("surchargeOnRushHours", surchargeOnRushHours);

    return Round(surchargeOnRushHours);
}

export const calculateTotalDeliveryCharges = (maxDeliveryFee:number, surchargeOnCartValue: number, surchargeOnDistance: number,surchargeOnItems: number,surchargeOnRushHours: number,)=>{
    
    let totalDeliveryFee = surchargeOnCartValue + surchargeOnDistance + surchargeOnItems + surchargeOnRushHours;

    if(totalDeliveryFee > maxDeliveryFee) {
        totalDeliveryFee = maxDeliveryFee;
    }
    
    return  Round(totalDeliveryFee);
}