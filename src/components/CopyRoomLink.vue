<template>
  <div class="copy-input-container">
    <label>Room Link</label>
    <input
      ref="inputEl"
      type="text"
      :value="`${roomLink}`"
      class="copy-input"
      readonly
    />
    <button type="button" @click="copy">Copy Link</button>
  </div>
</template>

<script setup>
import { computed, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { hostPeerID } from "../store/room-data-store";

const roomLink = computed(
  () => `${window.location.origin}/join/${hostPeerID.value}`
);
const inputEl = ref(null);

function copy() {
  inputEl.value.select();
  inputEl.value.setSelectionRange(0, 99999);
  document.execCommand("copy");
}
</script>

<style scoped>
.copy-input-container {
  background: rgb(24, 24, 24);
  width: fit-content;
  padding: 20px;
  border-radius: 10px;
  color: rgb(197, 197, 197);
}

input {
  border: none;
  padding: 5px;
  border-radius: 10px;
  margin-left: 5px;
  pointer-events: none;
  user-select: none;
  background: rgb(82, 82, 82);
  color: rgb(17, 17, 17);
}

input:focus {
  outline: none;
}

button {
  background: #38afff;
  color: #0b3812;
  width: 120px;
  height: 30px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  font-weight: 500;
  margin-left: 5px;
  cursor: pointer;
}
</style>
