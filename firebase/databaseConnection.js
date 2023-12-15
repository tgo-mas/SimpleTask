import { db } from "./firebaseConfig";
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";

export async function getListas(){
    let listas = await getDocs(collection(db, "listas"));
    if(listas) {
        return listas.docs.map(doc => doc._document.data.value.mapValue.fields);
    }else {
        throw new Error("Nenhuma lista encontrada");
    } 
}

export async function setarListas(lista){
    await setDoc(doc(db, "listas", lista.nome), {
        itens: lista.itens,
        nome: lista.nome,
        prazo: lista.prazo,
        users: lista.users,
        status : "Pendente",
      });
}

export async function updateLista(lista){
    const newItens = lista.itens.arrayValue.values.map(item => {
        const fields = item.mapValue.fields;
        item.nome = fields.nome.stringValue;
        item.qtd = fields.qtd.stringValue;
        item.check = fields.check.booleanValue;
        delete item.mapValue;
        return item;
    });

    const newUsers = lista.users.arrayValue.values.map(user => user.stringValue);
    console.log(newUsers);

    const docRef = doc(db,"listas", lista.nome.stringValue);
    updateDoc(docRef,{
        itens: newItens,
        prazo: lista.prazo.stringValue,
        users: newUsers,
        status : "Pendente",
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
};

export const removeLista = async (listaId) => {
    try {
        
        // Referência para o doccumento da lista no firestore
        const listaRef = doc(db, "listas", listaId);

        // Remove o documento da lista  
        await deleteDoc(listaRef);

        console.log("Lista removida com sucesso!");
    } catch (error) {
        console.error("Erro ao remover lista:", error);
        throw error;
    }
}
