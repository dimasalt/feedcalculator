import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface errorMessage {
  value: string[]
}

const initialState: errorMessage = {
  value: [],
}

export const errorMessages = createSlice({
  name: 'message',
  initialState,
  reducers: {   
    addMessage: (state, action: PayloadAction<string>) => {     
      
      //reset message and add new if exists
      state.value = []; 

      if(action.payload.length !== 0)
        state.value.push(action.payload);
    },
  },
});


// Action creators are generated for each case reducer function
export const { addMessage } = errorMessages.actions;

export default errorMessages.reducer;
