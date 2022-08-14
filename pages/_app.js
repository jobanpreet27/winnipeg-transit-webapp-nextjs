import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
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
