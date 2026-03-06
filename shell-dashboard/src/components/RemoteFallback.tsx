interface RemoteFallbackProps {
  remoteName: string
  message?: string
}

export function RemoteFallback({ remoteName, message }: Readonly<RemoteFallbackProps>) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8 bg-gray-50 rounded-lg m-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-2">Remote Unavailable</h2>
        <p className="text-gray-600 mb-2">
          The <span className="font-mono font-semibold">{remoteName}</span> module failed to load.
        </p>
        {message && <p className="text-sm text-gray-500 mb-4">{message}</p>}
        <div className="text-sm text-gray-500 bg-white p-4 rounded border">
          <p className="font-medium mb-2">This could be because:</p>
          <ul className="text-left list-disc list-inside space-y-1">
            <li>The remote server is offline</li>
            <li>Network connection issue</li>
            <li>Version mismatch</li>
          </ul>
        </div>
        <button
          onClick={() => globalThis.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export function ProductsFallback() {
  return (
    <RemoteFallback remoteName="remote-products" message="Products are temporarily unavailable." />
  )
}

export function OrdersFallback() {
  return <RemoteFallback remoteName="remote-orders" message="Orders are temporarily unavailable." />
}
