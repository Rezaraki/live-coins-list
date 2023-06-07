import { createSlice } from "@reduxjs/toolkit";
import { makeEmptyArrs } from "../shared/utils";
 

interface State {
    tabs: null[] ;
    numberOfprevDays:number;
}
 
const initialState: State = {
  tabs: makeEmptyArrs(10),
  numberOfprevDays:5
};


export const matchesSlice = createSlice({
  name: "matchesSlice", 
  initialState,
  reducers: {
    addPrevTabs(state ) {
     
    state.numberOfprevDays+=5
    state.tabs = state.tabs.concat(makeEmptyArrs(5))
    console.log( 'addPrevTabs');
},

    addPrecedingTabs(state ) {  
         
        
        state.tabs = state.tabs.concat(makeEmptyArrs(5))
        console.log( 'addPrecedingTabs');
       
    },
  },
});

export const { addPrevTabs,addPrecedingTabs } = matchesSlice.actions;


export default matchesSlice.reducer;
