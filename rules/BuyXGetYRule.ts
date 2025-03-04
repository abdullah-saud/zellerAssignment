/**
 * Applies a "Buy X Get Y" discount rule to a shopping cart.
 *
 * @param sku - The SKU of the product to which the rule applies.
 * @param buyQuantity - The quantity of the product that must be bought to qualify for the discount.
 * @param payQuantity - The quantity of the product that must be paid for when the discount is applied.
 * @returns A function that calculates the discounted price for the specified product in the cart.
 *
 * The returned function takes two parameters:
 * @param cart - A record of product SKUs to their quantities in the shopping cart.
 * @param products - A record of product SKUs to their product details.
 * @returns An object containing the SKU and the calculated price after applying the discount.
 */

import { ProductType } from "../models/Product";

export const buyXGetYRule = (sku: string, buyQuantity: number, payQuantity: number) => {
    // if (!sku || !buyQuantity || !payQuantity) return 0;

    return (cart: Record<string, number>, products: Record<string, ProductType>) : {sku: string; price: number} => {
        if (!cart[sku]) return { sku, price: 0 };

        const quantity = cart[sku];
        const product = products[sku];

        const fullPriceCount = Math.floor(quantity / buyQuantity) * payQuantity;
        const remainingCount = quantity % buyQuantity;
        return { sku, price: (fullPriceCount + remainingCount) * product.price};
    };
};
