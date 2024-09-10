import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  ingredients: { name: string; default: boolean }[];
}

export const getMenuItems = async (): Promise<MenuItem[]> => {
  const menuItemsCol = collection(db, 'menuItems');
  const menuItemSnapshot = await getDocs(menuItemsCol);
  return menuItemSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as MenuItem));
};

export const addMenuItem = async (menuItem: any, image: File) => {
  const storageRef = ref(storage, `menu-images/${image.name}`);
  await uploadBytes(storageRef, image);
  const imageUrl = await getDownloadURL(storageRef);

  const menuItemsCol = collection(db, 'menuItems');
  return addDoc(menuItemsCol, { ...menuItem, image: imageUrl });
};

export const updateMenuItem = async (id: string, menuItem: any) => {
  const menuItemRef = doc(db, 'menuItems', id);
  await updateDoc(menuItemRef, menuItem);
};

export const deleteMenuItem = async (id: string) => {
  const menuItemRef = doc(db, 'menuItems', id);
  await deleteDoc(menuItemRef);
};