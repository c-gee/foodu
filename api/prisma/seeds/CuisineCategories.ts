import { PrismaClient } from "@prisma/client";

export const cuisineCategories = [
  { icon: null, name: "Local" },
  { icon: null, name: "Asian" },
  { icon: "🍔", name: "Hamburger" },
  { icon: "🍕", name: "Pizza" },
  { icon: "🍜", name: "Noodles" },
  { icon: "🍖", name: "Meat" },
  { icon: "🥬", name: "Vegetable" },
  { icon: "🍰", name: "Dessert" },
  { icon: "🍹", name: "Beverages" },
  { icon: "🥐", name: "Pastry" },
  { icon: null, name: "Hawker" },
  { icon: "🍲", name: "Pot of Food" },
  { icon: "🥗", name: "Salad" },
  { icon: "🍱", name: "Bento" },
  { icon: null, name: "Mamak" },
  { icon: "🥘", name: "Pan of Food" },
  { icon: "🍝", name: "Spaghetti" },
  { icon: null, name: "Japanese" },
  { icon: "🍣", name: "Sushi" },
  { icon: "🍩", name: "Doughnut" },
  { icon: "🥩", name: "Steak" },
  { icon: null, name: "Korean" },
  { icon: "🍳", name: "Breakfast Set" },
  { icon: "☕", name: "Coffee" },
  { icon: "🎂", name: "Cake" },
  { icon: "🍺", name: "Alcholic Drinks" },
  { icon: "🍦", name: "Ice Cream" }
];

export async function seedCuisineCategories(prisma: PrismaClient) {
  await prisma.cuisineCategory.deleteMany({});

  cuisineCategories.forEach(async (category) => {
    await prisma.cuisineCategory.create({
      data: {
        name: category.name,
        icon: category.icon
      }
    });
  });
}
