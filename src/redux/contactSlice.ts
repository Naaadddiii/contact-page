// src/redux/contactSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  id: string | number;
  firstName: string;
  lastName: string;
  status: string;
}

const initialState: Contact[] = [];

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.push(action.payload);
    },
    editContact: (
      state,
      action: PayloadAction<{
        id: string | number;
        updatedContact: Partial<Contact>;
      }>
    ) => {
      const { id, updatedContact } = action.payload;
      const index = state.findIndex((contact) => contact.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedContact };
      }
    },
    deleteContact: (state, action: PayloadAction<string | number>) => {
      return state.filter((contact) => contact.id !== action.payload);
    },
  },
});

export const { addContact, editContact, deleteContact } = contactSlice.actions;
export default contactSlice.reducer;
