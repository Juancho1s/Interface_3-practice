import { Ionicons } from "@expo/vector-icons";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

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
          <ThemedText
            numberOfLines={1}
            // ellipsizeMode="tail"
            lightColor="#fff"
            style={styles.userName}
          >
            {profile.userName}
          </ThemedText>
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
