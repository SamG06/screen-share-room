<template>
  <button v-if="show" @click="emit('bottom')" class="view-new-messages">
    New Messages ↓
  </button>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { getCurrentInstance, onMounted } from "@vue/runtime-core";

const emit = defineEmits(["bottom"]);

const props = defineProps({
  show: Boolean,
});
</script>

<style scoped>
.view-new-messages {
  background: rgba(98, 224, 255, 0.39);
  position: absolute;
  border: none;
  color: white;
  padding: 10px;
  bottom: 100px;
  width: 190px;
  border-radius: 100px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}

.view-new-messages:hover {
  background: rgb(34, 113, 133);
}
</style>
