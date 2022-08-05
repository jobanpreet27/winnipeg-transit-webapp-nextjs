import "../styles/globals.css";
import useOneSignal from "../utils/useOneSignal";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  useOneSignal();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
