import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View, Text, FlatList, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';

export const HorizontalScrollView = ({items}) => {
  const {items: itemsInRedux} = useSelector(state => state.auctionViewed);
  const [data, setData] = useState([]);
  const _setTimeoutRef = useRef();

  const shuffleData = useCallback(() => {
    const arr = items ? [...items] : [...itemsInRedux];
    for (let i = arr.length - 1; i > 0; i--) {
      const randomPosition = Math.floor(Math.random() * (i + 1));
      const temporary = arr[i];
      arr[i] = arr[randomPosition];
      arr[randomPosition] = temporary;
    }
    setData(arr);
  }, [items, itemsInRedux]);

  const onRefresh = useCallback(() => {
    setData([]);
    _setTimeoutRef.current = setTimeout(shuffleData, 300);
  }, [shuffleData]);

  const onUpdate = useCallback(() => {
    const arr = items ? [...items] : [...itemsInRedux];
    const newData = data.map((value, i) => {
      const item = arr.find(e => e.auctionId === value.auctionId);
      if (item) {
        return item;
      } else {
        return value;
      }
    });
    const difference = arr.filter(x => data.findIndex(e => e.auctionId === x.auctionId) < 0);
    setData([...newData, ...difference]);
  }, [data, items, itemsInRedux]);

  const renderItem = useCallback(({item}) => <ItemCard item={item} />, []);
  const keyExtractor = useCallback(item => item.auctionId.toString(), []);

  useEffect(() => {
    if ((items && items.length > 0) || itemsInRedux.length > 0) {
      if (data.length > 0) {
        onUpdate();
      } else {
        onRefresh();
      }
    }
  }, [items, itemsInRedux]);

  useEffect(() => {
    return () => {
      if (_setTimeoutRef.current) {
        clearTimeout(_setTimeoutRef.current);
      }
    };
  }, []);

  return <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} onRefresh={onRefresh} refreshing={false} horizontal />;
};

const ItemCard = ({item}) => {
  const {width} = Dimensions.get('window');
  const cardWidth = useMemo(() => Math.ceil(width * 0.4), [width]);
  return (
    <View style={[styles.container, {width: cardWidth}]}>
      <Text style={styles.text}>{`작품ID (${item.auctionId})`}</Text>
      <Text style={styles.text}>{`조회수 ${item.viewCount !== null ? item.viewCount : '확인중'}`}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', marginHorizontal: 8, gap: 10},
  text: {color: 'white'},
});
