import { PricingRule } from "./PricingRule";
import { Product } from "../models/Product";

export class BulkDiscountRule implements PricingRule {
    
    public sku: string;
    private minQuantity: number;
    private discountedPrice: number;

    constructor(sku: string, minQuantity: number, discountedPrice: number) {
        this.sku = sku;
        this.minQuantity = minQuantity;
        this.discountedPrice = discountedPrice;
    }

    apply(cart: Map<string, number>, products: Record<string, Product>): number {
        if (!cart.has(this.sku)) return 0;

        const quantity = cart.get(this.sku) || 0;
        const product = products[this.sku];

        const unitPrice = quantity >= this.minQuantity ? this.discountedPrice : product.price;
        return quantity * unitPrice;
    }
}
