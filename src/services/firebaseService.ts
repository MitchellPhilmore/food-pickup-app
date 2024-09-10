import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, DocumentData } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';

export interface Ingredient {
  name: string;
  default: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  ingredients: Ingredient[];
}

export const getMenuItems = async (): Promise<MenuItem[]> => {
  const menuItemsCol = collection(db, 'menuItems');
  const menuItemSnapshot = await getDocs(menuItemsCol);
  return menuItemSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as MenuItem));
};

export interface NewMenuItem extends Omit<MenuItem, 'id' | 'image'> {
  image: File;
}

export const addMenuItem = async (menuItem: NewMenuItem): Promise<void> => {
  const storageRef = ref(storage, `menu-images/${menuItem.image.name}`);
  await uploadBytes(storageRef, menuItem.image);
  const imageUrl = await getDownloadURL(storageRef);

  const menuItemsCol = collection(db, 'menuItems');
  await addDoc(menuItemsCol, { 
    ...menuItem, 
    image: imageUrl,
    price: Number(menuItem.price) // Ensure price is stored as a number
  });
};

export const updateMenuItem = async (id: string, menuItem: Partial<MenuItem>): Promise<void> => {
  const menuItemRef = doc(db, 'menuItems', id);
  await updateDoc(menuItemRef, menuItem);
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  const menuItemRef = doc(db, 'menuItems', id);
  await deleteDoc(menuItemRef);
};