import { useEffect, useRef } from "react";
import { Dimensions, View, Text, Animated, Easing } from "react-native";
import Svg, { Line, Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export function GenerateGraph() {
  // Create animation values for the path
  const dashOffset = useRef(new Animated.Value(1750)).current;
  const fillOpacity = useRef(new Animated.Value(0)).current; // New animated value for fill opacity

  useEffect(() => {
    // Animate stroke dashoffset and fill opacity for the path drawing
    Animated.parallel([
      Animated.timing(dashOffset, {
        toValue: 0,
        duration: 2000, // Duration in milliseconds
        easing: Easing.linear,
        useNativeDriver: false, // Native driver doesn't support stroke properties yet
      }),
      Animated.timing(fillOpacity, {
        toValue: 0.3, // Animate from 0 to 1 for full opacity
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  // Path data for the current and goal paths
  const pathData_Current =
    "M0,266L17.1,240C34.3,224,69,192,103,176C137.1,160,171,160,206,181.3C240,203,274,245,309,266.7C342.9,288,377,288,411,266.7C445.7,245,480,203,514,186.7C548.6,171,583,181,617,154.7C651.4,128,686,64,720,42.7C754.3,21,789,43,823,58.7C857.1,75,891,85,926,96C960,107,994,117,1029,144C1062.9,171,1097,213,1131,192C1165.7,171,1200,85,1234,69.3C1268.6,53,1303,107,1337,122.7C1371.4,139,1406,117,1423,106.7L1440,96L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z";
  const pathData_Goal =
    "M0,96L17.1,96C34.3,96,69,96,103,117.3C137.1,139,171,181,206,181.3C240,181,274,139,309,154.7C342.9,171,377,245,411,245.3C445.7,245,480,171,514,138.7C548.6,107,583,117,617,144C651.4,171,686,213,720,208C754.3,203,789,149,823,149.3C857.1,149,891,203,926,202.7C960,203,994,149,1029,122.7C1062.9,96,1097,96,1131,133.3C1165.7,171,1200,245,1234,256C1268.6,267,1303,213,1337,170.7C1371.4,128,1406,96,1423,80L1440,64L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z";

  const deviceWidth = Dimensions.get("screen").width;

  const linesSeparation: number = 100;
  const linesPostion: Array<number> = [
    linesSeparation,
    linesSeparation + deviceWidth / 1.92,
    linesSeparation + (deviceWidth / 1.92) * 2,
    linesSeparation + (deviceWidth / 1.92) * 3,
    linesSeparation + (deviceWidth / 1.92) * 4,
    linesSeparation + (deviceWidth / 1.92) * 5,
    linesSeparation + (deviceWidth / 1.92) * 6,
  ];

  return (
    <View style={[{  }]}>
      <Svg height={160} width={deviceWidth + 2} viewBox="0 0 1440 320">
        {/* Static Goal Path */}
        <Path
          d={pathData_Goal}
          stroke="#8f8f8f"
          strokeWidth="8"
          strokeOpacity={0.2}
          fill="#2F3133"
          transform="scale(1, 1.5)" // Scale y-axis by 1.5 times
        />

        {/* Animated Current Path */}
        <AnimatedPath
          d={pathData_Current}
          stroke="#51d1f6"
          strokeWidth="8"
          strokeOpacity={1}
          fill="#51d1f6"
          fillOpacity={fillOpacity} // Use animated value for fill opacity
          transform="scale(1, 1.5)" // Scale y-axis by 1.5 times
          strokeDasharray="1750" // Length of the path
          strokeDashoffset={dashOffset} // Controlled by the animated value
        />

        {/* Vertical Grid Lines */}
        {linesPostion.map((item, index) => (
          <Line
            key={`line-${index}`}
            x1={item} // x position of the start
            y1="0" // y position of the start (top)
            x2={item} // x position of the end (same x for vertical line)
            y2="450" // y position of the end (bottom)
            stroke="gray" // Line color
            strokeWidth="5" // Line thickness
            strokeOpacity={0.4}
          />
        ))}
      </Svg>
      {GenerateDays()}
    </View>
  );
}

export function GenerateDays() {
  const days: Array<string> = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: "#2F3133",
      }}
    >
      {days.map((day, index) => (
        <Text
          key={`day-${index}`}
          style={{
            color: day === "SA" ? "#fff" : "#8f8f8f",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {day}
        </Text>
      ))}
    </View>
  );
}
