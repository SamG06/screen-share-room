<template>
  <main>
    <div class="left-side">
      <VideoPlayer />
      <UsersList />
      <CopyRoomLink />
    </div>
    <div class="right-side">
      <MessageArea />
    </div>
  </main>
</template>

<script setup>
import MessageArea from "./MessageArea/MessageArea.vue";
import CopyRoomLink from "./CopyRoomLink.vue";
import UsersList from "./UsersList.vue";
import VideoPlayer from "./VideoPlayer/VideoPlayer.vue";
</script>

<style scoped>
main {
  display: flex;
  height: 100%;
}
.right-side {
  margin-left: auto;
  height: 100%;
}

.left-side {
  width: 100%;
  overflow-y: scroll;
}
</style>
