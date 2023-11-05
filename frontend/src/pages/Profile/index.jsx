import ProfileDetails from "./ProfileDetails";
import Accounts from "./Accounts";
import Groups from "./Groups";
import Friends from "./Friends";

const Profile = () => {
  return (
    <div>
      <ProfileDetails />
      {/* <Friends /> */}
      <Groups />
      <Accounts />
    </div>
  );
};

export default Profile;
