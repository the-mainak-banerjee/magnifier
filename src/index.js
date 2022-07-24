import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme/index'
import { KisContextProvider, NotesContextProvider, PomodoroContextProvider } from './context';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <KisContextProvider>
          <PomodoroContextProvider>
            <NotesContextProvider>
              <App/>
            </NotesContextProvider>
          </PomodoroContextProvider>
        </KisContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  // </React.StrictMode>
);


