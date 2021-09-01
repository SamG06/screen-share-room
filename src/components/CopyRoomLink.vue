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

<style scoped></style>
