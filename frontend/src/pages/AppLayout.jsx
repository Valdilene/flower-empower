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
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Avatar from "../assets/img/avatar.jpeg";
import { useCookies } from "react-cookie";

const user = {
  name: "Emir Murati",
  email: "email@example.com",
  imageUrl: `${Avatar}`,
};

function AppLayout() {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies(["user"]);
  const token = cookies.token;
  const is_superuser = cookies.issuperuser;

  function handleLogout() {
    removeCookie("issuperuser");
    removeCookie("token");
    navigate("/login");
    window.location.reload();
  }

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className=" border-b-2 border-b-#A8A8A8 py-2">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4 gap-12">
                    <NavLink
                      to="/"
                      className="text-slate-500 hover:text-slate-800 hover:border-b-2 hover:border-b-slate-400     py-2 px-4"
                    >
                      Home
                    </NavLink>
                    {token ? (
                      <>
                        <NavLink
                          to="/events"
                          className="text-slate-500 hover:text-slate-800 hover:border-b-2 hover:border-b-slate-400 py-2 px-4"
                        >
                          Events
                        </NavLink>
                        {is_superuser ? (
                          <>
                            <NavLink
                              to="/recipients"
                              className="text-slate-500 hover:text-slate-800 hover:border-b-2 hover:border-b-slate-400 py-2 px-4"
                            >
                              Recipients
                            </NavLink>
                            <NavLink
                              to="/volunteers"
                              className="text-slate-500 hover:text-slate-800 hover:border-b-2 hover:border-b-slate-400  py-2 px-4"
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
                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-[#e48dde] text-sm ">
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
                        {token ? (
                          <>
                            <MenuItem>
                              <button
                                onClick={() => handleLogout()}
                                className="block w-full text-start px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                              >
                                Logout
                              </button>
                            </MenuItem>
                          </>
                        ) : null}
                      </MenuItems>
                    </Menu>
                  ) : null}
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-[#e48dde] p-2 text-white hover:bg-[#d973d2]">
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
                className="text-slate-700 pl-4 hover:bg-[#e48dde] py-2 hover:text-white"
                as="a"
                href="/"
              >
                Home
              </DisclosureButton>
              {token ? (
                <>
                  <DisclosureButton
                    className="text-slate-700 pl-4 hover:bg-[#e48dde] hover:text-white  py-2"
                    as="a"
                    href="events"
                  >
                    Events
                  </DisclosureButton>
                  {is_superuser ? (
                    <>
                      <DisclosureButton
                        className="text-slate-700 pl-4 hover:bg-[#e48dde] py-2 hover:text-white"
                        as="a"
                        href="/addresses"
                      >
                        Addresses
                      </DisclosureButton>
                      <DisclosureButton
                        className="text-slate-700 pl-4 hover:bg-[#e48dde] py-2 hover:text-white"
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
                <div className="border-t border-t-slate-200 px-4 py-3">
                  <DisclosureButton
                    onClick={() => handleLogout()}
                    as="a"
                    className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-slate-500 hover:bg-[#e48dde] hover:text-white"
                  >
                    Logout
                  </DisclosureButton>
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
