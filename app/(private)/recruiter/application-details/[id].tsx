import { ScrollView, Image, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FlexBox from "@/components/ui/flexbox";
import CustomText from "@/components/ui/custom-text";
import CustomButton from "@/components/ui/custom-button";
import Title from "@/components/ui/title";
import { useLocalSearchParams, useRouter } from "expo-router";
import { IApplication } from "@/interfaces";
import {
  getApplicationOfRecruiter,
  updateApplicationStatus,
} from "@/services/applications";
import { IUsersStore, useUsersStore } from "@/store/users-store";
import { Icon, Chip, Divider } from "react-native-paper";
import dayjs from "dayjs";
import { PRIMARY_COLOR } from "@/constants";
import Toast from "react-native-toast-message";

const ApplicationDetails = () => {
  const params = useLocalSearchParams();
  const applicationId = params.id;
  const router = useRouter();
  const { user } = useUsersStore() as IUsersStore;

  const [application, setApplication] = React.useState<IApplication | null>(
    null,
  );
  const [loading, setLoading] = React.useState(true);
  const [updating, setUpdating] = React.useState(false);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const response = await getApplicationOfRecruiter(user?.id as string);
      const foundApp = response.data?.find(
        (app) => app.id.toString() === applicationId,
      );
      if (foundApp) {
        setApplication(foundApp);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to load application details",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (applicationId) {
      fetchApplication();
    }
  }, [applicationId]);

  const handleStatusChange = async (
    newStatus: "applied" | "shortlisted" | "rejected" | "accepted",
  ) => {
    try {
      setUpdating(true);
      await updateApplicationStatus(
        parseInt(applicationId as string),
        newStatus,
      );
      setApplication((prev) => (prev ? { ...prev, status: newStatus } : null));
      Toast.show({
        type: "success",
        text1: "Success",
        text2: `Application marked as ${newStatus}`,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update application status",
      });
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "#2196F3";
      case "shortlisted":
        return "#FF9800";
      case "accepted":
        return "#4CAF50";
      case "rejected":
        return "#F44336";
      default:
        return "#757575";
    }
  };

  const renderProperty = (icon: string, label: string, value: string) => (
    <FlexBox gap={8} marginVertical={10}>
      <FlexBox flexDirection="row" alignItems="center" gap={8}>
        <Icon source={icon} color={PRIMARY_COLOR} size={20} />
        <CustomText value={label} fontSize={12} fontColor="#666" />
      </FlexBox>
      <CustomText value={value} fontSize={14} fontWeight="bold" />
    </FlexBox>
  );

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <FlexBox flex={1} justifyContent="center" alignItems="center">
          <CustomText value="Loading application details..." />
        </FlexBox>
      </SafeAreaView>
    );
  }

  if (!application) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <FlexBox flex={1} justifyContent="center" alignItems="center">
          <CustomText value="Application not found" />
        </FlexBox>
      </SafeAreaView>
    );
  }

  const jobSeeker = application.job_seeker;
  const job = application.job;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <FlexBox padding={20} gap={20}>
          {/* Header */}
          <FlexBox
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <CustomText
              value="Application Details"
              fontSize={24}
              fontWeight="bold"
              fontColor={PRIMARY_COLOR}
            />
            <Pressable onPress={() => router.back()}>
              <Icon source="close" color={PRIMARY_COLOR} size={24} />
            </Pressable>
          </FlexBox>

          <Divider style={{ marginVertical: 10, backgroundColor: "#e0e0e0" }} />

          {/* Current Status */}
          <FlexBox gap={8}>
            <CustomText
              value="Current Status"
              fontSize={14}
              fontWeight="bold"
            />
            <Chip
              children={
                application.status.charAt(0).toUpperCase() +
                application.status.slice(1)
              }
              style={{
                backgroundColor: getStatusColor(application.status),
                width: "auto",
              }}
              textStyle={{ color: "#fff", fontSize: 14, fontWeight: "600" }}
            />
          </FlexBox>

          <Divider style={{ marginVertical: 10, backgroundColor: "#e0e0e0" }} />

          {/* Applicant Information */}
          <FlexBox gap={12}>
            <CustomText
              value="Applicant Information"
              fontSize={16}
              fontWeight="bold"
              fontColor={PRIMARY_COLOR}
            />

            <FlexBox
              flexDirection="row"
              alignItems="center"
              gap={12}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 10,
                backgroundColor: "#f5f5f5",
                borderRadius: 8,
              }}
            >
              {jobSeeker?.profile_picture_url ? (
                <Image
                  source={{ uri: jobSeeker.profile_picture_url }}
                  style={{ width: 70, height: 70, borderRadius: 35 }}
                />
              ) : (
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    backgroundColor: PRIMARY_COLOR,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon source="account" color="#fff" size={36} />
                </View>
              )}
              <FlexBox flex={1} gap={6}>
                <CustomText
                  value={jobSeeker?.name || "N/A"}
                  fontSize={16}
                  fontWeight="bold"
                />
                <CustomText
                  value={jobSeeker?.email || "N/A"}
                  fontSize={12}
                  fontColor="#666"
                />
                {jobSeeker?.resume_url && (
                  <FlexBox
                    flexDirection="row"
                    alignItems="center"
                    gap={5}
                    marginVertical={5}
                  >
                    <Icon
                      source="file-pdf-box"
                      color={PRIMARY_COLOR}
                      size={16}
                    />
                    <CustomText
                      value="Resume Available"
                      fontSize={10}
                      fontColor={PRIMARY_COLOR}
                    />
                  </FlexBox>
                )}
              </FlexBox>
            </FlexBox>
          </FlexBox>

          <Divider style={{ marginVertical: 10, backgroundColor: "#e0e0e0" }} />

          {/* Job Information */}
          <FlexBox gap={12}>
            <CustomText
              value="Job Information"
              fontSize={16}
              fontWeight="bold"
              fontColor={PRIMARY_COLOR}
            />

            <FlexBox gap={4}>
              <CustomText
                value={job.title || "N/A"}
                fontSize={18}
                fontWeight="bold"
              />
              <CustomText
                value={job.company || "N/A"}
                fontSize={14}
                fontColor="#666"
              />
            </FlexBox>

            {renderProperty("map-marker", "Location", job.location || "N/A")}

            {renderProperty(
              "briefcase",
              "Experience Required",
              `${job.min_experience} - ${job.max_experinece} years`,
            )}

            {renderProperty(
              "currency-usd",
              "Salary Range",
              `$${job.min_salary} - $${job.max_salary}`,
            )}

            {renderProperty(
              "layers",
              "Available Positions",
              `${job.number_of_positions || 1} position(s)`,
            )}

            {/* Skills Required */}
            {job.skills_required && job.skills_required.length > 0 && (
              <FlexBox gap={8} marginVertical={10}>
                <FlexBox flexDirection="row" alignItems="center" gap={8}>
                  <Icon source="lightbulb" color={PRIMARY_COLOR} size={20} />
                  <CustomText
                    value="Skills Required"
                    fontSize={12}
                    fontColor="#666"
                  />
                </FlexBox>
                <FlexBox
                  flexDirection="row"
                  alignItems="center"
                  flexWrap="wrap"
                  gap={6}
                >
                  {job.skills_required.map((skill, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: "#08425fe3",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 4,
                      }}
                    >
                      <CustomText
                        value={skill}
                        fontSize={11}
                        fontColor="#f7f7f7"
                      />
                    </View>
                  ))}
                </FlexBox>
              </FlexBox>
            )}
          </FlexBox>

          <Divider style={{ marginVertical: 10, backgroundColor: "#e0e0e0" }} />

          {/* Job Description */}
          <FlexBox gap={8}>
            <CustomText value="Job Overview" fontSize={14} fontWeight="bold" />
            <CustomText
              value={job.small_description || "N/A"}
              fontSize={12}
              fontColor="#666"
            />
          </FlexBox>

          <FlexBox gap={8}>
            <CustomText
              value="Full Description"
              fontSize={14}
              fontWeight="bold"
            />
            <CustomText
              value={job.full_description || "N/A"}
              fontSize={12}
              fontColor="#666"
            />
          </FlexBox>

          <Divider style={{ marginVertical: 10, backgroundColor: "#e0e0e0" }} />

          {/* Application Timeline */}
          <FlexBox gap={8}>
            <CustomText
              value="Application Timeline"
              fontSize={14}
              fontWeight="bold"
            />
            <FlexBox flexDirection="row" alignItems="center" gap={8}>
              <Icon source="calendar" color="#999" size={16} />
              <CustomText
                value={dayjs(application.created_at).format(
                  "MMMM D, YYYY [at] h:mm A",
                )}
                fontSize={12}
                fontColor="#999"
              />
            </FlexBox>
          </FlexBox>

          <Divider style={{ marginVertical: 10, backgroundColor: "#e0e0e0" }} />

          {/* Action Buttons */}
          <FlexBox gap={10} marginVertical={10}>
            <CustomText
              value="Change Application Status"
              fontSize={14}
              fontWeight="bold"
            />

            <FlexBox gap={8}>
              <CustomButton
                mode={
                  application.status === "shortlisted"
                    ? "contained"
                    : "outlined"
                }
                onPress={() => handleStatusChange("shortlisted")}
                disabled={updating}
              >
                <Icon
                  source="star"
                  size={16}
                  color={
                    application.status === "shortlisted"
                      ? "#fff"
                      : PRIMARY_COLOR
                  }
                />
                <CustomText
                  value="Shortlist"
                  fontSize={12}
                  fontColor={
                    application.status === "shortlisted"
                      ? "#fff"
                      : PRIMARY_COLOR
                  }
                  fontWeight="bold"
                />
              </CustomButton>

              <CustomButton
                mode={
                  application.status === "accepted" ? "contained" : "outlined"
                }
                onPress={() => handleStatusChange("accepted")}
                disabled={updating}
              >
                <Icon
                  source="check-circle"
                  size={16}
                  color={application.status === "accepted" ? "#fff" : "#4CAF50"}
                />
                <CustomText
                  value="Accept"
                  fontSize={12}
                  fontColor={
                    application.status === "accepted" ? "#fff" : "#4CAF50"
                  }
                  fontWeight="bold"
                />
              </CustomButton>

              <CustomButton
                mode={
                  application.status === "rejected" ? "contained" : "outlined"
                }
                onPress={() => handleStatusChange("rejected")}
                disabled={updating}
              >
                <Icon
                  source="close-circle"
                  size={16}
                  color={application.status === "rejected" ? "#fff" : "#F44336"}
                />
                <CustomText
                  value="Reject"
                  fontSize={12}
                  fontColor={
                    application.status === "rejected" ? "#fff" : "#F44336"
                  }
                  fontWeight="bold"
                />
              </CustomButton>
            </FlexBox>
          </FlexBox>

          {/* Back Button */}
          <CustomButton mode="outlined" onPress={() => router.back()}>
            Back to Applications
          </CustomButton>
        </FlexBox>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplicationDetails;
