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
  console.log(event);

  return <div>event page</div>;
}

export default EventPage;
