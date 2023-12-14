import { Navbar, Offcanvas } from "react-bootstrap";
import { useState } from 'react';
import SignOutButton from "../auth/SignOutButton";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import style from "./navbarStyle.module.css";
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";

export default function NavBar(){
    const [ show, setShow ] = useState();
    const router = useRouter();

    const onSignOut = () => {
        toast.success("Usuário desconectado com sucesso!");
        router.push("/");
    };

    const toggleOffcanvas = () => {
        setShow(!show);
    }

    return (
        <>
            <Navbar className="bg-body-tertiary d-flex justify-content-between">
                <Navbar.Brand className="ms-4 d-flex align-items-center"  onClick={toggleOffcanvas} style={{cursor: "pointer"}}>
                    <IconMenu2 color="#101d3f" />
                </Navbar.Brand>
                <h5 className={style.blueColor + " m-0"}>SimpleTask</h5>
                <SignOutButton onSignOut={onSignOut} />
            </Navbar>

            <Offcanvas show={show} onHide={toggleOffcanvas} className={style.offCanvas}>
                <Offcanvas.Header closeButton closeVariant="white"></Offcanvas.Header>
                <div>
                    <Link className={style.link} href="/">Início</Link>
                    <Link className={style.link} href="/listas">Listas</Link>
                    <Link className={style.link} href="#">Perfil</Link>
                    <Link className={style.link} href="#">Sobre</Link>
                </div>
            </Offcanvas>
        </>
    );
}