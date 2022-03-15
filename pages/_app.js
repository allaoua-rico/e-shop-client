import PersistentState from "../components/PersistentState";
import reducer, { initialState } from "../components/reducer";
import { StateProvider } from "../components/stateProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <PersistentState>
        <Component {...pageProps} />
      </PersistentState>
    </StateProvider>
  );
}

export default MyApp;
