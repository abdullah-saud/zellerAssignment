"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkout_1 = require("./checkout");
var BulkDiscountRule_1 = require("./rules/BulkDiscountRule");
var pricingRules = [
    //buyXGetYRule("vga", 3, 2), // Buy 3 Apple TVs, Pay for 2
    (0, BulkDiscountRule_1.bulkDiscountRule)("vga", 4, 10) // Bulk discount for iPads
]
    .filter(function (rule) { return typeof rule === "function"; });
;
var co = (0, checkout_1.createCheckout)(pricingRules);
co.scan("vga");
co.scan("vga");
co.scan("vga");
co.scan("vga");
co.scan("vga");
console.log("Total: $" + co.total()); // Expected: $249.00
