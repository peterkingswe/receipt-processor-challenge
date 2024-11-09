export interface IReceiptProps {
    retailer: string; // The name of the retailer/store
    purchaseDate: string; // Date in format 'YYYY-MM-DD'
    purchaseTime: string; // Time in 24-hour format 'HH:MM'
    items: IItemProps[]; // Array of items, with each item following the IItemProps structure
    total: string; // Total price in currency format (e.g., "6.49")
}

interface IItemProps {
    shortDescription: string; // Short description of the item
    price: string; // Item price in currency format (e.g., "6.49")
}
