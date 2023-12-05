import SignIn from "../../components/auth/SignIn"
import AuthDetails from "../../components/auth/AuthDetails";

export default function Login() {
    return (
        <div className="App">
            <div className="App-logo">
                <span className="lead">Bem-vindo ao SimpleTask</span>
            </div>
            <SignIn />
            <AuthDetails />
        </div>
    );
}