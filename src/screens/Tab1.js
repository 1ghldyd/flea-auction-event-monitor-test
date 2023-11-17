import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, HorizontalScrollView} from '../components';
import EventSource from 'react-native-sse';
import {useDispatch} from 'react-redux';
import {setItems as setItemsInRedux} from '../store/auctionViewed';

const idStart = 4103;
const idEnd = 4150;

const Tab1 = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const _items = useRef([]);

  const makeDummyItems = useCallback(() => {
    const arr = [];
    let i = idStart;
    while (i <= idEnd) {
      arr.push({auctionId: i, viewCount: null});
      i += 1;
    }
    return arr;
  }, []);

  const esCallback = useCallback(e => {
    if (e.type === 'sse.auction_viewed') {
      const data = JSON.parse(e.data);
      const index = _items.current.findIndex(elm => elm.auctionId === data.auctionId);
      if (index > -1) {
        setItems(prev => [...prev.slice(0, index), data, ...prev.slice(index + 1)]);
        const newItems = [..._items.current.slice(0, index), data, ..._items.current.slice(index + 1)];
        dispatch(setItemsInRedux(newItems));
      } else {
        console.log(`Error, esCallback, index(${data.auctionId}) is -1`);
      }
    }
  }, []);

  useEffect(() => {
    _items.current = items;
  }, [items]);

  useEffect(() => {
    const dummyItems = makeDummyItems();
    setItems(dummyItems);
    dispatch(setItemsInRedux(dummyItems));

    const es = new EventSource('https://api.fleaauction.world/v2/sse/event');
    es.addEventListener('sse.auction_viewed', esCallback);

    return () => {
      es.removeAllEventListeners();
      es.close();
    };
  }, []);

  return (
    <View style={{width: '100%', height: '100%'}}>
      <Header title="SSE 이벤트 모니터링" />
      <View style={styles.flex}>
        <Header title="가로 스크롤 영역 #1 (props)" insert style={{paddingLeft: 8}} />
        <HorizontalScrollView items={items} />
      </View>
      <View style={styles.flex}>
        <Header title="가로 스크롤 영역 #2 (redux)" insert style={{paddingLeft: 8}} />
        <HorizontalScrollView />
      </View>
    </View>
  );
};
export default Tab1;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
