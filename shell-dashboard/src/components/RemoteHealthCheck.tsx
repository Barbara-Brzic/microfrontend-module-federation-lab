import { CheckCircle, XCircle, Loader2, AlertTriangle } from 'lucide-react'
import { useRemoteHealth, type RemoteHealth } from '../hooks/useRemoteHealth'
import { Button } from 'ui/Button'

function StatusBadge({ status }: Readonly<{ status: RemoteHealth['status'] }>) {
  const config = {
    online: {
      icon: CheckCircle,
      className: 'bg-green-100 text-green-800 border-green-300',
    },
    offline: {
      icon: XCircle,
      className: 'bg-red-100 text-red-800 border-red-300',
    },
    checking: {
      icon: Loader2,
      className: 'bg-gray-100 text-gray-800 border-gray-300',
    },
  }

  const { icon: Icon, className } = config[status]
  const isChecking = status === 'checking'

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}
    >
      <Icon className={`w-3 h-3 ${isChecking ? 'animate-spin' : ''}`} />
      {status}
    </span>
  )
}

function SystemStatusMessage({
  onlineCount,
  totalCount,
}: Readonly<{ onlineCount: number; totalCount: number }>) {
  const config = {
    operational: {
      icon: CheckCircle,
      className: 'text-green-600',
      message: 'All systems operational',
    },
    partial: {
      icon: AlertTriangle,
      className: 'text-yellow-600',
      message: 'Partial outage detected',
    },
    major: {
      icon: XCircle,
      className: 'text-red-600',
      message: 'Major outage',
    },
  }

  const statusType =
    onlineCount === totalCount ? 'operational' : onlineCount > 0 ? 'partial' : 'major'

  const { icon: Icon, className, message } = config[statusType]

  return (
    <span className={`${className} font-medium flex items-center gap-1.5`}>
      <Icon className="w-4 h-4" />
      {message}
    </span>
  )
}

function RemoteCard({ remote }: Readonly<{ remote: RemoteHealth }>) {
  const colorConfig = {
    blue: 'border-remote-blue-300 bg-remote-blue-50',
    purple: 'border-remote-purple-300 bg-remote-purple-50',
    green: 'border-remote-green-300 bg-remote-green-50',
  }

  const colorClasses =
    colorConfig[remote.color as keyof typeof colorConfig] || 'border-gray-300 bg-gray-50'

  return (
    <div className={`border-2 ${colorClasses} rounded-lg p-4 transition-all hover:shadow-md`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{remote.displayName}</h3>
        <StatusBadge status={remote.status} />
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="font-medium">Remote:</span>
          <span className="font-mono text-xs">{remote.name}</span>
        </div>

        {remote.responseTime !== undefined && (
          <div className="flex justify-between">
            <span className="font-medium">Response Time:</span>
            <span className="font-mono text-xs">{remote.responseTime}ms</span>
          </div>
        )}

        {remote.lastChecked && (
          <div className="flex justify-between">
            <span className="font-medium">Last Checked:</span>
            <span className="text-xs">{remote.lastChecked.toLocaleTimeString()}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export function RemoteHealthCheck() {
  const { health, isChecking, checkHealth } = useRemoteHealth()

  const onlineCount = health.filter(h => h.status === 'online').length
  const totalCount = health.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Remote Health Status</h2>
          <p className="text-gray-600 mt-1">
            {onlineCount} of {totalCount} microfrontends are online
          </p>
        </div>
        <Button onClick={checkHealth} disabled={isChecking}>
          <Loader2 className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
          {isChecking ? 'Checking...' : 'Refresh'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {health.map(remote => (
          <RemoteCard key={remote.name} remote={remote} />
        ))}
      </div>

      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2">System Status</h3>
        <div className="flex items-center gap-2">
          <SystemStatusMessage onlineCount={onlineCount} totalCount={totalCount} />
        </div>
      </div>
    </div>
  )
}
