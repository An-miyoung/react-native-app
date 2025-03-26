import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import {Routes} from '../../navigation/Routes';
import {updateSelectedCategoriesId} from '../../redux/reducers/Categories';
import {updateSelectedDonationId} from '../../redux/reducers/Donation';
import Search from '../../components/SearchInput/Search';
import SingleDonationItem from '../../components/SingleDonationItem/SingleDonationItem';
import Header from '../../components/Header/Header';
import Tab from '../../components/Tab/Tab';

import globalStyle from '../../assets/styles/globalStyle';
import style from './style';
import {resetToInitialState} from '../../redux/reducers/User';
import {logOutUser} from '../../api/user';

const Home = ({navigation}) => {
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

  const handleLogOut = async () => {
    dispatch(resetToInitialState());
    await logOutUser();
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
              <Header title={`${user.displayName} 👋`} />
            </View>
          </View>
          <View>
            <Image
              resizeMode="contain"
              source={{uri: user.profileImage}}
              style={style.profileImage}
            />
            <Pressable
              onPress={() => {
                handleLogOut();
              }}>
              <Header type={3} title={'Logout'} color={'#156cf7'} />
            </Pressable>
          </View>
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
            {donationItems.map(item => {
              const categoryInformation = categories.categories.find(
                category =>
                  category.categoryId === categories.selectedCategoriesId,
              );

              return (
                <View
                  key={`donation_${item.donationItemId}`}
                  style={style.singleDonationItem}>
                  <SingleDonationItem
                    uri={item.image}
                    badgeTitle={categoryInformation.name}
                    donationTitle={item.name}
                    price={parseFloat(item.price)}
                    donationItemId={item.donationItemId}
                    onPress={selectedDonationId => {
                      dispatch(updateSelectedDonationId(selectedDonationId));
                      navigation.navigate(Routes.SingleDonationItem, {
                        categoryInformation,
                      });
                    }}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
