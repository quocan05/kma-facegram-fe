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
  useToast,
} from "native-base";
import Header from "../../components/header/Header";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import Avatar from "../../components/avatar/Avatar";
import { convertImageToBlob, hp } from "../../helpers/common";
import Icon from "../../assets/icons";
import { themes } from "../../constants/theme";
import { useRouter } from "expo-router";
import { getMe } from "../../services/AuthUser";
import { editUser } from "../../services/UserService";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../services/ImageService";

// Define the validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const EditProfileForm = () => {
  const [userEdit, setUserEdit] = useState({});
  const [avatarUser, setAvatarUser] = useState();
  const [mediaFiles, setMediaFiles] = useState([]);
  const router = useRouter();
  const toast = useToast();

  const fetchDetailUser = async () => {
    try {
      const data = await getMe();
      setUserEdit(data.user);
      setAvatarUser(data.user.avatar);
    } catch (error) {
    } finally {
      console.log("fetch user to edit :>>>>>>", avatarUser);
    }
  };

  const handleUploadImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!res.canceled) {
      const newAvatar = res.assets[0].uri;
      setMediaFiles([newAvatar]);
      setAvatarUser(newAvatar);
    }
  };

  const onSubmit = async (values) => {
    try {
      if (mediaFiles.length > 0) {
        const urlAvatar = await uploadImage(mediaFiles);
        if (urlAvatar) {
          console.log("url avatar>>>", urlAvatar.urls);
          await editUser({ ...values, avatar: urlAvatar.urls[0] });
          toast.show({
            placement: "top",
            description: "Update profie and avatar successfully !!",
          });
        }
      } else {
        await editUser(values);
        toast.show({
          placement: "top",
          description: "Update successfully !!",
        });
      }
    } catch (error) {
      console.log("err when update>>>", error.response);
    }
  };

  useEffect(() => {
    fetchDetailUser();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                firstName: userEdit.firstName || "",
                lastName: userEdit.lastName || "",
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
                    setFieldValue("firstName", userEdit.firstName);
                    setFieldValue("lastName", userEdit.lastName);
                    setFieldValue("email", userEdit.email);
                    setFieldValue("phone", userEdit.phone || "");
                    setFieldValue("bio", userEdit.bio || "");
                    setFieldValue("avatar", avatarUser || "");
                  }
                }, [userEdit]);

                return (
                  <VStack width="90%" space={4}>
                    <FormControl isInvalid={touched.image && errors.image}>
                      <Center>
                        <View style={styles.avatarContainer}>
                          <Avatar uri={avatarUser} size={hp(12)} rounded={50} />
                          <Pressable
                            style={styles.editIcon}
                            onPress={() => handleUploadImage()}
                          >
                            <Icon name={"camera"} strokeWidth={2.5} size={20} />
                          </Pressable>
                        </View>
                      </Center>
                      <FormControl.ErrorMessage>
                        {errors.image}
                      </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={touched.firstName && errors.firstName}
                    >
                      <FormControl.Label>First Name</FormControl.Label>
                      <Input
                        size={"lg"}
                        name="firstName"
                        placeholder="First Name"
                        onBlur={handleBlur("firstName")}
                        onChangeText={handleChange("firstName")}
                        value={values.firstName}
                      />
                      <FormControl.ErrorMessage>
                        {errors.firstName}
                      </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={touched.lastName && errors.lastName}
                    >
                      <FormControl.Label>Last Name</FormControl.Label>
                      <Input
                        size={"lg"}
                        name="lastName"
                        placeholder="Last Name"
                        onBlur={handleBlur("lastName")}
                        onChangeText={handleChange("lastName")}
                        value={values.lastName}
                      />
                      <FormControl.ErrorMessage>
                        {errors.lastName}
                      </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={touched.email && errors.email}>
                      <FormControl.Label>Email(readonly)</FormControl.Label>
                      <Input
                        isDisabled
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
                      <FormControl.Label>Phone(readonly)</FormControl.Label>
                      <Input
                        size={"lg"}
                        name="phone"
                        isDisabled
                        placeholder="Phone"
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
                    <Button
                      size={"lg"}
                      onPress={handleSubmit}
                      colorScheme="green"
                    >
                      Update
                    </Button>
                  </VStack>
                );
              }}
            </Formik>
          </Center>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
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
