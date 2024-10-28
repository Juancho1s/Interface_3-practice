import { Tabs } from "expo-router";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

// Directly use MaterialCommunityIcons as TabBarIcon
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const iconsSize = 32;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors["dark"].backgroundSpecific, // Apply background color
        },

      }}
    >
      {/* Chats screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "chart-box" : "chart-box-outline"}
              size={iconsSize} // Set a size for the icon
              color={color}
            />
          ),
        }}
      />

      {/* Diet screen */}
      <Tabs.Screen
        name="diet"
        options={{
          title: "", // Added a title
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={"chef-hat"} // Use a valid icon for both states
              size={iconsSize} // Set a size for the icon
              color={color}
            />
          ),
        }}
      />

      {/* Timer screen */}
      <Tabs.Screen
        name="timer"
        options={{
          title: "", // Added a title
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={"timer"} // Use a valid icon for both states
              size={iconsSize} // Set a size for the icon
              color={color}
            />
          ),
        }}
      />

      {/* Chat screen */}
      <Tabs.Screen
        name="chat"
        options={{
          title: "", // Added a title
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "chat-processing" : "chat-processing-outline"} // Use a valid icon for both states
              size={iconsSize} // Set a size for the icon
              color={color}
            />
          ),
        }}
      />

      {/* Profile screen */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "", // Added a title
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={"account"} // Use a valid icon for both states
              size={iconsSize} // Set a size for the icon
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
