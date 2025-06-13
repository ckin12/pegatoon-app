import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

// Khai báo type Slide để định kiểu item
type Slide = {
  key: string;
  title: string;
  text: string;
  image: any;
};

// Khai báo type cho RootStackParamList để tránh lỗi navigation
type RootStackParamList = {
  Onboarding: undefined;
  Welcome: undefined;
};

const slides: Slide[] = [
  {
    key: '1',
    title: 'Shop with our single-use cards',
    text: 'Use secure cards for online shopping.',
    image: require('../assets/slide1.png'),

  },
  {
    key: '2',
    title: 'Start saving the easy way',
    text: 'Track and automate your savings easily.',
    image: require('../assets/slide2.png'),
  },
  {
    key: '3',
    title: 'Keep your budget on track',
    text: 'Smart analytics help you spend wisely.',
    image: require('../assets/slide3.png'),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef<FlatList<Slide>>(null);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('Welcome');
    }
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? 'Bắt đầu' : 'Tiếp tục'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={slides}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      ref={flatListRef}
      keyExtractor={(item) => item.key}
      scrollEventThrottle={16}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#2450F3',
  },
  image: {
    width: width * 0.8,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#2450F3',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
