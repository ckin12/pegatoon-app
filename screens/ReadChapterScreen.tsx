import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App'; 


const dummyChapters = [
  {
    title: 'Chương 1: Khởi đầu',
    images: [
      'https://s11.anhvip.xyz/image_comics/18712/2963134/img_003_1736325461.jpg',
      'https://s10.anhvip.xyz/image_comics/17716/2188141/img_003_1720766600.jpg',
    ],
  },
  {
    title: 'Chương 2: Bí mật',
    images: [
      'https://s10.anhvip.xyz/image_comics/17716/2188142/img_001_1720766610.jpg',
    ],
  },
  {
    title: 'Chương 3: Cao trào',
    images: [],
  },
];

const ReadChapterScreen = () => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [comments, setComments] = useState<{ text: string; time: string }[][]>(
    dummyChapters.map(() => [])
  );
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [likesCount, setLikesCount] = useState(10);
  const [loading, setLoading] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editCommentText, setEditCommentText] = useState('');
  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(null);

  const [showNavBar, setShowNavBar] = useState(true);
  const lastOffset = useRef(0);

  const commentInputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);
  const chapter = dummyChapters[currentChapter];

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > lastOffset.current ? 'down' : 'up';
    setShowNavBar(direction === 'up');
    lastOffset.current = currentOffset;
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() === '') return;
    const updated = [...comments];
    updated[currentChapter].push({
      text: newComment.trim(),
      time: new Date().toLocaleTimeString(),
    });
    setComments(updated);
    setNewComment('');
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const openEditCommentModal = (index: number) => {
    setEditingCommentIndex(index);
    setEditCommentText(comments[currentChapter][index].text);
    setEditModalVisible(true);
  };

  const confirmEditComment = () => {
    if (editingCommentIndex === null) return;
    const updated = [...comments];
    updated[currentChapter][editingCommentIndex].text = editCommentText.trim();
    setComments(updated);
    setEditModalVisible(false);
    setEditingCommentIndex(null);
    setEditCommentText('');
  };

  const handleDeleteComment = (index: number) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa bình luận?', [
      { text: 'Hủy' },
      {
        text: 'Xóa',
        onPress: () => {
          const updated = [...comments];
          updated[currentChapter].splice(index, 1);
          setComments(updated);
        },
      },
    ]);
  };

  const handleLike = () => {
    setIsLiked(prev => {
      const newState = !prev;
      setLikesCount(count => count + (newState ? 1 : -1));
      return newState;
    });
  };

  const handleChangeChapter = (newIndex: number) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentChapter(newIndex);
      setLoading(false);
    }, 400);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Text style={styles.title}>{chapter.title}</Text>

        {chapter.images.map((imgUrl, index) => (
          <Image
            key={index}
            source={{ uri: imgUrl }}
            style={styles.chapterImage}
            resizeMode="contain"
          />
        ))}

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionButton, isLiked && styles.activeButton]}
            onPress={handleLike}
          >
            <Text style={styles.actionText}>
              {isLiked ? '❤️ Đã thích' : '🤍 Thích'} ({likesCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, isFollowed && styles.activeButton]}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            <Text style={styles.actionText}>
              {isFollowed ? '✅ Đã theo dõi' : '👤 Theo dõi'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.commentTitle}>Bình luận</Text>
        {comments[currentChapter].map((item, index) => (
          <View key={index} style={styles.commentItemRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.commentItem}>• {item.text}</Text>
              <Text style={{ color: '#888', fontSize: 12 }}>{item.time}</Text>
            </View>
            <View style={styles.commentActions}>
              <TouchableOpacity onPress={() => openEditCommentModal(index)} style={styles.smallButton}>
                <Text style={{ color: '#007AFF' }}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteComment(index)} style={styles.smallButton}>
                <Text style={{ color: 'red' }}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={80}>
          <View style={styles.commentInputContainer}>
            <TextInput
              ref={commentInputRef}
              placeholder="Nhập bình luận..."
              value={newComment}
              onChangeText={setNewComment}
              style={styles.commentInput}
            />
            <TouchableOpacity onPress={handleCommentSubmit} style={styles.commentButton}>
              <Text style={{ color: '#fff' }}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      {showNavBar && (
        <View style={styles.chapterNavBar}>
          <TouchableOpacity
             onPress={() => navigation.navigate('Welcome')}
             style={styles.chapterNavButton}
           >
            <Icon name="home-outline" size={24} color="#fff" />
          </TouchableOpacity>

          {currentChapter > 0 && (
            <TouchableOpacity
              onPress={() => handleChangeChapter(currentChapter - 1)}
              style={styles.chapterNavButton}
            >
              <Icon name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
          )}

          <View style={styles.chapterPickerWrapper}>
            <Picker
              selectedValue={currentChapter}
              onValueChange={handleChangeChapter}
              style={styles.chapterPicker}
              dropdownIconColor="#fff"
            >
              {dummyChapters.map((ch, index) => (
                <Picker.Item key={index} label={ch.title} value={index} />
              ))}
            </Picker>
          </View>

          {currentChapter < dummyChapters.length - 1 && (
            <TouchableOpacity
              onPress={() => handleChangeChapter(currentChapter + 1)}
              style={styles.chapterNavButton}
            >
              <Icon name="chevron-forward" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      )}

      <Modal visible={editModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sửa bình luận</Text>
            <TextInput
              style={styles.modalInput}
              value={editCommentText}
              onChangeText={setEditCommentText}
              placeholder="Nhập bình luận mới"
              autoFocus
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Text style={{ color: 'red' }}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmEditComment}>
                <Text style={{ color: '#007AFF' }}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReadChapterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fefefe' }, // nền sáng
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#111' },
  chapterImage: {
    width: '100%',
    height: 400,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: '#eaeaea',
  },
  commentTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, color: '#222' },
  commentItem: { fontSize: 15, marginBottom: 4, color: '#333' },
  commentItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  commentActions: { flexDirection: 'row', gap: 10 },
  smallButton: { paddingHorizontal: 6, paddingVertical: 2 },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: '#fff',
    color: '#000',
  },
  commentButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 16,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  actionText: { fontSize: 16, color: '#111' },
  activeButton: { backgroundColor: '#d0ebff' },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#000' },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,
    backgroundColor: '#fff',
    color: '#000',
  },
  chapterNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    zIndex: 100,
    opacity: 0.98,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  chapterNavButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
  },
  chapterPickerWrapper: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  chapterPicker: {
    color: '#000',
    height: 40,
    width: '100%',
  },
});
