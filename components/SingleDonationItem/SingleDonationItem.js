import React from 'react';
import {Image, Pressable, View} from 'react-native';
import PropTypes from 'prop-types';

import style from './style';
import Badge from '../Badge/Badge';
import Header from '../Header/Header';

const SingleDonationItem = props => {
  return (
    <Pressable
      onPress={() => {
        props.onPress(props.donationItemId);
      }}>
      <View>
        <View style={style.badge}>
          <Badge title={props.badgeTitle} />
        </View>
        <Image
          resizeMode="cover"
          source={{uri: props.uri}}
          style={style.image}
        />
      </View>
      <View style={style.donationInformation}>
        <Header
          title={props.donationTitle}
          type={3}
          color={'#0a043c'}
          numberOfLines={1}
        />
        <View style={style.price}>
          <Header
            title={`$${props.price.toFixed(2)}`}
            type={3}
            color={'#156cf7'}
          />
        </View>
      </View>
    </Pressable>
  );
};

SingleDonationItem.defaultProps = {
  onPress: () => {},
};

SingleDonationItem.PropTypes = {
  uri: PropTypes.string.isRequired,
  badgeTitle: PropTypes.string.isRequired,
  donationTitle: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  donationItemId: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};

export default SingleDonationItem;
