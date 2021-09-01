<template>
  <div :class="`${props.direction} arrow-container`" @click="move">
    <svg
      width="14"
      height="19"
      viewBox="0 0 14 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.2522 7.19967C13.6846 8.39877 13.6846 10.6012 12.2522 11.8003L4.92574 17.9337C2.97301 19.5685 0 18.1801 0 15.6334L0 3.36658C0 0.819906 2.97301 -0.568492 4.92574 1.06625L12.2522 7.19967Z"
        fill="#4A8B54"
      />
    </svg>
  </div>
</template>

<script setup>
import {
  avatars,
  createRandomAvatars,
  currentSection,
} from "./avatar_picker_store";

const props = defineProps({
  direction: {
    validator: function (value) {
      return ["right", "left"].indexOf(value) !== -1;
    },
  },
});

function moveForward() {
  if (currentSection.value === avatars.value.length - 1) {
    createRandomAvatars();
    return;
  }
  currentSection.value += 1;
}

function moveBackwards() {
  if (currentSection.value === 0) return;
  currentSection.value -= 1;
}

function move() {
  if (props.direction === "right") {
    moveForward();
    return;
  }
  moveBackwards();
}
</script>

<style scoped>
.right {
  transform: rotate(0);
}
.left {
  transform: rotateY(-180deg);
}

.arrow-container {
  cursor: pointer;
  display: flex;
  padding: 10px;
  align-items: center;
  background: rgb(20, 20, 20);
  border-radius: 0px 10px 10px 0px;
  align-self: stretch;
  flex: 1;
}

.arrow-container:hover {
  background: rgb(15, 15, 15);
}
</style>
