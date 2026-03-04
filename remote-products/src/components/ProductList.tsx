import {useVirtualizerList} from "@/hooks/useVirtualizerList.ts";
import type {Product} from "@/api.ts";

interface ProductListProps {
    products: Product[]
    renderProduct: (product: Product) => React.ReactNode
}

export const ProductList = ({products, renderProduct}: ProductListProps) => {
    const {parentRef, rowVirtualizer, rows} = useVirtualizerList(products);

    if (products.length === 0) {
        return <div className="text-center text-muted-foreground">No products found</div>
    }

    return (
        <div
            ref={parentRef}
            style={{
                height: '600px',
                overflow: 'auto',
                width: '100%',
            }}
            className={"border border-primary rounded-md p-4 flex justify-center bg-secondary"}
        >
            <div
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                }}
            >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const rowProducts = rows[virtualRow.index]
                    return (
                        <div
                            key={virtualRow.key}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                            className={"p-6"}
                        >
                            <div className="flex justify-between gap-6 px-4 py-2">
                                {rowProducts.map((product) => (
                                    <div key={product.id} className="flex-1 min-w-0">
                                        {renderProduct(product)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}