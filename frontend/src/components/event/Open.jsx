/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { CiUnlock } from "react-icons/ci";

function Open({ event, cookies }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (obj) => {
      const res = await API.patch(`events/${event.id}/`, obj, {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      });
      console.log(res.data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });

      toast.success("Event edited!");
    },
    onError: () => {
      toast.error("Oh no, retry :(");
    },
  });
  console.log(error);

  function onSubmit(data) {
    mutate(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button>
        <CiUnlock style={{ fontSize: "24px", cursor: "pointer" }} />
      </button>
      <input
        type="hidden"
        name="closed"
        value="false"
        {...register("closed")}
      />
    </form>
  );
}

export default Open;
