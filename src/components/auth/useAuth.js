import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const useAuth = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const toggleLogin = () => {
    setIsLogin((login) => !login);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef?.current?.value;
    const username = usernameRef?.current?.value;
    const password = passwordRef?.current?.value;
    return isLogin
      ? handleLogin(email, password)
      : handleRegister(email, username, password);
  };

  const handleLogin = async (email, password) => {
    if (!(email && password)) {
      return toast.error("Please fill all fields");
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return toast.error(error?.message);
    }
    toast.success("LoggedIn successfully");
    router.replace("/");
  };

  const handleRegister = async (email, username, password) => {
    if (!(email && password && username)) {
      return toast.error("Please fill all fields");
    }
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      return toast.error(error?.message);
    }

    await associateProfileToUser(username, email, data.user.id);
    toast.success("Account created successfully");
    router.replace("/");
  };

  const associateProfileToUser = async (username, email, id) => {
    await supabase.from("profiles").insert({ id, username, email });
  };

  return [
    isLogin,
    toggleLogin,
    emailRef,
    usernameRef,
    passwordRef,
    handleSubmit,
  ];
};

export default useAuth;
