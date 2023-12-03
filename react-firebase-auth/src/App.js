// import logo from './logo.svg';

import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/AuthDetails';

const shoppingBagIconUrl = 'https://images.vexels.com/media/users/3/200093/isolated/preview/596f0d8cb733b17268752d044976f102-icone-de-sacola-de-compras.png';

function App() {
  return (
    <div className="App">
      <div className="App-logo">
        <img src={shoppingBagIconUrl} alt="Ícone de sacola de compras" />
        <span>Bem-vindo ao SimpleTask</span>
      </div>
      <SignIn />
      <SignUp />
      <AuthDetails />
    </div>
  );
}

export default App;