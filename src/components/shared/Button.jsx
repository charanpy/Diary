"use client";

import { useFormStatus } from "react-dom";

const Button = () => {
  const { pending } = useFormStatus();
  return (
    <button className="p-4 bg-green-500 rounded-sm my-4" disabled={pending}>
      {pending ? "SUBMITTING" : "SUBMIT"}
    </button>
  );
};

export default Button;
