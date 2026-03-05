import { useRef } from 'react'

export const useDebounce = (callback: (args: any) => void, delay: number) => {
  const timeoutId = useRef<number | null>(null)

  return function (...args: any[]) {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    // @ts-ignore
    timeoutId.current = setTimeout(() => callback(...args), delay)
  }
}
