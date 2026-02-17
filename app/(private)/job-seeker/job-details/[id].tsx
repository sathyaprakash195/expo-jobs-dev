import { Pressable, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FlexBox from "@/components/ui/flexbox";
import { router, useLocalSearchParams } from "expo-router";
import { IJob } from "@/interfaces";
import { getJobById } from "@/services/jobs";
import CustomText from "@/components/ui/custom-text";
import { Divider, Icon } from "react-native-paper";
import { PRIMARY_COLOR } from "@/constants";
import dayjs from "dayjs";
import CustomButton from "@/components/ui/custom-button";

const JobDetailsScreen = () => {
  const [jobData, setJobData] = React.useState<IJob | null>(null);
  const params = useLocalSearchParams();
  const jobId = params.id;
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchJobData = async () => {
    try {
      setLoading(true);
      const response = await getJobById(parseInt(jobId as string));
      setJobData(response.data);
    } catch (err) {
      setError("Failed to fetch job data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchJobData();
    }
  }, [jobId]);

  if (loading) {
    return (
      <FlexBox flex={1} justifyContent="center" alignItems="center">
        <Text>Loading...</Text>
      </FlexBox>
    );
  }

  const renderProperty = (icon: any, value: any) => {
    return (
      <FlexBox flexDirection="row" alignItems="center" gap={10}>
        <Icon source={icon} color="#6f6f6f" size={20} />
        <CustomText value={value || "N/A"} fontColor="#2f2f2f" />
      </FlexBox>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlexBox flex={1} padding={20} gap={20} backgroundColor={"white"}>
        <FlexBox
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <CustomText
            fontColor={PRIMARY_COLOR}
            value="Job Details"
            fontSize={24}
            fontWeight="bold"
          />
          <Pressable onPress={() => router.back()}>
            <Icon source="arrow-left" color={PRIMARY_COLOR} size={24} />
          </Pressable>
        </FlexBox>

        <Divider style={{ marginVertical: 10, backgroundColor: "#6a6a6a" }} />

        <FlexBox>
          <CustomText
            value={jobData?.title || "N/A"}
            fontSize={20}
            fontWeight="bold"
            fontColor={PRIMARY_COLOR}
          />
          <CustomText
            fontColor="#6f6f6f"
            value={jobData?.company || "N/A"}
            fontSize={16}
          />
        </FlexBox>

        <FlexBox gap={7}>
          {renderProperty("map-marker", jobData?.location)}

          {renderProperty(
            "account",
            jobData?.min_experience +
              " - " +
              jobData?.max_experinece +
              " years",
          )}

          {renderProperty(
            "briefcase",
            jobData?.number_of_positions || 1 + " position(s)",
          )}
        </FlexBox>

        <FlexBox gap={7}>
          <CustomText
            value="Salary Range"
            fontSize={16}
            fontWeight="bold"
            fontColor={PRIMARY_COLOR}
          />
          <CustomText
            fontColor="#5d5c5c"
            value={`$${jobData?.min_salary || "N/A"} - $${jobData?.max_salary || "N/A"}`}
          />
        </FlexBox>

        <FlexBox gap={7}>
          <CustomText
            value="Application Deadline"
            fontSize={16}
            fontWeight="bold"
            fontColor={PRIMARY_COLOR}
          />
          <CustomText
            fontColor="#5d5c5c"
            value={
              dayjs(jobData?.last_date_to_apply).format("MMMM D, YYYY") || "N/A"
            }
          />
        </FlexBox>

        <Divider style={{ marginVertical: 10, backgroundColor: "#6a6a6a" }} />

        <FlexBox gap={7}>
          <CustomText
            value="Overview"
            fontSize={16}
            fontWeight="bold"
            fontColor={PRIMARY_COLOR}
          />
          <CustomText fontColor="#5d5c5c" value={jobData?.small_description!} />
        </FlexBox>

        <Divider style={{ marginVertical: 10, backgroundColor: "#6a6a6a" }} />
        <FlexBox gap={7}>
          <CustomText
            value="Job Description"
            fontSize={16}
            fontWeight="bold"
            fontColor={PRIMARY_COLOR}
          />
          <CustomText fontColor="#5d5c5c" value={jobData?.full_description!} />
        </FlexBox>

        <FlexBox>
          <CustomButton>Apply</CustomButton>

          <CustomButton mode="outlined" onPress={() => router.back()}>
            Back
          </CustomButton>
        </FlexBox>
      </FlexBox>
    </SafeAreaView>
  );
};

export default JobDetailsScreen;
