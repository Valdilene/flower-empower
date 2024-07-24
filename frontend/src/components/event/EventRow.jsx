import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Switch } from "@headlessui/react";
import API from "../../axios";
import toast from "react-hot-toast";
import ModalEventDelete from "./ModalEventDelete";
import EditEventModal from "./EditEventModal";

/* eslint-disable react/prop-types */
function EventRow({ event, user }) {
  const navigate = useNavigate();
  const [isBoquet, setIsBoquet] = useState(
    event?.bouquet_makers.includes(user?.id)
  );
  const [isDriver, setIsDriver] = useState(event?.drivers.includes(user?.id));
  console.log(isBoquet);
  const [cookies] = useCookies(["user"]);
  const [role, setRole] = useState("");
  const [eventId, setEventId] = useState(null);
  const [currEvent, setCurrEvent] = useState(null);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);

  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (obj) => {
      const res = await API.patch(
        `events/toggle-participation/${eventId}/`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      console.log(res.data);

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });

      toast.success(`Toggle completed`);
    },
    onError: () => {
      toast.error("Oh no, retry :(");
    },
  });
  // console.log(events);

  function onSubmit(data) {
    console.log({ ...data, role });
    mutate({ ...data, role });
  }
  function handleEventClick(id) {
    navigate(`/events/${id}`, {
      replace: true,
    });
  }

  return (
    <>
      <tr
        onClick={() => handleEventClick(event.id)}
        key={event.date}
        className="cursor-pointer hover:bg-slate-100"
      >
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
              <form className="flex gap-x-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-x-2">
                  <p className="text-green-500">Bouqet maker</p>

                  <Switch
                    checked={isBoquet}
                    name="role"
                    value="bouquet_maker"
                    onChange={() => {}}
                    onClick={() => {
                      setRole("bouquet_maker");
                      setEventId(event.id);
                      setIsBoquet((prev) => !prev);
                      if (isDriver) setIsDriver(false);
                    }}
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
                    <input
                      type="hidden"
                      name="role"
                      value="bouquet_maker"
                      {...register("role")}
                    />
                  </Switch>
                </div>
                <div className="flex gap-x-2">
                  <p className="text-blue-500">Driver</p>

                  <Switch
                    name="role"
                    value="driver"
                    checked={isDriver}
                    onChange={() => {}}
                    onClick={() => {
                      setRole("driver");
                      setEventId(event.id);
                      setIsDriver((prev) => !prev);
                      if (isBoquet) setIsBoquet(false);
                    }}
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
                    <input type="hidden" name="role" {...register("role")} />
                  </Switch>
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-pink-500  text-white py-0.5 px-2 hover:bg-pink-600 rounded-xl"
                      type="submit"
                    >
                      SAVE
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </td>
        )}
      </tr>
    </>
  );
}

export default EventRow;
