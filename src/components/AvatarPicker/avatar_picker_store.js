import { ref } from "vue";

export const avatars = ref([]);
export const currentSection = ref(0);

import Avatars, { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";

export const randomAvatars = () => {
  return Array.from({ length: 4 }, () => {
    const svg = createAvatar(style, { dataUri: true });
    return { dataUri: svg, chosen: false };
  });
};
export function createRandomAvatars() {
  avatars.value.push(randomAvatars());
  currentSection.value += 1;
}
