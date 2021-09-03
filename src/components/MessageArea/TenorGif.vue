<template>
  <div class="gif-center">
    <button type="button" class="gif-button" @click="toggleGifModule">
      Gif
    </button>
    <div v-if="showGifModule" class="tenor-search-area">
      <input
        placeholder="Search Tenor"
        class="category-input"
        type="text"
        @keyup="searchGifs"
      />
      <div class="categories-container">
        <div
          v-for="category in categories"
          :key="category.searchterm"
          class="category-card"
        >
          <div class="category-title">{{ category.searchterm }}</div>
          <img :src="category.image" :alt="category.searchterm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";

const showGifModule = ref(false);
const categories = ref([]);

const api = "https://api.tenor.com/v1/";

function toggleGifModule() {
  showGifModule.value = !showGifModule.value;
}
async function getCategories() {
  const response = await fetch(
    `${api}categories?key=QRCRVY2HOQKE&contentfilter=high`
  );
  const result = await response.json();
  console.log(result.tags);
  categories.value = result.tags;
}

onMounted(() => {
  getCategories();
});
</script>

<style scoped>
.gif-button {
  background: rgb(146, 146, 146);
  border: none;
  border-radius: 3px;
  color: rgb(22, 22, 22);
  margin-bottom: 5px;
  padding: 5px;
  padding-bottom: 7px;
  padding-top: 7px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  font-size: 0.92em;
  margin-top: 10px;
}

.tenor-search-area {
  position: absolute;
  bottom: 90px;
  background: rgb(26, 26, 26);
  padding: 10px;
  z-index: 100;
  border-radius: 10px;
  right: 10px;
  width: 400px;
  box-shadow: 10px 1px 1px rgb(22, 22, 22);
  border: 2px solid rgb(15, 15, 15);
}
.categories-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 8px;
  row-gap: 8px;
  height: 400px;
  padding-right: 5px;
  overflow-y: scroll;
}

.category-card {
  width: 100%;
  height: 100px;
  overflow: hidden;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid rgba(0, 0, 0, 0);
  transition: 0.1s;
  position: relative;
  user-select: none;
}

.category-card:hover {
  border: 2px solid rgb(37, 155, 223);
}
.category-title {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.596);
  color: white;
  transition: 0.1s;
  font-weight: bold;
}

.category-card:hover .category-title {
  background: rgba(0, 0, 0, 0.658);
}
.category-card img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.category-input {
  background: rgb(59, 59, 59);
  border: none;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 5px;
  color: rgb(228, 228, 228);
  font-size: 0.96em;
}
</style>
