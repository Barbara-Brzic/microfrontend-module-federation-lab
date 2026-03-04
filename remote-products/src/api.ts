export type Product = { id: number, name: string, description: string };

const MOCK_PRODUCTS: Product[] = new Array(1000)
    .fill(0)
    .map((_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        description: "Lorem ipsum dolor sit amet"
    }))

export const getProducts = (): Promise<Product[]> => {
    // Simulate API delay without blocking the main thread
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(MOCK_PRODUCTS);
        }, 300);
    });
}