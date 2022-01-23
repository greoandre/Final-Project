import { StyleSheet, FlatList } from "react-native";
import { Box, Text, Button } from "native-base";

import { useQuery } from "@apollo/client";
import { GET_LEVEL } from "../../queries";
// import ErrorPage from "../components/errorPage";
// import LoadingPage from "../components/loadingPage";

export default function LevelButton({ navigation }) {
  const { loading, error, data } = useQuery(GET_LEVEL);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;

  return (
    <FlatList
      horizontal
      data={data.getLevel}
      renderItem={({ item }) => {
        return (
          <Box style={styles.buttonLevel}>
            <Button
              style={styles.buttonName}
              size="lg"
              variant="subtle"
              colorScheme="secondary"
              onPress={() =>
                navigation.navigate("LevelFilter", {
                  id: item.id,
                  levelName: item.name,
                })
              }
            >
              {item.name}
            </Button>
          </Box>
        );
      }}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  buttonLevel: {
    margin: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonName: {
    marginLeft: 25,
  },
});
