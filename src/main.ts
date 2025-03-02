import { Checkout } from "./Checkout";
import { BuyXGetYRule } from "./rules/BuyXGetYRule";
import { BulkDiscountRule } from "./rules/BulkDiscountRule";

const pricingRules = [
    new BuyXGetYRule("atv", 4, 3), // Buy 4 Apple TVs, Pay for 3
    new BulkDiscountRule("ipd", 4, 499.99) // Bulk discount for iPads
];

const co = new Checkout(pricingRules);

co.scan("atv");
co.scan("atv");
co.scan("atv");
co.scan("atv");
co.scan("vga");

console.log("Total: $" + co.total()); // New expected total based on new rule
