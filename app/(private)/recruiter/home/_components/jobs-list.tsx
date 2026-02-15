import CustomButton from "@/components/ui/custom-button";
import FlexBox from "@/components/ui/flexbox";
import Title from "@/components/ui/title";
import { useRouter } from "expo-router";
import React from "react";
import { Icon } from "react-native-paper";

const JobsList = () => {
  const router = useRouter();
  return (
    <FlexBox padding={20}>
      <FlexBox
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Title title="Jobs" caption="View and manage your job postings" />
        <CustomButton
          minWidth
          onPress={() => router.push("/recruiter/add-job")}
        >
          <Icon source="plus" size={20} color="#fff" />
        </CustomButton>
      </FlexBox>
    </FlexBox>
  );
};

export default JobsList;
