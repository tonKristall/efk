import { AdminData, StatusUser } from "../status";
import { CARDS, CardType, CATEGORIES } from "./category";

export function loginAdmin(data: Record<string, string>) {
    const userLogin = data.login;
  const userPassword = data.password;
  if (userLogin === AdminData.login && userPassword === AdminData.password) {
    return StatusUser.login;
  } else {
    return StatusUser.logout;
  }
}

export function getCategories(): Promise<string[]> {
  return Promise.resolve(CATEGORIES);
}

export function getCardsById(id: number): Promise<CardType[] | undefined> {
  return Promise.resolve(CARDS[id]);
}

export function deleteCategory(id: number): Promise<void> {
  const nameCategory = CATEGORIES[id];
  if(!nameCategory) {
    return Promise.reject(new Error('Category not found'));
  }
  CATEGORIES.splice(id, 1);
  CARDS.splice(id, 1); 
  return Promise.resolve();
}

export function createCategory(name: string): Promise<string> {
  if (CATEGORIES.indexOf(name) >= 0) {
    return Promise.reject(new Error(`Category ${name} already exists`));
  }
  CATEGORIES.push(name);
  CARDS.push([]);
  return Promise.resolve('Category created');
}