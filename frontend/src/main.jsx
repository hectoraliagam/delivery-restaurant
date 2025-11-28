// npm create vite@latest (react & js)
// frontend / npm install
// frontend / npm install react-router-dom axios
// frontend / npm run dev

import './index.css';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './context/StoreContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);
