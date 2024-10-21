import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming } from 'react-native-reanimated';

// Function to get the SVG path for your graph (simplified example)
const getGraphPath = (points: any) => {
  const path = points.map((p: any, i: any) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');
  return `${path}`;
};

// Graph component
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function GraphComponent() {
  // You can use shared values for animating paths
  const opacity = useSharedValue(0.5); // Initial opacity

  // Animated props for the path
  const animatedProps = useAnimatedProps(() => {
    return {
      opacity: withTiming(opacity.value, { duration: 500 }),
    };
  });

  // On mount, trigger an opacity change (e.g., from day change)
  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#fff', marginBottom: 20 }}>Workout Progress</Text>
      <Svg height="200" width="400" viewBox="0 0 400 200">
        {/* Example paths for different days */}
        <AnimatedPath
          d={getGraphPath([
            { x: 0, y: 100 },
            { x: 100, y: 50 },
            { x: 200, y: 120 },
            { x: 300, y: 80 },
            { x: 400, y: 150 },
          ])}
          fill="none"
          stroke="blue"
          strokeWidth="3"
          animatedProps={animatedProps} // Animate the path
        />
        <AnimatedPath
          d={getGraphPath([
            { x: 0, y: 150 },
            { x: 100, y: 120 },
            { x: 200, y: 50 },
            { x: 300, y: 100 },
            { x: 400, y: 90 },
          ])}
          fill="none"
          stroke="green"
          strokeWidth="3"
          animatedProps={animatedProps} // Animate the path
        />
      </Svg>
    </View>
  );
}