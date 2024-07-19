import { useForm } from "react-hook-form";
import LabelAndInput from "../components/LabelAndInput";

function ForgotPassword() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="flex flex-col h-full items-center justify-start mt-40">
      <h2 className=" text-3xl">FORGOT PASSWORD</h2>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="mt-10 grid w-full grid-cols-1  gap-x-4 space-y-6">
          <LabelAndInput
            htmlFor="email"
            type="text"
            register={register}
            name="email"
          >
            Email address
          </LabelAndInput>

          <div className="col-span-2 place-self-center justify-self-center">
            <button className=" rounded-md bg-pink-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-600 ">
              SEND CODE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
