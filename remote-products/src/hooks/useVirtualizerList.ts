import {useRef} from "react";
import type {Product} from "@/api.ts";
import {useVirtualizer} from "@tanstack/react-virtual";

const ITEMS_PER_ROW = 4

export const useVirtualizerList = (products: Product[]) => {
    const parentRef = useRef<HTMLDivElement>(null)

    // Group products into rows
    const rows: Product[][] = []
    for (let i = 0; i < products.length; i += ITEMS_PER_ROW) {
        rows.push(products.slice(i, i + ITEMS_PER_ROW))
    }

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 300,
        overscan: 2,
    })

    return {parentRef, rowVirtualizer, rows};
}