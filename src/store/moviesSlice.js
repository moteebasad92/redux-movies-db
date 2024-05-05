import { createSlice,createAsyncThunk  } from '@reduxjs/toolkit'
import axios from 'axios';
const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL= 'https://api.themoviedb.org/3/';

export const STATUSES = Object.freeze({
    LOADING: 'loading',
    IDLE: 'idle',
    ERROR: 'error',
});

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        data: [],
        status: STATUSES.LOADING,
        query:'trending/all/day',
        clickedMovie: null,
        loadmore: false,
        page: 1,
    },
    reducers: {
        fetchByHeaderFilter: (state,action) => {
            state.query = action.payload;
            state.loadmore = false;
            console.log("MA");
        },
        fetchByLoadMore:(state,action) => {
            state.query = action.payload;
            state.loadmore = true;
            state.page += 1;
        },
        setClickedMovie: (state, action) => { 
            state.clickedMovie = action.payload;
        },
        clearMoviesState: (state,action) => {
            state.data = [];
            state.movies.query = action.payload;
            state.status = STATUSES.LOADING;
        },
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
})


export const { 
    setMovies,
    setStatus, 
    fetchByHeaderFilter,
    fetchByHeaderType,
    fetchByLoadMore, 
    setClickedMovie,
    clearMoviesState  
} = moviesSlice.actions

export default moviesSlice.reducer


export const fetchMovies = createAsyncThunk('movies/fetch', async (_, {getState}) => {

    try {

        const state = getState();
        console.log("state.movies.query-------",state.movies);

        if (state.movies.query === 'popular') {
            const combinedArray = [];
            const [moviesRes, tvRes] = await Promise.all([
            axios.get(`${BASE_URL}movie/popular?api_key=${apiKey}`),
            axios.get(`${BASE_URL}tv/popular?api_key=${apiKey}`)
            ]);
            const movies = moviesRes.data.results;
            const tv = tvRes.data.results;
            combinedArray = [...movies, ...tv];
            console.log("combined----", combinedArray);
            return combinedArray;
        }

        if(state.movies.loadmore){
            console.log("loadmore clicked");

            const res = await axios.get(`${BASE_URL}${state.movies.query}?api_key=${apiKey}&region=US&page=${state.movies.page}`);
            const newResults = res.data.results;
            const combinedResults = [...state.movies.data, ...newResults];
            return combinedResults;
        }

        const res = await axios.get(`${BASE_URL}${state.movies.query}?api_key=${apiKey}&region=US`)
        
        return res.data.results;

    } catch (error) {
        console.error(error);
        throw error;
    }

});





