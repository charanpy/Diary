"use client";

import { useFormState } from "react-dom";
import { sendPassword } from "@/action";
import Input from "@/components/shared/Input";
import ConditionalRender from "@/components/util/ConditionalRender";
import Button from "@/components/shared/Button";

const Password = ({ params }) => {
  const [state, action] = useFormState(sendPassword, {
    error: "",
    id: params.id,
  });
  return (
    <section className="mainContainer flex flex-row flex-wrap items-center justify-center">
      <form className="flex flex-col w-full md:w-96 " action={action}>
        <h1 className="text-slate-700 dark:text-slate-300 text-lg my-4 text-center">
          Secret Password
        </h1>

        <div className="my-4">
          <Input name="password" type="password" />
        </div>
        <ConditionalRender canRender={state?.error}>
          <p className="text-red-500 text-md">{state?.error}</p>
        </ConditionalRender>
        <Button />
      </form>
    </section>
  );
};

export default Password;
