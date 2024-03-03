"use client";

import Input from "../shared/Input";
import ConditionalRender from "../util/ConditionalRender";
import useAuth from "./useAuth";

const LoginForm = () => {
  const [
    isLogin,
    setIsLogin,
    emailRef,
    usernameRef,
    passwordRef,
    handleSubmit,
  ] = useAuth();
  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
          <ConditionalRender canRender={isLogin}>
            Sign in to your account
          </ConditionalRender>
          <ConditionalRender canRender={!isLogin}>
            Create your account
          </ConditionalRender>
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <ConditionalRender canRender={!isLogin}>
            <Input ref={usernameRef} name="username" placeholder="John" />
          </ConditionalRender>
          <Input
            ref={emailRef}
            name="email"
            type="email"
            placeholder="name@company.com"
          />
          <Input
            ref={passwordRef}
            name="password"
            type="password"
            placeholder="******"
          />

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Sign in
          </button>
          <p
            className="text-sm text-center font-light text-gray-500 dark:text-gray-400"
            role="button"
            onClick={setIsLogin}
          >
            <ConditionalRender canRender={isLogin}>
              Don’t have an account yet?{" "}
              <span className="font-medium cursor-pointer text-primary-600 hover:underline dark:text-primary-500">
                Signup
              </span>
            </ConditionalRender>
            <ConditionalRender canRender={!isLogin}>
              Already have an account?{" "}
              <span className="font-medium cursor-pointer text-primary-600 hover:underline dark:text-primary-500">
                Signin
              </span>
            </ConditionalRender>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
