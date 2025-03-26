import React, {useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Routes} from '../../navigation/Routes';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../api/user';
import {logIn} from '../../redux/reducers/User';
import Input from '../../components/Input/Input';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';

import globalStyle from '../../assets/styles/globalStyle';
import style from './style';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    let user = await loginUser(email, password);

    if (!user.status && user.error) {
      setError(user.error);
    } else if (user.status && user.data.token) {
      setError('');
      dispatch(logIn(user.data));
    }
  };

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.container}>
        <View style={globalStyle.marginBottom24}>
          <Header title={'Welcome Back'} />
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
        {/* {success.length > 0 && <Text style={style.success}>{success}</Text>} */}
        <View style={globalStyle.marginBottom24}>
          <Button
            isDisabled={email.length < 5 || password.length < 6}
            title={'Login'}
            onPress={() => {
              handleLogin();
            }}
          />
        </View>
        <Pressable
          style={style.registerButton}
          onPress={() => {
            navigation.navigate(Routes.Registration);
          }}>
          <Header type={3} title={"Don't have an account?"} color={'#156cf7'} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
