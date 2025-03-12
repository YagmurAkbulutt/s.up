import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { SCREENS } from "../utils/router"
import SearchScreen from '../screens/search/SearchScreen';
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import HomeScreen from '../screens/home/HomeScreen';
import SvgHome from "../assets/home"
import SvgSearch from "../assets/search"
import SvgPost from "../assets/plus"
import SvgNotifications from "../assets/notifications"
import SvgProfile from "../assets/profile"
import SvgHomeFill from "../assets/homeFill"
import NotificationsScreen from '../screens/notifications/NotificationsScreen';

const Tab = createBottomTabNavigator();
const {HOMESCREEN, SEARCHSCREEN, POSTSCREEN,NOTIFICATIONSCREEN, PROFILESCREEN, ENTRYSCREEN,} = SCREENS

const BottomTabNavigator = () => {

  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel:false, headerShown:false, tabBarStyle:{
      borderTopWidth:0
    }}}>
      <Tab.Screen options={{tabBarIcon: ({focused}) => focused ? <SvgHomeFill/> : <SvgHome/>}} name={HOMESCREEN} component={HomeScreen} />
      <Tab.Screen options={{tabBarIcon: () => <SvgSearch/>}} name={SEARCHSCREEN} component={SearchScreen} />
      <Tab.Screen options={{tabBarIcon: () => <SvgPost/>}} name={POSTSCREEN} component={PostScreen} />
      <Tab.Screen options={{tabBarIcon: () => <SvgNotifications/>}} name={NOTIFICATIONSCREEN} component={NotificationsScreen} />
      <Tab.Screen options={{tabBarIcon: () => <SvgProfile/>}} name={PROFILESCREEN} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator