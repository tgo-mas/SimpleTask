import { db, auth } from "./firebaseConfig";
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

export async function getListas(email){
    const listasCol = collection(db, "listas");
    let listas = await getDocs(query(listasCol, where("users", "array-contains", 'thominhas@gmail.com')));
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
