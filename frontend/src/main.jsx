import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./contexts/UserContext.jsx";
import { SearchProvider } from "./contexts/SearchContext.jsx";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <SearchProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
  </LocalizationProvider>
      </SearchProvider>
    </UserProvider>
  </QueryClientProvider>
);
