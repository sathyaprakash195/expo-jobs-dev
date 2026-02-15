import ProfileCard from "@/components/functional/profile-card";
import FlexBox from "@/components/ui/flexbox";
import Title from "@/components/ui/title";
import React from "react";

const Profile = () => {
  return (
    <FlexBox gap={5} padding={20} flex={1}>
      <Title
        title="Profile"
        caption="View and manage your profile information"
      />
      <ProfileCard />
    </FlexBox>
  );
};

export default Profile;
