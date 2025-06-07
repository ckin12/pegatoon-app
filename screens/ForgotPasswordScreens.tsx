import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreens() {
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = () => {
    if (!code || !newPassword || !confirmPassword) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Mật khẩu xác nhận không khớp');
      return;
    }
    setSuccess(true);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Đặt lại mật khẩu</Text>
      <Text style={styles.description}>
        Mã khôi phục mật khẩu đã được gửi vào email của bạn.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập mã khôi phục"
        value={code}
        onChangeText={setCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập mật khẩu mới"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu mới"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Cập nhật mật khẩu</Text>
      </TouchableOpacity>

      {success && (
        <Text style={styles.successMessage}>
          Mật khẩu của bạn đã được cập nhật thành công.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 24,
  },
  backArrow: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  resetButton: {
    backgroundColor: '#FF4500',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  successMessage: {
    marginTop: 16,
    backgroundColor: '#fca311',
    padding: 10,
    borderRadius: 6,
    textAlign: 'center',
    color: '#fff',
  },
});
