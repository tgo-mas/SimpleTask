import { fetcher } from "../../firebase/util";
import useSWR from "swr";
import { useEffect, useState } from 'react';
import { getListas } from "../../firebase/databaseConnection";

export default function Listas() {
    const [ listas, setListas ] = useState(null);

    useEffect(() => {
        getListas().then((listas) => setListas(listas))
            .catch(err => console.error(err));
        console.log(listas);
    }, []);

    return (
        <>
            <h1>Listas</h1>
            {listas ? <span>{listas.map(lista => <h4>{lista.nome.stringValue}</h4>)}</span>
                    : <span>Carregando...</span>}
        </>
    );
}