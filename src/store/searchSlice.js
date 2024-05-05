import { createSlice,createAsyncThunk  } from '@reduxjs/toolkit'
import axios from 'axios';
const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL= 'https://api.themoviedb.org/3/';

export const STATUSES = Object.freeze({
    LOADING: 'loading',
    IDLE: 'idle',
    ERROR: 'error',
});

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchResults: [],
        status: STATUSES.IDLE,
        error: null,
        query: '',
    },
    reducers: {
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setQuery: (state, action) => {
            state.query = action.payload;
        },
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(searchMovies.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.searchResults = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
})


export const { setSearchResults, setStatus, setError, setQuery } = searchSlice.actions
export default searchSlice.reducer


export const searchMovies = createAsyncThunk('search/fetch', async (_, {getState}) => {

    
    try{
        const { search } = getState();    
        const response = await axios.get(
            `${BASE_URL}search/multi?api_key=${apiKey}&language=en-US&query=${search.query}&page=1&include_adult=false`
        );

        return response.data.results;

    } catch (error) {
        console.error(error);
        throw error;
    }

});