<template>
  <button v-if="wantsToEditAvatar" @click="wantsToEditAvatar = false">
    Next
  </button>
  <button v-else @click="viewRoom = true">{{ finalButtonText }}</button>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { wantsToEditAvatar } from "../store/chosen-avatar";
import { viewRoom } from "../store/room-data-store";

const route = useRoute();
const finalButtonText = computed(() =>
  route.name === "Join Room" ? "Join Room" : "Host Room"
);
</script>

<style scoped>
button {
  background: #7af88e;
  color: #0b3812;
  width: 200px;
  height: 40px;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  font-weight: 500;
  margin-left: auto;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 70px;
}
</style>
