import CustomText from "@/components/ui/custom-text";
import FlexBox from "@/components/ui/flexbox";
import { IApplication } from "@/interfaces";
import { PRIMARY_COLOR } from "@/constants";
import React from "react";
import { View } from "react-native";
import { Icon, Chip } from "react-native-paper";
import dayjs from "dayjs";

interface ApplicationCardProps {
  application: IApplication;
}

const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const job = application.job;
  const firstThreeSkills = job.skills_required
    ? job.skills_required.slice(0, 3)
    : [];
  const remainingSkillsCount = job.skills_required
    ? job.skills_required.length - firstThreeSkills.length
    : 0;

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
      {/* Header with Status */}
      <FlexBox
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginVertical={10}
      >
        <FlexBox flex={1}>
          <CustomText value={job.title!} fontSize={16} fontWeight="bold" />
          <FlexBox marginVertical={4}>
            <CustomText value={job.company!} fontSize={12} fontColor="#555" />
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

      {/* Location and Experience */}
      <FlexBox gap={8} marginVertical={12}>
        <FlexBox flexDirection="row" alignItems="center" gap={5}>
          <Icon source="map-marker" size={16} color="#555" />
          <CustomText value={job.location!} fontSize={12} fontColor="#555" />
        </FlexBox>

        <FlexBox flexDirection="row" alignItems="center" gap={5}>
          <Icon source="briefcase" size={16} color="#555" />
          <CustomText
            value={`${job.min_experience} - ${job.max_experinece} years`}
            fontSize={12}
            fontColor="#555"
          />
        </FlexBox>
      </FlexBox>

      {/* Salary */}
      <FlexBox marginVertical={12}>
        <CustomText
          value={`$${job.min_salary} - $${job.max_salary}`}
          fontSize={13}
          fontWeight="bold"
          fontColor={PRIMARY_COLOR}
        />
      </FlexBox>

      {/* Skills */}
      {job.skills_required && job.skills_required.length > 0 && (
        <FlexBox
          flexDirection="row"
          alignItems="center"
          flexWrap="wrap"
          marginVertical={12}
          gap={5}
        >
          {firstThreeSkills.map((skill, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "#08425fe3",
                paddingHorizontal: 8,
                borderColor: "#124e74",
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 4,
                marginBottom: 5,
              }}
            >
              <CustomText value={skill} fontSize={11} fontColor="#f7f7f7" />
            </View>
          ))}
          {remainingSkillsCount > 0 && (
            <View
              style={{
                backgroundColor: "#08425fe3",
                paddingHorizontal: 8,
                borderColor: "#124e74",
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 4,
                marginBottom: 5,
              }}
            >
              <CustomText
                value={`+${remainingSkillsCount} more`}
                fontSize={11}
                fontColor="#f7f7f7"
              />
            </View>
          )}
        </FlexBox>
      )}

      {/* Application Date */}
      <FlexBox flexDirection="row" alignItems="center" gap={5}>
        <Icon source="calendar" size={14} color="#999" />
        <CustomText
          value={`Applied on ${dayjs(application.created_at).format("MMM D, YYYY")}`}
          fontSize={11}
          fontColor="#999"
        />
      </FlexBox>
    </FlexBox>
  );
};

export default ApplicationCard;
