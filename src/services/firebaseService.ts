import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { db, app, storage } from '../lib/firebase';

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

export async function getImageUrl(imagePath: string) {
  const storage = getStorage(app);
  const imageRef = ref(storage, imagePath);
  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error getting image URL:", error);
    return null;
  }
}