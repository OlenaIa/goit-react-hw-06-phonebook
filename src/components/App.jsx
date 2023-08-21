import { useEffect } from "react";
import { Form } from "./Form/Form";
import { nanoid } from 'nanoid'
import { ContactsList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
import { Container } from "./App.styled";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch, useSelector } from "react-redux";
import { addContact, delContact, filterSet } from "redux/slice";

const LS_KEY = 'my_contacts';

export const App = () => {
  const dispatch = useDispatch();
  const phoneBook = useSelector(state => state.phoneBook);
  console.log(phoneBook);
  const filter = useSelector(state => state.filter);
  console.log(filter);


  const startState = JSON.parse(localStorage.getItem(LS_KEY));


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

  // const isNameNew = (prevContacts, newObj) => {
  //   return prevContacts.find(({ name }) =>
  //     name.toLowerCase() === newObj.name.toLowerCase())
  // };

  const onChangeFilter = (event) => {
    const { value } = event.currentTarget;
    dispatch(filterSet(value))
  };

  const filterByName = () => {
    const lowerFilter = filter.toLowerCase();
    return phoneBook.filter(({ name }) =>
      (name.toLowerCase().includes(lowerFilter)))
  }

  const visibleContacts = filterByName();

  const deleteContact = (contactId) => {
    dispatch(delContact(contactId))
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