import { Product } from "../models/Product";

export interface PricingRule {
    apply(
        items: Map<string, number>, 
        products: Record<string, Product>
    ): number;
}
