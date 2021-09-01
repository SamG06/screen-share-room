<template>
  <h1>Screen Share Room</h1>
  <CriticalError />
  <UsernamePicker v-if="!wantsToEditAvatar && !viewRoom" />
  <AvatarPicker v-if="wantsToEditAvatar && !viewRoom" />

  <HostRoom v-if="viewRoom && !isJoinRoom" />
  <ClientRoom v-if="viewRoom && isJoinRoom" />
</template>

<script setup>
import { computed, ref } from "@vue/reactivity";
import AvatarPicker from "../components/AvatarPicker/AvatarPicker.vue";
import UsernamePicker from "../components/UsernamePicker.vue";
import { wantsToEditAvatar } from "../store/chosen-avatar";
import { viewRoom } from "../store/room-data-store";
import HostRoom from "./HostRoom.vue";
import ClientRoom from "./ClientRoom.vue";
import { useRoute } from "vue-router";
import CriticalError from "../components/CriticalError.vue";
const route = useRoute();

const isJoinRoom = computed(() => route.name === "Join Room");

if (!localStorage.getItem("chosen-avatar")) {
  wantsToEditAvatar.value = true;
}
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
