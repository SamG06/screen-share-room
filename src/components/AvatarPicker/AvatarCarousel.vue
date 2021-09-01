<template>
  <div class="avatars-carousel">
    <Arrow direction="left" />
    <div class="avatar-box-container">
      <AvatarSelectBox />
    </div>
    <Arrow direction="right" />
  </div>
</template>

<script setup>
import Arrow from "./ArrowControl.vue";
import AvatarSelectBox from "./AvatarSelectBox.vue";
</script>

<style scoped>
.avatars-carousel {
  display: flex;
  flex-flow: row;
  justify-content: center;
  background: #1b1b1b;
  user-select: none;
  height: fit-content;
  border-radius: 10px;
}

.avatar-box-container {
  display: flex;
}

@media only screen and (max-width: 750px) {
  .avatar-box-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
