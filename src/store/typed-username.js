import { ref } from "vue";

const usernameStorage = localStorage.getItem("typed-username");

const username = usernameStorage ? usernameStorage : "";

const typedUsername = ref(username);

export default typedUsername;
