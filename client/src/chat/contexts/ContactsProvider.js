import React, { useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { ADD_CONTACTS } from '../../utils/mutations';
import { QUERY_USER } from "../../utils/queries";
import { useMutation, useQuery } from '@apollo/react-hooks';
const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage('contacts', [])
  const [addContacts, { error }] = useMutation(ADD_CONTACTS);
  const { loading, data } = useQuery(QUERY_USER);

  function createContact(id, name) {
    setContacts(prevContacts => {
      for (let i = 0; i < prevContacts.length; i++) {
        if (prevContacts[i].id === id) return [...prevContacts];
      }
      // Add new contacts to database
      let contactsToSend = JSON.stringify([...prevContacts, { id, name }]);
      addContacts({ variables: { contacts: contactsToSend } });
      return [...prevContacts, { id, name }]
    })
  }
  useEffect(() => {
    if (data?.user?.contacts) {
      setContacts(JSON.parse(data.user.contacts));
    }
  }, [data, setContacts]);

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  )
}
