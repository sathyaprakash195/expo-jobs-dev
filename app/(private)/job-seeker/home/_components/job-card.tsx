import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { IJob } from "@/interfaces";
import FlexBox from "@/components/ui/flexbox";
import CustomText from "@/components/ui/custom-text";
import { Icon } from "react-native-paper";
import CustomButton from "@/components/ui/custom-button";
import { useRouter } from "expo-router";
import { PRIMARY_COLOR } from "@/constants";

const Jobcard = ({ job }: { job: IJob }) => {
  const router = useRouter();

  const firstThreeSkills = job.skills_required
    ? job.skills_required.slice(0, 3)
    : [];
  const remainingSkillsCount = job.skills_required
    ? job.skills_required.length - firstThreeSkills.length
    : 0;
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/job-seeker/job-details/${job.id}`);
      }}
    >
      <FlexBox
        style={{
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 8,
          padding: 15,
          marginBottom: 25,
        }}
      >
        <CustomText value={job.title!} fontSize={14} fontWeight="bold" />
        <CustomText value={job.company!} fontSize={12} fontColor="#555" />

        {/* location */}
        <FlexBox
          flexDirection="row"
          alignItems="center"
          gap={5}
          paddingVertical={5}
        >
          <Icon source="map-marker" size={16} color="#555" />
          <CustomText value={job.location!} fontSize={12} fontColor="#555" />
        </FlexBox>

        <CustomText
          value={`$ ${job.min_salary} - $ ${job.max_salary}`}
          fontSize={12}
          fontColor="#555"
        />

        <FlexBox flexDirection="row" alignItems="center" flexWrap="wrap">
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
                marginRight: 5,
                marginBottom: 5,
                width: "auto",
              }}
            >
              <CustomText value={skill} fontSize={12} fontColor="#f7f7f7" />
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
                marginRight: 5,
                marginBottom: 5,
                width: "auto",
              }}
            >
              <CustomText
                value={`+${remainingSkillsCount} more`}
                fontSize={12}
                fontColor="#f7f7f7"
              />
            </View>
          )}
        </FlexBox>
      </FlexBox>
    </TouchableOpacity>
  );
};

export default Jobcard;
