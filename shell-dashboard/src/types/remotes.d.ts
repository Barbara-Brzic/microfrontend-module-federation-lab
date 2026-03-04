declare module 'ui/Button' {
  import * as React from 'react'

  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    asChild?: boolean
  }

  export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>
}

declare module 'ui/Card' {
  import * as React from 'react'

  export const Card: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >

  export const CardHeader: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >

  export const CardTitle: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >

  export const CardDescription: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >

  export const CardContent: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >

  export const CardFooter: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >
}

declare module 'ui/Spinner' {
  import * as React from 'react'

  export interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
  }

  export const Spinner: React.FC<SpinnerProps>
}

declare module 'ui/Input' {
  import * as React from 'react'

  export const Input: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<'input'> & React.RefAttributes<HTMLInputElement>
  >
}

declare module 'ui/Label' {
  import * as React from 'react'

  export const Label: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<'label'> & React.RefAttributes<HTMLLabelElement>
  >
}

declare module 'ui/Field' {
  import * as React from 'react'

  export interface FieldProps extends React.ComponentPropsWithoutRef<'div'> {
    orientation?: 'vertical' | 'horizontal' | 'responsive'
  }

  export const Field: React.FC<FieldProps>
  export const FieldLabel: React.FC<React.ComponentPropsWithoutRef<'label'>>
  export const FieldDescription: React.FC<React.ComponentPropsWithoutRef<'p'>>
  export const FieldError: React.FC<React.ComponentPropsWithoutRef<'div'> & {
    errors?: Array<{ message?: string } | undefined>
  }>
  export const FieldGroup: React.FC<React.ComponentPropsWithoutRef<'div'>>
  export const FieldLegend: React.FC<React.ComponentPropsWithoutRef<'legend'> & { variant?: 'legend' | 'label' }>
  export const FieldSeparator: React.FC<React.ComponentPropsWithoutRef<'div'>>
  export const FieldSet: React.FC<React.ComponentPropsWithoutRef<'fieldset'>>
  export const FieldContent: React.FC<React.ComponentPropsWithoutRef<'div'>>
  export const FieldTitle: React.FC<React.ComponentPropsWithoutRef<'div'>>
}

declare module 'ui/Toast' {
  import * as React from 'react'

  export const Toaster: React.FC

  export interface ToastProps {
    title?: React.ReactNode
    description?: React.ReactNode
    variant?: 'default' | 'destructive'
  }

  export function toast(props: ToastProps): {
    id: string
    dismiss: () => void
    update: (props: ToastProps) => void
  }

  export function useToast(): {
    toast: typeof toast
    dismiss: (toastId?: string) => void
    toasts: Array<ToastProps & { id: string }>
  }
}
