"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyXGetYRule = void 0;
var buyXGetYRule = function (sku, buyQuantity, payQuantity) {
    if (!sku || !buyQuantity || !payQuantity)
        return 0;
    return function (cart, products) {
        if (!cart[sku])
            return { sku: sku, price: 0 };
        var quantity = cart[sku];
        var product = products[sku];
        var fullPriceCount = Math.floor(quantity / buyQuantity) * payQuantity;
        var remainingCount = quantity % buyQuantity;
        return { sku: sku, price: (fullPriceCount + remainingCount) * product.price };
    };
};
exports.buyXGetYRule = buyXGetYRule;
