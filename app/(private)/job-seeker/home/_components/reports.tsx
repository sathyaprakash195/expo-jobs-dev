import { View, ScrollView } from "react-native";
import React, { useEffect } from "react";
import FlexBox from "@/components/ui/flexbox";
import CustomText from "@/components/ui/custom-text";
import Title from "@/components/ui/title";
import { IApplication } from "@/interfaces";
import { getApplicationOfJobSeeker } from "@/services/applications";
import { IUsersStore, useUsersStore } from "@/store/users-store";
import { Icon } from "react-native-paper";
import { PRIMARY_COLOR } from "@/constants";

interface ApplicationStats {
  totalApplied: number;
  shortlisted: number;
  rejected: number;
  pending: number;
  accepted: number;
  acceptanceRate: number;
}

const Reports = () => {
  const [stats, setStats] = React.useState<ApplicationStats>({
    totalApplied: 0,
    shortlisted: 0,
    rejected: 0,
    pending: 0,
    accepted: 0,
    acceptanceRate: 0,
  });
  const { user } = useUsersStore() as IUsersStore;
  const [loading, setLoading] = React.useState(false);

  const calculateStats = (applications: IApplication[]) => {
    const totalApplied = applications.length;
    const shortlisted = applications.filter(
      (app) => app.status === "shortlisted",
    ).length;
    const rejected = applications.filter(
      (app) => app.status === "rejected",
    ).length;
    const accepted = applications.filter(
      (app) => app.status === "accepted",
    ).length;
    const pending = applications.filter(
      (app) => app.status === "applied",
    ).length;

    const acceptanceRate =
      totalApplied > 0 ? (accepted / totalApplied) * 100 : 0;

    return {
      totalApplied,
      shortlisted,
      rejected,
      pending,
      accepted,
      acceptanceRate: Math.round(acceptanceRate),
    };
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await getApplicationOfJobSeeker(user?.id as string);
      const calculatedStats = calculateStats(response.data || []);
      setStats(calculatedStats);
    } catch (error) {
      setStats({
        totalApplied: 0,
        shortlisted: 0,
        rejected: 0,
        pending: 0,
        accepted: 0,
        acceptanceRate: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
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
        <Title title="Reports" caption="Track your application journey" />

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
            {/* Hero Card - Total Applications */}
            <FlexBox
              style={{
                backgroundColor: PRIMARY_COLOR,
                borderRadius: 16,
                padding: 24,
                alignItems: "center",
              }}
              gap={12}
            >
              <Icon source="briefcase-check" color="#fff" size={48} />
              <CustomText
                value={stats.totalApplied.toString()}
                fontSize={48}
                fontWeight="bold"
                fontColor="#fff"
              />
              <CustomText
                value="Total Applications"
                fontSize={14}
                fontColor="#E0E0E0"
              />
              {stats.totalApplied > 0 && (
                <CustomText
                  value={`${Math.round((stats.shortlisted / stats.totalApplied) * 100)}% shortlisted`}
                  fontSize={12}
                  fontColor="#B0BEC5"
                  fontWeight="bold"
                />
              )}
            </FlexBox>

            {/* Status Breakdown */}
            <FlexBox gap={10}>
              <MetricCard
                icon="star"
                value={stats.shortlisted}
                label="Shortlisted"
                color="#FF9800"
              />
              <MetricCard
                icon="check-circle"
                value={stats.accepted}
                label="Accepted"
                color="#4CAF50"
              />
              <MetricCard
                icon="clock"
                value={stats.pending}
                label="Awaiting Response"
                color="#2196F3"
              />
              <MetricCard
                icon="close-circle"
                value={stats.rejected}
                label="Rejected"
                color="#F44336"
              />
            </FlexBox>

            {/* Key Metrics Section */}
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 16,
                gap: 16,
              }}
            >
              <CustomText
                value="Key Insights"
                fontSize={16}
                fontWeight="bold"
                fontColor={PRIMARY_COLOR}
              />

              {/* Success Rate */}
              <FlexBox gap={12}>
                <FlexBox
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FlexBox flexDirection="row" alignItems="center" gap={8}>
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 50,
                        backgroundColor: "#E8F5E9",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Icon source="percent" color="#4CAF50" size={18} />
                    </View>
                    <FlexBox>
                      <CustomText
                        value="Success Rate"
                        fontSize={13}
                        fontWeight="bold"
                      />
                    </FlexBox>
                  </FlexBox>
                  <CustomText
                    value={`${stats.acceptanceRate}%`}
                    fontSize={18}
                    fontWeight="bold"
                    fontColor="#4CAF50"
                  />
                </FlexBox>
                {stats.totalApplied > 0 && (
                  <View
                    style={{
                      height: 6,
                      backgroundColor: "#E0E0E0",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        height: "100%",
                        width: `${stats.acceptanceRate}%`,
                        backgroundColor: "#4CAF50",
                      }}
                    />
                  </View>
                )}
              </FlexBox>

              {/* Response Rate */}
              <FlexBox gap={12}>
                <FlexBox
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FlexBox flexDirection="row" alignItems="center" gap={8}>
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 50,
                        backgroundColor: "#FFF3E0",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Icon source="trending-up" color="#FF9800" size={18} />
                    </View>
                    <FlexBox>
                      <CustomText
                        value="Response Rate"
                        fontSize={13}
                        fontWeight="bold"
                      />
                    </FlexBox>
                  </FlexBox>
                  <CustomText
                    value={`${stats.totalApplied > 0 ? 100 - Math.round((stats.pending / stats.totalApplied) * 100) : 0}%`}
                    fontSize={18}
                    fontWeight="bold"
                    fontColor="#FF9800"
                  />
                </FlexBox>
                {stats.totalApplied > 0 && (
                  <View
                    style={{
                      height: 6,
                      backgroundColor: "#E0E0E0",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        height: "100%",
                        width: `${100 - Math.round((stats.pending / stats.totalApplied) * 100)}%`,
                        backgroundColor: "#FF9800",
                      }}
                    />
                  </View>
                )}
              </FlexBox>
            </View>

            {/* Stats Info */}
            <FlexBox
              style={{
                backgroundColor: "#E3F2FD",
                borderRadius: 12,
                padding: 16,
                borderLeftWidth: 4,
                borderLeftColor: PRIMARY_COLOR,
              }}
              gap={8}
            >
              <CustomText
                value="💡 Pro Tip"
                fontSize={13}
                fontWeight="bold"
                fontColor={PRIMARY_COLOR}
              />
              <CustomText
                value="Keep applying to increase your chances. Most successful job seekers apply to 5-10 positions per week."
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
