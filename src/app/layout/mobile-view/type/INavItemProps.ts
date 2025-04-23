import { LucideIcon } from 'lucide-react'
import { JSX } from 'react'

export interface NavItemProps {
  path: string
  menu?: string
  icon?: LucideIcon
  children?: JSX.Element
}
