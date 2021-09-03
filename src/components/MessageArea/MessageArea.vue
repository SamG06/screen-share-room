<template>
  <div class="message-area">
    <div class="messages-container">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message-box"
      >
        <div class="text-holder">
          {{ message.text }}
        </div>
      </div>
    </div>
    <TenorGif />
    <input
      v-model="currentMessage"
      type="text"
      placeholder="enter message"
      @keyup.enter="sendMessage"
    />
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, watch, watchEffect } from "@vue/runtime-core";
import {
  connectedUsers,
  sendToAllPeers,
  userPeerID,
} from "../../store/room-data-store";
import _ from "lodash";
import typedUsername from "../../store/typed-username";
import TenorGif from "./TenorGif.vue";

const peersListeningForMessages = [];
const currentMessage = ref("");
const messages = ref([]);
const newPeerIndex = ref(null);

const messageListener = (conn) => {
  console.log("ran", conn);
  conn.on("data", (data) => {
    console.log(data, "message data thing");
    if (data.type === "text-message") {
      console.log("text recieved", data);
      messages.value.push(data);
      console.log(messages.value);
    }
  });
};

watch(newPeerIndex, () => {
  console.log("incremented", newPeerIndex);
  if (newPeerIndex.value >= 0) {
    messageListener(connectedUsers.value[newPeerIndex.value].conn);
  }
});

// cloning deep caused issues with watching for data, second watch is for making sure
// We're listening for messages
watch(
  () => _.cloneDeep(connectedUsers),
  (connectedUsers, prevConnectedUsers) => {
    const newConnection = connectedUsers.value.findIndex(({ conn }) => {
      const contains = (user) => user.conn.peer === conn.peer;
      return !prevConnectedUsers.value.some(contains);
    });
    console.log(newConnection, "new connection index");

    if (newConnection >= 0) {
      newPeerIndex.value = newConnection;
    } else {
      console.log("no new connection", newConnection);
    }
  }
);

function sendMessage() {
  const messagePackage = {
    connID: userPeerID.value,
    text: currentMessage.value,
  };

  sendToAllPeers({ type: "text-message", ...messagePackage });
  messages.value.push(messagePackage);
  currentMessage.value = "";
}
</script>

<style scoped>
.message-area {
  height: 100%;
  background: #171717;
  display: flex;
  flex-flow: column;
  width: 350px;
  padding: 10px;
  position: relative;
}

.messages-container {
  display: flex;
  flex-flow: column;
  height: 100%;
  overflow-y: scroll;
}
.messages-container .message-box:first-child {
  margin-top: auto;
}
.message-box {
  margin-bottom: 10px;
}
.text-holder {
  background: #202020;
  border-radius: 10px;
  padding: 10px;
  color: rgb(209, 209, 209);
  font-size: 0.95em;
  text-align: left;
}
input {
  margin-top: auto;
  border: none;
  padding: 10px;
  border-radius: 5px;
}
</style>
