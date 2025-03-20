import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SCREENS } from "../utils/router";
import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/search/SearchScreen';
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import MessageListScreen from '../screens/messages/MessageListScreen';
import SvgHome from "../assets/home";
import SvgSearch from "../assets/search";
import SvgPost from "../assets/plus";
import SvgNotifications from "../assets/notifications";
import SvgProfile from "../assets/profile";
import SvgHomeFill from "../assets/homeFill";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

const Tab = createBottomTabNavigator();
const { HOMESCREEN, SEARCHSCREEN, POSTSCREEN, NOTIFICATIONSCREEN, MESSAGELISTSCREEN, PROFILESCREEN } = SCREENS;

const tabHiddenRoutes = [
  "SPLASHSCREEN",
  "ENTRYSCREEN",
  "SIGNINSCREEN",
  "SIGNUPSCREEN",
  "POSTSCREEN",
  "FORGETPASSWORDSCREEN",
  "FULLPOSTSCREEN",
  "USERNAMESCREEN",
  "CHATSCREEN",
];

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  const [shouldHideTabBar, setShouldHideTabBar] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      const state = navigation.getState();
      const currentRoute = state?.routes[state.index]?.name;

      setShouldHideTabBar(tabHiddenRoutes.includes(currentRoute));
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          display: shouldHideTabBar ? "none" : "flex",  // Tab bar'ı gizlemek/göstermek için
        }
      }}
    >
      <Tab.Screen 
        options={{ tabBarIcon: ({ focused }) => focused ? <SvgHomeFill /> : <SvgHome /> }} 
        name={HOMESCREEN} 
        component={HomeScreen} 
      />
      <Tab.Screen 
        options={{ tabBarIcon: () => <SvgSearch /> }} 
        name={SEARCHSCREEN} 
        component={SearchScreen} 
      />
      <Tab.Screen 
        options={{ tabBarIcon: () => <SvgPost /> }} 
        name={POSTSCREEN} 
        component={PostScreen} 
      />
      <Tab.Screen 
        options={{ tabBarIcon: () => <SvgNotifications /> }} 
        name={NOTIFICATIONSCREEN} 
        component={NotificationsScreen} 
      />
      <Tab.Screen 
        options={{ tabBarIcon: () => <SvgProfile /> }} 
        name={PROFILESCREEN} 
        component={ProfileScreen} 
      />
      <Tab.Screen 
        options={{
          tabBarIcon: () => <SvgProfile />,
          tabBarStyle: { display: "flex" } // MessageListScreen her zaman görünür
        }} 
        name={MESSAGELISTSCREEN} 
        component={MessageListScreen} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
