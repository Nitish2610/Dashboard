import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './Components/redux/store.js'
import { Provider } from 'react-redux'
import { Toaster } from "sonner";

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
      <App />
    </Provider>
    <Toaster/>
  </StrictMode>,
)