import { View, Text } from "react-native";
import React from "react";
import FlexBox from "./flexbox";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "@/components/ui/custom-input";
import Toast from "react-native-toast-message";
import CustomButton from "@/components/ui/custom-button";
import { JOB_STATUSES } from "@/constants";
import CustomDropdown from "./custom-dropdown";
import CustomDatePicker from "./custom-date-picker";
import { addNewJob, updateJobById } from "@/services/jobs";
import dayjs from "dayjs";
import { IUsersStore, useUsersStore } from "@/store/users-store";

interface JobFormProps {
  formType: "add" | "edit";
  initialValues?: any;
}

const JobForm = ({ formType, initialValues }: JobFormProps) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { user } = useUsersStore() as IUsersStore;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialValues?.title || "",
      small_description: initialValues?.small_description || "",
      full_description: initialValues?.full_description || "",
      location: initialValues?.location || "",

      min_salary: initialValues?.min_salary?.toString() || "",
      max_salary: initialValues?.max_salary?.toString() || "",

      min_experience: initialValues?.min_experience?.toString() || "",
      max_experinece: initialValues?.max_experinece?.toString() || "",

      last_date_to_apply: initialValues?.last_date_to_apply || "",
      skills_required: initialValues?.skills_required
        ? initialValues.skills_required.join(", ")
        : "",
      status: initialValues?.status || "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      // format the data as per database requirement
      data.recruiter_id = user?.id;
      data.min_salary = parseFloat(data.min_salary);
      data.max_salary = parseFloat(data.max_salary);
      data.min_experience = parseFloat(data.min_experience);
      data.max_experinece = parseFloat(data.max_experinece);
      data.skills_required = data.skills_required
        .split(",")
        .map((skill: string) => skill.trim());
      data.last_date_to_apply = dayjs(data.last_date_to_apply).format(
        "YYYY-MM-DD",
      );

      if (formType === "add") {
        await addNewJob(data);
      } else {
        await updateJobById(initialValues.id, data);
      }

      Toast.show({
        type: "success",
        text1:
          formType === "add"
            ? "Job added successfully"
            : "Job updated successfully",
      });
      setTimeout(() => {
        router.push("/recruiter/home");
      }, 1000);
    } catch (error) {
      Toast.show({
        type: "error",
        text1:
          formType === "add" ? "Failed to add job" : "Failed to update job",
        text2: "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlexBox gap={20}>
      <Controller
        control={control}
        name="title"
        rules={{ required: "Title is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            label="Job Title"
            placeholder="Enter job title"
            value={value}
            onChangeText={onChange}
            errorMessage="Title is required"
            error={!!errors.title}
          />
        )}
      />

      <Controller
        control={control}
        name="small_description"
        rules={{ required: "Small description is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            label="Small Description"
            placeholder="Enter small description"
            value={value}
            onChangeText={onChange}
            errorMessage="Small description is required"
            error={!!errors.small_description}
            multiline
          />
        )}
      />

      <Controller
        control={control}
        name="full_description"
        rules={{ required: "Full description is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            label="Full Description"
            placeholder="Enter full description"
            value={value}
            onChangeText={onChange}
            errorMessage="Full description is required"
            error={!!errors.full_description}
            multiline
          />
        )}
      />

      <Controller
        control={control}
        name="location"
        rules={{ required: "Location is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            label="Location"
            placeholder="Enter job location"
            value={value}
            onChangeText={onChange}
            errorMessage="Location is required"
            error={!!errors.location}
          />
        )}
      />

      <FlexBox flexDirection="row" gap={20}>
        <View style={{ width: "47%" }}>
          <Controller
            control={control}
            name="min_salary"
            rules={{ required: "Minimum salary is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Min Salary"
                placeholder="Enter minimum salary"
                value={value}
                onChangeText={onChange}
                errorMessage="Minimum salary is required"
                error={!!errors.min_salary}
                keyboardType="numeric"
              />
            )}
          />
        </View>

        <View style={{ width: "47%" }}>
          <Controller
            control={control}
            name="max_salary"
            rules={{ required: "Maximum salary is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Max Salary"
                placeholder="Enter maximum salary"
                value={value}
                onChangeText={onChange}
                errorMessage="Maximum salary is required"
                error={!!errors.max_salary}
                keyboardType="numeric"
              />
            )}
          />
        </View>
      </FlexBox>

      <FlexBox flexDirection="row" gap={20}>
        <View style={{ width: "47%" }}>
          <Controller
            control={control}
            name="min_experience"
            rules={{ required: "Minimum experience is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Min Experience (years)"
                placeholder="Enter minimum experience"
                value={value}
                onChangeText={onChange}
                errorMessage="Minimum experience is required"
                error={!!errors.min_experience}
                keyboardType="numeric"
              />
            )}
          />
        </View>

        <View style={{ width: "47%" }}>
          <Controller
            control={control}
            name="max_experinece"
            rules={{ required: "Maximum experience is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Max Experience (years)"
                placeholder="Enter maximum experience"
                value={value}
                onChangeText={onChange}
                errorMessage="Maximum experience is required"
                error={!!errors.max_experinece}
                keyboardType="numeric"
              />
            )}
          />
        </View>
      </FlexBox>

      <Controller
        control={control}
        name="skills_required"
        rules={{ required: "Skills required is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            label="Skills Required"
            placeholder="Enter skills required (comma separated)"
            value={value}
            onChangeText={onChange}
            errorMessage="Skills required is required"
            error={!!errors.skills_required}
          />
        )}
      />

      <Controller
        control={control}
        name="last_date_to_apply"
        rules={{ required: "Last date to apply is required" }}
        render={({ field: { onChange, value } }) => (
          <CustomDatePicker
            label="Last Date to Apply"
            placeholder="Select last date to apply"
            value={value}
            onDateChange={onChange}
            errorMessage="Last date to apply is required"
            error={!!errors.last_date_to_apply}
          />
        )}
      />

      <Controller
        control={control}
        name="status"
        rules={{ required: "Job status is required" }}
        render={({ field: { onChange, value } }) => (
          <CustomDropdown
            label="Job Status"
            options={JOB_STATUSES}
            value={value}
            onValueChange={onChange}
            errorMessage="Job status is required"
            error={!!errors.status}
          />
        )}
      />

      <FlexBox flexDirection="row" gap={20}>
        <View style={{ width: "47%" }}>
          <CustomButton mode="outlined">Cancel</CustomButton>
        </View>
        <View style={{ width: "47%" }}>
          <CustomButton onPress={handleSubmit(onSubmit)} disabled={loading}>
            {formType === "add" ? "Add Job" : "Update Job"}
          </CustomButton>
        </View>
      </FlexBox>
    </FlexBox>
  );
};

export default JobForm;
