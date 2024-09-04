import React, { useEffect, useState } from "react";
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
  TextArea,
} from "native-base";
import ScreenWrapper from "../../components/screen/ScreenWrapper";
import Header from "../../components/header/Header";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import Avatar from "../../components/avatar/Avatar";
import { hp } from "../../helpers/common";
import Icon from "../../assets/icons";
import { themes } from "../../constants/theme";
import { useRouter } from "expo-router";
import { getMe } from "../../services/AuthUser";

// Define the validation schema using Yup
const validationSchema = Yup.object({
  userName: Yup.string().required("userName is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  //   image: Yup.mixed().required("Image is required"),
});

// Define the initial values for the form

// Handle form submission
const onSubmit = (values) => {
  // Handle form submission, e.g., send data to server
  console.log(values);
};

const EditProfileForm = () => {
  const [userEdit, setUserEdit] = useState({});
  const router = useRouter();
  const fetchDetailUser = async () => {
    const data = await getMe();
    setUserEdit(data.user);
  };

  useEffect(() => {
    fetchDetailUser();
  }, []);

  useEffect(() => {
    console.log('me"">>>>', userEdit);
  }, [userEdit]);
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
          initialValues={{
            userName: userEdit.userName || "",
            displayName: userEdit.displayName || "",
            phone: userEdit.phone || "",
            email: userEdit.email || "",
            avatar: userEdit.avatar || null,
            bio: userEdit.bio || "",
          }}
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
          }) => {
            useEffect(() => {
              if (userEdit) {
                setFieldValue("userName", userEdit.userName);
                setFieldValue("displayName", userEdit.displayName);
                setFieldValue("email", userEdit.email);
                setFieldValue("phone", userEdit.phone || "");
                setFieldValue("bio", userEdit.bio || "");
                setFieldValue("avatar", userEdit.avatar || "");
              }
            }, [userEdit]);
            return (
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
                <FormControl isInvalid={touched.userName && errors.userName}>
                  <FormControl.Label>userName</FormControl.Label>
                  <Input
                    size={"lg"}
                    name="userName"
                    placeholder="userName"
                    onBlur={handleBlur("userName")}
                    onChangeText={handleChange("userName")}
                    value={values.userName}
                  />
                  <FormControl.ErrorMessage>
                    {errors.userName}
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={touched.displayName && errors.displayName}
                >
                  <FormControl.Label>Display Name</FormControl.Label>
                  <Input
                    size={"lg"}
                    name="displayName"
                    placeholder="Display Name"
                    onBlur={handleBlur("displayName")}
                    onChangeText={handleChange("displayName")}
                    value={values.displayName}
                  />
                  <FormControl.ErrorMessage>
                    {errors.displayName}
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
                <FormControl isInvalid={touched.phone && errors.phone}>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    size={"lg"}
                    name="phone"
                    placeholder="Email"
                    keyboardType="name-phone-pad"
                    onBlur={handleBlur("phone")}
                    onChangeText={handleChange("phone")}
                    value={values.phone}
                  />
                  <FormControl.ErrorMessage>
                    {errors.phone}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.bio && errors.bio}>
                  <FormControl.Label>Bio</FormControl.Label>
                  <TextArea
                    size={"lg"}
                    name="bio"
                    placeholder="Bio"
                    onBlur={handleBlur("bio")}
                    onChangeText={handleChange("bio")}
                    value={values.bio}
                  />
                  <FormControl.ErrorMessage>
                    {errors.bio}
                  </FormControl.ErrorMessage>
                </FormControl>

                <Button size={"lg"} onPress={handleSubmit} colorScheme="green">
                  Update
                </Button>
              </VStack>
            );
          }}
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
