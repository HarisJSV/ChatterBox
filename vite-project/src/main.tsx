import ReactDOM  from "react-dom/client";
import App from "./App"
import { BrowserRouter } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import AuthProvider from "./context/AuthContext";
import { QueryProvider } from "./lib/react-query/QueryProvider";
export const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
    <QueryProvider>
    <AuthProvider>
    <App/>
    </AuthProvider>
    </QueryProvider>
    </BrowserRouter>

)