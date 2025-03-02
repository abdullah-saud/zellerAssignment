import { PricingRule } from "./PricingRule";
import { Product } from "../models/Product";

export class BuyXGetYRule implements PricingRule {
    
    constructor(public sku: string, 
        private buyQuantity: number, 
        private payQuantity: number
    ) {}

    apply(items: Map<string, number>, products: Record<string, Product>): number {
        if (!items.has(this.sku)) return 0;

        const quantity = items.get(this.sku) || 0;
        const product = products[this.sku];

        const fullPriceCount = Math.floor(quantity / this.buyQuantity) * this.payQuantity;
        const remainingCount = quantity % this.buyQuantity;

        return (fullPriceCount + remainingCount) * product.price;
    }
}
