import React from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {CardForm, StripeProvider} from '@stripe/stripe-react-native';
import Header from '../../components/Header/Header';

import globalStyle from '../../assets/styles/globalStyle';
import style from './style';
import Button from '../../components/Button/Button';

const Payment = () => {
  const donationItemInformation = useSelector(
    state => state.donations.selectedDonationInformation,
  );

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
            <CardForm style={style.cardForm} />
          </StripeProvider>
        </View>
      </ScrollView>
      <View style={style.button}>
        <Button title={'Donate'} />
      </View>
    </SafeAreaView>
  );
};

export default Payment;
