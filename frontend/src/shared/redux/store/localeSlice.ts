import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

interface LocalState {
    locale: string,
}

const initialState: LocalState = {
    locale: Cookies.get('NEXT_LOCALE') || 'ru',
}

const localeSlice = createSlice ({
    name: 'locale',
    initialState,

    reducers: {
        setLocale: (state, action: PayloadAction<string>) => {
            state.locale = action.payload;

        }
    }
});


export const {setLocale} = localeSlice.actions;
export default localeSlice.reducer;