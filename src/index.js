import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material";
import {setupStore} from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
    palette:{
        primary: {main:"#6C5DD3"},
        bg: {main:"#F9F8F8", secondary:"#ffffff"},
        text:{main:"#000000", secondary:"#b6b6b6"}
    }
})
const store = setupStore()


root.render(
      <Provider store={store}>
          <BrowserRouter>
              <ThemeProvider theme={theme}>
                  <App/>
              </ThemeProvider>
          </BrowserRouter>
      </Provider>

);