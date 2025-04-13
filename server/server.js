const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

let users = [];

io.on("connection", (socket) => {
	console.log("✅ Yeni bağlantı:", socket.id);

	socket.on("join", ({ username, avatar }) => {
		console.log("📥 Katıldı:", username);

		// Aynı username varsa önce çıkar
		users = users.filter((user) => user.username !== username);

		const user = { id: socket.id, username, avatar };
		users.push(user);

		io.emit("users", users);
	});

	socket.on("message", (data) => {
		console.log("💬 Mesaj:", data);
		io.emit("message", data);
	});

	socket.on("typing", (username) => {
		socket.broadcast.emit("typing", username);
	});

	socket.on("disconnect", () => {
		console.log("❌ Koptu:", socket.id);
		users = users.filter((user) => user.id !== socket.id);
		io.emit("users", users);
	});
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
	console.log(`🚀 Server çalışıyor: http://localhost:${PORT}`);
});
