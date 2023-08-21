import { useEffect, useState } from "react";
import { Form } from "./Form/Form";
import { nanoid } from 'nanoid'
import { ContactsList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
import { Container } from "./App.styled";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch, useSelector } from "react-redux";
import { addContact, delContact, filterSet } from "redux/slice";

const LS_KEY = 'my_contacts';
const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const dispatch = useDispatch();
  const phoneBook = useSelector(state => state.phoneBook);
  console.log(phoneBook.contacts);
  const filter = useSelector(state => state.filter);
  console.log(filter.filter);


  const startState = JSON.parse(localStorage.getItem(LS_KEY));
  
  // const [contacts, setContacts] = useState(() => startState ? [...startState] : defaultContacts);
  // const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  const onSubmitForm = data => {
    const newObj = { ...data, id: nanoid() };

    dispatch(addContact(newObj))

    // setContacts(prevContacts => {
    //   if (isNameNew(prevContacts, newObj) === undefined) {
    //     return [...prevContacts, newObj];
    //   } else {
    //     Notify.warning(`${newObj.name} is already in contacts`, {
    //       width: '400px',
    //       position: 'center-center',
    //       timeout: 3000,
    //       fontSize: '20px',
    //     });
    //     return [...prevContacts];
    //   };
    // });
  };

  // const isNameNew = (contacts.contacts, newObj) => {
  //   return contacts.contacts.find(({ name }) =>
  //     name.toLowerCase() === newObj.name.toLowerCase())
  // };

  // const isNameNew = (prevContacts, newObj) => {
  //   return prevContacts.find(({ name }) =>
  //     name.toLowerCase() === newObj.name.toLowerCase())
  // };

  const onChangeFilter = (event) => {
    const { value } = event.currentTarget;
    dispatch(filterSet(value))
    // setFilter(value);
  };

  const filterByName = () => {
    const lowerFilter = filter.filter.toLowerCase();
    return phoneBook.contacts.filter(({ name }) =>
      (name.toLowerCase().includes(lowerFilter)))
  }

  const visibleContacts = filterByName();


  const deleteContact = (contactId) => {
    dispatch(delContact(contactId))
    // setContacts(prevContacts =>
    //   prevContacts.filter(contact => contact.id !== contactId));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form onSubmit={onSubmitForm} />
      <h2>Contacts</h2>
      <Filter filter={filter.filter} onChangeFilter={onChangeFilter} />
      <ContactsList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </Container>
  );
};