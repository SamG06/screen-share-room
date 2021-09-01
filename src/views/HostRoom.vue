<template>
  <h1>The Room</h1>
  <CopyRoomLink />
</template>

<script setup>
import {
  connectedUsers,
  hostPeerID,
  initialUserConnection,
  peer,
  sendToAllPeers,
  userPeerID,
} from "../store/room-data-store";
import CopyRoomLink from "../components/CopyRoomLink.vue";

// ALL INITIAL CONNECTION OPEN AND ERROR HANDLING IS DONE IN ROOM DATA STORE

hostPeerID.value = userPeerID.value;
// Connections coming in to host
peer.on("connection", (conn) => {
  console.log("New connection coming in.", conn.peer);

  conn.on("open", () => {
    console.log("New connection opened", conn.peer);

    conn.on("data", (data) => {
      console.log(data);
      if (data.type === "initial-user-package") {
        initialUserConnection(conn, false, data);
      }

      sendToAllPeers({ type: "new user connected", newUserID: conn.peer });
    });
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
