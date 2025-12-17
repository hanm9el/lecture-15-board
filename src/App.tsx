import GlobalStyles from "./styles/GlobalStyles.tsx";
import { RouterProvider } from "react-router";
import router from "./router/router.tsx";

function App() {
    return (
        <>
            <GlobalStyles />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
