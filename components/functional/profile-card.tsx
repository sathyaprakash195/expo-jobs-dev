import { PRIMARY_COLOR } from "@/constants";
import { logoutUser } from "@/services/users";
import { IUsersStore, useUsersStore } from "@/store/users-store";
import { useRouter } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";
import CustomButton from "../ui/custom-button";
import CustomText from "../ui/custom-text";
import FlexBox from "../ui/flexbox";

const ProfileCard = () => {
  const { user } = useUsersStore() as IUsersStore;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      Toast.show({
        type: "success",
        text1: "Logout Successful",
        text2: response.message,
      });
      setTimeout(() => {
        router.push("/(public)/welcome");
      }, 1000);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Logout Failed",
        text2: error.message,
      });
    }
  };
  return (
    <FlexBox
      justifyContent="center"
      alignItems="center"
      flex={1}
      paddingHorizontal={20}
    >
      <CustomText
        value={`Welcome ${user?.name}`}
        fontColor={PRIMARY_COLOR}
        fontWeight="bold"
        fontSize={30}
      />
      <CustomText
        value={`You are logged in as ${user?.role}`}
        fontColor={PRIMARY_COLOR}
        fontSize={18}
      />
      <CustomText
        value={`Email: ${user?.email}`}
        fontColor={PRIMARY_COLOR}
        fontSize={18}
      />
      <CustomButton onPress={handleLogout}>Logout</CustomButton>
    </FlexBox>
  );
};

export default ProfileCard;
