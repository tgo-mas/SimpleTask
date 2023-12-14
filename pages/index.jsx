import { Container } from "react-bootstrap";
import PesquisaVetor from "../components/search/functions";
import list from "../assets/list.png";
import Image from "next/image";
import PrivateRoute from "../components/auth/PrivateRoute";

export default function Home() {
    const white = { color: "#EEE" };
    return (
            <Container>
                <div className="text-center mt-4 pt-4 pb-4 mb-4">
                    <h1 className="text-light mt-4 pt-4">SimpleTask</h1>
                    <p className="lead text-light mb-4 pb-4">Organize e faça acontecer!</p>
                </div>
                <hr style={white} />
                <div className="links" style={white}>
                    <a href="/auth/login">Faça login</a>
                    ou
                    <a href="/auth/cadastro">Cadastre-se</a>
                </div>
                <hr style={white} />
                <section>
                    <article className="d-flex justify-content-between align-items-center p-4">
                        <h5 style={{ color: "#BBB" }}>Sua nova maneira de organizar listas de compras e afazeres!</h5>
                        <Image style={{ borderRadius: "10px" }} src={list} width={300} height={300} alt="Lista de compras"></Image>
                    </article>
                    <article  className="d-flex justify-content-between align-items-center p-4">
                        <Image style={{ borderRadius: "10px" }} src={list} width={300} height={300} alt="Lista de compras"></Image>
                        <h5 style={{color: "#BBB"}} className="ms-4 ps-4">Agora, com um clique, você e seus roommates saberão exatamente o que comprar ou fazer!</h5>
                    </article>
                </section>
            </Container>
    );
};