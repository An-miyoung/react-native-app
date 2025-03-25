import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';

import globalStyle from '../../assets/styles/globalStyle';
import style from './style';
import Search from '../../components/SearchInput/Search';
import SingleDonationItem from '../../components/SingleDonationItem/SingleDonationItem';
import {horizontalScale} from '../../assets/styles/scaling';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header/Header';
import {updateFirstName} from '../../redux/reducers/User';
import Tab from '../../components/Tab/Tab';
import {updateSelectedCategoriesId} from '../../redux/reducers/Categories';

const Home = () => {
  const user = useSelector(state => state.user);
  const categories = useSelector(state => state.categories);
  const donations = useSelector(state => state.donations);
  const dispatch = useDispatch();

  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [donationItems, setDonationItems] = useState([]);
  const categoryPageSize = 4;

  const pagination = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (startIndex >= items.length) return [];

    return items.slice(startIndex, endIndex);
  };

  useEffect(() => {
    // 최초 1번 pagination. 그후는 flatList 안에서 처리
    setIsLoadingCategories(true);
    setCategoryList(
      pagination(categories.categories, categoryPage, categoryPageSize),
    );
    setCategoryPage(prev => prev + 1);
    setIsLoadingCategories(false);
  }, []);

  useEffect(() => {
    const items = donations.items.filter(value =>
      value.categoryIds.includes(categories.selectedCategoriesId),
    );
    setDonationItems(items);
  }, [categories.selectedCategoriesId]);

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.header}>
          <View>
            <Text style={style.headerIntroText}>Hello, </Text>
            <View style={style.userName}>
              <Header title={`${user.firstName}, ${user.lastName} 👋`} />
            </View>
          </View>
          <Image
            resizeMode="contain"
            source={{uri: user.profileImage}}
            style={style.profileImage}
          />
        </View>
        <View style={style.searchBox}>
          <Search
            onSearch={value => {
              console.log(value);
            }}
          />
        </View>
        <Pressable style={style.highlightedImageContainer}>
          <Image
            resizeMode="contain"
            source={require('../../assets/images/highlighted.png')}
            style={style.highlightedImage}
          />
        </Pressable>
        <View style={style.categoryHeader}>
          <Header title={'Select Category'} type={2} />
        </View>
        <View style={style.categories}>
          <FlatList
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (isLoadingCategories) return;
              setIsLoadingCategories(true);
              let newData = pagination(
                categories.categories,
                categoryPage,
                categoryPageSize,
              );
              if (newData.length > 0) {
                setCategoryList(prev => [...prev, ...newData]);
                setCategoryPage(prev => prev + 1);
              }
              setIsLoadingCategories(false);
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={categoryList}
            renderItem={({item}) => (
              <View
                style={style.categoriesItem}
                key={`categories_${item.categoryId}`}>
                <Tab
                  tabId={item.categoryId}
                  title={item.name}
                  isInactive={
                    item.categoryId !== categories.selectedCategoriesId
                  }
                  onPress={value => dispatch(updateSelectedCategoriesId(value))}
                />
              </View>
            )}
          />
        </View>
        {donationItems.length > 0 && (
          <View style={style.donationItemsContainer}>
            {donationItems.map(item => (
              <View
                key={`donation_${item.donationItemId}`}
                style={style.singleDonationItem}>
                <SingleDonationItem
                  uri={item.image}
                  badgeTitle={
                    categories.categories.filter(
                      category =>
                        category.categoryId === categories.selectedCategoriesId,
                    )[0].name
                  }
                  donationTitle={item.name}
                  price={parseFloat(item.price)}
                  donationItemId={item.donationItemId}
                  onPress={selectedDonationId => {}}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
