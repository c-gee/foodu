import casual from "casual";

import { toTitleCase } from "../../src/utils";

export const createMenuCategories = () => {
  const menuCategories = [];

  // Randomize total menu categories per merchant min 4, max 7
  for (let i = 0; i < Math.round(Math.random() * 3 + 4); i++) {
    menuCategories.push({
      name: toTitleCase(casual.words(2))
    });
  }

  return menuCategories;
};
