import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
];

const BlurBackground = ({ x }: { x: Animated.SharedValue<number> }) => {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      {data.map((val, ind) => {
        const opacity = useAnimatedStyle(() => {
          const value = interpolate(
            x.value,
            [(ind - 1) * width, ind * width, (ind + 1) * width],
            [0, 1, 0]
          );
          return { opacity: value };
        });

        return (
          <Animated.Image
            source={{ uri: val }}
            blurRadius={50}
            style={[StyleSheet.absoluteFillObject, opacity]}
            key={ind}
            resizeMode="cover"
          />
        );
      })}
    </View>
  );
};

export default function App() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      translateX.value = e.contentOffset.x;
    },
  });

  return (
    <Animated.ScrollView
      style={{ flex: 1 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      snapToInterval={width}
      decelerationRate="fast"
      onScroll={scrollHandler}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <BlurBackground x={translateX} />
      {data.map((val, ind) => {
        return (
          <View
            key={ind}
            style={{
              width,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={{ uri: val }}
              style={{
                borderRadius: 20,
                width: width / 1.5,
                height: height / 2,
              }}
              resizeMode="cover"
            />
          </View>
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
