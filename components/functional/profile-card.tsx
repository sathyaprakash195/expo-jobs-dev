import { PRIMARY_COLOR } from "@/constants";
import { logoutUser } from "@/services/users";
import { IUsersStore, useUsersStore } from "@/store/users-store";
import { useRouter } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";
import CustomButton from "../ui/custom-button";
import CustomText from "../ui/custom-text";
import FlexBox from "../ui/flexbox";
import { View } from "react-native";
import { capitalize } from "lodash";
import dayjs from "dayjs";
import { Divider } from "react-native-paper";

const ProfileCard = () => {
  const { user } = useUsersStore() as IUsersStore;
  if (!user) return null;
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
      style={{
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "#8d8d8d",
        borderWidth: 1,
        gap: 20,
      }}
    >
      <FlexBox gap={10} justifyContent="center" alignItems="center">
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: PRIMARY_COLOR,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomText
            fontColor="white"
            fontSize={25}
            fontWeight="bold"
            value={user.name[0]}
          />
        </View>
        <CustomText
          fontSize={18}
          fontWeight="bold"
          value={user.name}
          fontColor={PRIMARY_COLOR}
        />
        <View
          style={{
            borderRadius: 10,
            backgroundColor: PRIMARY_COLOR,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <CustomText
            fontColor="white"
            fontSize={14}
            fontWeight="600"
            value={capitalize(user.role.replace("_", " "))}
          />
        </View>
      </FlexBox>

      <Divider style={{ backgroundColor: "#8d8d8d", marginVertical: 10 }} />

      <FlexBox flexDirection="row" justifyContent="space-between">
        <CustomText fontSize={16} value={`Email`} />
        <CustomText fontSize={16} value={user.email} />
      </FlexBox>

      <FlexBox flexDirection="row" justifyContent="space-between">
        <CustomText fontSize={16} value={`Account Created At`} />
        <CustomText
          fontSize={16}
          value={dayjs(user.created_at).format("MMM DD , YYYY")}
        />
      </FlexBox>
      <CustomButton
        mode="outlined"
        onPress={() => {
          router.push("/job-seeker/edit-profile");
        }}
      >
        Edit Profile
      </CustomButton>
      <CustomButton onPress={handleLogout}>Logout</CustomButton>
    </FlexBox>
  );
};

export default ProfileCard;
