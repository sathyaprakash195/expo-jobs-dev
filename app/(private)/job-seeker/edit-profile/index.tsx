import CustomButton from "@/components/ui/custom-button";
import CustomDropdown from "@/components/ui/custom-dropdown";
import CustomInput from "@/components/ui/custom-input";
import CustomText from "@/components/ui/custom-text";
import FlexBox from "@/components/ui/flexbox";
import Title from "@/components/ui/title";
import { PRIMARY_COLOR, USER_ROLES } from "@/constants";
import { registerUser, updateUserProfile } from "@/services/users";
import { IUsersStore, useUsersStore } from "@/store/users-store";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as DocumentPicker from "expo-document-picker";

const EditProfile = () => {
  const router = useRouter();
  const { user, setUser } = useUsersStore() as IUsersStore;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });
  const [loading, setLoading] = React.useState(false);
  const [selectedNewResume, setSelectedNewResume] = React.useState<any>({
    name: "",
    uri: "",
  });
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await updateUserProfile({
        name: data.name,
        resume_uri: selectedNewResume.uri,
        userId: user?.id || "",
      });
      Toast.show({
        type: "success",
        text1: "Profile Updated",
        text2: "Your profile has been updated successfully",
      });
      setUser(response.data);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (result.canceled) {
        return;
      }
      const file = result.assets[0];
      setSelectedNewResume({
        name: file.name,
        uri: file.uri,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "File Selection Failed",
        text2: "Please try again later",
      });
    }
  };

  const handleDownloadResume = () => {};

  const getFileNameFromUri = (uri: string) => {
    const parts = uri.split("/");
    return parts[parts.length - 1];
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <FlexBox padding={20} gap={20} backgroundColor={"white"}>
            <Title
              title="Edit Profile"
              caption="Update your profile information and resume"
            />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  placeholder="Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label="Name"
                  errorMessage={"First name is required"}
                  error={errors.name ? true : false}
                />
              )}
              name="name"
            />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label="Email"
                  errorMessage={"Email is required"}
                  error={errors.email ? true : false}
                  disabled
                />
              )}
              name="email"
            />

            {user?.resume_url && (
              <Pressable onPress={handleDownloadResume}>
                <FlexBox>
                  <CustomText
                    value="Current Resume"
                    fontSize={16}
                    fontWeight="bold"
                  />
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: "#0b867e",
                      borderRadius: 5,
                      alignItems: "center",
                      justifyContent: "center",
                      height: 100,
                      marginTop: 5,
                      borderStyle: "dashed",
                    }}
                  >
                    <CustomText
                      value={`Current: ${getFileNameFromUri(user.resume_url)}`}
                      fontSize={14}
                      fontColor="#0b867e"
                      fontWeight="bold"
                    />
                  </View>
                </FlexBox>
              </Pressable>
            )}

            <Pressable onPress={handleFileSelect}>
              <FlexBox>
                <CustomText
                  value="New Resume"
                  fontSize={16}
                  fontWeight="bold"
                />
                <View
                  style={{
                    borderWidth: 2,
                    borderColor: "#0b867e",
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    height: 100,
                    marginTop: 5,
                    borderStyle: "dashed",
                  }}
                >
                  <CustomText
                    value={`${selectedNewResume.name ? "Selected: " : "Select a PDF resume"} `}
                    fontSize={14}
                    fontColor="#0b867e"
                    fontWeight="bold"
                  />
                  {selectedNewResume.name && (
                    <CustomText
                      value={selectedNewResume.name}
                      fontSize={12}
                      fontColor="#0b867e"
                    />
                  )}
                </View>
              </FlexBox>
            </Pressable>

            <CustomButton disabled={loading} onPress={handleSubmit(onSubmit)}>
              {loading ? "Updating..." : "Update Profile"}
            </CustomButton>
          </FlexBox>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfile;
