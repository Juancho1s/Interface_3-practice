import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

// Wrap the Circle in Animated.createAnimatedComponent to make it animatable
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface circleProps {
  percentage: number; // Percentage value
  radius: number;
  strokeWidth: number;
  duration: number; // Increased duration for smoother animation

}

export default function CirclePercentage({percentage, radius, strokeWidth, duration}: circleProps) {

  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration,
      useNativeDriver: true, // Make sure this is enabled for better performance
    }).start();
  }, [percentage]);

  // Interpolate strokeDashoffset based on percentage
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      <Svg
        height={radius * 2 + strokeWidth * 2}
        width={radius * 2 + strokeWidth * 2}
        rotation={-90}
      >
        {/* Background Circle */}
        <Circle
          stroke="lightgray"
          cx={halfCircle}
          cy={halfCircle}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Circle */}
        <AnimatedCircle
          stroke="blue"
          cx={halfCircle}
          cy={halfCircle}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference} // Defines the length of the stroke
          strokeDashoffset={strokeDashoffset} // This is where the animation happens
          fill="none"
        />
      </Svg>
      
      {/* Percentage Text */}
      <View style={styles.textContainer}>
        <Text style={[styles.percentageText, {fontSize: radius / 1.5}]}>{`${percentage}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  textContainer: {
    position: "absolute", // This places the text on top of the SVG
    justifyContent: "center",
    alignItems: "center",
  },
  percentageText: {
    fontSize: 40, // Adjust the font size
    fontWeight: "700",
    color: "#fff",
  },
});
