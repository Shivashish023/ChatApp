import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import {Provider} from "react-redux"
import store from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
let persistor = persistStore(store)
export const BASE_URL = (import.meta.env.VITE_BACKEND_URL || "http://localhost:3000").replace(/\/$/, "");

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App/>
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          background: "#1e293b",
          color: "#f8fafc",
          borderRadius: "12px",
          fontSize: "14px",
        },
        success: { iconTheme: { primary: "#22c55e", secondary: "#f8fafc" } },
        error: { iconTheme: { primary: "#ef4444", secondary: "#f8fafc" } },
      }}
    />

    </PersistGate>
  </Provider>
  </StrictMode>
)
