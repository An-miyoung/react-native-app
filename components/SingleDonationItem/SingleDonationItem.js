import React from 'react';
import {Image, View} from 'react-native';
import PropTypes from 'prop-types';

import style from './style';
import Badge from '../Badge/Badge';
import Header from '../Header/Header';

const SingleDonationItem = props => {
  return (
    <View>
      <View>
        <View style={style.badge}>
          <Badge title={props.badgeTitle} />
        </View>
        <Image
          resizeMode="contain"
          source={{uri: props.uri}}
          style={style.image}
        />
      </View>
      <View style={style.donationInformation}>
        <Header title={props.donationTitle} type={3} color={'#0a043c'} />
        <View style={style.price}>
          <Header
            title={`$${props.price.toFixed(2)}`}
            type={3}
            color={'#156cf7'}
          />
        </View>
      </View>
    </View>
  );
};

SingleDonationItem.PropTypes = {
  uri: PropTypes.string.isRequired,
  badgeTitle: PropTypes.string.isRequired,
  donationTitle: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default SingleDonationItem;
