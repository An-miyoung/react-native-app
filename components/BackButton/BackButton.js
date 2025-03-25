import React from 'react';
import {Pressable, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import PropTypes from 'prop-types';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import style from './style';

const BackButton = props => {
  return (
    <Pressable onPress={() => props.onPress()} style={style.container}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </Pressable>
  );
};

BackButton.defaultProps = {
  onPress: () => {},
};

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default BackButton;
