import { Product } from "./models/Product";
import { BulkDiscountRule } from "./rules/BulkDiscountRule";
import { BuyXGetYRule } from "./rules/BuyXGetYRule";
import { PricingRule } from "./rules/PricingRule";

export class Checkout {
    private items: Map<string, number> = new Map();
    private pricingRules: PricingRule[];
    private products: Record<string, Product> = {
        "ipd": new Product("ipd", "Super iPad", 549.99),
        "mbp": new Product("mbp", "MacBook Pro", 1399.99),
        "atv": new Product("atv", "Apple TV", 109.50),
        "vga": new Product("vga", "VGA adapter", 30.00)
    };

    constructor(pricingRules: PricingRule[]) {
        this.pricingRules = pricingRules;
    }

    scan(sku: string): void {
        if (!this.products[sku]) {
            throw new Error(`Invalid product SKU: ${sku}`);
        }
        this.items.set(sku, (this.items.get(sku) || 0) + 1);
    }

    total(): number {
        let totalPrice = 0;
        let appliedItems = new Set<string>();

        for (const rule of this.pricingRules) {
            totalPrice += rule.apply(this.items, this.products);
            appliedItems.add(rule instanceof BuyXGetYRule ? rule.sku : (rule instanceof BulkDiscountRule ? rule.sku : ""));
        }

        for (const [sku, quantity] of this.items) {
            if (!appliedItems.has(sku)) {
                totalPrice += quantity * this.products[sku].price;
            }
        }

        return parseFloat(totalPrice.toFixed(2));
    }
}
