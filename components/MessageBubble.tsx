import { View, Text, StyleSheet, Image } from "react-native";
import { Message } from "../lib/types";
const avatarMap: { [key: string]: any } = {
	man: require("../assets/images/man.png"),
	woman: require("../assets/images/woman.png"),
	boy: require("../assets/images/boy.png"),
	girl: require("../assets/images/girl.png"),
	grandpa: require("../assets/images/grandpa.png"),
	grandma: require("../assets/images/grandma.png"),
	alien: require("../assets/images/alien.png"),
};

export default function MessageBubble({ message }: { message: Message }) {
	return (
		<View style={styles.bubble}>
			<Image source={avatarMap[message.avatar]} style={styles.avatar} />
			<View>
				<Text style={styles.sender}>{message.sender}</Text>
				<Text style={styles.text}>{message.text}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	bubble: { flexDirection: "row", gap: 10, marginBottom: 10 },
	avatar: { width: 40, height: 40, borderRadius: 20 },
	sender: { fontWeight: "bold", color: "#00ffff" },
	text: { color: "#fff" },
});
