export type Product = { id: number, name: string, description: string };

export const getProducts = () : Promise<Product[]> => {
    const products: Product[] = new Array(1000)
        .fill(0)
        .map((_, i) =>
            ({ id: i +1 , name: `Product ${i+1}`, description: "Lorem ipsum dolor sit amet"}))

    return new Promise(resolve => setTimeout(() => resolve(products), 1000));
}