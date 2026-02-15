import CustomButton from "@/components/ui/custom-button";
import CustomText from "@/components/ui/custom-text";
import FlexBox from "@/components/ui/flexbox";
import { PRIMARY_COLOR } from "@/constants";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Alert, BackHandler, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomePage = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = BackHandler.addEventListener("hardwareBackPress", () => {
      if (navigation.isFocused()) {
        Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
      }
      return true;
    });

    return () => backAction.remove();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlexBox flex={1} alignItems="center" justifyContent="center">
        <Image
          source={require("@/assets/images/icon.png")}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
        <CustomText
          fontWeight="bold"
          fontColor={PRIMARY_COLOR}
          fontSize={25}
          value="Expo Jobs"
        />
        <CustomText
          fontColor="#525252"
          value="Find your dream job in the tech industry with Expo Jobs!"
          fontWeight="bold"
        />

        <FlexBox
          style={{
            width: "100%",
          }}
          marginVertical={50}
          paddingHorizontal={20}
          gap={20}
        >
          <CustomButton onPress={() => router.push("/(public)/register")}>
            Get Started
          </CustomButton>
          <CustomButton
            mode="outlined"
            onPress={() => router.push("/(public)/login")}
          >
            Sign In
          </CustomButton>
        </FlexBox>
      </FlexBox>
    </SafeAreaView>
  );
};

export default WelcomePage;
