import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type Slide = {
  key: string;
  title: string;
  text: string;
  image: any;
};

type RootStackParamList = {
  Onboarding: undefined;
  Welcome: undefined;
};

const slides: Slide[] = [
  {
    key: '1',
    title: 'Thế giới truyện tranh trong tầm tay',
    text: 'Hàng ngàn bộ truyện hấp dẫn, được cập nhật liên tục mỗi ngày. Đọc không giới hạn, mọi lúc mọi nơi.',
    image: require('../assets/slide1.png'),
  },
  {
    key: '2',
    title: 'Theo dõi truyện yêu thích',
    text: 'Theo dõi truyện bạn thích và nhận thông báo mỗi khi có chương mới. Không bỏ lỡ bất kỳ diễn biến nào!',
    image: require('../assets/slide2.png'),
  },
  {
    key: '3',
    title: 'Bình luận và kết nối cùng cộng đồng',
    text: 'Tham gia thảo luận sôi nổi dưới mỗi chương truyện, chia sẻ cảm xúc cùng người đọc khác.',
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
    <ImageBackground source={item.image} style={styles.slide} resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.contentCentered}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Bắt đầu' : 'Tiếp tục'}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
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
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  contentCentered: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1.5, height: 1.5 },
    textShadowRadius: 4,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#F25C05',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
