import { View, Text } from "react-native";
import React from "react";
import FlexBox from "@/components/ui/flexbox";
import ProfileCard from "@/components/functional/profile-card";
import Title from "@/components/ui/title";

const Profile = () => {
  return (
    <FlexBox flex={1} padding={20} gap={20} backgroundColor={"white"}>
      <Title
        title="Profile"
        caption="View and manage your profile information"
      />
      <ProfileCard />
    </FlexBox>
  );
};

export default Profile;
