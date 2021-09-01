<template>
  <div v-if="appError" class="critical-error">
    <p class="generic-message">{{ genericMessage }}</p>

    <p class="error-message">{{ appError }}</p>
    <button @click="this.$router.go()">Refresh</button>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { appError } from "../store/room-data-store";

const route = useRoute();

const hostMessage =
  "There has been an error please refresh and try to host again.";
const clientMessage = `There has been an error please refresh or wait for your host to send you a
      new link!`;

const genericMessage = computed(() =>
  route.name === "Join Room" ? clientMessage : hostMessage
);
</script>

<style scoped>
.critical-error {
  position: fixed;
  opacity: 0.97;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: black;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 20px;
  z-index: 900;
}

.generic-message {
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 1.1em;
}
.error-message {
  background: rgb(100, 12, 12);
  padding: 3px;
  border-radius: 5px;
  color: rgb(235, 93, 93);
  margin-bottom: 20px;
}

button {
  margin-bottom: 50px;
}
button {
  background: #7af88e;
  color: #0b3812;
  max-width: 200px;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  font-weight: 500;

  cursor: pointer;
}
</style>
