import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import data from '@/constants/data';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated'; // Correctly import Easing

export default function App() {
  const [currentIndex, setCurrentIndex] = React.useState<null | number>(null);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {data.map(({ bg, color, category, subCategories }, index) => {
        const isOpen = index === currentIndex;

        return (
          <TouchableOpacity
            key={category}
            onPress={() => setCurrentIndex(isOpen ? null : index)}
            style={styles.cardContainer}
            activeOpacity={0.9}
          >
            <View style={[styles.card, { backgroundColor: bg }]}>
              <Text style={[styles.heading, { color }]}>{category}</Text>

              <MotiView
                from={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  height: isOpen ? 150 : 0, // You can adjust height as needed
                }}
                transition={{
                  type: 'timing',
                  duration: 500,
                }}
                style={styles.subCategoriesList}
              >
                {subCategories.map((subCategory) => (
                  <Text key={subCategory} style={[styles.body, { color }]}>
                    {subCategory}
                  </Text>
                ))}
              </MotiView>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 38,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -2,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: 'center',
  },
  subCategoriesList: {
    marginTop: 20,
    overflow: 'hidden', // Ensure content is hidden when collapsed
  },
});
