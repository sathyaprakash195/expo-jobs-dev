import CustomText from "@/components/ui/custom-text";
import FlexBox from "@/components/ui/flexbox";
import Title from "@/components/ui/title";
import { IApplication } from "@/interfaces";
import { getApplicationOfJobSeeker } from "@/services/applications";
import { IUsersStore, useUsersStore } from "@/store/users-store";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { Icon } from "react-native-paper";
import ApplicationCard from "./application-card";

const AppliedJobs = () => {
  const [applications, setApplications] = React.useState<IApplication[]>([]);
  const { user } = useUsersStore() as IUsersStore;
  const [loading, setLoading] = React.useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await getApplicationOfJobSeeker(user?.id as string);
      setApplications(response.data);
    } catch (error) {
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <FlexBox
      paddingHorizontal={20}
      paddingVertical={30}
      backgroundColor={"white"}
    >
      <Title
        title="Applied Jobs"
        caption="Track your job applications and their status"
      />

      {loading ? (
        <FlexBox alignItems="center" justifyContent="center" flex={1}>
          <CustomText value="Loading applications..." />
        </FlexBox>
      ) : applications.length === 0 ? (
        <FlexBox
          alignItems="center"
          justifyContent="center"
          marginVertical={40}
          gap={10}
        >
          <Icon source="briefcase-outline" size={50} color="#ccc" />
          <CustomText
            value="No applications yet"
            fontSize={16}
            fontWeight="bold"
          />
          <CustomText
            value="Start applying to jobs to see them here"
            fontSize={12}
            fontColor="#999"
          />
        </FlexBox>
      ) : (
        <FlatList
          data={applications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ApplicationCard application={item} />}
          scrollEnabled={true}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
        />
      )}
    </FlexBox>
  );
};

export default AppliedJobs;
