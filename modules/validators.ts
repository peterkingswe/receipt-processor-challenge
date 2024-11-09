import {IReceiptProps} from "../types";

export const validateShortDescription = (shortDescription:string):boolean=>{
    return (/^[\w\s\-]+$/).test(shortDescription);
};

export const validateMoney = (price:string):boolean=>{
    return (/^\d+\.\d{2}$/).test(price);
};

export const validateRetailer = (retailer:string):boolean=>{
    return (/^[\w\s\-&]+$/).test(retailer);
};

export const validateTime = (time: string): boolean => {
    // Pattern for 24-hour format (HH:MM), where HH is 00-23 and MM is 00-59
    return (/^(?:[01]\d|2[0-3]):[0-5]\d$/).test(time);
};

export const validateDate = (dateString: string): boolean => {
    // yyyy - mm - dd
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!regex.test(dateString)) {
        return false;
    }

    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    return date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;
}

export const validateParams = (bodyProps:IReceiptProps):boolean=> {
    // validate all but items Arr
    if(!validateRetailer(bodyProps.retailer) || !validateDate(bodyProps.purchaseDate) ||
        !validateTime(bodyProps.purchaseTime) || !validateMoney(bodyProps.total)){
        return false
    }
    // validate items in itemArr
    bodyProps.items.forEach((v,i)=>{
        if(!validateShortDescription(v.shortDescription) || !(validateMoney(v.price))){
            return false;
        }
    })

    return true;
};