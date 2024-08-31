import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  VStack,
  FormControl,
  Input,
  Button,
  Text,
  Center,
  Box,
} from "native-base";
import ScreenWrapper from "../../components/screen/ScreenWrapper";
import Header from "../../components/header/Header";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import Avatar from "../../components/avatar/Avatar";
import { hp } from "../../helpers/common";
import Icon from "../../assets/icons";
import { themes } from "../../constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";

// Define the validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  //   image: Yup.mixed().required("Image is required"),
});

// Define the initial values for the form
const initialValues = {
  username: "",
  name: "",
  email: "",
  image: null,
  bio: "",
};

// Handle form submission
const onSubmit = (values) => {
  // Handle form submission, e.g., send data to server
  console.log(values);
};

const EditProfileForm = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      console.log("user id >>>,", id);
    }
  });
  return (
    <ScreenWrapper>
      <Box>
        <Header title={"Edit Profile"} />
        <TouchableOpacity
          style={styles.passwordButton}
          onPress={() => router.push("main/Password")}
        >
          <Icon name={"passwordSecurity"} color={themes.colors.primary} />
        </TouchableOpacity>
      </Box>
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
              <FormControl isInvalid={touched.image && errors.image}>
                <Center>
                  <View style={styles.avatarContainer}>
                    <Avatar uri={""} size={hp(12)} rounded={50} />
                    <Pressable
                      style={styles.editIcon}
                      onPress={() => console.log("touched")}
                    >
                      <Icon name={"camera"} strokeWidth={2.5} size={20} />
                    </Pressable>
                  </View>
                </Center>
                {/* <Input
                      name="image"
                      placeholder="Upload image"
                      onBlur={handleBlur("image")}
                      onChange={(event) => {
                        // Handle file upload
                        const file = event.target.files[0];
                        setFieldValue("image", file);
                      }}
                      type="file"
                    /> */}
                <FormControl.ErrorMessage>
                  {errors.image}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={touched.username && errors.username}>
                <FormControl.Label>Username</FormControl.Label>
                <Input
                  size={"lg"}
                  name="username"
                  placeholder="Username"
                  onBlur={handleBlur("username")}
                  onChangeText={handleChange("username")}
                  value={values.username}
                />
                <FormControl.ErrorMessage>
                  {errors.username}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isInvalid={touched.name && errors.name}>
                <FormControl.Label>Name</FormControl.Label>
                <Input
                  size={"lg"}
                  name="name"
                  placeholder="Name"
                  onBlur={handleBlur("name")}
                  onChangeText={handleChange("name")}
                  value={values.name}
                />
                <FormControl.ErrorMessage>
                  {errors.name}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isInvalid={touched.email && errors.email}>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  size={"lg"}
                  name="email"
                  placeholder="Email"
                  keyboardType="email-address"
                  onBlur={handleBlur("email")}
                  onChangeText={handleChange("email")}
                  value={values.email}
                />
                <FormControl.ErrorMessage>
                  {errors.email}
                </FormControl.ErrorMessage>
              </FormControl>

              <Button size={"lg"} onPress={handleSubmit} colorScheme="green">
                Update
              </Button>
            </VStack>
          )}
        </Formik>
      </Center>
    </ScreenWrapper>
  );
};

export default EditProfileForm;

const styles = StyleSheet.create({
  avatarContainer: {
    height: hp(14),
    width: hp(14),
  },
  editIcon: {
    position: "absolute",
    bottom: 10,
    right: 20,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: themes.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  passwordButton: {
    position: "absolute",
    right: 20,
    padding: 5,
    borderRadius: themes.radius.sm,
    backgroundColor: themes.colors.gray,
  },
});
