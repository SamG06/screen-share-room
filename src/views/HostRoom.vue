<template>
  <h1>The Room</h1>
  <CopyRoomLink />
  <UsersList />
  <MessageArea />
</template>

<script setup>
import {
  connectedUsers,
  hostPeerID,
  newUserSetup,
  peer,
  sendToAllPeers,
  userDataPackage,
  userDisconnected,
  userPeerID,
} from "../store/room-data-store";
import CopyRoomLink from "../components/CopyRoomLink.vue";
import UsersList from "../components/UsersList.vue";
import MessageArea from "../components/MessageArea/MessageArea.vue";

// ALL INITIAL CONNECTION OPEN AND ERROR HANDLING IS DONE IN ROOM DATA STORE

const sendInitialPackage = (conn) => {
  console.log("sending initial package", userDataPackage(), conn);
  conn.send({ type: "initial-user-package", ...userDataPackage() });
};
hostPeerID.value = userPeerID.value;
// Connections coming in to host
peer.on("connection", (conn) => {
  console.log("New connection coming in.", conn.peer);

  conn.on("open", () => {
    console.log("New connection opened", conn);
    sendInitialPackage(conn);

    conn.on("data", (data) => {
      console.log(data);
      if (data.type === "initial-user-package") {
        newUserSetup(conn, false, data);
        sendToAllPeers({ type: "new user connected", newUserID: conn.peer });
      }
    });

    // If connection disconnects
  });

  conn.peerConnection.oniceconnectionstatechange = function () {
    if (conn.peerConnection.iceConnectionState == "disconnected") {
      userDisconnected(conn.peer);
    }
  };

  conn.on("close", () => {
    userDisconnected(conn.peer);
  });
});
</script>

<style scoped>
a {
  color: #42b983;
}
h1 {
  color: white;
  align-self: flex-start;
  margin-left: 20px;
  margin-top: 10px;
}
</style>
