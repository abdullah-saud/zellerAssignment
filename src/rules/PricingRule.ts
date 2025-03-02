import { Product } from "../models/Product";

export interface PricingRule {
    apply(
        cart: Map<string, number>, 
        products: Record<string, Product>
    ): number;
}
