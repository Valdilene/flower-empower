import { useForm } from "react-hook-form";
import LabelAndInput from "../components/LabelAndInput";

function RegistrationValidation() {
  const { register, handleSubmit } = useForm();

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-16">
        <h2 className="bg-slate-150 mt-14 w-fit  text-3xl">
          REGISTRATION VALIDATION
        </h2>

        <form className="mt-10 grid w-1/3 grid-cols-2 gap-x-4 space-y-6">
          <div className="w-full place-self-end justify-self-start">
            <LabelAndInput
              htmlFor="email"
              type="text"
              register={register}
              name="email"
              isRequired={true}
            >
              EMAIL
            </LabelAndInput>
          </div>
          <LabelAndInput
            htmlFor="code"
            type="text"
            register={register}
            name="code"
          >
            CODE
          </LabelAndInput>
          <LabelAndInput
            htmlFor="username"
            type="text"
            register={register}
            name="username"
          >
            USERNAME
          </LabelAndInput>
          <LabelAndInput
            htmlFor="location"
            type="text"
            register={register}
            name="location"
          >
            LOCATION
          </LabelAndInput>
          <LabelAndInput
            htmlFor="password"
            type="password"
            register={register}
            name="password"
          >
            PASSWORD
          </LabelAndInput>
          <LabelAndInput
            htmlFor="password_repeat"
            type="password"
            register={register}
            name="password_repeat"
          >
            REPEAT PASSWORD
          </LabelAndInput>
          <LabelAndInput
            htmlFor="first_name"
            type="text"
            register={register}
            name="first_name"
          >
            FIRST NAME
          </LabelAndInput>
          <LabelAndInput
            htmlFor="last_name"
            type="text"
            register={register}
            name="last_name"
          >
            LAST NAME
          </LabelAndInput>

          <button className="col-span-2 cursor-pointer place-self-center justify-self-center rounded-xl bg-pink-500 px-8 py-2 text-white hover:bg-pink-600">
            Finish Registration
          </button>
        </form>
      </div>
    </>
  );
}

export default RegistrationValidation;
