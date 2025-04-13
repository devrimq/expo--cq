import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./screens/AuthScreen";
import ChatScreen from "./screens/ChatScreen";
import { RootStackParamList } from "./lib/types"; // ← yolu doğruysa
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Auth'>
				<Stack.Screen
					name='Auth'
					component={AuthScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Chat'
					component={ChatScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
