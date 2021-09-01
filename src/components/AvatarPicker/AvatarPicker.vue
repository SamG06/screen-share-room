<template>
  <div class="avatar-picker">
    <ChosenAvatar></ChosenAvatar>
    <p class="title-area">
      <span class="title">Choose An Avatar</span>
      <span class="explain">(Randomly generated)</span>
    </p>
    <AvatarCarousel />
    <p class="section-display">
      Section ({{ currentSection + 1 }}/{{ avatars.length }}) -
      <span v-if="displayGenerateMore" class="jump-to" @click="jumpToLatest">
        Jump to latest section
      </span>
      <span v-else> Click Forward For More </span>
    </p>
    <NextSectionButton />
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import AvatarCarousel from "./AvatarCarousel.vue";
import ChosenAvatar from "./ChosenAvatar.vue";
import NextSectionButton from "../NextSectionButton.vue";

import {
  avatars,
  createRandomAvatars,
  currentSection,
  randomAvatars,
} from "./avatar_picker_store";

// Create Initial Avatars
avatars.value.push(randomAvatars());

function jumpToLatest() {
  currentSection.value = avatars.value.length - 1;
}

const displayGenerateMore = computed(() => {
  const result = currentSection.value !== avatars.value.length - 1;
  return result;
});
</script>

<style scoped>
.avatar-picker {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: fit-content;
  align-self: center;
  margin-top: 10vh;
}

.title-area {
  margin-bottom: 10px;
  margin-right: auto;
}

.title {
  font-weight: 600;
  color: white;
}

.explain {
  font-size: 0.9em;
  margin-left: 10px;
}

span {
  color: #808080;
}

.jump-to {
  text-decoration: underline;
  cursor: pointer;
  color: rgb(31, 140, 190);
}

.section-display {
  margin-right: auto;
  user-select: none;
  margin-top: 10px;

  color: rgb(85, 85, 85);
}

.section-display span {
  font-size: 0.9em;
}

@media only screen and (max-width: 400px) {
  .title {
    font-size: 0.9em;
  }

  .explain {
    font-size: 0.86em;
  }

  .section-display span {
    font-size: 0.85em;
  }

  .section-display {
    font-size: 0.95em;
  }
}
</style>
