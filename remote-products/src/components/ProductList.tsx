import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useVirtualizerList} from "@/hooks/useVirtualizerList.ts";
import type {Product} from "@/api.ts";

export const ProductList = ({products}: {products: Product[]}) => {
    const {parentRef, rowVirtualizer, rows} = useVirtualizerList(products);

    return (
        <div
            ref={parentRef}
            style={{
                height: '600px',
                overflow: 'auto',
                width: '100%',
            }}
            className={"border border-primary rounded-md p-4 flex justify-center"}
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
                            <div className="flex justify-between gap-2 px-4 py-2">
                                {rowProducts.map((product) => (
                                    <div key={product.id} className="flex-1 min-w-0">
                                        <Card className="h-full rounded-md bg-card">
                                            <CardHeader>
                                                <CardTitle className="text-base">{product.name}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="text-sm flex-1">{product.description}</CardContent>
                                            <CardFooter className="justify-end">
                                                <Button size="sm">Add to Cart</Button>
                                            </CardFooter>
                                        </Card>
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