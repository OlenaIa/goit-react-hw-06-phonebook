import { createSlice } from '@reduxjs/toolkit'

const contactInitialState = {
    contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
};

export const phoneBookSlice = createSlice({
    name: 'phoneBook',
    initialState: contactInitialState,
    reducers: {
        addContact(state, action) {
            state.contacts.push(action.payload)
            // return state.contacts = [...state.contacts, {...action.payload}]
        },
        delContact(state, action) {return state.contacts.filter(contact => contact.id !== action.payload)},
        searchContact(state, action) {
            return state.contacts.filter(({ name }) =>
                name.toLowerCase().includes(action.payload))
        },
    }
})

console.log(phoneBookSlice);

export const { addContact, delContact, searchContact } = phoneBookSlice.actions;


const filterInitialState = {
    filter: ""
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState: filterInitialState,
    reducers: {
        filterSet(state, action) {state.filter = action.payload}
    }
})
console.log(filterSlice);

export const { filterSet } = filterSlice.actions;