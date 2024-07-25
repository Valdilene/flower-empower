import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import API from "../axios";

function EventPage() {
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
            <div className="border-r-2 border-r-slate-100 border-l-2 border-l-slate-100">
              <div>
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
                        </tr>
                      </thead>
                      <tbody>
                        {event?.bouquet_makers?.map((person) => (
                          <tr key={person.email}>
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* // SECOND TABLE // */}
            <div className="border-r-2 border-r-slate-100 border-l-2 border-l-slate-100 ">
              <div>
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
            </div>
          </div>
          {event?.closed ? null : (
            <div className="flex justify-center mt-12">
              <button className="bg-pink-500 py-2 px-4 text-white rounded-xl hover:bg-pink-600 hover:scale-95">
                SEND EMAILS
              </button>
            </div>
          )}
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
