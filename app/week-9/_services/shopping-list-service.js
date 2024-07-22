import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

const getItems = async (userId) => {
    try {
        const items = [];
        const itemsRef = collection(db, 'users', userId, 'items');
        const q = query(itemsRef);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
        });
        return items;
    } catch (error) {
        console.error("Error getting items: ", error);
        throw new Error("Unable to retrieve items");
    }
};

const addItem = async (userId, item) => {
    try {
        const itemsRef = collection(db, 'users', userId, 'items');
        const docRef = await addDoc(itemsRef, item);
        return docRef.id;
    } catch (error) {
        console.error("Error adding item: ", error);
        throw new Error("Unable to add item");
    }
};

export { getItems, addItem };
