import React, { useEffect } from "react";
import { BottomNavigation, Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import JobsList from "./_components/jobs-list";
import Reports from "./_components/reports";
import Profile from "./_components/profile";
import { PRIMARY_COLOR } from "@/constants";
import AppliedJobs from "./_components/applied-jobs";
import { useNavigation } from "expo-router";
import { Alert, BackHandler, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const JobSeekerHomepage = () => {
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);
  const tabsArray = [
    { key: "jobs", title: "Jobs", icon: "briefcase" },
    { key: "applications", title: "Applications", icon: "file-document" },
    { key: "reports", title: "Reports", icon: "chart-bar" },
    { key: "profile", title: "Profile", icon: "account" },
  ];

  const renderScene = BottomNavigation.SceneMap({
    jobs: JobsList,
    applications: AppliedJobs,
    reports: Reports,
    profile: Profile,
  });

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
    <View style={{ flex: 1 }}>
      {index !== 0 && <StatusBar style="inverted" />}
      <BottomNavigation
        navigationState={{ index, routes: tabsArray }}
        onTabPress={({ route }) => {
          const newIndex = tabsArray.findIndex((r) => r.key === route.key);
          if (newIndex !== -1) {
            setIndex(newIndex);
          }
        }}
        renderIcon={({ route, color }) => (
          <Icon source={route.icon} size={24} color={color} />
        )}
        getLabelText={({ route }) => route.title}
        renderScene={renderScene}
        onIndexChange={setIndex}
        barStyle={{
          backgroundColor: "#e9e7e7",
          borderTopColor: "#d1d1d1",
          borderTopWidth: 1,
          zIndex: 100,
        }}
        activeColor={PRIMARY_COLOR}
        shifting={true}
        activeIndicatorStyle={{ backgroundColor: "transparent" }}
      />
    </View>
  );
};

export default JobSeekerHomepage;
