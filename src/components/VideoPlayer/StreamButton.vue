<template>
  <div>
    <button @click="getStream">Start Stream</button>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { connectedUsers, peer } from "../../store/room-data-store";

import _ from "lodash";

const props = defineProps({
  videoStream: MediaStream,
});

const emit = defineEmits(["setStream"]);

const constraints = ref({
  audio: {
    echoCancellation: false,
    googEchoCancellation: false,
    googEchoCancellation2: false,
    googAutoGainControl: false,
    googAutoGainControl2: false,
    googNoiseSuppression: false,
    googNoiseSuppression2: false,
    googHighpassFilter: false,
    googTypingNoiseDetection: false,
  },
  video: {
    width: { max: 1280 },
    height: { max: 720 },
    frameRate: { max: 24 },
  },
});

const qualityOptions = [];

const newPeerIndex = ref(null);

const streaming = ref(false);

const currentQuality = ref(720);

async function getStream() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia(
      constraints.value
    );
    emit("setStream", stream);
    connectedUsers.value.forEach(({ conn }) => {
      const call = peer.call(conn.peer, stream);
      console.log(call);
    });
  } catch (error) {
    console.log(`Can't get media. Please try again.`, error);
    return;
  }
}

watch(newPeerIndex, () => {
  if (newPeerIndex.value >= 0) {
    const id = connectedUsers.value[newPeerIndex.value].conn.peer;
    if (props.videoStream) {
      peer.call(id, props.videoStream);
    }
  }
});
// cloning deep caused issues with watching for data, second watch is for making sure
// We're calling if stream is running
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
watch(
  () => _.cloneDeep(connectedUsers),
  (connectedUsers, prevConnectedUsers) => {
    const newConnection = connectedUsers.value.filter(({ conn }) => {
      const contains = (user) => user.conn.peer === conn.peer;
      return !prevConnectedUsers.value.some(contains);
    });
    console.log(newConnection[0], "new connection index: stream");

    if (newConnection[0]) {
      console.log(props.videoStream, "video stream value");
      console.log(
        newConnection[0].conn.peer,
        props.videoStream,
        "newconnection streasm"
      );
      if (props.videoStream) {
        console.log("CALLED");
        peer.call(newConnection[0].conn.peer, props.videoStream);
      }
    } else {
      console.log("no new connection: stream", newConnection);
    }
  }
);
</script>

<style scoped></style>
