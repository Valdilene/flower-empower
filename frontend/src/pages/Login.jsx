import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import LabelAndInput from "../components/LabelAndInput";
import { useMutation } from "@tanstack/react-query";
import API from "../axios.js";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useCookies } from "react-cookie";

function Login() {
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (obj) => {
      const res = await API.post("token/", obj);
      const token = res.data.access;
      const is_superuser = res.data.user.is_superuser;
      setCookie("token", token, { path: "/" });
      setCookie("issuperuser", is_superuser, { path: "/" });

      // window.localStorage.setItem("token", `${token}`);
    },
    onSuccess: () => {
      toast.success("You are logged in!");
      navigate("/");
      window.location.reload();
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
    <>
      <div className="flex min-h-full flex-1 flex-col justify-start px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <LabelAndInput
              htmlFor="email"
              type="text"
              register={register}
              name="email"
            >
              Email address
            </LabelAndInput>
            {isError && (
              <span className="text-red-500">{error?.response.data.email}</span>
            )}

            <LabelAndInput
              htmlFor="password"
              type="password"
              register={register}
              name="password"
            >
              Password
            </LabelAndInput>
            {isError && (
              <span className="text-red-500">
                {error?.response.data.password}
              </span>
            )}

            <div className="text-sm">
              <NavLink
                to="/forgot-password"
                className="font-semibold text-pink-500 hover:text-pink-600"
              >
                Forgot password?
              </NavLink>
            </div>

            {isError ? (
              <p className="text-red-600">{error?.response.data.detail}</p>
            ) : (
              ""
            )}
            <div>
              <button
                disabled={isPending}
                className="flex w-full justify-center rounded-md bg-pink-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
              >
                {isPending ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a volunteer?{" "}
            <NavLink
              to="/signup"
              className="font-semibold leading-6 text-pink-500 hover:text-pink-600"
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
