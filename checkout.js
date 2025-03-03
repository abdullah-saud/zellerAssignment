"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckout = void 0;
var Product_1 = require("./models/Product");
var createCheckout = function (pricingRules) {
    var cart = {};
    var scan = function (sku) {
        if (!Product_1.products[sku]) {
            throw new Error("Invalid product SKU: ".concat(sku));
        }
        cart[sku] = (cart[sku] || 0) + 1;
    };
    var total = function () {
        var totalPrice = 0;
        var appliedItems = new Set();
        // Apply all pricing rules
        for (var _i = 0, pricingRules_1 = pricingRules; _i < pricingRules_1.length; _i++) {
            var rule = pricingRules_1[_i];
            var ruleResult = rule(cart, Product_1.products);
            totalPrice += ruleResult.price;
            appliedItems.add(ruleResult.sku); // ✅ Store the SKU of processed item
        }
        // Add remaining items at full price
        for (var sku in cart) {
            if (!appliedItems.has(sku)) {
                totalPrice += cart[sku] * Product_1.products[sku].price;
            }
        }
        return parseFloat(totalPrice.toFixed(2));
    };
    return { scan: scan, total: total };
};
exports.createCheckout = createCheckout;
