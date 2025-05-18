
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from "./slices";
import { PersistGate } from 'redux-persist/integration/react';

import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
defineElement(lottie.loadAnimation);



createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={ null } persistor = { persistor }>
        <App />
      </PersistGate>
    </Provider>
)
