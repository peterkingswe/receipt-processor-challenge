import { v4 as uuid } from 'uuid';
import {IReceiptProps} from "../types";

// Keep track of UUID's | duplicate UUID odds low but safer the better
const generatedIds = new Set<string>();

export const generateUniqueReceiptId = (): string => {
    let id:string="";
    do {
        id = uuid();
    } while (generatedIds.has(id));
    generatedIds.add(id);
    return id;
};

export const calcPoints = (body: IReceiptProps): number => {
    let points = 0;

    // 1. One point for every alphanumeric character in the retailer name
    const retailerAlphanumericCount = body.retailer.replace(/[^a-zA-Z0-9]/g, "").length;
    points += retailerAlphanumericCount;

    // 2. 50 points if the total is a round dollar amount with no cents
    if (parseFloat(body.total) % 1 === 0) {
        points += 50;
    }

    // 3. 25 points if the total is a multiple of 0.25
    if (parseFloat(body.total) % 0.25 === 0) {
        points += 25;
    }

    // 4. 5 points for every two items on the receipt
    points += Math.floor(body.items.length / 2) * 5;

    // 5. Item points logic based on description length
    body.items.forEach((item: IItemProps) => {
        const trimmedDescription = item.shortDescription.trim();
        if (trimmedDescription.length % 3 === 0) {
            const itemPrice = parseFloat(item.price);
            const itemPoints = Math.ceil(itemPrice * 0.2); // Price * 0.2 and round up
            points += itemPoints;
        }
    });

    // 6. 6 points if the day in the purchase date is odd
    const purchaseDate = new Date(body.purchaseDate);
    if (purchaseDate.getDate() % 2 !== 0) {
        points += 6;
    }

    // 7. 10 points if the time of purchase is after 2:00pm and before 4:00pm
    const purchaseTime = body.purchaseTime;
    const [hour, minute] = purchaseTime.split(":").map(Number);
    if (hour >= 14 && hour < 16) {
        points += 10;
    }

    return points;
};