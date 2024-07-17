import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import LabelAndInput from "../components/LabelAndInput";

function Registration() {
  const { register, handleSubmit } = useForm();

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <NavLink
              to="/login"
              className="font-semibold leading-6 text-pink-500 hover:text-pink-600"
            >
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}

export default Registration;
