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
import SearchResult from './pages/SearchResult';
import FilterMovies from './pages/FilterMovies';
import ProjectDetails from './pages/ProjectDetails';

function App() {

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Router>
          <Header />
          <Routes>
                <Route exact path="/" element={<Home  />} />
                <Route exact path="/filter-movies" element={<FilterMovies />} />
                <Route exact path="/details" element={<Details />} />
                <Route exact path="/search" element={<SearchResult />} />
                <Route exact path="/project-details" element={<ProjectDetails />} />
          </Routes>
          <Footer />
        </Router>
      </ChakraProvider>
    </Provider>
  );
}


export default App;
