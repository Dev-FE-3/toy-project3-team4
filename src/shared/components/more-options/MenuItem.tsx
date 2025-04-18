import MenuItem from './type/IMenuItem'

const MenuItemButton = ({ item, onClose }: { item: MenuItem; onClose: () => void }) => (
  <li>
    <button
      onClick={() => {
        item.onClick()
        onClose()
      }}
      className="flex w-full items-center gap-[10px] px-4 py-2 text-sm hover:bg-gray-light"
    >
      {item.icon}
      {item.label}
    </button>
  </li>
)

export default MenuItemButton
