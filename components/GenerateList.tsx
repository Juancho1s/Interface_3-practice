import { View, Image, Text, StyleSheet, useColorScheme } from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

interface profile {
  userName: string;
  userFigure: string;
  userScore: number;
  userProgress: number;
}

interface ProfileProps {
  profiles: Array<profile>;
}

export default function GenerateList({ profiles }: ProfileProps) {
  const systemTheme = useColorScheme();

  return (
    <View>
      {/* ProfileCard structure */}
      {profiles.map((user: profile, index: number) => (
        <View
          style={[
            styles.cardContainer,
            {
              backgroundColor:
                systemTheme === "dark"
                  ? Colors.dark.backgroundBasic
                  : Colors.light.backgroundBasic,
            },
          ]}
          key={`Compettitor-Number-${index}`}
        >
          <View style={styles.positionContainer}>
            <ThemedText
              lightColor="#fff"
              style={{ fontWeight: "bold", color: "#8f8f8f" }}
            >
              {index + 1}
            </ThemedText>
          </View>
          <View
            style={[
              styles.usersContainer,
              index < profiles.length - 1 && styles.separatorLine,
              {
                borderColor:
                  systemTheme === "dark"
                    ? "rgba(255,255,255,.1)"
                    : "rgba(128,128,128,0.1)",
              }, // Apply line only between cards
            ]}
          >
            <View style={styles.UserBasic}>
              {/* Avatar Image */}
              <View>
                <Image
                  source={{ uri: user.userFigure }}
                  style={styles.userImage}
                ></Image>
              </View>

              {/* Basic information */}
              <View>
                <Text
                  style={[
                    styles.userName,
                    {
                      color:
                        systemTheme === "dark"
                          ? Colors.dark.text
                          : Colors.light.text,
                    },
                  ]}
                >
                  {user.userName}
                </Text>
                <ThemedText lightColor="#fff" style={styles.userScore}>
                  {user.userScore}
                </ThemedText>
              </View>
            </View>

            {/* Progress status */}
            <View>
              <ThemedText style={[styles.userProgress, { color: "green" }]}>
                {user.userProgress}
              </ThemedText>
            </View>
          </View>
        </View>
      ))}
    </View>
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
