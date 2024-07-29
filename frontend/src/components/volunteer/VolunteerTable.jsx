/* eslint-disable react/prop-types */
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import API from "../../axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import { useCookies } from "react-cookie";
import VolunteerDeleteModal from "./VolunteerDeleteModal";
import VolunteerEditModal from "./VolunteerEditModal";

function VolunteerTable() {
  const [cookies] = useCookies(["user"]);
  const [currUser, setCurrUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await API.get("user/", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      return res.data;
    },
  });
  if (isLoading) return <Loader />;
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Volunteers
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the volunteers saved in the database with their
              information.
            </p>
          </div>
        </div>
        {!users?.length ? (
          <p className="text-center mt-24">There are no volunteers yet</p>
        ) : (
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        <a href="#" className="group inline-flex">
                          Name
                          <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="h-5 w-5"
                            />
                          </span>
                        </a>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <a href="#" className="group inline-flex">
                          Email
                          <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="h-5 w-5"
                            />
                          </span>
                        </a>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <a href="#" className="group inline-flex">
                          Phone
                          <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                            />
                          </span>
                        </a>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <a href="#" className="group inline-flex">
                          Hours
                          <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                            />
                          </span>
                        </a>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <a href="#" className="group inline-flex">
                          Preferred comunication
                          <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                            />
                          </span>
                        </a>
                      </th>

                      <th scope="col" className="relative py-3.5 pl-3 pr-0">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users
                      ?.filter((user) => user.is_superuser != true)
                      .map((user) => (
                        <tr key={user.email}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {user.first_name} {user.last_name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.phone}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.hours}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.preferred_communication === "none"
                              ? "Not specified yet"
                              : user.preferred_communication}
                          </td>

                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                            <div className="flex gap-x-2">
                              <button
                                onClick={() => {
                                  setUserId(user.id);
                                  setCurrUser(user);

                                  setEditClicked((prev) => !prev);
                                }}
                                className="text-pink-500"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  setUserId(user.id);
                                  setDeleteClicked((prev) => !prev);
                                }}
                                className="text-white bg-red-500 py-0.5 px-2 rounded-lg"
                              >
                                Delete
                              </button>
                              {deleteClicked && (
                                <VolunteerDeleteModal
                                  setDeleteClicked={setDeleteClicked}
                                  userId={userId}
                                />
                              )}
                              {editClicked && (
                                <VolunteerEditModal
                                  setEditClicked={setEditClicked}
                                  userId={userId}
                                  currUser={currUser}
                                />
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default VolunteerTable;
