import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../../components/screen/ScreenWrapper";
import Header from "../../components/header/Header";
import { Button, Center, FormControl, Input, VStack } from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import Icon from "../../assets/icons";

const Password = () => {
  const { id } = useLocalSearchParams();
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string().required("New password is required"),
    newPasswordAgain: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your new password"),
  });
  const initialValues = {
    uid: "",
    currentPassword: "",
    newPassword: "",
    newPasswordAgain: "",
  };

  const onSubmit = (values) => {
    // handle form submission
    console.log(values);
  };

  useEffect(() => {
    console.log("uid:", id);
  });
  return (
    <ScreenWrapper>
      <Header title={"Change Password"} />
      <Center>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <VStack width="80%" space={4}>
              <FormControl
                isInvalid={touched.currentPassword && errors.currentPassword}
              >
                <FormControl.Label>Current password</FormControl.Label>
                <Input
                  InputLeftElement={<Icon name={"lock"} ml={20} />}
                  size={"lg"}
                  name="currentPassword"
                  placeholder="Enter your old password"
                  onBlur={handleBlur("currentPassword")}
                  onChangeText={handleChange("currentPassword")}
                  value={values.currentPassword}
                />
                <FormControl.ErrorMessage>
                  {errors.currentPassword}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={touched.newPassword && errors.newPassword}
              >
                <FormControl.Label>New password</FormControl.Label>
                <Input
                  size={"lg"}
                  InputLeftElement={<Icon name={"lock"} ml={20} />}
                  name="newPassword"
                  placeholder="Enter your new password"
                  onBlur={handleBlur("newPassword")}
                  onChangeText={handleChange("newPassword")}
                  value={values.newPassword}
                />
                <FormControl.ErrorMessage>
                  {errors.newPassword}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={touched.newPasswordAgain && errors.newPasswordAgain}
              >
                <FormControl.Label>New password again</FormControl.Label>
                <Input
                  size={"lg"}
                  InputLeftElement={<Icon name={"lock"} ml={20} />}
                  name="newPasswordAgain"
                  placeholder="Enter new password again"
                  onBlur={handleBlur("newPasswordAgain")}
                  onChangeText={handleChange("newPasswordAgain")}
                  value={values.newPasswordAgain}
                />
                <FormControl.ErrorMessage>
                  {errors.newPasswordAgain}
                </FormControl.ErrorMessage>
              </FormControl>

              <Button size={"lg"} onPress={handleSubmit} colorScheme="green">
                Change your password
              </Button>
            </VStack>
          )}
        </Formik>
      </Center>
    </ScreenWrapper>
  );
};

export default Password;

const styles = StyleSheet.create({});
