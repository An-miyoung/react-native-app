import React, {useRef, useState} from 'react';
import {Pressable, TextInput} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import style from './style';
import {scaleFontsSize} from '../../assets/styles/scaling';

const Search = props => {
  const textInputRef = useRef(null);
  const [search, setSearch] = useState('');

  const handleFocus = () => {
    textInputRef.current.focus();
  };
  const handleSearch = searchValue => {
    setSearch(searchValue);
    props.onSearch(searchValue);
  };

  return (
    <Pressable style={style.searchInputContainer} onPress={handleFocus}>
      <FontAwesomeIcon
        icon={faSearch}
        color="#25c0ff"
        size={scaleFontsSize(22)}
      />
      <TextInput
        ref={textInputRef}
        style={style.searchInput}
        value={search}
        placeholder="Search"
        onChangeText={value => handleSearch(value)}
      />
    </Pressable>
  );
};

Search.defaultProps = {
  onSerach: () => {},
};

Search.proptypes = {
  onSerach: PropTypes.func,
};

export default Search;
