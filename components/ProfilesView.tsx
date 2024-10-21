import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  useColorScheme,
} from "react-native";
import { IntersectionObserver } from "react-native-intersection-observer"; // Import the observer hook
import { GenerateGraph } from "./Graphic";
import CirclePercentage from "./GenerateCirclePercent";
import { useState } from "react";
import { Colors } from "@/constants/Colors";

interface profile {
  userName: string;
  userFigure: string;
}
interface functionality {
  backArrowFunction: () => void;
}

export function ProfileView({
  userFigure,
  userName,
  backArrowFunction,
}: profile & functionality) {
  const systemTheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            systemTheme === "dark"
              ? Colors.dark.backgroundBasic
              : Colors.light.backgroundBasic,
        },
      ]}
    >
      {/* Navigation icons */}
      <View style={[styles.rowCenter, { padding: 10 }]}>
        <Ionicons
          size={25}
          name="chevron-back"
          color={"#dcdcdc"}
          onPress={backArrowFunction}
        />
        <Ionicons size={25} name="ellipsis-horizontal" color={"#dcdcdc"} />
      </View>
      <ScrollView>
        <View style={{ padding: 20 }}>
          {/* Profile Presentation */}
          <View style={[styles.centering, {}]}>
            <Image
              style={[styles.profileImage, {}]}
              source={{ uri: userFigure }}
            />
            <View style={[styles.centering, { paddingBottom: 15 }]}>
              <Text
                style={[
                  styles.fontTitle,
                  {
                    color:
                      systemTheme === "dark"
                        ? Colors.dark.text
                        : Colors.light.text,
                  },
                ]}
              >
                {userName}
              </Text>
              <Text style={[styles.fontTiny, {}]}>Lorem, ipsum dolor.</Text>
            </View>
          </View>

          {/* Profile Characteristics */}
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                paddingVertical: 15,
              },
            ]}
          >
            <View style={[styles.centering, {}]}>
              <View
                style={[
                  styles.centering,
                  {
                    flexDirection: "row",
                    gap: 5,
                  },
                ]}
              >
                <Ionicons name="trophy" color="gold" size={20} />
                <Text
                  style={[
                    styles.fontMedium,
                    {
                      color:
                        systemTheme === "dark"
                          ? Colors.dark.text
                          : Colors.light.text,
                    },
                  ]}
                >
                  1
                </Text>
              </View>
              <Text style={[styles.fontTiny, {}]}>Ranking</Text>
            </View>
            <View style={[styles.centering, {}]}>
              <Text
                style={[
                  styles.fontMedium,
                  {
                    color:
                      systemTheme === "dark"
                        ? Colors.dark.text
                        : Colors.light.text,
                  },
                ]}
              >
                3 214
              </Text>
              <Text style={[styles.fontTiny, {}]}>Points</Text>
            </View>
            <View style={[styles.centering, {}]}>
              <Text
                style={[
                  styles.fontMedium,
                  {
                    color:
                      systemTheme === "dark"
                        ? Colors.dark.text
                        : Colors.light.text,
                  },
                ]}
              >
                24
              </Text>
              <Text style={[styles.fontTiny, {}]}>Goal streaks</Text>
            </View>
          </View>

          {/* Asociated coach */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor:
                systemTheme === "dark"
                  ? Colors.dark.backgroundSpecific
                  : Colors.light.backgroundSpecific,
              paddingHorizontal: 30,
              paddingBottom: 20,
              marginTop: 40,
              elevation: 5,
            }}
          >
            <View
              style={[
                styles.centering,
                {
                  gap: 10,
                },
              ]}
            >
              <View style={{ elevation: 5 }}>
                <Image
                  source={{ uri: `https://picsum.photos/id/20/200/200` }}
                  style={{ height: 120, width: 100, marginTop: -50 }}
                />
              </View>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Ionicons name="star" color="gold" size={10} />
                <Ionicons name="star" color="gold" size={10} />
                <Ionicons name="star" color="gold" size={10} />
                <Ionicons name="star" color="gold" size={10} />
                <Ionicons name="star-half" color="gold" size={10} />
              </View>
            </View>
            <View style={{ gap: 20, marginLeft: 20 }}>
              <View>
                <Text
                  style={[
                    styles.fontSmall,
                    {
                      color:
                        systemTheme === "dark"
                          ? Colors.dark.text
                          : Colors.light.text,
                    },
                  ]}
                >
                  Sarah Stratfor
                </Text>
                <Text style={[styles.fontTiny, {}]}>Personal Coach</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 30 }}>
                <View>
                  <Text
                    style={[
                      styles.fontSmall,
                      {
                        color:
                          systemTheme === "dark"
                            ? Colors.dark.text
                            : Colors.light.text,
                      },
                    ]}
                  >
                    241
                  </Text>
                  <Text style={[styles.fontTiny, {}]}>Students</Text>
                </View>
                <View>
                  <Text
                    style={[
                      styles.fontSmall,
                      {
                        color:
                          systemTheme === "dark"
                            ? Colors.dark.text
                            : Colors.light.text,
                      },
                    ]}
                  >
                    24
                  </Text>
                  <Text style={[styles.fontTiny, {}]}>Champions</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View>
          {/* Graphic indicators */}
          <View
            style={[
              styles.rowCenter,
              { paddingHorizontal: 20, paddingBottom: 20 },
            ]}
          >
            <Text style={[styles.fontMedium]}>Progress</Text>
            <View style={[styles.rowCenter, { gap: 15 }]}>
              <View style={[styles.rowCenter, { gap: 5 }]}>
                <Ionicons name="radio-button-on" color={"#51d1f6"} />
                <Text style={[styles.fontTiny]}>Current</Text>
              </View>
              <View style={[styles.rowCenter, { gap: 5 }]}>
                <Ionicons
                  name="radio-button-on"
                  color={
                    systemTheme === "dark"
                      ? Colors.dark.backgroundSpecific
                      : Colors.light.backgroundSpecific
                  }
                />
                <Text style={[styles.fontTiny]}>Goal</Text>
              </View>
            </View>
          </View>

          {/* Graphic view */}
          <View>
            <GenerateGraph />
          </View>
        </View>

        {/* Fotter of the profile */}
        <View
          style={[
            {
              backgroundColor:
                systemTheme === "dark"
                  ? Colors.dark.backgroundSpecific
                  : Colors.light.backgroundSpecific,
            },
          ]}
        >
          {/* Steps indicator */}
          <View
            style={[
              { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
            ]}
          >
            <Text style={[styles.fontTiny, {}]}>Steps</Text>
            <Text
              style={[
                styles.fontHiuge,
                {
                  color:
                    systemTheme === "dark"
                      ? Colors.dark.text
                      : Colors.light.text,
                },
              ]}
            >
              11 476
            </Text>
          </View>

          {/* Basic stats random change*/}
          <View
            style={[
              {
                borderColor:
                  systemTheme === "dark" ? Colors.dark.text : Colors.light.text,
                borderBottomWidth: 0.5,
                borderTopWidth: 0.5,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
              },
            ]}
          >
            <View style={[styles.centering, { padding: 10 }]}>
              <Text style={[styles.fontTiny, {}]}>Kilometers</Text>
              <Text
                style={[
                  styles.fontMedium,
                  {
                    color:
                      systemTheme === "dark"
                        ? Colors.dark.text
                        : Colors.light.text,
                  },
                ]}
              >
                7.8
              </Text>
            </View>
            <View
              style={[
                {
                  borderLeftWidth: 0.5,
                  borderColor:
                    systemTheme === "dark"
                      ? Colors.dark.text
                      : Colors.light.text,
                },
              ]}
            ></View>
            <View style={[styles.centering, { padding: 10 }]}>
              <Text style={[styles.fontTiny, {}]}>Calories</Text>
              <Text
                style={[
                  styles.fontMedium,
                  {
                    color:
                      systemTheme === "dark"
                        ? Colors.dark.text
                        : Colors.light.text,
                  },
                ]}
              >
                252
              </Text>
            </View>
            <View
              style={[
                {
                  borderLeftWidth: 0.5,
                  borderColor:
                    systemTheme === "dark"
                      ? Colors.dark.text
                      : Colors.light.text,
                },
              ]}
            ></View>
            <View style={[styles.centering, { padding: 10 }]}>
              <Text style={[styles.fontTiny, {}]}>Points</Text>
              <Text
                style={[
                  styles.fontMedium,
                  {
                    color:
                      systemTheme === "dark"
                        ? Colors.dark.text
                        : Colors.light.text,
                  },
                ]}
              >
                73
              </Text>
            </View>
          </View>

          {/* Final references */}
          <View style={[{ padding: 20, gap: 20 }]}>
            <Text
              style={[
                styles.fontMedium,
                {
                  color:
                    systemTheme === "dark"
                      ? Colors.dark.text
                      : Colors.light.text,
                },
              ]}
            >
              Exercise Done
            </Text>
            <View style={[styles.rowCenter]}>
              <CirclePercentage
                duration={2000}
                percentage={90}
                radius={25}
                strokeWidth={4}
              />

              <ImageBackground
                source={{ uri: `https://picsum.photos/id/26/280/80` }} // Replace with your image URL or local path
                style={styles.image}
                resizeMode="cover" // Options: "cover", "contain", "stretch"
              >
                <View style={[{ padding: 20, justifyContent: "center" }]}>
                  <Text style={[styles.fontMedium, {}]}>Cobra Lift</Text>
                  <Text style={[styles.fontTiny, { color: "#fff" }]}>
                    With Sarah Stratfor
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242526",
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centering: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    height: 130,
    width: 130,
    borderRadius: 100,
    backgroundColor: "#dcdcdc",
  },
  image: {
    height: 80,
    width: 280,
  },
  fontHiuge: {
    fontSize: 80,
    fontWeight: "700",
    color: "#fff",
  },
  fontTitle: {
    fontSize: 35,
    fontWeight: "900",
    color: "#fff",
  },
  fontMedium: {
    fontSize: 25,
    fontWeight: "600",
    color: "#fff",
  },
  fontSmall: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  fontTiny: {
    fontWeight: "400",
    color: "#8f8f8f",
  },
});
