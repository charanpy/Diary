"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import PrivatePassword from "../private-password/PrivatePassword";
import Input from "../shared/Input";
import ConditionalRender from "../util/ConditionalRender";
import useAddThoughts from "./useAddThoughts";
import { quillFormats, quillModules } from "@/lib/quill";

const QuillEditor = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

QuillEditor.displayName = "QuillEditor";

const AddThoughts = ({ userId, user }) => {
  const [
    titleRef,
    contentRef,
    isPrivatePasswordEnabled,
    handleIsPrivate,
    isSecretConfigured,
    handleSubmit,
    loading,
  ] = useAddThoughts(user);
  return (
    <div className="flex flex-col md:w-3/4 w-full">
      <Input name="Title" ref={titleRef} />
      <label className="block my-4 capitalize text-sm font-medium text-gray-900 dark:text-white">
        Content
      </label>
      <div className="h-96">
        <QuillEditor
          modules={quillModules}
          formats={quillFormats}
          className="dark:text-slate-300 text-lg h-4/5 z-10"
          forwardedRef={contentRef}
        />
      </div>
      <div className="flex flex-row flex-wrap justify-end items-center">
        <input
          type="checkbox"
          id="public"
          defaultValue={isPrivatePasswordEnabled.value}
          onChange={handleIsPrivate}
          checked={isPrivatePasswordEnabled.value}
        />{" "}
        <label className="ml-2 block my-4 capitalize text-sm font-medium text-gray-900 dark:text-white">
          Is Private
        </label>
      </div>
      <ConditionalRender
        canRender={isPrivatePasswordEnabled.popup && !isSecretConfigured}
      >
        <PrivatePassword onClose={handleIsPrivate} userId={userId} />
      </ConditionalRender>
      <div className="flex flex-row flex-wrap justify-center">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-green-500 w-full md:w-52 p-1 text-center rounded-lg cursor-pointer"
        >
          {loading ? "SUBMITTING..." : "SUBMIT"}
        </button>
      </div>
    </div>
  );
};

export default AddThoughts;
