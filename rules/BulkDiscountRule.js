"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkDiscountRule = void 0;
var bulkDiscountRule = function (sku, minQuantity, discountedPrice) {
    if (!sku || !minQuantity || !discountedPrice)
        return 0; // ✅ Return `null` if input is invalid
    return function (cart, products) {
        if (!cart[sku])
            return { sku: sku, price: 0 };
        var quantity = cart[sku];
        var product = products[sku];
        var unitPrice = quantity >= minQuantity ? discountedPrice : product.price;
        return { sku: sku, price: quantity * unitPrice };
    };
};
exports.bulkDiscountRule = bulkDiscountRule;
