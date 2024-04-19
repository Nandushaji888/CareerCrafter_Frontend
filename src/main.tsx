import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { Store, persistor } from './utils/redux/store/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { SocketContextProvider } from './utils/context/SocketContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={Store}>

      <PersistGate loading={null} persistor={persistor}>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
