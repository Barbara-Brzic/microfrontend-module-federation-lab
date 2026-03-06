import { Card, CardHeader, CardTitle, CardContent } from 'ui/Card'
import { Button } from 'ui/Button'
import { Popover, PopoverTrigger, PopoverContent } from 'ui/Popover'
import { useState } from 'react'

export function UIShowcase() {
  const [count, setCount] = useState(0)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">UI Component Library</h2>
        <p className="text-gray-600">
          Shared components from{' '}
          <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">remote-ui</span>{' '}
          microfrontend
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Button Component</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-700">Variants</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-700">Sizes</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">🚀</Button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-700">States</h4>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>
                  Disabled Outline
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-700">Interactive Example</h4>
              <div className="flex items-center gap-3">
                <Button onClick={() => setCount(count - 1)} variant="outline">
                  -
                </Button>
                <span className="font-mono font-bold text-xl min-w-[3ch] text-center">{count}</span>
                <Button onClick={() => setCount(count + 1)}>+</Button>
                <Button onClick={() => setCount(0)} variant="secondary" size="sm">
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card Component</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Simple Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  This is a basic card with a header and content.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-300 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-base text-blue-900">Styled Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-700">
                  Cards can be customized with Tailwind classes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-300 bg-green-50">
              <CardHeader>
                <CardTitle className="text-base text-green-900">Another Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-700">
                  Flexible and reusable across all microfrontends.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Popover Component</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Popovers display floating content anchored to a trigger element.
            </p>

            <div className="flex flex-wrap gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Popover Content</h4>
                    <p className="text-sm text-gray-600">
                      This is a popover. It can contain any content you want, including forms,
                      lists, or actions.
                    </p>
                    <Button size="sm" className="w-full">
                      Action
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button>With Actions</Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Duplicate
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-red-600">
                      Delete
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">About Shared Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-blue-800">
            <p>
              <strong>Module Federation Benefit:</strong> These components are loaded from the{' '}
              <code className="bg-blue-100 px-1.5 py-0.5 rounded">remote-ui</code> microfrontend at
              runtime.
            </p>
            <p>
              <strong>Single Source of Truth:</strong> All microfrontends (except orders) use the
              same component instances, ensuring UI consistency.
            </p>
            <p>
              <strong>Independent Updates:</strong> The UI library can be updated independently
              without redeploying consuming applications.
            </p>
            <p>
              <strong>Shared in this demo:</strong> Button, Card, Popover, Toast, and more.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
