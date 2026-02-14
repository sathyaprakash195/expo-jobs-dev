import CustomButton from "@/components/ui/custom-button";
import CustomDropdown from "@/components/ui/custom-dropdown";
import CustomInput from "@/components/ui/custom-input";
import CustomText from "@/components/ui/custom-text";
import FlexBox from "@/components/ui/flexbox";
import { PRIMARY_COLOR, USER_ROLES } from "@/constants";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });
  const onSubmit = (data: any) => console.log(data);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <FlexBox backgroundColor={PRIMARY_COLOR} flex={1}>
            <FlexBox gap={5} paddingHorizontal={30} paddingVertical={40}>
              <CustomText
                value="Create Account"
                fontSize={34}
                fontColor="#fff"
                fontWeight="bold"
              />
              <CustomText
                value="Please fill the form to contine"
                fontSize={14}
                fontColor="#c2c2c2"
              />
            </FlexBox>
            <FlexBox
              style={{
                borderTopRightRadius: 50,
              }}
              backgroundColor={"white"}
              flex={1}
              paddingHorizontal={30}
              paddingVertical={40}
              gap={20}
            >
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
                  />
                )}
                name="email"
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomDropdown
                    options={USER_ROLES}
                    onValueChange={onChange}
                    value={value}
                    label="Role"
                    errorMessage={"Role is required"}
                    error={errors.role ? true : false}
                  />
                )}
                name="role"
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    placeholder="Password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    label="Password"
                    errorMessage={"Password is required"}
                    error={errors.password ? true : false}
                    secureTextEntry
                  />
                )}
                name="password"
              />

              <CustomButton onPress={handleSubmit(onSubmit)}>
                Register
              </CustomButton>

              <FlexBox flexDirection="row" justifyContent="center" gap={5}>
                <CustomText
                  fontWeight="bold"
                  value="Already have an account?"
                  fontSize={14}
                />
                <Pressable
                  onPress={() => {
                    router.push("/(public)/login");
                  }}
                >
                  <CustomText
                    fontWeight="bold"
                    value="Login"
                    fontSize={14}
                    fontColor={PRIMARY_COLOR}
                  />
                </Pressable>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
