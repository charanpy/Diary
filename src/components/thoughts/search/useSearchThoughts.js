import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const { useRef, useState } = require("react");
const { toast } = require("react-toastify");

const useSearchThoughts = () => {
  const supabase = createClientComponentClient();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const isPrivateRef = useRef();
  const [searchResults, setSearchResults] = useState({
    loading: false,
    data: [],
    isSearchTriggered: false,
  });

  const handleSubmit = async (e) => {
    try {
      e?.preventDefault();
      setSearchResults((prev) => ({
        ...prev,
        loading: true,
        isSearchTriggered: true,
      }));

      let startDate = startDateRef?.current?.value;
      let endDate = endDateRef?.current?.value;
      const isPrivate = isPrivateRef?.current?.checked;

      if (!(startDate && endDate)) {
        return toast.error("Invalid filters");
      }

      startDate = new Date(startDate).toISOString();
      endDate = new Date(endDate).toISOString();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data } = await supabase
        .from("thoughts")
        .select()
        .eq("user_id", user.id)
        .eq("is_private", isPrivate)
        .lte("created_at", endDate)
        .gte("created_at", startDate);

      setSearchResults((prev) => ({
        ...prev,
        loading: false,
        data: data || [],
      }));
    } catch (error) {
    } finally {
      setSearchResults((prev) => ({ ...prev, loading: false }));
    }
  };

  return [startDateRef, endDateRef, isPrivateRef, searchResults, handleSubmit];
};

export default useSearchThoughts;
