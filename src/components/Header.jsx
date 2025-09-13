import Icon from "./Icon";
import { usePageTitle } from "../context/PageTitleContext";

function Header() {
  const { title } = usePageTitle();
  return (
    <div className="flex justify-between items-center h-16 py-2 mr-2 rounded-lg bg-surface2 border-2 border-divider">
      <div className="ml-4 typo-h4 text-text">{title}</div>
      <div className="flex items-center space-x-4 mr-4">
        <div className="w-100 h-12 border-1 border-divider rounded-lg flex items-center px-3 gap-2">
          <Icon name="search" />
          <input
            type="text"
            placeholder="Search by project details"
            className="flex-1 typo-b3 text-text2 focus:outline-none placeholder:text-text2"
          />
        </div>
        <div className="w-12 h-12 border-1 border-divider rounded-lg flex justify-center items-center ">
          <Icon name="plus" />
        </div>
        <div className="w-12 h-12 border-1 border-divider rounded-lg flex justify-center items-center ">
          <Icon name="notification" size={32} />
        </div>
        <div className="flex items-center gap-2">
          <img
            src="/images/profile.png"
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <div className="typo-cta">creativezethdesigns</div>
            <div className="typo-b3 text-text2">admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
