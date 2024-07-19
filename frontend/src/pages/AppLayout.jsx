/* eslint-disable react/prop-types */
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Avatar from "../assets/img/avatar.jpeg";
import Logo from "../assets/img/logoFlower.webp";
import { useQuery } from "@tanstack/react-query";
import API from "../axios";

const user = {
  name: "Emir Murati",
  email: "email@example.com",
  imageUrl: `${Avatar}`,
};

function AppLayout({ token }) {
  const { data: userMe } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await API.get("user/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const is_superuser = res.data.is_superuser;
      window.localStorage.setItem("is_superuser", `${is_superuser}`);

      return res.data;
    },
  });

  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.clear();

    navigate("/login");
    window.location.reload();
  }

  return (
    <>
      <div className="min-h-full">
        <Disclosure
          as="nav"
          className="bg-#D8D8D8 border-b-2 border-b-#A8A8A8 py-2"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img alt="Your Company" src={Logo} className="h-10 w-10" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4 gap-12">
                    <NavLink
                      to="/"
                      className="text-slate-600 hover:bg-pink-500 hover:text-white  py-2 px-4"
                    >
                      Home
                    </NavLink>
                    {token ? (
                      <>
                        <NavLink
                          to="/events"
                          className="text-slate-600 hover:bg-pink-500 hover:text-white py-2 px-4"
                        >
                          Events
                        </NavLink>
                        {userMe?.is_superuser ? (
                          <>
                            <NavLink
                              to="/addresses"
                              className="text-slate-600 hover:bg-pink-500  hover:text-white py-2 px-4"
                            >
                              Addresses
                            </NavLink>
                            <NavLink
                              to="/volunteers"
                              className="text-slate-600 hover:bg-pink-500 hover:text-white py-2 px-4 "
                            >
                              Volunteers
                            </NavLink>
                          </>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  {token ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-pink-500 text-sm ">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            alt=""
                            src={user.imageUrl}
                            className="h-8 w-8 rounded-full"
                          />
                        </MenuButton>
                      </div>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <MenuItem>
                          <Link
                            to="profile"
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                          >
                            Your Profile
                          </Link>
                        </MenuItem>
                        {token ? (
                          <MenuItem>
                            <button
                              onClick={() => handleLogout()}
                              className="block w-full text-start px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                            >
                              Logout
                            </button>
                          </MenuItem>
                        ) : null}
                      </MenuItems>
                    </Menu>
                  ) : null}
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-pink-500 p-2 text-white hover:bg-pink-700">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 flex flex-col gap-y-4">
              <DisclosureButton
                className="text-slate-700 pl-4 hover:bg-pink-500 py-2 hover:text-white"
                as="a"
                href="/"
              >
                Home
              </DisclosureButton>
              {token ? (
                <>
                  <DisclosureButton
                    className="text-slate-700 pl-4 hover:bg-pink-500 hover:text-white  py-2"
                    as="a"
                    href="events"
                  >
                    Events
                  </DisclosureButton>
                  {userMe?.is_superuser ? (
                    <>
                      <DisclosureButton
                        className="text-slate-700 pl-4 hover:bg-pink-500 py-2 hover:text-white"
                        as="a"
                        href="/addresses"
                      >
                        Addresses
                      </DisclosureButton>
                      <DisclosureButton
                        className="text-slate-700 pl-4 hover:bg-pink-500 py-2 hover:text-white"
                        as="a"
                        href="volunteers"
                      >
                        Volunteers
                      </DisclosureButton>{" "}
                    </>
                  ) : null}
                </>
              ) : null}
            </div>
            {token ? (
              <>
                <div className="border-t border-white pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        alt=""
                        src={user.imageUrl}
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-slate-700">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-slate-700">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <DisclosureButton
                      as="a"
                      href="/profile"
                      className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-pink-500 hover:text-white"
                    >
                      Your Profile
                    </DisclosureButton>
                    <DisclosureButton
                      onClick={() => handleLogout()}
                      as="a"
                      className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-pink-500 hover:text-white"
                    >
                      Sign Out
                    </DisclosureButton>
                  </div>
                </div>
              </>
            ) : null}
          </DisclosurePanel>
        </Disclosure>

        <main>
          <div className="h-screen mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

export default AppLayout;
