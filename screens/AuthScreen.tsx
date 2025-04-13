import { useState } from "react";
import { Message, User, RootStackParamList } from "../lib/types";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
const avatarMap: { [key: string]: any } = {
	man: require("../assets/images/man.png"),
	woman: require("../assets/images/woman.png"),
	boy: require("../assets/images/boy.png"),
	girl: require("../assets/images/girl.png"),
	grandpa: require("../assets/images/grandpa.png"),
	grandma: require("../assets/images/grandma.png"),
	alien: require("../assets/images/alien.png"),
};
const avatars = Object.keys(avatarMap);

type AuthScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"Auth"
>;

export default function AuthScreen() {
	const [username, setUsername] = useState("");
	const [avatar, setAvatar] = useState("man");
	const navigation = useNavigation<AuthScreenNavigationProp>();
	const [messages, setMessages] = useState<Message[]>([]);
	const [users, setUsers] = useState<User[]>([]);

	const handleJoin = () => {
		if (username.trim()) {
			navigation.navigate("Chat", { username, avatar });
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>İsmini Gir:</Text>
			<TextInput
				style={styles.input}
				value={username}
				onChangeText={setUsername}
				placeholder='Kullanıcı adı'
				placeholderTextColor='#ccc'
			/>
			<Text style={styles.title}>Avatar Seç:</Text>
			<View style={styles.avatarList}>
				{avatars.map((av: string) => (
					<TouchableOpacity key={av} onPress={() => setAvatar(av)}>
						<Image
							source={avatarMap[av]}
							style={[
								styles.avatar,
								avatar === av && { borderColor: "cyan", borderWidth: 2 },
							]}
						/>
					</TouchableOpacity>
				))}
			</View>
			<TouchableOpacity onPress={handleJoin} style={styles.button}>
				<Text style={styles.buttonText}>Sohbete Katıl</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
		backgroundColor: "#111",
	},
	title: { color: "#fff", fontSize: 18, marginBottom: 8 },
	input: {
		backgroundColor: "#333",
		color: "#fff",
		padding: 10,
		marginBottom: 20,
		borderRadius: 8,
	},
	avatarList: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
	avatar: { width: 50, height: 50, margin: 5, borderRadius: 25 },
	button: {
		marginTop: 20,
		backgroundColor: "#1e90ff",
		padding: 12,
		borderRadius: 8,
	},
	buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});
