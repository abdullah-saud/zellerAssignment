import { ProductType } from "../models/Product";

/**
 * Applies a bulk discount rule to a given SKU in the cart.
 *
 * @param sku - The SKU of the product to apply the discount to.
 * @param minQuantity - The minimum quantity required to apply the discount.
 * @param discountedPrice - The discounted price to apply if the minimum quantity is met.
 * @returns A function that calculates the total price for the given SKU in the cart.
 *          The returned function takes two parameters:
 *          - `cart`: A record of SKUs and their quantities in the cart.
 *          - `products`: A record of SKUs and their corresponding product details.
 *          The function returns an object containing:
 *          - `sku`: The SKU of the product.
 *          - `price`: The total price for the given SKU in the cart after applying the discount.
 */

export const bulkDiscountRule = (sku: string, minQuantity: number, discountedPrice: number) => {
    // if (!sku || !minQuantity || !discountedPrice) return 0; // Return `null` if input is invalid

    return (cart: Record<string, number>, products: Record<string, ProductType>): {sku: string; price: number} => {
        if (!cart[sku]) return {sku, price: 0 };

        const quantity = cart[sku];
        const product = products[sku];

        const unitPrice = quantity >= minQuantity ? discountedPrice : product.price;
        return {sku, price: quantity * unitPrice };
    };
};
