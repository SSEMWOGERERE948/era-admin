import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore'; // Import getDoc
import { db } from '../Components/firebase';
import { Link } from 'react-router-dom';
import './Contacts.css';

const ContactForm = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsCollection = collection(db, 'contacts');
      const contactsSnapshot = await getDocs(contactsCollection);
      const contactsData = contactsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactsData);
    };

    fetchContacts();
  }, []);

  const handleCheckboxChange = async (contactId) => {
    const contactRef = doc(db, 'contacts', contactId);
    const contactSnapshot = await getDoc(contactRef);
    const contacted = contactSnapshot.data().contacted;

    // Toggle the contacted field between true and false
    await updateDoc(contactRef, { contacted: !contacted });

    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === contactId ? { ...contact, contacted: !contacted } : contact
      )
    );
  };

  return (
    <div>
      <h2>Contact Information</h2>
      <table className="contact-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Message</th>
            <th>Contacted</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.fname}</td>
              <td>{contact.lname}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
              <td className="message-cell">{contact.message}</td>
              <td>
                <input
                  type="checkbox"
                  checked={contact.contacted}
                  onChange={() => handleCheckboxChange(contact.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/home" className="back-button">Back</Link>
    </div>
  );
};

export default ContactForm;
