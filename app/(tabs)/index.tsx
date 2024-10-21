import {
  StyleSheet,
  View,
  Animated,
  Modal,
  useColorScheme,
} from "react-native";
import { Collapsible } from "@/components/Collapsible";
import { useRef, useState } from "react";
import PodiumProfiles from "@/components/PodiumProfile";
import { ProfileView } from "@/components/ProfilesView";
import GenerateList from "@/components/GenerateList";
import { Colors } from "@/constants/Colors";

interface profile {
  userName: string;
  userFigure: string;
  userScore: number;
  userProgress: number;
}

export default function HomeScreen() {
  const [checkingProfiles, setCheckingProfiles] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<profile | null>(null);

  const systemTheme = useColorScheme();

  const users = profiles();
  const medalSize = 60;

  const sections = [
    "September Ts 2018",
    "October TS 2018",
    "Lifting International",
    "Workout Season 2",
    "Workout TC 2019",
    "Workout TSC 2019",
  ];

  // Header animation parameters
  const scrollY = useRef(new Animated.Value(0)).current;

  // Create interpolated values for scale and opacity
  const podiumSecundaryImageScale = scrollY.interpolate({
    inputRange: [0, 85],
    outputRange: [85, 0],
    extrapolate: "clamp",
  });

  const podiumPrincipalImageScale = scrollY.interpolate({
    inputRange: [0, 130],
    outputRange: [130, 0],
    extrapolate: "clamp",
  });

  const checkingProfilesParams = (userIndex: number) => {
    setSelectedProfile(users[userIndex]);
    setCheckingProfiles(true);
  };

  return (
    <View style={[{ flex: 1 }]}>
      <Modal visible={checkingProfiles} animationType="fade">
        {/* Entire scrollable view */}
        <ProfileView
          userFigure={selectedProfile?.userFigure as string}
          userName={selectedProfile?.userName as string}
          backArrowFunction={() => setCheckingProfiles(false)}
        />
      </Modal>
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor:
              systemTheme === "dark"
                ? Colors.dark.backgroundSpecific
                : Colors.light.backgroundSpecific,
          },
        ]}
      >
        {/* Navigation collapsible element */}
        <Collapsible title={"Workout Season 2"} Items={sections} />

        {/* Podim view */}
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <PodiumProfiles
            checkingProfile={() => checkingProfilesParams(1)}
            imageScale={podiumSecundaryImageScale}
            imageOpacity={1}
            medalSize={medalSize}
            profile={users[1]}
            medalColor="#C0C0C0"
          />

          <PodiumProfiles
            checkingProfile={() => checkingProfilesParams(0)}
            imageScale={podiumPrincipalImageScale}
            imageOpacity={1}
            medalSize={medalSize}
            profile={users[0]}
            medalColor="#FFD700"
          />

          <PodiumProfiles
            checkingProfile={() => checkingProfilesParams(2)}
            imageScale={podiumSecundaryImageScale}
            imageOpacity={1}
            medalSize={medalSize}
            profile={users[2]}
            medalColor="#CD7F32"
          />
        </View>
      </View>

      {/* List of competitors */}
      <Animated.ScrollView
        style={[
          styles.container,
          {
            backgroundColor:
              systemTheme === "dark"
                ? Colors.dark.backgroundSpecific
                : Colors.light.backgroundSpecific,
          },
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* <GenerateApiList/> */}
        <GenerateList profiles={users} />
      </Animated.ScrollView>
    </View>
  );
}

const profiles = () => {
  const myUsers: Array<profile> = [];

  // Generate 10 user profiles
  for (let i = 0; i < 20; i++) {
    const name = () => {
      const names = [
        "John",
        "Juan",
        "Jane",
        "Bob",
        "Alice",
        "Mike",
        "Rober",
        "April",
        "Maldonado",
        "Octavio",
        "Abraham",
        "Rojer",
        "Luis",
        "Luisa",
        "Luisito",
      ];
      const lastNames = [
        "Salvador",
        "Ramirez",
        "Smit",
        "Alababama",
        "Lopez",
        "Izquierda",
        "Perez",
        "Garcia",
        "Hernandez",
        "Rodriguez",
        "Gonzalez",
        "Martinez",
        "Diaz",
        "Torres",
        "Florentino",
      ];
      return `${names[Math.floor(Math.random() * names.length)]} ${
        lastNames[Math.floor(Math.random() * lastNames.length)]
      }`;
    };
    myUsers.push({
      userName: name(),
      userFigure: `https://picsum.photos/id/${Math.floor(
        Math.random() * 1000
      )}/200/200`,
      userScore: Math.floor(Math.random() * 10000),
      userProgress: Math.floor(Math.random() * 21) - 10, // Random between -10 and 10
    });
  }

  // Sort profiles by userScore in descending order
  myUsers.sort((a, b) => b.userScore - a.userScore);

  return myUsers;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e2f32",
  },
  headerContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#2e2f32",
  },
});
