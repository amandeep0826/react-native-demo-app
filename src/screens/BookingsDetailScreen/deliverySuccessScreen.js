import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  cardBorderColor,
  iconColor,
  primarybackgroundColor,
  primarycolor,
  pureBlack,
  pureWhite,
} from '../../assets/colors';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {NunitoFont} from '../../assets/fonts/nunitoFont';
import {AuthContext, UserContext} from '../../routes/RootStackNavigation';
import {backgroundColor} from '../../styles/commonStyle';
import api, {DriverFeedBack} from '../../api/api';

const DeliverySuccessScreen = ({route, navigation}) => {
  const [user, setUser] = useContext(UserContext);
  const [token, setToken] = useContext(AuthContext);
  const star_image = require('../../assets/star_border_large.png');
  const [rating, setRating] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const {item} = route.params;

  const driverFeedBack = () => {
    api
      .put(
        DriverFeedBack,
        {
          delivery_id: item.id,
          driver_to_user_ratings: rating,
          feedback: feedbackMessage,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      )
      .then(response => {
        ToastAndroid.show('Thank you for giving feedback.', ToastAndroid.SHORT);
      })
      .catch(error => {
        console.log({error});
      });
  };

  return (
    <View style={backgroundColor.container}>
      <View
        style={[
          styles.secondaryContainer,
          {borderBottomWidth: 1, borderBottomColor: cardBorderColor},
        ]}>
        <Image
          style={styles.profilePic}
          source={{
            uri:
              'https://ca.slack-edge.com/TC9LHABTP-U01J3U0JKHS-129560ba72fa-192',
          }}
        />
        <Text style={styles.clientName}>Amandeep</Text>
        <View style={styles.reviewsContainer}>
          <Image
            style={styles.starImage}
            source={require('../../assets/star_fill_large.png')}
          />
          <Text style={styles.rating}> 4.5</Text>
          <Text style={styles.numberOfReviews}>(123 reviews)</Text>
        </View>
      </View>
      <View style={styles.secondaryContainer}>
        <Text style={[styles.clientName, {fontSize: 20}]}>Rate Client</Text>
        <AirbnbRating
          count={5}
          defaultRating={0}
          reviews={[]}
          selectedColor={primarycolor}
          unSelectedColor={pureWhite}
          reviewColor={pureBlack}
          size={28}
          starContainerStyle={{marginTop: -30}}
          onFinishRating={data => setRating(data)}
        />
        <Text style={styles.tapToRateText}>Tap to rate this client</Text>
        <TextInput
          style={styles.feedbackInput}
          placeholderTextColor={pureBlack}
          placeholder="Please give your feedback..."
          onChangeText={feedbackMessage => setFeedbackMessage(feedbackMessage)}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.submitButtonContainer}
          onPress={() => {
            driverFeedBack();
            navigation.goBack();
            navigation.goBack();
          }}>
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeliverySuccessScreen;

const styles = StyleSheet.create({
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 10,
    alignSelf: 'center',
  },
  secondaryContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  clientName: {
    fontSize: 18,
    fontFamily: NunitoFont,
    color: pureBlack,
    textAlign: 'center',
    marginTop: 16,
  },
  reviewsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 8,
  },
  starImage: {
    width: 15,
    height: 15,
    marginTop: 2,
  },
  rating: {
    fontSize: 14,
    color: primarycolor,
    fontFamily: NunitoFont,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  numberOfReviews: {
    fontFamily: NunitoFont,
    fontSize: 14,
    color: pureBlack,
    marginLeft: 4,
  },
  ratingStarContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  ratingStar: {
    width: 33,
    height: 33,
    marginLeft: 8,
  },
  tapToRateText: {
    color: iconColor,
    fontSize: 14,
    fontFamily: NunitoFont,
    textAlign: 'center',
    marginTop: 25,
  },
  feedbackInput: {
    backgroundColor: pureWhite,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: cardBorderColor,
    height: 110,
    textAlignVertical: 'top',
    padding: 14,
    marginTop: 20,
    fontFamily: NunitoFont,
    fontSize: 16,
  },
  submitButtonContainer: {
    elevation: 3,
    backgroundColor: primarycolor,
    borderRadius: 5,
    paddingVertical: 10,
    alignSelf: 'stretch',
    marginTop: 24,
    height: 43,
  },

  submitButtonText: {
    fontSize: 14,
    color: pureWhite,
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontFamily: NunitoFont,
    fontWeight: 'bold',
  },
});
