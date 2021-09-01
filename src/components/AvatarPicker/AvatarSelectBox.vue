<template>
  <div
    class="avatar-select-box"
    v-for="(avatar, index) in avatars[currentSection]"
    :class="{ chosen: avatar.chosen }"
    :key="index"
    @click="chooseAvatar(avatar, index)"
  >
    <img class="avatar-image" :src="avatar.dataUri" alt="user avatar" />
    <p v-if="avatar.chosen" class="chosen-text">Chosen</p>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs } from "@vue/reactivity";
import chosen_avatar from "../../store/chosen-avatar";

import { avatars, currentSection } from "./avatar_picker_store";

//const { section, index } = ref({ section: "dsd", index: null });

const chosenCoordinates = reactive({ section: null, index: null });

const { section, index } = toRefs(chosenCoordinates);

function chooseAvatar({ dataUri }, i) {
  chosen_avatar.value = dataUri;

  // Reset old chosen avatar
  if (section.value !== null) {
    avatars.value[section.value][index.value].chosen = false;
  }

  // Set new avatar as chosen
  avatars.value[currentSection.value][i].chosen = true;

  // Set New Values
  section.value = currentSection.value;

  index.value = i;

  localStorage.setItem("chosen-avatar", dataUri);
}
</script>

<style scoped>
.avatar-select-box {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 160px;
  border-right: 1px solid #161616;
  cursor: pointer;
  transition: background-color 0.1s;
  position: relative;
}

.avatar-image {
  cursor: pointer;
  width: 100px;
  transition: transform 0.1s;
}

.avatar-select-box:hover {
  background: rgb(19, 19, 19);
}

.avatar-select-box:hover img {
  transform: scale(1.1);
}

.chosen {
  background: rgb(14, 14, 14);
}

.chosen .avatar-image {
  transform: scale(1.1);
}
.chosen:hover {
  background: rgb(14, 14, 14);
}

.chosen-text {
  position: absolute;
  bottom: 7px;
  color: rgb(179, 179, 179);
}

@media only screen and (max-width: 750px) {
  .avatar-select-box {
    border-bottom: 1px solid #161616;
  }
}

@media only screen and (max-width: 400px) {
  .avatar-select-box {
    width: 120px;
  }
  .avatar-image {
    width: 90px;
  }
}
</style>
