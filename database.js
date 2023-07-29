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

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export default function getDinoMenus() {

    return new Promise((resolve, reject) => {

        let dinoMenus = [];

        getDocs(collection(db, "dinoMenus")).then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            dinoMenus.push(data);

            if (dinoMenus) {
                resolve(dinoMenus);
            }
            else {
                reject(Error("Error getting dino menus"));
            }
        });
    });
}

export function getDinoMenu(index) {

    return new Promise((resolve, reject) => {

        let dinoMenu = null;

        getDocs(collection(db, "dinoMenus")).then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log(data);
            data.forEach((menu) => {
                if (menu.index == index) {
                    dinoMenu = menu;
                }
            });

            if (dinoMenu) {
                resolve(dinoMenu);
            }
            else {
                reject(Error("Error getting dino menus"));
            }
        });
    });
}