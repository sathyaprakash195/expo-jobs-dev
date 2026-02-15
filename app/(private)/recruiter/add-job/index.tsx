import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FlexBox from "@/components/ui/flexbox";
import Title from "@/components/ui/title";

const AddJob = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlexBox padding={20} gap={20}>
        <Title title="Add Job" caption="Create a new job posting" />
      </FlexBox>
    </SafeAreaView>
  );
};

export default AddJob;
