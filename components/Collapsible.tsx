import { Ionicons } from "@expo/vector-icons";
import { PropsWithChildren, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Modal,
  useColorScheme,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export function Collapsible({
  title,
  Items,
}: PropsWithChildren & { title: string } & { Items: Array<string> }) {
  const [isOpen, setIsOpen] = useState(false);

  const systemTheme = useColorScheme();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor:
            systemTheme === "dark"
              ? Colors.dark.backgroundSpecific
              : Colors.light.backgroundSpecific,
        },
      ]}
    >
      {isOpen === false && (
        <TouchableOpacity
          style={styles.heading}
          onPress={() => setIsOpen(true)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.title,
              {
                color:
                  systemTheme === "dark" ? Colors.dark.text : Colors.light.text,
              },
            ]}
          >
            {title}
          </Text>
          <Ionicons name={"chevron-down"} size={26} color={Colors.light.icon} />
        </TouchableOpacity>
      )}

      {/** Modal for full-screen overlay when open **/}
      <Modal visible={isOpen} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.collapsibleContent,
                  {
                    backgroundColor:
                      systemTheme === "dark"
                        ? Colors.dark.backgroundSpecific
                        : Colors.light.backgroundSpecific,
                  },
                ]}
              >
                {Items.map((item, index) => (
                  <TouchableOpacity
                    style={[styles.section]}
                    key={`section-${index}`}
                    onPress={() => setIsOpen(false)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.sectionText,
                        {
                          color:
                            item === title
                              ? systemTheme === "dark"
                                ? Colors.dark.text
                                : Colors.light.text
                              : "#8f8f8f",
                        },
                      ]}
                    >
                      {item}
                    </Text>
                    {RandPosition(item === title)}
                  </TouchableOpacity>
                ))}
                <View style={styles.chevron}>
                  <Ionicons
                    onPress={() => setIsOpen(false)}
                    name={"chevron-up"}
                    size={50}
                    color={Colors.light.icon}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export function RandPosition(isSelected: boolean) {
  const systemTheme = useColorScheme();

  const randomPosition = Math.floor(Math.random() * 10) + 1;
  const medalSize = 36;

  switch (randomPosition) {
    case 1:
      return <Ionicons name="medal" size={medalSize} color="#FFD700" />;
    case 2:
      return <Ionicons name="medal" size={medalSize} color="#C0C0C0" />;
    case 3:
      return <Ionicons name="medal" size={medalSize} color="#CD7F32" />;
    default:
      return (
        <Text
          style={{
            justifyContent: "center",
            alignItems: "center",
            fontSize: 18,
            fontWeight: "900",
            color: isSelected
              ? systemTheme === "dark"
                ? Colors.dark.text
                : Colors.light.text
              : "#8f8f8f",
          }}
        >
          {randomPosition}
        </Text>
      );
  }
}

const styles = StyleSheet.create({
  // Full-screen overlay
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
    justifyContent: "flex-start",
  },

  // Collapsible content style
  collapsibleContent: {
    gap: 30,
    width: "100%",
    backgroundColor: Colors.dark.backgroundSpecific,
    padding: 20,
    justifyContent: "center",
  },

  heading: {
    flexDirection: "row",
    alignItems: "center",
  },

  header: {
    marginBottom: 20,
    backgroundColor: Colors.dark.backgroundBasic,
  },
  title: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "900",
  },

  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionText: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
    fontWeight: "900",
  },

  chevron: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
