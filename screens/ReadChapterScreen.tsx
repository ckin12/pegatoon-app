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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

const dummyChapters = [
  {
    title: 'Chap 1',
    images: [
      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00000.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00001.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00002.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00003.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00004.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00005.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00006.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00007.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00008.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00009.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00010.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00011.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00012.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00013.jpg?v=3.47',
    
    ],
  },
  {
    title: 'Chap 2',
    images: [
      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00014.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00015.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00016.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00017.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00018.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00019.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00020.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00021.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00022.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00023.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00024.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00025.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00026.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00027.jpg?v=3.47',
    ],
  },
  {
    title: 'Chap 3',
    images: [
      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00028.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00029.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00030.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00031.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00032.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00033.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00034.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00035.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00036.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00037.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00038.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00039.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00040.jpg?v=3.47',

      'https://comics.vn/img/comic/Ke.Mat.Tri.Va.The.Gioi.Ma.Thuat/img_00041.jpg?v=3.47',
    ],
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
  const [likesCount, setLikesCount] = useState(42); 
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

  const formatLikes = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(2)}K`;
    return `${count}`;
  };
<Text style={styles.title}>{chapter.title}</Text>

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
  style={[
    styles.likeButton,
    { backgroundColor: isLiked ? '#F25C05' : '#fff' },
  ]}
  onPress={handleLike}
>
  <FontAwesome
    name="thumbs-up"
    size={18}
    color={isLiked ? '#fff' : '#007AFF'}
    style={{ marginRight: 6 }}
  />
  <Text
    style={{
      color: isLiked ? '#fff' : '#000',
      fontWeight: 'bold',
    }}
  >
    {isLiked ? 'Đã thích' : 'Thích'}
  </Text>
</TouchableOpacity>



<TouchableOpacity onPress={() => Alert.alert('Thông tin tác giả', 'Tác giả: Trần Văn Code')}>
  <Text style={styles.authorText}>
    Tác giả: <Text style={styles.authorName}>Q-Hayashida</Text>
  </Text>
</TouchableOpacity>




  <TouchableOpacity
    style={[
      styles.followButton,
      { backgroundColor: isFollowed ? '#F25C05' : '#fff' },
    ]}
    onPress={() => setIsFollowed(!isFollowed)}
  >
    <FontAwesome
      name="user"
      size={18}
      color={isFollowed ? '#fff' : '#007AFF'}
      style={{ marginRight: 6 }}
    />
    <Text style={{ color: isFollowed ? '#fff' : '#000', fontWeight: 'bold' }}>
      {isFollowed ? 'Đã theo dõi' : 'Theo dõi'}
    </Text>
  </TouchableOpacity>
</View>


        <Text style={styles.commentTitle}>Bình luận</Text>
        {comments[currentChapter].map((item, index) => (
  <View key={index} style={styles.commentItemRow}>
    <Image
      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
      style={styles.avatar}
    />
    <View style={styles.commentContent}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentUsername}>Người dùng</Text>
        <View style={styles.memberTag}>
          <Text style={styles.memberTagText}>Thành viên</Text>
        </View>
        <Text style={styles.commentTime}>• {item.time}</Text>
      </View>
      <Text style={styles.commentText}>{item.text}</Text>

      <View style={styles.commentActions}>
        <TouchableOpacity onPress={() => openEditCommentModal(index)} style={styles.smallButton}>
          <Text style={{ color: '#007AFF' }}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteComment(index)} style={styles.smallButton}>
          <Text style={{ color: 'red' }}>Xóa</Text>
        </TouchableOpacity>
      </View>
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
  container: { flex: 1, padding: 16, backgroundColor: '#fefefe' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#111' },
  chapterImage: {
    width: '100%',
    height: 400,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: '#eaeaea',
  },
  likeButton: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 6,
  borderWidth: 1,
  borderColor: '#ccc',
},

  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
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

  likeText: {
    fontWeight: 'bold',
    fontSize: 16,
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
    backgroundColor: '#F25C05',
    borderRadius: 30,
  },
  
  chapterPickerWrapper: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#F25C05',
    justifyContent: 'center',
  },
  
  chapterPicker: {
    color: '#000',
    height: 55,
    width: '100%',
  },
  

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  commentUsername: {
    fontWeight: 'bold',
    color: '#673ab7',
    marginRight: 6,
  },
  memberTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
  },
  memberTagText: {
    fontSize: 12,
    color: '#1976d2',
  },
  commentTime: {
    fontSize: 12,
    color: '#888',
  },
  commentText: {
    color: '#000',
    fontSize: 14,
    marginBottom: 4,
  },
  authorText: {
    fontSize: 14,
    marginBottom: 12,
    color: '#444',
  },
  authorName: {
    fontWeight: 'bold',
    color: '#1e40af', 
    textDecorationLine: 'underline',
  },
  
});
