import { useForm } from "react-hook-form";
import LabelAndInput from "../components/LabelAndInput";

function NewPassword() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="flex flex-col items-center justify-center pt-48">
      <h2 className=" text-3xl">SET NEW PASSWORD</h2>

      <form className="mt-10 grid w-1/3 grid-cols-2 gap-x-4 space-y-6">
        <div className="w-full place-self-end justify-self-start">
          <LabelAndInput
            htmlFor="email"
            type="email"
            register={register}
            name="email"
          >
            Email address
          </LabelAndInput>
        </div>

        <LabelAndInput
          htmlFor="code"
          type="text"
          register={register}
          name="code"
        >
          Validation Code
        </LabelAndInput>
        <LabelAndInput
          htmlFor="password"
          type="password"
          register={register}
          name="password"
        >
          New password
        </LabelAndInput>

        <LabelAndInput
          htmlFor="password_repeat"
          type="password"
          register={register}
          name="password_repeat"
        >
          New Password repeat
        </LabelAndInput>

        <div className="col-span-2 place-self-center justify-self-center">
          <button className="flex w-full justify-center rounded-md bg-pink-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
            SEND CODE
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewPassword;
