<template>
  <div class="users-list">
    <h3>Members</h3>
    <div class="users">
      <div
        v-for="user in connectedUsers"
        :key="user.conn.peer"
        class="user-card"
      >
        <img :src="user.u_avatar" alt="user avatar" />
        <p class="username">{{ user.username }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { connectedUsers } from "../store/room-data-store";
</script>

<style scoped>
h3 {
  margin-right: auto;
  color: rgb(168, 168, 168);
  font-weight: 600;
  margin-bottom: 10px;
}
.users-list {
  display: flex;
  flex-flow: column;
  column-gap: 10px;
  background: #1b1b1b;
  padding: 15px;
}

.user-card {
  background: #1f1f1f;
  width: 120px;
  height: 120px;
  padding: 10px;
  border-radius: 10px;
}
.users {
  display: flex;
  column-gap: 10px;
}
.username {
  background: #bebebe;
  color: #1f1f1f;
  border-radius: 10px;
  padding: 5px;
  padding-right: 10px;
  padding-left: 10px;
}
.user-card img {
  width: 50px;
}
</style>
