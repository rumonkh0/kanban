import { Link } from "react-router";

export default function DropdownMenu({
  isOpen,
  onClose,
  menuItems = [],
  className,
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Menu */}
      <div
        className={`absolute z-50 min-w-[200px] rounded-lg bg-surface2 shadow-lg border border-text2 ${
          className || "right-full top-0 mr-1"
        }`}
      >
        {menuItems.map((item, index) => {
          const content = (
            <span
              className={`w-full block px-4 py-2.5 text-center typo-b3 rounded-lg hover:bg-brand hover:text-text transition-colors text-text2 cursor-pointer`}
            >
              {item.label}
            </span>
          );

          if (item.href) {
            return (
              <Link
                key={index}
                to={item.href}
                onClick={onClose}
                className="block"
              >
                {content}
              </Link>
            );
          }

          return (
            <div
              key={index}
              onClick={() => {
                item.onClick?.();
                onClose();
              }}
              className="w-full"
            >
              {content}
            </div>
          );
        })}
      </div>
    </>
  );
}
