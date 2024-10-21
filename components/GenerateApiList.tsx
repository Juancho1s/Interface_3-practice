import { View, Image, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { useEffect, useState } from "react";
import { ScrollView } from "moti";

interface user {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface userProps {
  users: Array<user>;
}

export default function GenerateApiList() {
    const [data, setData] = useState<userProps | null>(null);

  const profiles = async (): Promise<userProps> => {
    const response = await fetch("https://reqres.in/api/users?page=2");
    const json = await response.json();
    return { users: json.data }; // Ensure it returns an object with "users" property
  };

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await profiles(); // Wait for the promise to resolve
      setData(profileData); // Update state after data is fetched
    };
    fetchData();
  }, []); // Empty dependency array to run once when the component mounts

  return (
    <ScrollView>
      {/* ProfileCard structure */}
      {data?.users.map((user: user, index: number) => (
        <View style={styles.cardContainer} key={`Compettitor-Number-${index}`}>
          <View style={styles.positionContainer}>
            <ThemedText
              lightColor="#fff"
              style={{ fontWeight: "bold", color: "#8f8f8f" }}
            >
              {user.id}
            </ThemedText>
          </View>
          <View
            style={[
              styles.usersContainer,
              index < profiles.length - 1 && styles.separatorLine, // Apply line only between cards
            ]}
          >
            <View style={styles.UserBasic}>
              {/* Avatar Image */}
              <View>
                <Image
                  source={{ uri: user.avatar }}
                  style={styles.userImage}
                ></Image>
              </View>

              {/* Basic information */}
              <View>
                <ThemedText lightColor="#fff" style={styles.userName}>
                  {user.first_name}
                </ThemedText>
                <ThemedText lightColor="#fff" style={styles.userScore}>
                  {user.last_name}
                </ThemedText>
              </View>
            </View>

            {/* Progress status */}
            <View>
              <ThemedText style={[styles.userProgress, { color: "green" }]}>
                {user.first_name}
              </ThemedText>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 20,
    backgroundColor: "#202122",
  },
  positionContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  usersContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingRight: 20,
  },
  separatorLine: {
    borderBottomWidth: 2, // Line thickness
    borderBottomColor: "#dcdcdc", // Line color
    borderColor: "rgba(255,255,255,.1)",
  },
  UserBasic: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 15,
    backgroundColor: "#dcdcdc",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userScore: {
    fontSize: 16,
    color: "#8f8f8f",
  },
  userProgress: {
    fontSize: 16,
  },
});
