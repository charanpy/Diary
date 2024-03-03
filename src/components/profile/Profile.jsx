import ConditionalRender from "../util/ConditionalRender";
import Input from "../shared/Input";
import Avatar from "./Avatar";

const Profile = ({ user }) => {
  return (
    <ConditionalRender canRender={user}>
      <section className="mainContainer flex flex-col items-center justify-center leading-10">
        <Avatar avatar={user?.avatar_url} userId={user?.id} />
        <div className="w-60 my-5">
          <Input defaultValue={user?.username} name="username" disabled />
        </div>
        <div className="w-60 my-5">
          <Input defaultValue={user?.email} name="email" disabled />
        </div>
        <form action="/auth/signout" method="post">
          <button className="w-60 bg-red-400 text-slate-200 my-5 rounded-md">
            Signout
          </button>
        </form>
      </section>
    </ConditionalRender>
  );
};

export default Profile;
