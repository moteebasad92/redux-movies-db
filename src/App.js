import React from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import '../src/assets/css/styles.css';
import '@fontsource/open-sans/600.css'
import "@fontsource/montserrat"
import '@fontsource/montserrat/700.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Details from './pages/Details';
import FilterMoviesTV from './pages/FilterMoviesTV';
import SearchResult from './pages/SearchResult';

function App() {

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Router>
          <Header />
          <Routes>
                <Route exact path="/" element={<Home  />} />
                <Route exact path="/filter-movies-tv" element={<FilterMoviesTV />} />
                <Route exact path="/details" element={<Details />} />
                <Route exact path="/search" element={<SearchResult />} />
          </Routes>
          <Footer />
        </Router>
      </ChakraProvider>
    </Provider>
  );
}


export default App;
