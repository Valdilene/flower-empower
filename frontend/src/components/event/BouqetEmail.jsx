/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../axios";
import Loader from "../Loader";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function BouqetEmail({ event, evId, token }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (obj) => {
      const res = await API.post(`events/sendbouquetemail/${evId}/`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
    onSuccess: async (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["event"],
      });

      toast.success(`Emails to bouqet makers sent successfully!`);
    },
    onError: () => {
      toast.error("Oh no, retry :(");
    },
  });

  function onSubmit(data) {
    console.log(data);
    mutate({
      ...data,
      body: `Hello thank you for volunteering, here is a link to watch before coming to the event. It's a little tutorial on how to make the bouqet https://www.youtube.com/watch?v=ytF7e8YuUyo`,
      subject: "Bouqet Tutorial",
    });
  }
  if (isPending) return <Loader />;
  return (
    <>
      {event?.closed ? null : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center mt-12">
            <button
              disabled={isPending}
              className="bg-green-500 py-2 px-4 text-white rounded-xl hover:bg-green-600 hover:scale-95"
            >
              SEND BOUQUET EMAILS
            </button>
            <input
              type="hidden"
              value="Bouqet Tutorial"
              name="subject"
              {...register("subject")}
            />
            <input
              type="hidden"
              value="Hello thank you for volunteering, here is a link to watch before coming to the event. It's a little tutorial on how to make the bouqet"
              name="body"
              {...register("body")}
            />
          </div>
        </form>
      )}
    </>
  );
}

export default BouqetEmail;
