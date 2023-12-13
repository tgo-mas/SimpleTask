import { Toaster } from "react-hot-toast";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }) {
    return(
      <>
        <Component {...pageProps} />;
        <Toaster position="bottom-center " />
      </>
    );
}