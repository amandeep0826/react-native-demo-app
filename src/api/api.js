import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const DriverLogin = 'driver/login';
export const DriverSignUp = 'driver';
export const ForgotPasswordEnd = 'forgot/password';
export const AcceptDelivery = 'driver/accepted';
export const DriverProfile = 'driver';
export const UpdateDriverProfile = 'driver';
export const Transactions = 'driver/transaction';
export const ContactUs = 'driver/contact-us';
export const ChangePassword = 'change/password';
export const DriverFeedBack = 'feedback';
export const ImageBaseUrl = 'aws/file';
export const ImageUpload = 'upload/aws';
export const DeliveryManagement = 'delivery/management';
export const DeliveriesByTime = 'driver/deliveries?status=1&sorting=2&page=1';
export const Bookings = (status, sorting, offset) =>
  `driver/deliveries?status=${status}&sorting=${sorting}&page=${offset}&limit=10`;
export const getToken = async () => {
  return await AsyncStorage.getItem('token');
};
export const getUserData = async () => {
  const user = await AsyncStorage.getItem('user');

  return JSON.parse(user);
};

export const removeItemValue = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    console.log({exception});
    return false;
  }
};

export const removeToken = async () => {
  return await removeItemValue('token');
};

export const getHeaders = async () => {
  const token = await getToken();
  return {accept: 'application/json', Authorization: token};
};
export const Deliveries = (sorting, offset) =>
  `driver/deliveries?status=1&sorting=${sorting}&page=${offset}&limit=10`;
export default axios.create({
  baseURL: 'https://app-transfer.com:3001/api/',
});
