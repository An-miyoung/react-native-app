import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import Input from '../../components/Input/Input';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import BackButton from '../../components/BackButton/BackButton';
import {createUser} from '../../api/user';

import globalStyle from '../../assets/styles/globalStyle';
import style from './style';

const Registration = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    let user = await createUser(fullName, email, password);
    if (user.error) {
      setError(user.error);
    } else {
      setError('');
      setSuccess('You have successfully registered.');
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <View style={style.backButton}>
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.container}>
        <View style={globalStyle.marginBottom24}>
          <Header title={'Hello and Welcome !'} />
        </View>
        <View style={globalStyle.marginBottom24}>
          <Input
            label={'First & Last Name'}
            placeholder={'Enter Your full name..'}
            onChangeText={value => setFullName(value)}
          />
        </View>
        <View style={globalStyle.marginBottom24}>
          <Input
            label={'Email'}
            placeholder={'Enter Your Email..'}
            keyboardType={'email-address'}
            onChangeText={value => setEmail(value)}
          />
        </View>
        <View style={globalStyle.marginBottom24}>
          <Input
            label={'Password'}
            placeholder={'******'}
            secureTextEntry={true}
            onChangeText={value => setPassword(value)}
          />
        </View>
        {error.length > 0 && <Text style={style.error}>{error}</Text>}
        {success.length > 0 && <Text style={style.success}>{success}</Text>}
        <View style={globalStyle.marginBottom24}>
          <Button
            isDisabled={
              email.length <= 5 || password.length < 6 || fullName.length <= 2
            }
            title={'Register'}
            onPress={() => handleSubmit()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Registration;
