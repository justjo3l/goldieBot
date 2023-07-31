// FILE TO HANDLE DATABASE OPERATIONS

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 

import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYrSK250z2pjM1vhpCdW0BuxWsspObHEQ",
  authDomain: "goldie-bot.firebaseapp.com",
  projectId: "goldie-bot",
  storageBucket: "goldie-bot.appspot.com",
  messagingSenderId: "410764647615",
  appId: "1:410764647615:web:a01cbc855c7b8e6d03fa0a"
};

// Initialize Firebase App for later use
const app = initializeApp(firebaseConfig);

// Gets the Firestore database instance
const db = getFirestore();


// Function to get all dino menus from database
export default function getDinoMenus() {

    // Returns a promise to get all dino menus from database
    return new Promise((resolve, reject) => {

        let dinoMenus = [];

        // Gets all dino menus from database and stores in dinoMenus list
        getDocs(collection(db, "dinoMenus")).then((querySnapshot) => {

            // Maps data from querySnapshot to dinoMenus list
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            // Adds dinoMenus to list
            dinoMenus.push(data);

            if (dinoMenus) {
                // Resolves promise if dinoMenus is not null
                resolve(dinoMenus);
            }
            else {
                // Rejects promise if dinoMenus is null
                reject(null);
            }
        });
    });
}

// Function to get dino menu for a specific day based on the 21-day cycle
export function getDinoMenu(index) {

    // Returns a promise to get dino menu for a specific day from database
    return new Promise((resolve, reject) => {

        let dinoMenu = null;

        // Gets all dino menus from database and stores in dinoMenus list
        getDocs(collection(db, "dinoMenus")).then((querySnapshot) => {

            // Maps data from querySnapshot to dinoMenus list
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            // Finds dino menu for specific day based on 21-day cycle
            data.forEach((menu) => {
                if (menu.day == index) {
                    dinoMenu = menu;
                }
            });

            if (dinoMenu) {
                // Resolves promise if dinoMenu is not null
                resolve(dinoMenu);
            }
            else {
                // Rejects promise if dinoMenu is null
                reject(null);
            }
        });
    });
}