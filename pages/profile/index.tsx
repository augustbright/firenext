import { UsersOnly } from "../../components/users-only";
import useUserData from "../../hooks/use-user-data";

import { UserProfile } from "../../components/user-profile";

const Profile = () => {
  const { user } = useUserData();
  return <UsersOnly>{user && <UserProfile user={user} />}</UsersOnly>;
};

export default Profile;
