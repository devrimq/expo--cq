import { useEffect, useState } from "react";
import { Message, User } from "../lib/types";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import socket from "../lib/socket";
import MessageInput from "../components/MessageInput";
import MessageBubble from "../components/MessageBubble";
import UserList from "../components/UserList";

export default function ChatScreen() {
	const route = useRoute<any>();
	const { username, avatar } = route.params;

	const [messages, setMessages] = useState<Message[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const [typingUser, setTypingUser] = useState<string | null>(null);

	useEffect(() => {
		if (username && avatar) {
			socket.emit("join", { username, avatar });
		}

		// Dinleyicileri temiz kur
		socket.off("message").on("message", (data: Message) => {
			setMessages((prev) => [...prev, data]);
		});

		socket.off("users").on("users", (data: User[]) => {
			setUsers(data);
		});

		socket.off("typing").on("typing", (user: string) => {
			setTypingUser(user);
			setTimeout(() => setTypingUser(null), 2000);
		});
	}, []);

	const handleSend = (text: string) => {
		const message: Message = {
			sender: username,
			avatar,
			text,
			timestamp: new Date().toISOString(),
		};
		socket.emit("message", message);
		// Backend'den zaten geliyor, istersen burayı kaldırabilirsin:
		// setMessages((prev) => [...prev, message]);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			style={styles.container}>
			<UserList users={users} />
			<FlatList
				data={messages}
				keyExtractor={(item) => `${item.sender}-${item.timestamp}`}
				renderItem={({ item }) => <MessageBubble message={item} />}
				contentContainerStyle={{ padding: 10 }}
			/>
			{typingUser && <Text style={styles.typing}>{typingUser} yazıyor...</Text>}
			<MessageInput
				onSend={handleSend}
				onTyping={() => socket.emit("typing", username)}
			/>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#000" },
	typing: {
		color: "gray",
		textAlign: "center",
		marginBottom: 4,
		fontStyle: "italic",
	},
});
