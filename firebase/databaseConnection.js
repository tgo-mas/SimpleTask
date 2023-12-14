import { db } from "./firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

export async function getListas(){
    let listas = await getDocs(collection(db, "listas"));
    if(listas) {
        return listas.docs.map(doc => doc._document.data.value.mapValue.fields);
    }else {
        throw new Error("Nenhuma lista encontrada");
    } 
}


// Add a new document in collection "cities"

export async function setarListas(lista){
    await setDoc(doc(db, "listas", lista.nome), {
        itens: lista.itens,
        nome: lista.nome,
        prazo: lista.prazo,
        users: lista.users,
        status : "Pendente",
      });
}

