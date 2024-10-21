import { Ionicons } from "@expo/vector-icons";
import { Animated, Text,  StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

interface profile {
  userName: string;
  userFigure: string;
  userScore: number;
  userProgress: number;
}
interface Props {
  imageScale: number;
  imageOpacity: number;
  medalSize: number;
  medalColor: string;
  checkingProfile: () => void;
}

interface profileProps {
  profile: profile;
}

export default function PodiumProfiles({
  profile,
  imageScale,
  imageOpacity,
  medalSize,
  medalColor,
  checkingProfile,
}: profileProps & Props) {

  const systemTheme = useColorScheme();

  return (
    <View style={[styles.basicPodiumsContainer]}>
      <TouchableOpacity
        style={{
          alignItems: "center",
        }}
        onPress={() => checkingProfile()}
      >
        <Animated.Image
          style={[
            styles.firstPodium, {
              height: imageScale,
              width: imageScale,
              opacity: imageOpacity
            }
          ]}
          source={{ uri: profile.userFigure }}
        />
        <View style={[styles.basicPodiumsContainer, { flex: 0 }]}>
          <Ionicons name="medal" size={medalSize} color={medalColor} />
          <Text
            numberOfLines={1}
            style={[styles.userName, {
              // color: systemTheme === "dark" ? Colors.dark.text : Colors.light.text
              color: "black"
            }]}
          >
            {profile.userName}
          </Text>
          <ThemedText lightColor="#fff" style={styles.userScore}>
            {profile.userScore}
          </ThemedText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userScore: {
    fontSize: 16,
    color: "#8f8f8f",
  },

  // Podium styles
  basicPodiumsContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center", // Center the podiums horizontally
    paddingVertical: 10,
  },
  firstPodium: {
    borderRadius: 100, // Make the image circular
    backgroundColor: "#dcdcdc",
    elevation: 10,
    marginBottom: -15
  },
});
