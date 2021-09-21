<template>
  <div class="video-container">
    <video ref="mainVideo" autoplay></video>
  </div>
  <StreamButton
    v-if="isHost"
    @setStream="setVideoStream"
    :videoStream="videoStream"
  />
</template>

<script setup>
import { computed, ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { peer } from "../../store/room-data-store";
import StreamButton from "./StreamButton.vue";

const route = useRoute();

const isHost = computed(() => route.name === "Host Room");

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
  } else {
    const tracks = mainVideo.value.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
  }
});

const cleanup = () => {
  console.log("Data stopped being recieved");
  videoStream.value = null;
  console.log("Video stopped");
};
onMounted(() => {
  const isFirefox = typeof InstallTrigger !== "undefined";
  if (isFirefox) {
    mainVideo.value.addEventListener("ended", cleanup);
    return;
  }
  mainVideo.value.addEventListener("suspend", cleanup);
});
</script>

<style scoped>
.video-container {
  background: black;
  width: 100%;
  position: relative;
}

video {
  width: 100%;
  max-height: 600px;
}
</style>
