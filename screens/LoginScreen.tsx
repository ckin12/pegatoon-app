import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  return (
    
    <View style={styles.container}>
      <Image
  source={require('../assets/logo.png')} 
  style={styles.logo}
/>
      <Text style={styles.title}>Đăng nhập</Text>
      <Text style={styles.subtitle}>Bạn có thể đăng nhập với tài khoản Pegatoon.</Text>

      <View style={styles.socialContainer}>
        <FontAwesome name="facebook" size={32} color="#3b5998" />
        <FontAwesome name="google" size={32} color="#DB4437" />
      </View>

      <Text style={styles.orText}>hoặc tiếp tục với</Text>

      <TextInput
        placeholder="Nhập email hoặc số điện thoại"
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Mật khẩu"
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
  <Text style={styles.forgotText}>Quên mật khẩu</Text>
</TouchableOpacity>


      <Text style={styles.termsText}>
        Bằng cách chọn Đăng nhập, bạn đồng ý với{' '}
        <Text style={styles.linkText}>Điều khoản sử dụng</Text> và{' '}
        <Text style={styles.linkText}>Chính sách riêng tư</Text> của Pegatoon.
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
  <Text style={styles.loginTexts}>
    Chưa có tài khoản? <Text style={{ color: 'red' }}>Đăng ký</Text>
  </Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginVertical: 10,
    fontSize: 14,
    color: '#555',
  },
  socialContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  orText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#888',
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#f5533d',
    height: 48,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginText: {
    color: '#fff',
      fontWeight: 'bold',
  },
  loginTexts: {
    textAlign: 'center',
      marginTop: 20,
      fontSize: 14,
  },
  forgotText: {
    color: '#f5533d',
    textAlign: 'center',
    marginVertical: 10,
  },
  termsText: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#007AFF',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  
});
