import { ref } from "vue";

const avatarStorage = localStorage.getItem("chosen-avatar");

const avatar = avatarStorage ? avatarStorage : null;

const dataUri = ref(avatar);

export const wantsToEditAvatar = ref(false);

export default dataUri;
