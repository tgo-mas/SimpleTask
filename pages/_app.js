import { Toaster } from "react-hot-toast";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from "../components/auth/PrivateRoute";

export default function App({ Component, pageProps }) {
    return(
      <PrivateRoute>
        <Component {...pageProps} />;
        <Toaster position="bottom-center " />
      </PrivateRoute>
    );
}