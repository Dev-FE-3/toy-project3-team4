import { JSX } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NavItemProps } from '../type/INavItemProps'

const NavItem = ({ path, menu, icon: Icon, children }: NavItemProps): JSX.Element => {
  const { pathname } = useLocation()
  const active = pathname === path

  return (
    <Link to={path}>
      <div className="flex w-[35px] flex-col items-center justify-between gap-[2px]">
        {Icon && <Icon size={24} className={`${active ? 'text-gray-dark' : 'text-gray-medium-dark'}`} strokeWidth={active ? 2 : 1.5} />}
        {children && children}
        {menu && <div className={`text-xs font-light ${active ? 'text-gray-dark' : 'text-gray-medium-dark'}`}>{menu}</div>}
      </div>
    </Link>
  )
}

export default NavItem
