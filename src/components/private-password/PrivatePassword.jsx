import { useFormState } from "react-dom";
import { storePrivatePassword } from "@/action";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ConditionalRender from "../util/ConditionalRender";
import { useEffect } from "react";

const PrivatePassword = ({ onClose, userId }) => {
  const [state, formAction] = useFormState(storePrivatePassword, {
    userId,
    error: "",
    success: false,
  });

  useEffect(() => {
    if (state?.success) {
      onClose(null, { popup: false, value: true });
    }
  }, [state.success]);
  return (
    <section
      className="fixed top-0 left-0 w-full h-full z-20 flex flex-col justify-center items-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="w-full md:w-1/4 bg-slate-200 rounded-lg">
        <div className="p-4 flex flex-row flex-wrap justify-between border-b border-slate-300">
          <h1 className="text-slate-800 text-lg">Set Private Password</h1>
          <XMarkIcon
            className="w-5 h-5 text-red-600 cursor-pointer"
            role="button"
            onClick={() => onClose(null, { popup: false })}
          />
        </div>
        <form className="flex flex-col p-4" action={formAction}>
          <label className="mb-2 text-slate-600 text-md">Password</label>
          <input
            className="mb-4 outline-none bg-gray-100 border w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            type="password"
            name="password"
          />
          <ConditionalRender canRender={state?.error}>
            <p className="mb-2 text-red-500 text-md">{state?.error}</p>
          </ConditionalRender>
          <button className="bg-green-500 mb-2 cursor-pointer rounded-sm w-full text-white">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default PrivatePassword;
