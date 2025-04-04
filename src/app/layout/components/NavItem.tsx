import { JSX } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NavItemProps } from '../type/INavItemProps'

const NavItem = ({ path, menu, icon, children }: NavItemProps): JSX.Element => {
  const ICON_PATH = '/image/icon/'

  const { pathname } = useLocation()
  const active = pathname === path

  return (
    <Link to={path}>
      <div className="flex h-[45px] w-[35px] flex-col items-center justify-between">
        {children ? children : <img src={active ? `${ICON_PATH + icon}-fill.svg` : `${ICON_PATH + icon}.svg`} alt={menu} />}
        {menu && <div className={`text-xs font-light ${active ? 'text-gray-dark' : 'text-gray-medium-dark'}`}>{menu}</div>}
      </div>
    </Link>
  )
}

export default NavItem
