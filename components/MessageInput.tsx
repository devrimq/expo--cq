import { useState } from "react";
import {
	View,
	TextInput,
	TouchableOpacity,
	Text,
	StyleSheet,
} from "react-native";

export default function MessageInput({
	onSend,
	onTyping,
}: {
	onSend: (text: string) => void;
	onTyping: () => void;
}) {
	const [text, setText] = useState("");

	const handleSend = () => {
		if (text.trim()) {
			onSend(text.trim());
			setText("");
		}
	};

	return (
		<View style={styles.inputContainer}>
			<TextInput
				style={styles.input}
				placeholder='Mesaj yaz...'
				placeholderTextColor='#666'
				value={text}
				onChangeText={(val) => {
					setText(val);
					onTyping();
				}}
			/>
			<TouchableOpacity onPress={handleSend} style={styles.sendButton}>
				<Text style={styles.sendText}>Gönder</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: "row",
		padding: 10,
		backgroundColor: "#111",
	},
	input: {
		flex: 1,
		backgroundColor: "#222",
		color: "#fff",
		padding: 10,
		borderRadius: 8,
	},
	sendButton: {
		marginLeft: 10,
		backgroundColor: "#1e90ff",
		padding: 10,
		borderRadius: 8,
	},
	sendText: { color: "#fff" },
});
