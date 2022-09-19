import { CssBaseline } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CustomThemeProvider from './themes/CustomThemeProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomThemeProvider>
      {/* <CssBaseline /> */}
      <App />
    </CustomThemeProvider>
  </React.StrictMode>
)
