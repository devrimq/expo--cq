import { View, Text, StyleSheet } from "react-native";
import { User } from "../lib/types";

export default function UserList({ users }: { users: User[] }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Çevrim içi kullanıcılar:</Text>
			{users.map((user, i) => (
				<Text key={user.id || `${user.username}-${i}`} style={styles.user}>
					• {user.username}
				</Text>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#111",
		padding: 10,
		margin: 10,
	},
	title: {
		color: "#aaa",
		marginBottom: 4,
		fontSize: 16,
		fontWeight: "bold",
	},
	user: {
		color: "#fff",
		fontSize: 14,
	},
});
