import { reactive, toRefs } from "vue";
import typedUsername from "../store/typed-username";
import dataUri from "../store/chosen-avatar";

import Peer from "peerjs";

const stunServers = [{ urls: "stun:stun.l.google.com:19302" }];

const roomData = reactive({
  viewRoom: false,
  connectedUsers: [],
  maxConnections: 5,
  appError: "",
  userPeerID: "",
  hostPeerID: "",
});

export const { viewRoom, connectedUsers, appError, userPeerID, hostPeerID } =
  toRefs(roomData);

export const peer = new Peer("", {
  host: "localhost",
  port: 9000,
  path: "/myapp",
});

peer.on("open", (id) => {
  console.log("Your peer id is", id);
  userPeerID.value = id;
});

peer.on("disconnected", () => {
  console.log("Connection to peer server lost.");
});

peer.on("error", (err) => {
  console.error(err);
  appError.value = err;
});

export const userDataPackage = () => {
  return {
    username: typedUsername.value,
    u_avatar: dataUri.value,
  };
};

export const newUserSetup = (conn, isHost, { username, u_avatar }) => {
  console.log(`Setting up new user ${username} ${conn.peer}`);
  connectedUsers.value.push({ username, u_avatar, conn, isHost });
  console.log(connectedUsers.value);
};

export const userDisconnected = (id) => {
  connectedUsers.value = connectedUsers.value.filter(
    ({ conn }) => conn.peer != id
  );
  console.log(id, "user disconnected");
};

export const sendToAllPeers = (message) => {
  connectedUsers.value.forEach(({ conn }) => {
    if (conn.peer === message.newUserID) return;
    console.log("Sent message to", conn);
    conn.send(message);
  });
};
