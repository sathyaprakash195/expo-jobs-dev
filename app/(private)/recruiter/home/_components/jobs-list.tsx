import CustomButton from "@/components/ui/custom-button";
import CustomText from "@/components/ui/custom-text";
import FlexBox from "@/components/ui/flexbox";
import Title from "@/components/ui/title";
import { IJob } from "@/interfaces";
import { getAllJobsOfRecruiter } from "@/services/jobs";
import { IUsersStore, useUsersStore } from "@/store/users-store";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { Icon } from "react-native-paper";
import Jobcard from "./job-card";

const JobsList = () => {
  const [jobs, setJobs] = React.useState<IJob[]>([]);
  const { user } = useUsersStore() as IUsersStore;
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getAllJobsOfRecruiter(
        parseInt(user?.id as string),
      );
      setJobs(response.data);
    } catch (error) {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

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

      {loading ? (
        <FlexBox alignItems="center">
          <CustomText value="Loading jobs..." />
        </FlexBox>
      ) : jobs.length === 0 ? (
        <FlexBox alignItems="center">
          <CustomText value="No jobs found. Create your first job posting!" />
        </FlexBox>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Jobcard job={item} />}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 100 }}
        />
      )}
    </FlexBox>
  );
};

export default JobsList;
