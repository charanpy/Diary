import Profile from "@/components/profile/Profile";
import { getUser } from "@/lib/supabase";

const ProfilePage = async () => {
  const data = await getUser();

  return <Profile user={data?.[0]} />;
};

export default ProfilePage;
