import Cryptr from "cryptr";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useRef, useState, useEffect, startTransition } from "react";
import { addThought } from "@/action";

const useAddThoughts = (user) => {
  const titleRef = useRef();
  const contentRef = useRef();
  const [isPrivateSecretEnabled, setIsPrivateSecretEnabled] = useState(false);
  const [canShowPrivatePassword, setCanShowPrivatePassword] = useState({
    popup: false,
    value: false,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (user?.private_password) {
      !isPrivateSecretEnabled && setIsPrivateSecretEnabled(true);
    }
  }, []);

  const handleIsPrivate = (e, state) => {
    if (!e) {
      setCanShowPrivatePassword((prev) => ({
        ...prev,
        popup: !!state?.popup,
        value: !!state?.value,
      }));
      if (state?.value) {
        setIsPrivateSecretEnabled(true);
      }
      return;
    }
    const checked = e?.target?.checked;
    setCanShowPrivatePassword((prev) => ({
      ...prev,
      popup: checked,
      value: checked && !isPrivateSecretEnabled ? false : checked,
    }));
  };

  const hanleSubmit = async () => {
    debugger;
    try {
      setLoading((prev) => !prev);
      const title = titleRef?.current?.value;
      const content = contentRef?.current?.value;

      if (!title || !content) {
        return toast.error("Please fill all fields");
      }
      const cryptr = new Cryptr(process.env.NEXT_PUBLIC_CLIENT_SECRET, {
        saltLength: 10,
      });
      const encryptedString = canShowPrivatePassword.value
        ? cryptr.encrypt(content)
        : content;
      const data = await addThought({
        title,
        content: encryptedString,
        isPrivate: canShowPrivatePassword.value,
      });

      if (data?.error) {
        toast.error(data?.error);
        return;
      }
      toast.success("Added Successfully");
      router.push(canShowPrivatePassword.value ? "/" : "/feeds");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      debugger;

      setLoading(false);
    }
  };
  return [
    titleRef,
    contentRef,
    canShowPrivatePassword,
    handleIsPrivate,
    isPrivateSecretEnabled,
    hanleSubmit,
    loading,
  ];
};

export default useAddThoughts;
