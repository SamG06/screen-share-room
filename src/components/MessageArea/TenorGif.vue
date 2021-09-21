<template>
  <div class="gif-center">
    <button type="button" class="gif-button" @click="toggleGifModule">
      Gif
    </button>
    <div
      v-if="showGifModule"
      @click="$event.stopPropagation()"
      class="tenor-search-area"
    >
      <div class="input-area">
        <button v-if="query" type="button" @click="back()" class="back-button">
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 6.00125H3.14L6.77 1.64125C6.93974 1.43704 7.0214 1.17375 6.99702 0.909329C6.97264 0.644902 6.84422 0.400991 6.64 0.231252C6.43578 0.0615137 6.1725 -0.0201482 5.90808 0.0042315C5.64365 0.0286112 5.39974 0.157036 5.23 0.361252L0.23 6.36125C0.196361 6.40898 0.166279 6.45911 0.14 6.51125C0.14 6.56125 0.14 6.59125 0.0700002 6.64125C0.0246737 6.75591 0.000941121 6.87796 0 7.00125C0.000941121 7.12454 0.0246737 7.24659 0.0700002 7.36125C0.0700002 7.41125 0.0699999 7.44125 0.14 7.49125C0.166279 7.54339 0.196361 7.59353 0.23 7.64125L5.23 13.6413C5.32402 13.7541 5.44176 13.8449 5.57485 13.9071C5.70793 13.9694 5.85309 14.0015 6 14.0013C6.23365 14.0017 6.46009 13.9203 6.64 13.7713C6.74126 13.6873 6.82496 13.5842 6.88631 13.4679C6.94766 13.3515 6.98546 13.2242 6.99754 13.0932C7.00961 12.9622 6.99573 12.8302 6.95669 12.7046C6.91764 12.579 6.8542 12.4623 6.77 12.3613L3.14 8.00125H15C15.2652 8.00125 15.5196 7.8959 15.7071 7.70836C15.8946 7.52082 16 7.26647 16 7.00125C16 6.73604 15.8946 6.48168 15.7071 6.29415C15.5196 6.10661 15.2652 6.00125 15 6.00125Z"
              fill="white"
            />
          </svg>
        </button>
        <input
          placeholder="Search Tenor"
          class="category-input"
          type="text"
          v-model="query"
          @keyup="isTyping"
        />
      </div>
      <div class="no-results"></div>
      <div v-if="query.trim()" class="results-scroll">
        <div
          class="results-container"
          :class="{ 'not-finished': !gifsReady }"
          ref="resultsContainer"
        >
          <div
            v-if="!gifsReady"
            v-for="index in 20"
            :key="index"
            class="skeleton"
          >
            <div class="reflection"></div>
          </div>

          <img
            v-for="(gif, index) in results"
            :src="gif.nanogif.url"
            alt="gif image result"
            @load="imageLoaded($event, index)"
            @click="sendGif(gif.tinygif.url)"
          />
        </div>
      </div>

      <div v-if="!query.trim()" class="categories-container">
        <div
          v-for="category in categories"
          :key="category.searchterm"
          class="category-card"
          @click="searchGifs(category.searchterm)"
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
import { sendToAllPeers, userPeerID } from "../../store/room-data-store";

const showGifModule = ref(false);
const categories = ref([]);

const query = ref("");

const results = ref([]);
const api = "https://api.tenor.com/v1/";

const gifsReady = ref(false);
const resultsContainer = ref(null);
const amountLoaded = ref(0);

function imageLoaded(e, index) {
  amountLoaded.value += 1;

  if (amountLoaded.value === results.value.length) {
    console.log(amountLoaded.value, results.value.length);
    amountLoaded.value = 0;
    gifsReady.value = true;
  }
}

function back() {
  query.value = "";
  isTyping();
}
function toggleGifModule(e) {
  showGifModule.value = !showGifModule.value;
  e.stopPropagation();
}
async function getCategories() {
  const response = await fetch(
    `${api}categories?key=QRCRVY2HOQKE&contentfilter=high`
  );
  const result = await response.json();
  console.log(result.tags);
  categories.value = result.tags;
}

const emit = defineEmits(["send"]);
function sendGif(link) {
  console.log("sending gif");
  const m_package = { type: "gif", link, connID: userPeerID.value };
  emit("send", m_package);
  showGifModule.value = false;
  query.value = "";
  isTyping();
}
async function searchGifs(category) {
  if (category) query.value = category;

  if (!query.value.trim()) {
    results.value = [];
    return;
  }

  const response = await fetch(
    `${api}search?key=QRCRVY2HOQKE&limit=30&q=${query.value}&contentfilter=high`
  );

  const gifs = await response.json();
  console.log(gifs);

  results.value = [];
  gifs.results.forEach((gif) => {
    results.value.push(gif.media[0]);
  });
}

const timeout = ref(null);
const typing = ref(false);

function isTyping(e = {}) {
  const code = e.keyCode ? 0 : e.keyCode;

  if (code === 13) {
    return;
  }

  gifsReady.value = false;

  if (!typing.value) {
    console.log("typing");
    typing.value = true;
    timeout.value = setTimeout(searchGifs, 300);
  } else {
    console.log("not typing");
    clearTimeout(timeout.value);
    timeout.value = setTimeout(searchGifs, 300);
  }
}

window.addEventListener("click", (e) => {
  showGifModule.value = false;
});

onMounted(() => {
  getCategories();
});
</script>

<style scoped>
.input-area {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  margin-bottom: 10px;
}
.input-area button {
  border: none;
  background: none;
  color: white;
  margin-right: 10px;
  cursor: pointer;
}

@keyframes reflect {
  from {
    transform: rotateZ(90deg) translateY(90px);
  }
  to {
    transform: rotateZ(90deg) translateY(-140px);
  }
}
.skeleton {
  width: 100%;
  height: 120px;
  background: rgb(39, 39, 39);
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.reflection {
  width: 134%;
  height: 25px;
  left: -20px;
  background: #2f2f2f69;
  position: absolute;
  transform: rotateZ(345deg) translateY(89px);
  box-shadow: 0px 0px 46px #2f2f2f;
  animation: reflect-6de3802f 0.8s infinite;
}

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
  user-select: none;
}

.results-scroll {
  height: 400px;
  overflow-y: scroll;
}
.results-container {
  line-height: 0;
  column-count: 2;
  column-gap: 10px;
}

.results-container img {
  width: 100% !important;
  height: auto !important;
  margin-top: 10px;
  border-radius: 10px;
}
.results-container img:hover {
  border: 2px solid white;
  cursor: pointer;
}

.results-container .skeleton:nth-child(3n) {
  height: 200px;
}

.not-finished img {
  display: none;
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
  border-radius: 5px;
  color: rgb(228, 228, 228);
  font-size: 0.96em;
}
</style>
