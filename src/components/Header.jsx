import React, { useState, useRef, useEffect } from "react";
import Icon, { Hambrger, LogOut, Notification, People, Settings } from "./Icon";
import { usePageTitleStore } from "@/stores/usePageTitleStore";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";
const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";
const Header = React.memo(({ onMenuClick }) => {
  const title = usePageTitleStore((state) => state.title);
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openPlus, setOpenPlus] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openMobileSearch, setOpenMobileSearch] = useState(false);
  const [searchType, setSearchType] = useState("project");

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const plusRef = useRef(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const role = user?.role;
  const userName = user?.user?.name;
  const profilePicture = user?.user?.profilePicture;

  const photo =
    (profilePicture?.filePath && `${baseURL}/${profilePicture.filePath}`) ||
    "/images/profile.png";

  // Mock notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New task assigned to you", time: "5 min ago", read: false },
    {
      id: 2,
      text: "Project deadline approaching",
      time: "1 hour ago",
      read: false,
    },
    { id: 3, text: "Client message received", time: "2 hours ago", read: true },
    {
      id: 4,
      text: "Payment received from client",
      time: "Yesterday",
      read: false,
    },
    {
      id: 5,
      text: "Team member completed task",
      time: "2 days ago",
      read: true,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleLogout = () => {
    console.log("zero");
    logout();
    console.log("one");
    setOpenProfile(false);
    console.log("two");
    navigate("/login", { replace: true });
    console.log("three");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setOpenNotification(false);
      }
      if (plusRef.current && !plusRef.current.contains(e.target)) {
        setOpenPlus(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setOpenSearch(false);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target)
      ) {
        setOpenMobileSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex justify-between items-center h-12 md:h-16 py-1 md:py-2 mx-2 rounded-lg bg-surface2 border-2 border-divider">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden ml-2 md:ml-4 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg hover:bg-divider cursor-pointer"
      >
        {/* <Icon name="menu" size={20} /> */}
        <Hambrger />
      </button>

      {/* Title */}
      <div className="ml-2 md:ml-4 typo-h4 text-text truncate flex-shrink">
        {title}
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-1 md:space-x-4 mr-2 md:mr-4">
        {/* Search bar - Desktop */}
        <div className="hidden xl:flex relative" ref={searchRef}>
          <div className="w-60 md:w-100 h-10 md:h-12 border-1 border-divider rounded-lg flex items-center px-2 md:px-3 gap-2">
            <Icon name="search" size={18} />
            <input
              type="text"
              placeholder={`Search by ${searchType} details`}
              onFocus={() => setOpenSearch(true)}
              className="flex-1 typo-b3 text-text2 focus:outline-none placeholder:text-text2 bg-transparent"
            />
          </div>

          {/* Search Type Dropdown */}
          {openSearch && (
            <div className="absolute top-full left-0 mt-1 w-full bg-surface2 border border-divider rounded-lg shadow-lg z-50 overflow-hidden">
              <div
                onClick={() => {
                  setSearchType("project");
                  setOpenSearch(false);
                }}
                className="px-4 py-2 hover:bg-divider cursor-pointer typo-b3"
              >
                Search Projects
              </div>
              <div
                onClick={() => {
                  setSearchType("member");
                  setOpenSearch(false);
                }}
                className="px-4 py-2 hover:bg-divider cursor-pointer typo-b3"
              >
                Search Members
              </div>
              <div
                onClick={() => {
                  setSearchType("client");
                  setOpenSearch(false);
                }}
                className="px-4 py-2 hover:bg-divider cursor-pointer typo-b3"
              >
                Search Clients
              </div>
            </div>
          )}
        </div>

        {/* Search icon - Mobile with dropdown */}
        <div className="xl:hidden relative" ref={mobileSearchRef}>
          <div
            onClick={() => setOpenMobileSearch(!openMobileSearch)}
            className="w-8 h-8 md:w-10 md:h-10 border-1 border-divider rounded-lg flex justify-center items-center cursor-pointer hover:bg-divider"
          >
            <Icon name="search" size={18} />
          </div>

          {/* Mobile Search Dropdown */}
          {openMobileSearch && (
            <div className="absolute top-full right-0 mt-1 w-64 bg-surface2 border border-divider rounded-lg shadow-lg z-50 p-3">
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder={`Search by ${searchType} details`}
                  className="w-full h-10 bg-surface border border-divider rounded-lg px-3 typo-b3 text-text focus:outline-none focus:ring-2 focus:ring-brand"
                />
                <div className="flex flex-col gap-1 border-t border-divider pt-2">
                  <div
                    onClick={() => {
                      setSearchType("project");
                    }}
                    className={`px-3 py-2 rounded cursor-pointer typo-b3 ${
                      searchType === "project"
                        ? "bg-brand text-white"
                        : "hover:bg-divider"
                    }`}
                  >
                    Search Projects
                  </div>
                  <div
                    onClick={() => {
                      setSearchType("member");
                    }}
                    className={`px-3 py-2 rounded cursor-pointer typo-b3 ${
                      searchType === "member"
                        ? "bg-brand text-white"
                        : "hover:bg-divider"
                    }`}
                  >
                    Search Members
                  </div>
                  <div
                    onClick={() => {
                      setSearchType("client");
                    }}
                    className={`px-3 py-2 rounded cursor-pointer typo-b3 ${
                      searchType === "client"
                        ? "bg-brand text-white"
                        : "hover:bg-divider"
                    }`}
                  >
                    Search Clients
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Plus button with dropdown */}
        <div className="hidden md:flex relative" ref={plusRef}>
          <div
            onClick={() => setOpenPlus(!openPlus)}
            className="w-10 h-10 md:w-12 md:h-12 border-1 border-divider rounded-lg flex justify-center items-center cursor-pointer hover:bg-divider"
          >
            <Icon name="plus" size={18} />
          </div>

          {/* Plus Dropdown */}
          {openPlus && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-surface2 border border-divider rounded-lg shadow-lg z-50 overflow-hidden">
              <Link
                to="/clients/add"
                onClick={() => setOpenPlus(false)}
                className="px-4 py-3 hover:bg-divider cursor-pointer typo-b2 flex items-center gap-2 border-b border-divider"
              >
                <People className={`text-text2`} />
                Add Client
              </Link>
              <Link
                to="/hr/team-members/add"
                onClick={() => setOpenPlus(false)}
                className="px-4 py-3 hover:bg-divider cursor-pointer typo-b2 flex items-center gap-2 border-b border-divider"
              >
                {/* <Icon name="people" size={16} /> */}
                <People className={`text-text2`} />
                Add Member
              </Link>
              <Link
                to="/projects/add"
                onClick={() => setOpenPlus(false)}
                className="px-4 py-3 hover:bg-divider cursor-pointer typo-b2 flex items-center gap-2"
              >
                <People className={`text-text2`} />
                Add Project
              </Link>
            </div>
          )}
        </div>

        {/* Notification with dropdown */}
        <div className="relative" ref={notificationRef}>
          <div
            onClick={() => setOpenNotification(!openNotification)}
            className="w-8 h-8 md:w-12 md:h-12 border-1 border-divider rounded-lg flex justify-center items-center cursor-pointer hover:bg-divider relative"
          >
            <Notification
              className={`text-text w-5 md:w-8 hover:text-brand relative`}
            />
            {unreadCount > 0 && (
              <span className="absolute top-0.25 right-0.75 md:border-3 md:border-surface2 w-3 h-3 md:w-5 md:h-5 bg-brand rounded-full flex items-center justify-center text-white text-[8px] md:text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </div>

          {/* Notification Dropdown */}
          {openNotification && (
            <div className="absolute top-full right-0 mt-1 w-72 md:w-80 bg-surface2 border border-divider rounded-lg shadow-lg z-50">
              <div className="p-3 border-b border-divider flex justify-between items-center">
                <span className="typo-b2 text-text">Notifications</span>
                <button
                  onClick={markAllAsRead}
                  className="typo-b3 text-brand hover:underline"
                >
                  Mark all as read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 border-b border-divider hover:bg-divider cursor-pointer ${
                      !notif.read ? "bg-divider/30" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-brand mt-1.5 flex-shrink-0"></div>
                      )}
                      <div className="flex-1">
                        <p className="typo-b2 text-text">{notif.text}</p>
                        <p className="typo-b3 text-text2 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile with dropdown */}
        <div className="relative md:min-w-40" ref={profileRef}>
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-1 md:gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 md:w-12 md:h-12 overflow-hidden aspect-square rounded-full">
              <img
                src={photo}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Profile text - Desktop only */}
            <div className="hidden md:flex flex-col gap-0.5 md:gap-1">
              <div className="typo-cta">{userName}</div>
              <div className="typo-b3 text-text2">{role}</div>
            </div>
          </div>

          {/* Profile Dropdown */}
          {openProfile && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-surface2 border border-divider rounded-lg shadow-lg z-50 overflow-hidden">
              <Link
                to="/settings/profile"
                // onClick={handleLogout}
                className="px-4 py-3 hover:bg-divider cursor-pointer text-text2 typo-b2 flex items-center gap-2 border-b border-divider group"
              >
                {/* <Icon name="settings" size={16} /> */}
                <Settings className={`text-text2 group-hover:text-brand `} />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 hover:bg-divider cursor-pointer typo-b2 flex items-center gap-2 text-brand group"
              >
                <LogOut className={`w-5`} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Header;
