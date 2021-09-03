<template>
  <PageContent />
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
import {
  appError,
  connectedUsers,
  hostPeerID,
  newUserSetup,
  peer,
  userDataPackage,
  userDisconnected,
} from "../store/room-data-store";

import PageContent from "../components/PageContent.vue";

const route = useRoute();

const roomID = computed(() => route.params.roomID);

hostPeerID.value = roomID.value;

const hostConn = peer.connect(roomID.value);

const sendInitialPackage = (conn) => {
  console.log("sending initial package", userDataPackage(), conn);
  conn.send({ type: "initial-user-package", ...userDataPackage() });
};
hostConn.on("open", () => {
  console.log("connection open!");
  sendInitialPackage(hostConn);

  hostConn.on("data", (data) => {
    if (data.type === "initial-user-package") {
      newUserSetup(hostConn, true, data);
    }
    if (data.type === "new user connected") {
      const newUserConn = peer.connect(data.newUserID);

      newUserConn.on("open", () => {
        connectedUsers.value.push();
        console.log("new user connection opened");
        sendInitialPackage(newUserConn);
        console.log(newUserConn);

        newUserConn.on("data", (data) => {
          console.log("new user data sent", data);
          if (data.type === "initial-user-package") {
            newUserSetup(newUserConn, false, data);
          }
        });
      });

      newUserConn.peerConnection.oniceconnectionstatechange = function () {
        if (newUserConn.peerConnection.iceConnectionState == "disconnected") {
          userDisconnected(newUserConn.peer);
        }
      };
    }
  });

  hostConn.peerConnection.oniceconnectionstatechange = function () {
    if (hostConn.peerConnection.iceConnectionState == "disconnected") {
      userDisconnected(hostConn.peer);
      appError.value = "Host Disconnected!!!";
    }
  };
  hostConn.on("close", () => {
    userDisconnected(hostConn.peer);
    appError.value = "Host Disconnected!!!";
  });
});

peer.on("connection", (conn) => {
  console.log("connection coming in");
  conn.on("open", () => {
    sendInitialPackage(conn);
  });

  conn.on("data", (data) => {
    console.log("new user data sent", data);
    if (data.type === "initial-user-package") {
      newUserSetup(conn, false, data);
    }
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
