// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { Provider } from 'react-redux'
// import { store } from './app/store.js'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//         <App />
//     </Provider>
//   </StrictMode>,
// )


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app.css'  // ← was index.css, WRONG FILE
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)