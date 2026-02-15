import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FlexBox from "@/components/ui/flexbox";
import Title from "@/components/ui/title";
import JobForm from "@/components/ui/job-form";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { IJob } from "@/interfaces";
import { getJobById } from "@/services/jobs";

const EditJobPage = () => {
  const [jobData, setJobData] = React.useState<IJob | null>(null);
  const params = useLocalSearchParams();
  const jobId = params.id;
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchJobData = async () => {
    try {
      setLoading(true);
      const response = await getJobById(parseInt(jobId as string));
      setJobData(response.data);
    } catch (err) {
      setError("Failed to fetch job data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchJobData();
    }
  }, [jobId]);

  if (loading) {
    return (
      <FlexBox flex={1} justifyContent="center" alignItems="center">
        <Text>Loading...</Text>
      </FlexBox>
    );
  }

  if (error) {
    return (
      <FlexBox flex={1} justifyContent="center" alignItems="center">
        <Text>{error}</Text>
      </FlexBox>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <FlexBox padding={20} gap={20} backgroundColor={"white"}>
            <Title title="Edit Job" caption="Update your job posting details" />
            <JobForm formType="edit" initialValues={jobData} />
          </FlexBox>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditJobPage;
