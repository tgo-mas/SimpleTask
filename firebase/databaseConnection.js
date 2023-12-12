import { db } from "./firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export async function getListas(){
    let listas = await getDocs(collection(db, "listas"));
    if(listas) {
        return listas.docs.map(doc => doc._document.data.value.mapValue.fields);
    }else {
        throw new Error("Nenhuma lista encontrada");
    } 
}
