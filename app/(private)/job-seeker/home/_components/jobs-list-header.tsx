import { View, Text } from "react-native";
import React from "react";
import { PRIMARY_COLOR } from "@/constants";
import CustomText from "@/components/ui/custom-text";
import CustomInput from "@/components/ui/custom-input";

const JobsListHeader = () => {
  return (
    <View
      style={{
        backgroundColor: PRIMARY_COLOR,
        paddingHorizontal: 30,
        paddingVertical: 50,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <CustomText
        value="Find your dream job"
        fontColor="white"
        fontSize={25}
        fontWeight="bold"
      />
      <CustomInput placeholder="Search" label={""} errorMessage={""} />
    </View>
  );
};

export default JobsListHeader;
