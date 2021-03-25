import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const DriverLogin = 'driver/login';
export const DriverSignUp = 'driver';
export const ForgotPasswordEnd = 'forgot/password';
export const AcceptDelivery = 'driver/accepted';
export const DeliveriesByTime =
  'driver/deliveries?status=1&sorting=2&page=1&limit=10';
export const getToken = async () => {
  return await AsyncStorage.getItem('token');
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
export const Deliveries =
  'driver/deliveries?status=1&sorting=1&page=1&limit=10';
export default axios.create({
  baseURL: 'https://app-transfer.com:3001/api/',
});
