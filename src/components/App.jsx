import { Form } from "./Form/Form";
import { nanoid } from 'nanoid'
import { ContactsList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
import { Container } from "./App.styled";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch, useSelector } from "react-redux";
import { addContact, delContact, getPhoneBookValue } from "redux/phoneBookSlice";
import { filterSet, getFilter } from "redux/filterSlice";

export const App = () => {
  const dispatch = useDispatch();
  const phoneBook = useSelector(getPhoneBookValue);
  const filterPhoneBook = useSelector(getFilter);

  const onSubmitForm = data => {
    const newObj = { ...data, id: nanoid() };

    if (isNameNew(phoneBook, newObj) !== undefined) {
      Notify.warning(`${newObj.name} is already in contacts`, {
        width: '400px',
        position: 'center-center',
        timeout: 3000,
        fontSize: '20px',
      });
      return;
    };

    dispatch(addContact(newObj))
  };

  const isNameNew = (phoneBook, newObj) => {
    return phoneBook.find(({ name }) =>
      name.toLowerCase() === newObj.name.toLowerCase())
  };

  const onChangeFilter = (event) => {
    const { value } = event.currentTarget;
    dispatch(filterSet(value))
  };

  const filterByName = () => {
    const lowerFilter = filterPhoneBook.toLowerCase();
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
      <Filter filter={filterPhoneBook} onChangeFilter={onChangeFilter} />
      <ContactsList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </Container>
  );
};