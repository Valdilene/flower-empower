import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import LabelAndInput from "../components/LabelAndInput";
import API from "../axios.js";

function RegistrationValidation() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (obj) => {
      const res = await API.post("registration/validation/", obj);

      return res.data;
    },
    onSuccess: () => navigate("/login"),
  });

  function onSubmit(data) {
    mutate(data);
  }

  if (isPending) return <Loader />;

  return (
    <>
      <div className="flex flex-col h-full items-center justify-start pt-16">
        <h2 className="bg-slate-150 mt-14 w-fit  text-3xl">
          REGISTRATION VALIDATION
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 grid w-full grid-cols-3  gap-x-4 space-y-6"
        >
          <div className="w-full place-self-end justify-self-start">
            <LabelAndInput
              htmlFor="email"
              type="text"
              register={register}
              name="email"
              isRequired={true}
            >
              Email *
            </LabelAndInput>
          </div>
          <LabelAndInput
            htmlFor="code"
            type="text"
            register={register}
            name="code"
          >
            Code *
          </LabelAndInput>
          <LabelAndInput
            htmlFor="first_name"
            type="text"
            register={register}
            name="first_name"
          >
            First Name *
          </LabelAndInput>
          <LabelAndInput
            htmlFor="last_name"
            type="text"
            register={register}
            name="last_name"
          >
            Last name *
          </LabelAndInput>

          <LabelAndInput
            htmlFor="password"
            type="password"
            register={register}
            name="password"
          >
            Password *
          </LabelAndInput>
          <LabelAndInput
            htmlFor="password_repeat"
            type="password"
            register={register}
            name="password_repeat"
          >
            Password confirm *
          </LabelAndInput>
          <LabelAndInput
            htmlFor="phone"
            type="number"
            register={register}
            name="phone"
          >
            Phone *
          </LabelAndInput>

          {isError ? (
            <p className="text-red-500">
              {error?.response?.data?.non_field_errors ||
                error?.response?.data?.code ||
                error?.response?.data?.email ||
                error?.response?.data?.first_name ||
                error?.response?.data?.last_name ||
                error?.response?.data?.phone}
            </p>
          ) : (
            ""
          )}
          <button className="col-span-3 cursor-pointer place-self-center justify-self-center rounded-xl bg-pink-500 px-8 py-2 text-white hover:bg-pink-600">
            {isPending ? "Finishing Registration..." : "Finish Registration"}
          </button>
        </form>
      </div>
    </>
  );
}

export default RegistrationValidation;
