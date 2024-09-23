import { Pressable, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import {
  Text,
  Input,
  Box,
  FlatList,
  VStack,
  HStack,
  Avatar,
  Divider,
  Icon,
  Button,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import ScreenWrapper from "../../components/screen/ScreenWrapper";
import { searchUser } from "../../services/UserService";
import { debounce } from "../../helpers/debounce";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

const SearchUser = () => {
  const { authUser } = useAuth();
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef("");
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);

  const fetchListUser = async (userKeyword) => {
    try {
      if (!userKeyword) return;
      console.log(userKeyword);
      setIsSearching(true);
      const data = await searchUser(userKeyword);
      if (data) {
        setSearchResults(data.users);
      }
    } catch (error) {
      console.log("err when seach>>>", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = debounce((value) => {
    searchRef.current = value;
    fetchListUser(value);
  }, 500);

  const renderItem = ({ item }) => (
    <VStack>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "main/Profile",
            params: {
              userId: item._id,
              auth: authUser._id === item._id ? "me" : "not",
            },
          })
        }
      >
        <HStack
          space={3}
          alignItems="center"
          padding={3}
          justifyContent={"space-between"}
        >
          <HStack alignItems={"center"} space={2}>
            <Avatar size="48px" source={{ uri: item.avatar }} />
            <VStack>
              <Text fontSize="16" bold>
                {item.displayName}
              </Text>
              <Text fontSize={12}>99 followers</Text>
            </VStack>
          </HStack>
          <Button size="sm" variant="outline">
            Follow
          </Button>
        </HStack>
      </Pressable>

      <Divider />
    </VStack>
  );

  return (
    <ScreenWrapper>
      <VStack space={4} paddingX={3} paddingY={2}>
        <Text bold fontSize={24}>
          Search
        </Text>
        <Box>
          <Input
            fontSize={16}
            ref={searchRef}
            placeholder="Search"
            onChangeText={(value) => handleSearch(value)}
            variant="filled"
            width="100%"
            borderRadius="10"
            py="3"
            px="4"
            InputLeftElement={
              <Icon
                ml="2"
                size="5"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
          />
        </Box>
        {isSearching ? (
          <Text>{`Searching for "${searchRef.current}"`}</Text>
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
          />
        )}
      </VStack>
    </ScreenWrapper>
  );
};

export default SearchUser;

const styles = StyleSheet.create({});
