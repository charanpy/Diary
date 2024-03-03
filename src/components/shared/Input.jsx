import { forwardRef } from "react";

const Input = forwardRef(
  (
    { name, placeholder, required = true, type = "text", ...otherProps },
    ref
  ) => {
    return (
      <>
        <label
          htmlFor={name}
          className="block mb-2 capitalize text-sm font-medium text-gray-900 dark:text-white"
        >
          {name}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required={required}
          ref={ref}
          {...otherProps}
        />
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;
