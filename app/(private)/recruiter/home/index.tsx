import React from "react";
import { BottomNavigation, Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import JobsList from "./_components/jobs-list";
import Applications from "./_components/applications";
import Reports from "./_components/reports";
import Profile from "./_components/profile";
import { PRIMARY_COLOR } from "@/constants";

const RecruiterHomepage = () => {
  const [index, setIndex] = React.useState(0);
  const tabsArray = [
    { key: "jobs", title: "Jobs", icon: "briefcase" },
    { key: "applications", title: "Applications", icon: "file-document" },
    { key: "reports", title: "Reports", icon: "chart-bar" },
    { key: "profile", title: "Profile", icon: "account" },
  ];

  const renderScene = BottomNavigation.SceneMap({
    jobs: JobsList,
    applications: Applications,
    reports: Reports,
    profile: Profile,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        }}
        activeColor={PRIMARY_COLOR}
        shifting={true}
        activeIndicatorStyle={{ backgroundColor: "transparent" }}
      />
    </SafeAreaView>
  );
};

export default RecruiterHomepage;
