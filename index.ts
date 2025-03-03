import { createCheckout, PricingRule } from "./checkout";
import { buyXGetYRule } from "./rules/BuyXGetYRule";
import { bulkDiscountRule } from "./rules/BulkDiscountRule";
import { ProductType } from "./models/Product";

// Define pricing rules here, These rules are flexible and can be modified as needed
const pricingRules : PricingRule[] = [
    buyXGetYRule("vga", 3, 2),                  // Buy 3 VGA adapters, pay for 2
    bulkDiscountRule("ipd", 4, 499.99)          // Bulk discount for Super iPad
]
.filter((rule): rule is PricingRule => typeof rule === "function");
const co = createCheckout(pricingRules);

// Create cart here
co.scan("vga");
co.scan("vga");
co.scan("vga");


console.log("Total: $" + co.total());       // Log the total price of the cart
