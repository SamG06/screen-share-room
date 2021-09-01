<template>
  <div class="chosen-avatar">
    <p v-if="!chosen_avatar" class="not-chosen">No avatar chosen</p>
    <div v-if="chosen_avatar" class="result">
      <img :src="chosen_avatar" alt="chosen avatar" />
      <button v-if="props.editVersion" class="edit-button" @click="editSection">
        Edit Avatar
      </button>
      <p v-else class="chosen-text">Chosen Avatar</p>
    </div>
  </div>
</template>

<script setup>
import chosen_avatar, { wantsToEditAvatar } from "../../store/chosen-avatar";

const props = defineProps({
  editVersion: Boolean,
});

function editSection() {
  console.log("test");
  wantsToEditAvatar.value = true;
}
</script>

<style scoped>
.chosen-avatar {
  background: #272727;
  color: #c7c7c7;
  padding: 10px;
  width: 160px;
  height: 160px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 35px;
}

.not-chosen {
  font-size: 0.9em;
}
img {
  width: 120px;
}
.chosen-text {
  font-size: 1em;
  margin: 0;
}

.edit-button {
  background: #131313;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
}
button {
  cursor: pointer;
}
</style>
