import React, {useMemo} from 'react';
import {Platform} from 'react-native';
import {useTheme, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import Tab4 from './Tab4';

const Tab = createBottomTabNavigator();

const icons = {
  Tab1: 'home',
  Tab2: 'gavel',
  Tab3: 'text-box-outline',
  Tab4: 'account',
};
const inactiveColor = 'silver';

const screenOptions = ({route}, {focusedColor, tabHeight}) => {
  return {
    tabBarIcon: ({focused, color, size}) => {
      const {name} = route;
      // const iconSize = focused ? size + 6 : size; // shop icon 제거 전 설정값
      const iconColor = focused ? focusedColor : inactiveColor;
      return <Icon name={icons[name]} size={size} color={iconColor} />;
    },
    headerShown: false,
    tabBarStyle: {height: tabHeight},
    tabBarContentContainerStyle: {height: tabHeight},
  };
};

const Navigator = () => {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();
  const {layout} = useSelector(state => state.config);
  const tabHeight = useMemo(() => layout.tabBarHeight + (Platform.OS === 'ios' ? insets.bottom : 0), [layout, insets]);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={e => screenOptions(e, {focusedColor: colors.text, tabHeight})}>
        <Tab.Screen name="Tab1" component={Tab1} options={{title: 'HOME', tabBarActiveTintColor: colors.text, tabBarInactiveTintColor: inactiveColor, tabBarLabelStyle: {paddingBottom: 4}}} />
        <Tab.Screen name="Tab2" component={Tab2} options={{title: 'MARKET', tabBarActiveTintColor: colors.text, tabBarInactiveTintColor: inactiveColor, tabBarLabelStyle: {paddingBottom: 4}}} />
        <Tab.Screen name="Tab3" component={Tab3} options={{title: 'ARTICLE', tabBarActiveTintColor: colors.text, tabBarInactiveTintColor: inactiveColor, tabBarLabelStyle: {paddingBottom: 4}}} />
        <Tab.Screen name="Tab4" component={Tab4} options={{title: 'MY PAGE', tabBarActiveTintColor: colors.text, tabBarInactiveTintColor: inactiveColor, tabBarLabelStyle: {paddingBottom: 4}}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
