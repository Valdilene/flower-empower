/* eslint-disable react/prop-types */
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import API from "../../axios";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import ModalEvent from "./ModalEvent";
import ModalEventDelete from "./ModalEventDelete";
import { Switch } from "@headlessui/react";
import EditEventModal from "./EditEventModal";
import DriverModal from "./driver/DriverModal";
import BouquetMakerModal from "./bouquetMaker/BouquetMakerModal.jsx";

function EventTable() {
  const [cookies] = useCookies(["user"]);
  const [enabledDriver, setEnabledDriver] = useState(false);
  const [enabledBouqet, setEnabledBouqet] = useState(false);
  const [currEvent, setCurrEvent] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  console.log(enabledBouqet);
  const {
    data: events,

    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await API.get("events/", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      return res.data;
    },
  });
  console.log(error);
  // if (isLoading) return <Loader />;
  return (
    <>
      {isClicked && <ModalEvent setIsClicked={setIsClicked} />}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Events
            </h1>
          </div>
          {cookies.issuperuser ? (
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                onClick={() => setIsClicked((prev) => !prev)}
                type="button"
                className="block rounded-md bg-pink-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create event
              </button>
            </div>
          ) : null}
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table
                className={`${
                  cookies.issuperuser ? "min-w-full" : "min-w-full"
                } divide-y
                divide-gray-300`}
              >
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      <a href="#" className="group inline-flex">
                        Date
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="h-5 w-5"
                          />
                        </span>
                      </a>
                    </th>
                    {cookies.issuperuser ? (
                      <>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          <a href="#" className="group inline-flex">
                            Bouquet makers needed
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
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          <a href="#" className="group inline-flex">
                            Drivers needed
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
                            Group
                            <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                              <ChevronDownIcon
                                aria-hidden="true"
                                className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                              />
                            </span>
                          </a>
                        </th>{" "}
                      </>
                    ) : null}

                    <th scope="col" className="relative py-3.5 pl-3 pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {events?.map((event) => (
                    <tr key={event.date}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {event.date}
                      </td>
                      {cookies.issuperuser ? (
                        <>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {event.bouquet_makers_needed}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {event.drivers_needed}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {event.group}
                          </td>
                        </>
                      ) : null}

                      {cookies.issuperuser ? (
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                          <div className="flex gap-x-2">
                            <button
                              onClick={() => {
                                setEventId(event.id);
                                setCurrEvent(event);

                                setEditClicked((prev) => !prev);
                              }}
                              className="text-pink-500"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setEventId(event.id);
                                setDeleteClicked((prev) => !prev);
                              }}
                              className="text-white bg-red-500 py-0.5 px-2 rounded-lg"
                            >
                              Delete
                            </button>
                            {deleteClicked && (
                              <ModalEventDelete
                                setDeleteClicked={setDeleteClicked}
                                eventId={eventId}
                              />
                            )}
                            {editClicked && (
                              <EditEventModal
                                setEditClicked={setEditClicked}
                                eventId={eventId}
                                currEvent={currEvent}
                              />
                            )}
                          </div>
                        </td>
                      ) : (
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                          <div className="flex gap-x-2 justify-end">
                            <div className="flex gap-x-2">
                              <p className="text-green-500">Bouqet maker</p>
                              <Switch
                                onClick={() => {
                                  setEventId(event.id);
                                  setCurrEvent(event);
                                  setEnabledDriver(false);
                                }}
                                // checked={enabledBouqet}
                                onChange={setEnabledBouqet}
                                className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                              >
                                <span className="sr-only">Use setting</span>
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute h-full w-full rounded-md bg-white"
                                />
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out group-data-[checked]:bg-indigo-600"
                                />
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                />
                              </Switch>
                            </div>
                            <div className="flex gap-x-2">
                              <p className="text-blue-500">Driver</p>

                              <Switch
                                // checked={enabledDriver}
                                onClick={() => {
                                  setEventId(event.id);
                                  setCurrEvent(event);
                                  setEnabledBouqet(false);
                                }}
                                onChange={setEnabledDriver}
                                className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                              >
                                <span className="sr-only">Use setting</span>
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute h-full w-full rounded-md bg-white"
                                />
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out group-data-[checked]:bg-indigo-600"
                                />
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                />
                              </Switch>
                            </div>
                            {/* <button
                              onClick={() => {
                                setEventId(event.id);
                                setCurrEvent(event);

                                setDriverClicked((prev) => !prev);
                              }}
                              className="text-white bg-blue-500 py-0.5 px-2 rounded-lg"
                            >
                              Driver
                            </button> */}
                            {/* <button
                              onClick={() => {
                                setEventId(event.id);
                                setBouquetClicked((prev) => !prev);
                              }}
                              className="text-white bg-green-500 py-0.5 px-2 rounded-lg"
                            >
                              Boquet Maker
                            </button> */}
                            {enabledDriver && (
                              <DriverModal
                                setEnabledBouqet={setEnabledBouqet}
                                setEnabledDriver={setEnabledDriver}
                                eventId={eventId}
                                currEvent={currEvent}
                              />
                            )}
                            {enabledBouqet && (
                              <BouquetMakerModal
                                setEnabledBouqet={setEnabledBouqet}
                                setEnabledDriver={setEnabledDriver}
                                eventId={eventId}
                                currEvent={currEvent}
                              />
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventTable;
