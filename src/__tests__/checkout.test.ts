import { createCheckout, PricingRule } from "../../checkout";
import { bulkDiscountRule } from "../../rules/BulkDiscountRule";
import { buyXGetYRule } from "../../rules/BuyXGetYRule";

describe("Checkout System - Buy 3, Pay for 2 (VGA Adapters)", () => {
    let checkout: ReturnType<typeof createCheckout>;

    beforeEach(() => {
        const pricingRules: PricingRule[] = [
            buyXGetYRule("vga", 3, 2), // Buy 3 VGA adapters, pay for 2
        ];
        checkout = createCheckout(pricingRules);
    });

    test("should apply 'Buy 3, Pay for 2' discount correctly", () => {
        checkout.scan("vga");
        checkout.scan("vga");
        checkout.scan("vga");

        expect(checkout.total()).toBe(60.00); // ✅ 2 * 30.00 (1 free VGA adapter)
    });

    test("should return correct total for a single item", () => {
        checkout.scan("ipd");
        expect(checkout.total()).toBe(549.99);
    });

    test("should return correct total for multiple different items", () => {
        checkout.scan("ipd");
        checkout.scan("vga");
        expect(checkout.total()).toBe(579.99); // 549.99 + 30.00
    });
    describe("Checkout System - Edge Cases", () => {
        let checkout: ReturnType<typeof createCheckout>;
    
        beforeEach(() => {
            const pricingRules: PricingRule[] = [
                buyXGetYRule("vga", 3, 2),
                bulkDiscountRule("ipd", 4, 499.99),
            ];
            checkout = createCheckout(pricingRules);
        });
    
        // Edge Cases
        test("should throw an error when scanning an invalid SKU", () => {
            expect(() => checkout.scan("invalidSKU")).toThrow("Invalid product SKU: invalidSKU");
        });
    
        test("should NOT apply discount if VGA quantity is below threshold", () => {
            checkout.scan("vga");
            checkout.scan("vga"); // Only 2 VGAs, no "Buy 3, Pay for 2"
            expect(checkout.total()).toBe(60.00); // 2 * 30.00
        });
    
        test("should handle duplicate scans correctly", () => {
            checkout.scan("ipd");
            checkout.scan("ipd");
            expect(checkout.total()).toBe(1099.98); // 2 * 549.99
        });
    
        test("should ignore case sensitivity when scanning SKUs", () => {
            expect(() => checkout.scan("Ipd")).toThrow("Invalid product SKU: Ipd");
        });
    });
});
