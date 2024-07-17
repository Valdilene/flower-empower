import { useForm } from "react-hook-form";
import LabelAndInput from "../components/LabelAndInput";

function ForgotPassword() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-2/4 flex-col items-center gap-14">
        <h2 className=" text-3xl">FORGOT PASSWORD</h2>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <LabelAndInput
              htmlFor="email"
              type="text"
              register={register}
              name="email"
            >
              Email address
            </LabelAndInput>

            <div>
              <button className="flex w-full justify-center rounded-md bg-pink-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-600 ">
                SEND CODE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
