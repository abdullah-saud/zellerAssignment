

/**
 * @file Product.ts
 * @description This file defines the ProductType type and a collection of products with their respective details.
 */

/**
 * @typedef {Object} ProductType
 * @property {string} name - The name of the product.
 * @property {number} price - The price of the product.
 */

export type ProductType = {
    name: string;
    price: number;
};

/**
 * @constant {Record<string, ProductType>} products
 * @description A collection of products where each key is a product code and the value is an object containing the product's name and price.
 */

export const products : Record<string, ProductType> = {
    ipd: { name: "Super iPad", price: 549.99 },
    mbp: { name: "MacBook Pro", price: 1399.99 },
    atv: { name: "Apple TV", price: 109.50 },
    vga: { name: "VGA adapter", price: 30.00 }
};