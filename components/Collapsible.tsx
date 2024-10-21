import { Ionicons } from "@expo/vector-icons";
import { PropsWithChildren, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export function Collapsible({
  title,
  Items,
}: PropsWithChildren & { title: string } & { Items: Array<string> }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.header}>
      {isOpen === false && (
        <TouchableOpacity
          style={styles.heading}
          onPress={() => setIsOpen(true)}
          activeOpacity={0.8}
        >
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {title}
          </ThemedText>
          <Ionicons name={"chevron-down"} size={26} color={Colors.light.icon} />
        </TouchableOpacity>
      )}

      {/** Modal for full-screen overlay when open **/}
      <Modal visible={isOpen} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.collapsibleContent}>
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
                        { color: item === title ? "#fff" : "#8f8f8f" },
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
            color: isSelected ? "#fff" : "#8f8f8f",
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
    backgroundColor: Colors.dark.background,
    padding: 20,
  },

  heading: {
    flexDirection: "row",
    alignItems: "center",
  },

  header: {
    marginBottom: 20,
    backgroundColor: Colors.dark.background,
  },
  title: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "900",
  },

  section: { flexDirection: "row", justifyContent: "space-between" },
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
