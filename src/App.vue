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
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-kerning: auto;
}

::-moz-focus-inner {
  border: 0;
}
</style>
