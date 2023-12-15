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

export const removeLista = async (listaId) => {
    try {
        
        // Referência para o doccumento da lista no firestore
        const listaRef = db.collection("listas").doc(listaId);

        // Remove o documento da lista  
        await listaRef.delete();

        console.log("Lista removida com sucesso!");
    } catch (error) {
        console.error("Erro ao remover lista:", error);
        throw error;
    }
}
