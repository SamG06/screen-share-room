<template>
  <div class="main-options-container">
    <ChosenAvatar :editVersion="true" />
    <label for="displayName">Display Name</label>
    <div class="username-choose">
      <input
        type="text"
        name="username"
        id="displayName"
        autocomplete="off"
        placeholder="Enter Display Name"
        :maxlength="maxChar"
        v-model="typedUsername"
        @keyup="updateUsername"
        @keyup.enter="viewRoom = true"
      />
      <p class="chars-left">{{ charsLeft }}</p>
    </div>
    <NextSectionButton />
  </div>
</template>

<script setup>
import { computed, ref } from "@vue/reactivity";
import typedUsername from "../store/typed-username";
import ChosenAvatar from "./AvatarPicker/ChosenAvatar.vue";
import NextSectionButton from "./NextSectionButton.vue";
import { viewRoom } from "../store/room-data-store";

const maxChar = ref(16);

const charsLeft = computed(() => maxChar.value - typedUsername.value.length);

function updateUsername(e) {
  localStorage.setItem("typed-username", e.target.value);
}
</script>

<style scoped>
.main-options-container {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: fit-content;
  align-self: center;
  margin-top: 10vh;
}
.username-choose {
  display: flex;
  flex-flow: column;
  width: 400px;
  position: relative;
}

label {
  color: rgb(236, 236, 236);
  font-size: 1em;
  margin-right: auto;
  margin-bottom: 10px;
}

.chars-left {
  position: absolute;
  color: rgb(62, 115, 228);
  right: 10px;
  top: 50%;
  font-weight: 600;
  transform: translateY(-50%);
}
#displayName {
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  font-size: 0.9em;
  padding: 15px;
  padding-left: 10px;
  outline: none;
  color: rgb(17, 17, 17);
}

@media only screen and (max-width: 440px) {
  .main-options-container {
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
  }

  .username-choose {
    width: 100%;
  }
}
</style>
