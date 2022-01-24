import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Native Base
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  useToast,
  IconButton,
  CloseIcon,
  Alert,
  Spinner,
} from "native-base";

// Component
import { SIGN_IN } from "../../mutations";

export default function SignIn({ navigation, route }) {
  const toast = useToast();
  // const [successActivate, showSuccessActivate] = useState(null);
  useEffect(() => {
    if (route.params?.message) {
      toast.show({
        title: "Success Activated Your Account",
        status: "success",
        placement: "top"
      })
    }
  }, []);

  const [signInUser, {}] = useMutation(SIGN_IN);
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });
  const [newError, setNewError] = useState({
    status: "error",
    message: null,
  });
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const submitLogin = (e) => {
    e.preventDefault();
    console.log(signIn);
    signInUser({
      variables: {
        email: signIn.email,
        password: signIn.password,
      },
    })
      .then((res) => {
        console.log({ res });
        if (res.data?.signInUser?.error) {
          const errors = res.data.signInUser.error;
          setNewError({
            ...newError,
            message: errors,
          });
        } else {
          setIsLogin(true);
          console.log({ res });
          const {access_token, isRegister} = res.data?.signInUser;
          storeData("@access_token", access_token);
          if(isRegister === "true") navigation.navigate("ContentContainer");
          else navigation.navigate("UserProfileStack");
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  // Alert Message
  useEffect(async () => {
    if (route.params) {
      console.log(route.params);
      setIsLogin(false);
    }
    // Invoking Local Storage
    getStorage();
    setLoading(false);
    removeStorage('@access_token')
  }, []);

  // Local Storage
  const storeData = async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
      setLoading(false);
    } catch (e) {
      // saving error
      console.error(e);
    }
  };

  const getStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("@access_token");
      if (value !== null) {
        // value previously stored
        // console.log(value);
        setLoading(false);
        navigation.navigate("UserProfileStack");
      }
    } catch (e) {
      // error reading value
      console.error(e);
    }
  };

  const removeStorage = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      setLoading(false);
      return true;
    } catch (exception) {
      return false;
    }
  };
  // console.log(loading);

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        {loading ? (
          <HStack space={2} alignItems="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
              Loading
            </Heading>
          </HStack>
        ) : (
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            {/* {successActivate && (
              <Alert w="100%" status="info" colorScheme="info">
                <VStack space={2} flexShrink={1} w="100%">
                  <HStack
                    flexShrink={1}
                    space={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <HStack flexShrink={1} space={2} alignItems="center">
                      <Alert.Icon />
                      <Text
                        fontSize="md"
                        fontWeight="medium"
                        color="coolGray.800"
                      >
                        Success Activated Your Account
                      </Text>
                    </HStack>
                    <IconButton
                      variant="unstyled"
                      icon={<CloseIcon size="3" color="coolGray.600" />}
                    />
                  </HStack>
                  <Box
                    pl="6"
                    _text={{
                      color: "coolGray.600",
                    }}
                  >
                    You can sign in to Active8 now!
                  </Box>
                </VStack>
              </Alert>
            )} */}
            <Heading
              size="2xl"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              style={{ textAlign: "center" }}
            >
              Welcome
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
              style={{ textAlign: "center" }}
            >
              Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
              {isLogin ? (
                <Alert w="100%" status={newError.status}>
                  <VStack space={2} flexShrink={1} w="100%">
                    <HStack
                      flexShrink={1}
                      space={2}
                      justifyContent="space-between"
                    >
                      <HStack space={2} flexShrink={1}>
                        <Alert.Icon mt="1" />
                        <Text
                          fontSize="md"
                          textAlign="center"
                          color="coolGray.800"
                        >
                          {newError.message}
                        </Text>
                      </HStack>
                      {/* <IconButton
                            variant="unstyled"
                            icon={<CloseIcon size="3" color="coolGray.600" />}
                          /> */}
                    </HStack>
                  </VStack>
                </Alert>
              ) : (
                route.params && (
                  <Alert w="100%" status={route.params.status}>
                    <VStack space={2} flexShrink={1} w="100%">
                      <HStack
                        flexShrink={1}
                        space={2}
                        justifyContent="space-between"
                      >
                        <HStack space={2} flexShrink={1}>
                          <Alert.Icon mt="1" />
                          <Text
                            fontSize="md"
                            textAlign="center"
                            color="coolGray.800"
                          >
                            {route.params.message}
                          </Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </Alert>
                )
              )}
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  type="text"
                  name="email"
                  placeholder="input email..."
                  onChangeText={(value) =>
                    setSignIn({ ...signIn, email: value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="input password..."
                  onChangeText={(value) =>
                    setSignIn({ ...signIn, password: value })
                  }
                />
              </FormControl>
              <Button
                mt="2"
                colorScheme="indigo"
                style={{ marginTop: 25 }}
                onPress={(e) => submitLogin(e)}
              >
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Do not have a credentials ?{" "}
                </Text>
                <Text
                  _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  style={{ color: "indigo" }}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  Sign Up
                </Text>
              </HStack>
            </VStack>
          </Box>
        )}
      </Center>
    </NativeBaseProvider>
  );
}
