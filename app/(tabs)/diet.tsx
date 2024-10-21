import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ChatScreen() {
  async function getData() {
    const apiURL = "https://example.org/products.json";
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const response = await fetch("https://example.org/post", {
        method: "POST",
        body: JSON.stringify({ username: "example" }),
        headers: myHeaders,
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
    } catch (e) {
      console.error("An error has occurred: " + e);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={getData}>
        <Text style={styles.text}>Press to obtain data!!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    color: "blue",
  },
});
