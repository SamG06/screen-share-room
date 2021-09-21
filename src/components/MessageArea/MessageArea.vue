<template>
  <div class="message-area">
    <div ref="messageArea" class="messages-container">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message-box"
      >
        <div class="message-username">
          {{ message.username
          }}<span v-if="message.isSelf" class="verify-is-you"> [You]</span> -
          {{ message.time }}
        </div>
        <div class="text-holder">
          <div class="message-avatar">
            <img :src="message.u_avatar" alt="message avatar" />
          </div>
          {{ message.text }}
          <img :src="message.link" alt="gif image" />
        </div>
      </div>
    </div>
    <ViewNewMessages @bottom="scrollBottom" :show="showViewMessage" />
    <div class="message-action-center">
      <TenorGif @send="sendGif" />
      <input
        v-model="currentMessage"
        type="text"
        placeholder="enter message"
        @keyup.enter="sendMessage"
      />
    </div>
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
import ViewNewMessages from "./ViewNewMessages.vue";

import { formatRelative } from "date-fns";
import dataUri from "../../store/chosen-avatar";
const peersListeningForMessages = [];
const currentMessage = ref("");
const messages = ref([]);
const newPeerIndex = ref(null);

const messageArea = ref(null);

const showViewMessage = ref(false);

const scrollBottom = () => {
  setTimeout(() => {
    messageArea.value.scrollTop = messageArea.value.scrollHeight;
  });
};

const timeString = () => {
  let timeString = formatRelative(new Date(), new Date());
  const firstLetter = timeString[0].toUpperCase();
  timeString = firstLetter + timeString.slice(1);
  return timeString;
};
const messageListener = (conn) => {
  console.log("ran message listenrr!!!", conn);
  conn.on("data", (data) => {
    console.log(data.type, "message data thing");
    if (!data.connID) return;

    const { username, u_avatar } = connectedUsers.value.find(
      ({ conn }) => conn.peer === data.connID
    );

    data.username = username;
    data.u_avatar = u_avatar;
    data.time = timeString();

    if (data.type === "text-message") {
      const atBottom =
        messageArea.value.scrollHeight - messageArea.value.scrollTop ===
        messageArea.value.clientHeight;

      console.log(
        atBottom,
        "is at bottom",
        messageArea.scrollHeight,
        messageArea.scrollTop,
        messageArea.clientHeight
      );
      if (atBottom) {
        messages.value.push(data);
        scrollBottom();
        return;
      }

      messages.value.push(data);
      console.log(messages.value);
      showViewMessage.value = true;
    }

    if (data.type === "gif") {
      console.log("gif message");
      const atBottom =
        messageArea.value.scrollHeight - messageArea.value.scrollTop ===
        messageArea.value.clientHeight;

      console.log(
        atBottom,
        "is at bottom",
        messageArea.scrollHeight,
        messageArea.scrollTop,
        messageArea.clientHeight
      );
      if (atBottom) {
        messages.value.push(data);
        const img = new Image();

        img.onload = () => {
          scrollBottom();
        };
        img.src = data.link;

        return;
      }

      messages.value.push(data);
      console.log(messages.value);
      showViewMessage.value = true;
    }
  });
};

onMounted(() => {
  const element = messageArea.value;
  element.addEventListener("scroll", () => {
    const atBottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;
    if (atBottom) {
      showViewMessage.value = false;
    }
  });
  //
});

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
      newPeerIndex.value = -1;
    }
  }
);

function sendGif(messagePackage) {
  console.log(messagePackage);
  messagePackage.username = typedUsername.value;
  messagePackage.u_avatar = dataUri.value;
  messagePackage.isSelf = true;
  messagePackage.time = timeString();
  sendToAllPeers(messagePackage);
  messages.value.push(messagePackage);

  const img = new Image();
  img.onload = () => {
    scrollBottom();
    console.log("image time");
  };
  img.src = messagePackage.link;
}
function sendMessage() {
  const messagePackage = {
    connID: userPeerID.value,
    text: currentMessage.value,
  };

  sendToAllPeers({ type: "text-message", ...messagePackage });
  messagePackage.username = typedUsername.value;
  messagePackage.u_avatar = dataUri.value;
  messagePackage.isSelf = true;
  messagePackage.time = timeString();
  messages.value.push(messagePackage);
  currentMessage.value = "";
  console.log(messageArea.value);

  scrollBottom();
}
</script>

<style scoped>
.verify-is-you {
  font-weight: bold;
}
.message-action-center {
  padding-right: 10px;
  padding-left: 10px;
}
.message-area {
  height: 100%;
  background: #171717;
  display: flex;
  flex-flow: column;
  width: 350px;
  padding-bottom: 10px;
  position: relative;
}

.messages-container {
  display: flex;
  flex-flow: column;
  height: 100%;
  overflow-y: scroll;
  padding-right: 10px;
  padding-left: 10px;
}
.messages-container .message-box:first-child {
  margin-top: auto;
}

.messages-container .message-box:last-child {
  margin-bottom: 0;
}

.message-box {
  margin-bottom: 10px;
}

.message-username {
  color: #868686;
  text-align: left;
  margin-bottom: 5px;
  font-size: 0.9em;
}

.text-holder {
  background: #202020;
  border-radius: 10px;
  padding: 10px;
  color: rgb(209, 209, 209);
  font-size: 0.95em;
  text-align: left;
  display: flex;
  padding-left: 40px;
  position: relative;
  padding-top: 15px;
  padding-bottom: 15px;
}

.message-avatar {
  width: 30px;
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
}

input {
  margin-top: auto;
  border: none;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
}
</style>
