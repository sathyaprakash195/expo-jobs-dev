import CustomButton from "@/components/ui/custom-button";
import CustomText from "@/components/ui/custom-text";
import FlexBox from "@/components/ui/flexbox";
import Title from "@/components/ui/title";
import { IJob } from "@/interfaces";
import { getAllActiveJobs, getAllJobsOfRecruiter } from "@/services/jobs";
import { IUsersStore, useUsersStore } from "@/store/users-store";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { Icon } from "react-native-paper";
import Jobcard from "./job-card";
import JobsListHeader from "./jobs-list-header";

const JobsList = () => {
  const [jobs, setJobs] = React.useState<IJob[]>([]);
  const { user } = useUsersStore() as IUsersStore;
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getAllActiveJobs();
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
    <FlexBox>
      <JobsListHeader />
      <FlexBox padding={20}>
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
    </FlexBox>
  );
};

export default JobsList;
