import HomeScreen from '../screens/home/HomeScreen';
import { getFocusedRouteNameFromRoute, NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/search/SearchScreen';
import SplashScreen from '../screens/SplashScreen';
import EntryScreen from '../screens/auth/EntryScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import { SCREENS } from "../utils/router"
import BottomTabNavigator from './BottomTabNavigator';
import ForgetPassword from '../screens/auth/ForgetPassword';
import SignUpScreen from '../screens/auth/SignUpScreen';
import UsernameScreen from '../screens/auth/UsernameScreen';
import MessageScreen from '../screens/messages/MessageScreen';
import ChatScreen from '../screens/messages/ChatScreen';
import PostScreen from '../screens/PostScreen';
import FullPostScreen from '../screens/home/FullPostScreen';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SvgHome from "../assets/home";
import SvgSearch from "../assets/search";
import SvgPost from "../assets/plus";
import SvgNotifications from "../assets/notifications";
import SvgProfile from "../assets/profile";
import SvgHomeFill from "../assets/homeFill";
import SvgSearchFill from "../assets/searchFill"
import SvgPostFill from "../assets/postFill"
import SvgNotificationFill from "../assets/notificationFill"
import SvgProfileFill from "../assets/profileFill"
import MessageListScreen from '../screens/messages/MessageListScreen';
import StartScreen from '../screens/home/StartScreen';
import { MessageProvider } from '../components/Message/MessageContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const { STARTSCREEN, SPLASHSCREEN, MESSAGELISTSCREEN, PROFILESCREEN, NOTIFICATIONSCREEN, POSTSCREEN, FULLPOSTSCREEN, CHATSCREEN, MESSAGESCREEN, ENTRYSCREEN, HOMESCREEN, USERNAMESCREEN, SEARCHSCREEN, SIGNINSCREEN, SIGNUPSCREEN, FORGETPASSWORDSCREEN } = SCREENS;

const tabHiddenRoutes = [
  SPLASHSCREEN,
  ENTRYSCREEN,
  SIGNINSCREEN,
  SIGNUPSCREEN,
  POSTSCREEN,
  FORGETPASSWORDSCREEN,
  FULLPOSTSCREEN,
  USERNAMESCREEN,
  CHATSCREEN,
];

const MainTabNavigator = ({shouldHideTabBar}) => {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          display: shouldHideTabBar ? "none" : "flex",
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        options={{ tabBarIcon: ({ focused }) => (focused ? <SvgHomeFill /> : <SvgHome />) }}
        name={HOMESCREEN}
        component={HomeScreen}
      />
      <Tab.Screen options={{ tabBarIcon: ({focused}) => (focused ? <SvgSearchFill/> : <SvgSearch/>) }} name={SEARCHSCREEN} component={SearchScreen} />
      <Tab.Screen options={{ tabBarIcon: ({focused}) => (focused ? <SvgPostFill/> : <SvgPost/>) }} name={POSTSCREEN} component={PostScreen} />
      <Tab.Screen options={{ tabBarIcon: ({focused}) => (focused ? <SvgNotificationFill/> : <SvgNotifications />) }} name={NOTIFICATIONSCREEN} component={NotificationsScreen} />
      <Tab.Screen options={{ tabBarIcon: ({focused}) => (focused ? <SvgProfileFill/> : <SvgProfile />) }} name={PROFILESCREEN} component={ProfileScreen} />
    
    </Tab.Navigator>
  );
};


const MainWrapper = () => {

  const navigation = useNavigation();
  const route = useRoute();

  const [shouldHideTabBar, setShouldHideTabBar] = useState(false);

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (!routeName) return;

    setShouldHideTabBar(tabHiddenRoutes.includes(routeName));
  }, [route]);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: shouldHideTabBar ? "none" : "flex",
      },
    });

    console.log("should hide:", shouldHideTabBar)
  }, [navigation, shouldHideTabBar]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs">
        {() => <MainTabNavigator route={route} shouldHideTabBar={shouldHideTabBar} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};


const AppNavigator = () => {
  return (
    <MessageProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SPLASHSCREEN} component={SplashScreen} />
        <Stack.Screen name={ENTRYSCREEN} component={EntryScreen} />
        <Stack.Screen name={SIGNINSCREEN} component={SignInScreen} />
        <Stack.Screen name={FORGETPASSWORDSCREEN} component={ForgetPassword} />
        <Stack.Screen name={SIGNUPSCREEN} component={SignUpScreen} />
        <Stack.Screen name={USERNAMESCREEN} component={UsernameScreen} />
        <Stack.Screen name={FULLPOSTSCREEN} component={FullPostScreen} />
        <Stack.Screen name={CHATSCREEN} component={ChatScreen} />
        <Stack.Screen name={MESSAGESCREEN} component={MessageScreen} />
        <Stack.Screen name={STARTSCREEN} component={StartScreen} />
        <Stack.Screen
          name={MESSAGELISTSCREEN}
          component={MessageListScreen}
          options={{ tabBarStyle: { display: "flex" } }}
        />
        <Stack.Screen name="Main" component={MainWrapper} />
      </Stack.Navigator>
    </NavigationContainer>
    </MessageProvider>
  );
};

export default AppNavigator;