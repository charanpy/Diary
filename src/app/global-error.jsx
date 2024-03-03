"use server";
import NotFound from "@/components/shared/NotFound";

const GlobalError = () => {
  return <NotFound type="error" />;
};

export default GlobalError;
