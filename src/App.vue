<template>
  <router-view></router-view>
</template>

<style>
html {
  background: #212121;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-flow: column;
  font-family: sans-serif;
  height: 100vh;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-kerning: auto;
  scrollbar-width: thin;
  scrollbar-color: darkgrey rgb(36, 36, 36);
}

::-moz-focus-inner {
  border: 0;
}

::-webkit-scrollbar {
  width: 7px;
}

input:focus {
  outline: 2px solid rgb(88, 160, 255);
}
::-webkit-scrollbar-track {
  background: rgb(36, 36, 36);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
  border-radius: 10px;
  border: none;
  outline: none;
}
</style>
