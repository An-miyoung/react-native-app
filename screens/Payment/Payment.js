import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Alert, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {
  CardForm,
  StripeProvider,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import {STRIPE_PUBLISHABLE_KEY, API_URL} from '../../constants.js';

import globalStyle from '../../assets/styles/globalStyle';
import style from './style';

const Payment = ({navigation}) => {
  const [isReady, setIsReady] = useState(false);
  const {confirmPayment, loading} = useConfirmPayment();
  const user = useSelector(state => state.user);

  const donationItemInformation = useSelector(
    state => state.donations.selectedDonationInformation,
  );

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        currency: 'usd',
        amount: donationItemInformation.price * 100,
      }),
    });
    const {clientSecret} = await response.json();
    return clientSecret;
  };

  const handlePayment = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();
    const {error, paymentIntent} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
    });
    if (error) {
      Alert.alert(
        'Error has occured with your payment',
        error.localizedMessage,
      );
    } else if (paymentIntent) {
      Alert.alert('Successful', 'The payment was confirmed successfully');
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView contentContainerStyle={style.paymentContainer}>
        <View>
          <Header title={'Making Donation'} />
          <Text style={style.donationAmountDescription}>
            You are about to donate ${donationItemInformation.price}
          </Text>
        </View>
        <View>
          <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
            <CardForm
              style={style.cardForm}
              onFormComplete={() => {
                setIsReady(true);
              }}
            />
          </StripeProvider>
        </View>
      </ScrollView>
      <View style={style.button}>
        <Button
          title={'Donate'}
          isDisabled={!isReady || loading}
          onPress={async () => handlePayment()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Payment;
