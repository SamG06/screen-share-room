<template>
  <h1>The Join Room</h1>
  <CopyRoomLink />
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
import {
  connectedUsers,
  hostPeerID,
  initialUserConnection,
  peer,
  userDataPackage,
} from "../store/room-data-store";
import typedUsername from "../store/typed-username";
import dataUri from "../store/chosen-avatar";
import CopyRoomLink from "../components/CopyRoomLink.vue";

const route = useRoute();

const roomID = computed(() => route.params.roomID);

hostPeerID.value = roomID.value;

const hostConn = peer.connect(roomID.value);

hostConn.on("open", () => {
  console.log("connection open!");

  hostConn.send({ type: "initial-user-package", ...userDataPackage() });
});

hostConn.on("data", (data) => {
  if (data.type === "new user connected") {
    //initialUserConnection(hostConn, true, data);
    console.log(data.type);
    const newUserConn = peer.connect(data.newUserID);

    newUserConn.on("open", () => {
      connectedUsers.value.push();
      console.log("new user connection opened");
      newUserConn.send({ type: "initial-user-package", ...userDataPackage() });

      newUserConn.on("data", (data) => {
        if (data.type === "initial-user-package") {
          initialUserConnection(newUserConn, false, data);
        }
      });
    });
  }
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
