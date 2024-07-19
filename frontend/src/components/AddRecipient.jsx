/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import API from "../axios";
import Loader from "./Loader";
import LabelAndInput from "./LabelAndInput";
function AddRecipientForm({ setOpen, setIsClicked }) {
  const token = window.localStorage.getItem("token");
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: async (obj) => {
      const res = await API.post("recipients/", obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recipients"],
      });
      setIsClicked(false);
      toast.success("Address added!");
    },
    onError: () => {
      toast.error("Oh no, retry :(");
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  if (isPending) return <Loader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12 sm:space-y-16">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            Add the recipients address in the form below
          </p>

          <div className="grid p-10 grid-cols-3 gap-4 mt-10 space-y-8  pb-12">
            <div className="self-end">
              <LabelAndInput
                htmlFor="first_name"
                type="text"
                register={register}
                name="first_name"
              >
                First Name
              </LabelAndInput>
            </div>

            <LabelAndInput
              htmlFor="last_name"
              type="text"
              register={register}
              name="last_name"
            >
              Last Name
            </LabelAndInput>

            <LabelAndInput
              htmlFor="emial"
              type="email"
              register={register}
              name="email"
            >
              Email
            </LabelAndInput>
            <LabelAndInput
              htmlFor="phone"
              type="tel"
              register={register}
              name="phone"
            >
              Phone
            </LabelAndInput>

            <LabelAndInput
              htmlFor="address"
              type="text"
              register={register}
              name="address"
            >
              Street
            </LabelAndInput>

            <LabelAndInput
              htmlFor="city"
              type="text"
              register={register}
              name="city"
            >
              City
            </LabelAndInput>

            <LabelAndInput
              htmlFor="state"
              type="text"
              register={register}
              name="state"
            >
              State
            </LabelAndInput>

            <LabelAndInput
              htmlFor="zip"
              type="text"
              register={register}
              name="zip"
            >
              Zip
            </LabelAndInput>
            <LabelAndInput
              htmlFor="group"
              type="text"
              register={register}
              name="group"
            >
              Group
            </LabelAndInput>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={() => {
            setOpen((prev) => !prev);
            setIsClicked((prev) => !prev);
          }}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button className="inline-flex justify-center rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddRecipientForm;
