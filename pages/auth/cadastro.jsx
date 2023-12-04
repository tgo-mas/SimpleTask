import SignUp from "../../components/auth/SignUp";
import AuthDetails from "../../components/auth/AuthDetails";

export default function Cadastro(){
    return(
        <div className="App">
            <div className="App-logo">
                <span>Bem-vindo ao SimpleTask</span>
            </div>
            <SignUp />
            <AuthDetails />
        </div>
    );
}