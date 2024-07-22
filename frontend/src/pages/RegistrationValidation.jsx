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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12 sm:space-y-16">
          <div>
            <div className="flex justify-center">
              <h2 className="bg-slate-150 mt-14 w-fit  text-3xl text-center">
                REGISTRATION VALIDATION
              </h2>
            </div>

            <div className="grid p-10 lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 gap-4 mt-10 space-y-8  pb-12">
              <div className="self-end">
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
                pattern="\b[2-9][0-9]{2} [2-9][0-9]{2} [0-9]{4}\b"
                placeholder="555 235 7832"
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
              <button className="cursor-pointer place-self-center justify-self-center rounded-xl bg-pink-500 px-8 py-2 text-white hover:bg-pink-600">
                {isPending
                  ? "Finishing Registration..."
                  : "Finish Registration"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default RegistrationValidation;
