import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const menuItems = [
  {
    name: "Mozzarella Sticks",
    description: "Crispy outside, gooey inside",
    price: 7.99,
    category: "Appetizers",
    image: "/images/mozzarella-sticks.jpg",
    ingredients: [
      { name: "Mozzarella Cheese", default: true },
      { name: "Breadcrumbs", default: true },
      { name: "Marinara Sauce", default: true },
      { name: "Italian Herbs", default: false },
      { name: "Garlic Powder", default: false },
    ],
  },
  {
    name: "Chicken Wings",
    description: "Spicy buffalo sauce",
    price: 9.99,
    category: "Appetizers",
    image: "/images/chicken-wings.webp",
    ingredients: [
      { name: "Chicken Wings", default: true },
      { name: "Buffalo Sauce", default: true },
      { name: "Blue Cheese Dip", default: true },
      { name: "Celery Sticks", default: true },
      { name: "Extra Hot Sauce", default: false },
    ],
  },
  // ... add all other menu items here
];

async function seedFirebase() {
  const menuItemsCol = collection(db, 'menuItems');

  for (const item of menuItems) {
    try {
      const docRef = await addDoc(menuItemsCol, item);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  console.log("Seeding complete!");
}

seedFirebase().then(() => process.exit(0));