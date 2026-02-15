import ProfileCard from "@/components/functional/profile-card";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Alert, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const JobSeekerHomepage = () => {
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
      <ProfileCard />
    </SafeAreaView>
  );
};

export default JobSeekerHomepage;
