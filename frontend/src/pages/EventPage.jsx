import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import API from "../axios";
import { Switch } from "@headlessui/react";
import { useForm } from "react-hook-form";
import BouqetEmail from "../components/event/BouqetEmail";
import DriverEmail from "../components/event/DriverEmail";

function EventPage() {
  const { register } = useForm();
  const params = useParams();
  const [cookies] = useCookies(["user"]);
  const evId = params.evId;

  const { data: event } = useQuery({
    queryKey: ["event"],
    queryFn: async () => {
      const res = await API.get(`events/${evId}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      return res.data;
    },
  });

  return (
    <>
      {event?.drivers?.length || event?.bouquet_makers?.length ? (
        <>
          <div className="flex gap-x-4 justify-around">
            {/* // FIRST TABLE // */}
            {event?.bouquet_makers?.length ? (
              <div>
                <div className="border-r-2 border-r-slate-100 border-l-2 border-l-slate-100">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                      <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">
                          Bouqet Makers
                        </h1>
                        <p className="mt-2 text-sm text-gray-700">
                          Bouqet maker for his event
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flow-root overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <table className="w-full text-left">
                        <thead className="bg-white">
                          <tr>
                            <th
                              scope="col"
                              className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                            >
                              Name
                              <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                              <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                            </th>
                            <th
                              scope="col"
                              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                            >
                              Phone
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-0"
                            >
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {event?.bouquet_makers?.map((person) => (
                            <tr key={person.email} className="">
                              <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                                {person.first_name} {person.last_name}
                                <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                              </td>
                              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                {person.email}
                              </td>
                              <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                                {person.phone}
                              </td>
                              <td className="flex items-center h-14 gap-x-2">
                                <p className="text-slate-300">Check</p>
                                <Switch
                                  name="role"
                                  value="bouquet_maker"
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
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <BouqetEmail event={event} evId={evId} token={cookies.token} />
              </div>
            ) : (
              <p className="text-center">No bouqet makers yet 😔</p>
            )}

            {/* // SECOND TABLE // */}
            {event?.drivers?.length ? (
              <div>
                <div className="border-r-2 border-r-slate-100 border-l-2 border-l-slate-100 ">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                      <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">
                          Drivers
                        </h1>
                        <p className="mt-2 text-sm text-gray-700">
                          Drivers for this event
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flow-root overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <table className="w-full text-left">
                        <thead className="bg-white">
                          <tr>
                            <th
                              scope="col"
                              className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                            >
                              Name
                              <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                              <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                            </th>
                            <th
                              scope="col"
                              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                            >
                              Phone
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {event?.drivers?.map((driver) => (
                            <tr key={driver.email}>
                              <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                                {driver.first_name} {driver.last_name}
                                <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                              </td>
                              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                {driver.email}
                              </td>
                              <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                                {driver.phone}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <DriverEmail event={event} evId={evId} token={cookies.token} />
              </div>
            ) : (
              <p>No drivers yet 😔</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-2xl text-center mt-24 ">
          There are no volunteers yet 😔
        </p>
      )}
    </>
  );
}

export default EventPage;
