import AppNavigator from './src/router/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox} from 'react-native';

LogBox.ignoreAllLogs(); 

const App = () => {
  
  return(
    <GestureHandlerRootView style={{flex:1}}>
      <AppNavigator/>
    </GestureHandlerRootView>
  )  
};

export default App;



