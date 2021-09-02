<template>
  <div class="messages"></div>
  <input type="text" placeholder="enter message" />
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { connectedUsers } from "../../store/room-data-store";
import _ from "lodash";

const currentMessage = ref("");
const messages = ref([]);

watch(
  () => _.cloneDeep(connectedUsers),
  (connectedUsers, prevConnectedUsers) => {
    console.log("connected users watcjed");
    console.log(connectedUsers.value.length, "current");
    console.log(prevConnectedUsers.value.length, "previous");
  }
);
</script>

<style scoped></style>
