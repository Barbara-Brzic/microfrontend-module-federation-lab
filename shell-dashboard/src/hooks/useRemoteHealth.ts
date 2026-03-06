import { useState, useEffect } from 'react'

export interface RemoteConfig {
  name: string
  displayName: string
  url: string
  color: string
}

export interface RemoteHealth {
  name: string
  displayName: string
  status: 'online' | 'offline' | 'checking'
  responseTime?: number
  lastChecked?: Date
  color: string
}

const REMOTES: RemoteConfig[] = [
  {
    name: 'products',
    displayName: 'Products',
    url: 'http://localhost:3001/assets/remoteEntry.js',
    color: 'blue',
  },
  {
    name: 'orders',
    displayName: 'Orders',
    url: 'http://localhost:3002/assets/remoteEntry.js',
    color: 'purple',
  },
  {
    name: 'ui',
    displayName: 'UI Components',
    url: 'http://localhost:3003/assets/remoteEntry.js',
    color: 'green',
  },
]

async function checkRemoteHealth(remote: RemoteConfig): Promise<RemoteHealth> {
  const startTime = performance.now()

  try {
    const response = await fetch(remote.url, {
      method: 'HEAD',
      cache: 'no-cache',
    })

    const responseTime = Math.round(performance.now() - startTime)

    return {
      name: remote.name,
      displayName: remote.displayName,
      status: response.ok ? 'online' : 'offline',
      responseTime,
      lastChecked: new Date(),
      color: remote.color,
    }
  } catch {
    return {
      name: remote.name,
      displayName: remote.displayName,
      status: 'offline',
      responseTime: undefined,
      lastChecked: new Date(),
      color: remote.color,
    }
  }
}

export function useRemoteHealth(autoRefresh = false, refreshInterval = 30000) {
  const [health, setHealth] = useState<RemoteHealth[]>(
    REMOTES.map(r => ({
      name: r.name,
      displayName: r.displayName,
      status: 'checking' as const,
      color: r.color,
    }))
  )
  const [isChecking, setIsChecking] = useState(false)

  const checkHealth = async () => {
    setIsChecking(true)

    const results = await Promise.all(REMOTES.map(remote => checkRemoteHealth(remote)))

    setHealth(results)
    setIsChecking(false)
  }

  useEffect(() => {
    checkHealth()

    if (autoRefresh) {
      const interval = setInterval(checkHealth, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [autoRefresh, refreshInterval])

  return { health, isChecking, checkHealth }
}
