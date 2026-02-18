import CustomText from "@/components/ui/custom-text";
import FlexBox from "@/components/ui/flexbox";
import Title from "@/components/ui/title";
import { IApplication } from "@/interfaces";
import { getApplicationOfRecruiter } from "@/services/applications";
import { IUsersStore, useUsersStore } from "@/store/users-store";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { Icon } from "react-native-paper";
import RecruiterApplicationCard from "./application-card";

const Applications = () => {
  const [applications, setApplications] = React.useState<IApplication[]>([]);
  const { user } = useUsersStore() as IUsersStore;
  const [loading, setLoading] = React.useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await getApplicationOfRecruiter(user?.id as string);
      setApplications(response.data || []);
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
    <FlexBox padding={20}>
      <Title title="Applications" caption="View and manage job applications" />

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
          <Icon source="inbox-outline" size={50} color="#ccc" />
          <CustomText
            value="No applications yet"
            fontSize={16}
            fontWeight="bold"
          />
          <CustomText
            value="Applicants will appear here when they apply to your job postings"
            fontSize={12}
            fontColor="#999"
          />
        </FlexBox>
      ) : (
        <FlatList
          data={applications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RecruiterApplicationCard application={item} />
          )}
          scrollEnabled={true}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
        />
      )}
    </FlexBox>
  );
};

export default Applications;
