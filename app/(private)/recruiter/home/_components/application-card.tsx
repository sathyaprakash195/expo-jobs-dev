import CustomText from "@/components/ui/custom-text";
import FlexBox from "@/components/ui/flexbox";
import { IApplication } from "@/interfaces";
import { PRIMARY_COLOR } from "@/constants";
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Icon, Chip } from "react-native-paper";
import dayjs from "dayjs";
import { useRouter } from "expo-router";

interface RecruiterApplicationCardProps {
  application: IApplication;
}

const RecruiterApplicationCard = ({
  application,
}: RecruiterApplicationCardProps) => {
  const router = useRouter();
  const jobSeeker = application.job_seeker;
  const job = application.job;

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

  return (
    <TouchableOpacity
      onPress={() =>
        router.push(`/recruiter/application-details/${application.id}`)
      }
    >
      <FlexBox
        style={{
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 8,
          padding: 15,
          marginBottom: 16,
          backgroundColor: "#fff",
        }}
      >
        {/* Job Title and Status */}
        <FlexBox
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginVertical={10}
        >
          <FlexBox flex={1}>
            <CustomText value={job.title!} fontSize={16} fontWeight="bold" />
            <FlexBox marginVertical={4}>
              <CustomText
                value={`${job.number_of_positions} position(s)`}
                fontSize={12}
                fontColor="#555"
              />
            </FlexBox>
          </FlexBox>
          <Chip
            children={
              application.status.charAt(0).toUpperCase() +
              application.status.slice(1)
            }
            style={{
              backgroundColor: getStatusColor(application.status),
              marginLeft: 10,
            }}
            textStyle={{ color: "#fff", fontSize: 12, fontWeight: "600" }}
          />
        </FlexBox>

        {/* Applicant Info */}
        <FlexBox
          flexDirection="row"
          alignItems="center"
          gap={12}
          marginVertical={12}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 10,
            backgroundColor: "#f5f5f5",
            borderRadius: 6,
          }}
        >
          {jobSeeker?.profile_picture_url ? (
            <Image
              source={{ uri: jobSeeker.profile_picture_url }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          ) : (
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: PRIMARY_COLOR,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon source="account" color="#fff" size={24} />
            </View>
          )}
          <FlexBox flex={1} gap={4}>
            <CustomText
              value={jobSeeker?.name || "N/A"}
              fontSize={14}
              fontWeight="bold"
            />
            <CustomText
              value={jobSeeker?.email || "N/A"}
              fontSize={11}
              fontColor="#666"
            />
          </FlexBox>
        </FlexBox>

        {/* Job Location and Salary */}
        <FlexBox gap={8} marginVertical={12}>
          <FlexBox flexDirection="row" alignItems="center" gap={5}>
            <Icon source="map-marker" size={16} color="#555" />
            <CustomText value={job.location!} fontSize={12} fontColor="#555" />
          </FlexBox>

          <FlexBox flexDirection="row" alignItems="center" gap={5}>
            <Icon source="currency-usd" size={16} color="#555" />
            <CustomText
              value={`$${job.min_salary} - $${job.max_salary}`}
              fontSize={12}
              fontColor="#555"
            />
          </FlexBox>
        </FlexBox>

        {/* Experience and Skills Required */}
        <FlexBox gap={8} marginVertical={12}>
          <FlexBox flexDirection="row" alignItems="center" gap={5}>
            <Icon source="briefcase" size={16} color="#555" />
            <CustomText
              value={`${job.min_experience} - ${job.max_experinece} years exp.`}
              fontSize={12}
              fontColor="#555"
            />
          </FlexBox>

          {job.skills_required && job.skills_required.length > 0 && (
            <FlexBox flexDirection="row" alignItems="center" gap={5}>
              <Icon source="lightbulb" size={16} color="#555" />
              <CustomText
                value={`${job.skills_required.length} skills required`}
                fontSize={12}
                fontColor="#555"
              />
            </FlexBox>
          )}
        </FlexBox>

        {/* Application Date */}
        <FlexBox
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          style={{
            borderTopWidth: 1,
            borderTopColor: "#eee",
            paddingTop: 12,
          }}
        >
          <FlexBox flexDirection="row" alignItems="center" gap={5}>
            <Icon source="calendar" size={14} color="#999" />
            <CustomText
              value={`Applied on ${dayjs(application.created_at).format("MMM D, YYYY")}`}
              fontSize={11}
              fontColor="#999"
            />
          </FlexBox>
          {jobSeeker?.resume_url && (
            <FlexBox
              flexDirection="row"
              alignItems="center"
              gap={5}
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: PRIMARY_COLOR,
                borderRadius: 4,
              }}
            >
              <Icon source="file-pdf-box" size={12} color="#fff" />
              <CustomText
                value="Resume"
                fontSize={10}
                fontColor="#fff"
                fontWeight="bold"
              />
            </FlexBox>
          )}
        </FlexBox>
      </FlexBox>
    </TouchableOpacity>
  );
};

export default RecruiterApplicationCard;
