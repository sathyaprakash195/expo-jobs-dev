import { View, ScrollView } from "react-native";
import React, { useEffect } from "react";
import FlexBox from "@/components/ui/flexbox";
import CustomText from "@/components/ui/custom-text";
import Title from "@/components/ui/title";
import { IJob, IApplication } from "@/interfaces";
import { getAllJobsOfRecruiter } from "@/services/jobs";
import { getApplicationOfRecruiter } from "@/services/applications";
import { IUsersStore, useUsersStore } from "@/store/users-store";
import { Icon } from "react-native-paper";
import { PRIMARY_COLOR } from "@/constants";

interface RecruitmentStats {
  jobsPosted: number;
  jobsOpen: number;
  jobsClosed: number;
  applicationsReceived: number;
  applicationsShortlisted: number;
  applicationsRejected: number;
  applicationsPending: number;
}

const Reports = () => {
  const [stats, setStats] = React.useState<RecruitmentStats>({
    jobsPosted: 0,
    jobsOpen: 0,
    jobsClosed: 0,
    applicationsReceived: 0,
    applicationsShortlisted: 0,
    applicationsRejected: 0,
    applicationsPending: 0,
  });
  const { user } = useUsersStore() as IUsersStore;
  const [loading, setLoading] = React.useState(false);

  const calculateStats = (jobs: IJob[], applications: IApplication[]) => {
    const jobsPosted = jobs.length;
    const jobsOpen = jobs.filter((job) => job.status === "open").length;
    const jobsClosed = jobs.filter((job) => job.status === "closed").length;

    const applicationsReceived = applications.length;
    const applicationsShortlisted = applications.filter(
      (app) => app.status === "shortlisted",
    ).length;
    const applicationsRejected = applications.filter(
      (app) => app.status === "rejected",
    ).length;
    const applicationsPending = applications.filter(
      (app) => app.status === "applied",
    ).length;

    return {
      jobsPosted,
      jobsOpen,
      jobsClosed,
      applicationsReceived,
      applicationsShortlisted,
      applicationsRejected,
      applicationsPending,
    };
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      const recruiterId = parseInt(user?.id as string);
      const jobsResponse = await getAllJobsOfRecruiter(recruiterId);
      const applicationsResponse = await getApplicationOfRecruiter(
        user?.id as string,
      );
      const calculatedStats = calculateStats(
        jobsResponse.data || [],
        applicationsResponse.data || [],
      );
      setStats(calculatedStats);
    } catch (error) {
      setStats({
        jobsPosted: 0,
        jobsOpen: 0,
        jobsClosed: 0,
        applicationsReceived: 0,
        applicationsShortlisted: 0,
        applicationsRejected: 0,
        applicationsPending: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const MetricCard = ({
    icon,
    value,
    label,
    color,
  }: {
    icon: string;
    value: number;
    label: string;
    color: string;
  }) => (
    <FlexBox
      style={{
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: color,
        borderWidth: 1,
        borderColor: "#E8E8E8",
      }}
      gap={8}
    >
      <FlexBox flexDirection="row" alignItems="center" gap={8}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor: `${color}20`,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon source={icon} color={color} size={22} />
        </View>
        <FlexBox flex={1}>
          <CustomText
            value={value.toString()}
            fontSize={20}
            fontWeight="bold"
          />
          <CustomText value={label} fontSize={11} fontColor="#999" />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <FlexBox padding={20} gap={20}>
        <Title title="Reports" caption="Your recruitment dashboard" />

        {loading ? (
          <FlexBox
            alignItems="center"
            justifyContent="center"
            marginVertical={40}
          >
            <CustomText value="Loading statistics..." />
          </FlexBox>
        ) : (
          <>
            {/* Jobs Section */}
            <FlexBox gap={12}>
              <FlexBox
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  borderRadius: 16,
                  padding: 24,
                  alignItems: "center",
                }}
                gap={12}
              >
                <Icon source="briefcase" color="#fff" size={48} />
                <CustomText
                  value={stats.jobsPosted.toString()}
                  fontSize={48}
                  fontWeight="bold"
                  fontColor="#fff"
                />
                <CustomText
                  value="Total Jobs Posted"
                  fontSize={14}
                  fontColor="#E0E0E0"
                />
              </FlexBox>

              <FlexBox flexDirection="row" gap={10}>
                <FlexBox flex={1}>
                  <MetricCard
                    icon="briefcase"
                    value={stats.jobsOpen}
                    label="Open Jobs"
                    color="#4CAF50"
                  />
                </FlexBox>
                <FlexBox flex={1}>
                  <MetricCard
                    icon="lock"
                    value={stats.jobsClosed}
                    label="Closed Jobs"
                    color="#F44336"
                  />
                </FlexBox>
              </FlexBox>
            </FlexBox>

            {/* Applications Section */}
            <FlexBox gap={12}>
              <CustomText
                value="Applications Received"
                fontSize={16}
                fontWeight="bold"
                fontColor={PRIMARY_COLOR}
              />

              <FlexBox
                style={{
                  backgroundColor: "#E3F2FD",
                  borderRadius: 12,
                  padding: 16,
                  borderLeftWidth: 4,
                  borderLeftColor: "#2196F3",
                }}
                gap={8}
              >
                <FlexBox
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <CustomText
                    value="Total Applications"
                    fontSize={14}
                    fontWeight="bold"
                  />
                  <CustomText
                    value={stats.applicationsReceived.toString()}
                    fontSize={24}
                    fontWeight="bold"
                    fontColor="#2196F3"
                  />
                </FlexBox>
              </FlexBox>

              <FlexBox gap={8}>
                <MetricCard
                  icon="star"
                  value={stats.applicationsShortlisted}
                  label="Shortlisted"
                  color="#FF9800"
                />
                <MetricCard
                  icon="clock"
                  value={stats.applicationsPending}
                  label="Pending Review"
                  color="#2196F3"
                />
                <MetricCard
                  icon="close-circle"
                  value={stats.applicationsRejected}
                  label="Rejected"
                  color="#F44336"
                />
              </FlexBox>
            </FlexBox>

            {/* Pro Tip */}
            <FlexBox
              style={{
                backgroundColor: "#FFF3E0",
                borderRadius: 12,
                padding: 16,
                borderLeftWidth: 4,
                borderLeftColor: "#FF9800",
              }}
              gap={8}
            >
              <CustomText
                value="💡 Pro Tip"
                fontSize={13}
                fontWeight="bold"
                fontColor="#FF9800"
              />
              <CustomText
                value="Actively manage applications and respond to candidates quickly to improve your response rate and attract quality talent."
                fontSize={12}
                fontColor="#555"
              />
            </FlexBox>
          </>
        )}
      </FlexBox>
    </ScrollView>
  );
};

export default Reports;
