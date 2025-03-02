import { PricingRule } from "./PricingRule";
import { Product } from "../models/Product";

export class BulkDiscountRule implements PricingRule {
    
    constructor(public sku: string, 
        private minQuantity: number, 
        private discountedPrice: number
    ) {}

    apply(items: Map<string, number>, products: Record<string, Product>): number {
        if (!items.has(this.sku)) return 0;

        const quantity = items.get(this.sku) || 0;
        const product = products[this.sku];

        const unitPrice = quantity >= this.minQuantity ? this.discountedPrice : product.price;
        return quantity * unitPrice;
    }
}
