import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';
import { QUERY_CONVERSATIONS, QUERY_CHAT_USER } from "../../utils/queries";
import { ADD_CONVERSATION } from '../../utils/mutations';
import { useMutation, useQuery } from '@apollo/react-hooks';

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, chatWithUserId, children }) {
  const { loading, data } = useQuery(QUERY_CONVERSATIONS);
  const [addConversation, { error }] = useMutation(ADD_CONVERSATION);
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts()
  const { createContact } = useContacts()
  const socket = useSocket()
  const { loading: chatLoading, data: chatUserData } = useQuery(QUERY_CHAT_USER, { variables: { _id: chatWithUserId } });

  function createConversation(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, { recipients, messages: [] }]
    })
  }

  const addMessageToConversation = useCallback(({ recipients, text, sender, senderName }) => {
    setConversations(prevConversations => {
      let madeChange = false
      const newMessage = { sender, text, senderName }
      const newConversations = prevConversations.map(conversation => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true;

          // Write messages to server
          let messages = JSON.stringify([...conversation.messages, newMessage]);
          if (sender !== recipients[0]) {
            addConversation({
              variables: { user: recipients[0], withUser: sender, messages }
            });
            addConversation({
              variables: { user: sender, withUser: recipients[0], messages }
            });
          }

          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          }
        }

        // Write messages to server
        let messages = JSON.stringify([...conversation.messages, newMessage]);
        if (sender !== recipients[0]) {
          addConversation({
            variables: { user: recipients[0], withUser: sender, messages }
          });
          addConversation({
            variables: { user: sender, withUser: recipients[0], messages }
          });
        }

        return conversation
      })

      // Create the sender as a contact if they aren't already (as long as the logged in user isn't the sender)
      let contactExists = contacts.find(o => o.id === sender);

      if (!contactExists && senderName) {
        console.log('senderName ' + senderName)
        createContact(sender, senderName);
      }

      // Return the conversations
      if (madeChange) {
        return newConversations
      } else {
        return [
          ...prevConversations,
          { recipients, messages: [newMessage] }
        ]
      }
    })
  }, [setConversations, addConversation, contacts, createContact])

  // Handle data for user you are chatting with
  useEffect(() => {
    // Don't create conversation with yourself
    if (chatUserData && chatUserData.user && id !== chatUserData.user._id) {
      console.log('first last ' + chatUserData.user.firstName + ' ' + chatUserData.user.lastName)
      createContact(chatUserData.user._id, chatUserData.user.firstName + ' ' + chatUserData.user.lastName);
      // Don't create a duplicate conversation with the seller
      let conversationDoesntExist = true;
      for (let i = 0; i < conversations.length; i++) {
        if (conversations[i].recipients.includes(chatWithUserId)) {
          conversationDoesntExist = false;
          break;
        }
      }
      if (conversationDoesntExist) createConversation([chatUserData.user._id])
    }
  }, [chatUserData, id]);

  useEffect(() => {
    let dbConversations = [];
    let foundSeller = false;

    if (data && data.conversations) {
      for (let i = 0; i < data.conversations.length; i++) {
        console.log(data.conversations[i].withUser._id)
        console.log(chatWithUserId)
        if (chatWithUserId === data.conversations[i].withUser._id) foundSeller = true;
        console.log(foundSeller)
        let recipients = [data.conversations[i].withUser._id];
        let messages = JSON.parse(data.conversations[i].messages);
        let conversationObj = { recipients, messages };
        dbConversations.push(conversationObj);
      }

      // Don't delete the new conversation with the seller
      if (chatWithUserId && !foundSeller) {
        console.log('preserve conversation')
        for (let i = 0; i < conversations.length; i++) {
          if (conversations[i].recipients.includes(chatWithUserId)) {
            dbConversations.push(conversations[i]);
            break;
          }
        }
      }
      setConversations(dbConversations);
    }
  }, [data, setConversations, chatWithUserId]);

  useEffect(() => {
    if (socket == null) return

    socket.on('receive-message', addMessageToConversation)

    return () => socket.off('receive-message')
  }, [socket, addMessageToConversation])

  function sendMessage(recipients, text) {
    let senderName = localStorage.getItem('name_user');
    socket.emit('send-message', { recipients, text, senderName })
    addMessageToConversation({ recipients, text, sender: id });
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || 'A Buyer';//recipient
      return { id: recipient, name }
    })

    const messages = conversation.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return { ...message, senderName: name, fromMe }
    })

    const selected = index === selectedConversationIndex
    return { ...conversation, messages, recipients, selected }
  })

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}