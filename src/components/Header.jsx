import Icon from "./Icon";
import { usePageTitleStore } from "@/stores/usePageTitleStore";

function Header({ onMenuClick }) {
  const title = usePageTitleStore((state) => state.title);

  return (
    <div className="flex justify-between items-center h-16 py-2 mx-2 rounded-lg bg-surface2 border-2 border-divider">
      {/* Mobile menu button - only visible on mobile */}
      <button
        onClick={onMenuClick}
        className="lg:hidden ml-4 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-divider"
      >
        <Icon name="menu" size={24} />
      </button>

      {/* Title */}
      <div className="ml-4 typo-h4 text-text truncate flex-shrink">{title}</div>

      {/* Right side actions */}
      <div className="flex items-center space-x-2 md:space-x-4 mr-2 md:mr-4">
        {/* Search bar - hidden on mobile, visible on medium+ screens */}
        <div className="hidden xl:flex w-100 h-12 border-1 border-divider rounded-lg items-center px-3 gap-2">
          <Icon name="search" />
          <input
            type="text"
            placeholder="Search by project details"
            className="flex-1 typo-b3 text-text2 focus:outline-none placeholder:text-text2 bg-transparent"
          />
        </div>

        {/* Search icon only - visible on mobile, hidden on medium+ */}
        <div className="xl:hidden w-10 h-10 md:w-12 md:h-12 border-1 border-divider rounded-lg flex justify-center items-center">
          <Icon name="search" size={20} />
        </div>

        {/* Plus button - smaller on mobile */}
        <div className="hidden w-10 h-10 md:w-12 md:h-12 border-1 border-divider rounded-lg md:flex justify-center items-center">
          <Icon name="plus" size={20} />
        </div>

        {/* Notification - smaller on mobile */}
        <div className="w-10 h-10 md:w-12 md:h-12 border-1 border-divider rounded-lg flex justify-center items-center">
          <Icon name="notification" size={window.innerWidth < 768 ? 24 : 32} />
        </div>

        {/* Profile section */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full">
            <img
              src="/images/profile.png"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Profile text - hidden on mobile */}
          <div className="hidden md:flex flex-col gap-1">
            <div className="typo-cta">creativezethdesigns</div>
            <div className="typo-b3 text-text2">admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
