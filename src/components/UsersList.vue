<template>
  <div class="users-list">
    <div v-for="user in connectedUsers" :key="user.conn.peer" class="user-card">
      <img :src="user.u_avatar" alt="user avatar" />
      <p class="username">{{ user.username }}</p>
    </div>
  </div>
</template>

<script setup>
import { connectedUsers } from "../store/room-data-store";
</script>

<style scoped>
.users-list {
  display: flex;
  column-gap: 10px;
}

.user-card {
  background: black;
}

.user-card img {
  width: 20px;
}
</style>
