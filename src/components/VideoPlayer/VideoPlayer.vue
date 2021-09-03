<template>
  <div class="video-container">
    <StreamButton @setStream="setVideoStream" :videoStream="videoStream" />
    <video ref="mainVideo" autoplay></video>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { peer } from "../../store/room-data-store";
import StreamButton from "./StreamButton.vue";

const videoStream = ref(null);

const mainVideo = ref(null);

const setVideoStream = (stream) => {
  console.log("stream is set", stream);
  videoStream.value = stream;
};

onMounted(() => {
  peer.on("call", (call) => {
    call.answer();
    call.on("stream", (stream) => {
      console.log("stream recieved", stream);
      setVideoStream(stream);
    });
  });
});

watch(videoStream, () => {
  if (videoStream.value) {
    console.log("video stream is set");
    mainVideo.value.srcObject = videoStream.value;
  }
});
onMounted(() => {});
</script>

<style scoped></style>
