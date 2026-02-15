import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FlexBox from "@/components/ui/flexbox";
import Title from "@/components/ui/title";
import JobForm from "@/components/ui/job-form";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";

const AddJob = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <FlexBox padding={20} gap={20} backgroundColor={"white"}>
            <Title title="Add Job" caption="Create a new job posting" />
            <JobForm formType="add" />
          </FlexBox>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddJob;
