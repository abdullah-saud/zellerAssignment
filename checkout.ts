import { products } from "./models/Product";

export type ProductsType = typeof products;

export type PricingRule = (cart: Record<string, number>, products: ProductsType) => { sku: string, price: number};

export const createCheckout = (pricingRules: PricingRule[]) => {
    const cart: Record<string, number> = {};

    const scan = (sku: string) => {
        if (!products[sku]) {
            throw new Error(`Invalid product SKU: ${sku}`);
        }
        cart[sku] = (cart[sku] || 0) + 1;
    };

    const total = (): number => {
        let totalPrice = 0;
        let appliedItems = new Set<string>();
    
        // Apply all pricing rules
        for (const rule of pricingRules) {
            const ruleResult = rule(cart, products);
            totalPrice += ruleResult.price;
            if (ruleResult.price > 0) { // Only add if discount applied
                appliedItems.add(ruleResult.sku);
            }
        }
    
        // Add remaining items at full price
        for (const sku in cart) {
            if (!appliedItems.has(sku)) {
                totalPrice += cart[sku] * products[sku].price;
            }
        }
    
        return parseFloat(totalPrice.toFixed(2));
    };
    

    return { scan, total };
};
