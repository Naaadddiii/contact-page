import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, editContact, deleteContact } from "../redux/contactSlice";
import { RootState } from "../redux/store";
import ContactForm from "../components/ContactForm";
import Layout from "../components/Layout";

interface Contact {
  id: string | number;
  firstName: string;
  lastName: string;
  status: string;
}

const ContactComponent: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const handleSaveContact = (contact: Contact) => {
    if (editingContact) {
      dispatch(editContact({ id: editingContact.id, updatedContact: contact }));
    } else {
      dispatch(addContact({ ...contact, id: Date.now() }));
    }
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleDeleteContact = (id: string | number) => {
    dispatch(deleteContact(id));
  };

  return (
    <Layout>
      <div className="bg-blue-500 text-white py-3 px-6 rounded-md shadow-md flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-lg">Contact Page</h1>
        <button
          className="bg-white text-blue-500 px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Create Contact
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">
              {contact.firstName} {contact.lastName}
            </h2>
            <p className="text-gray-600">{contact.status}</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-black"
                onClick={() => handleEditContact(contact)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => handleDeleteContact(contact.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ContactForm
          contact={editingContact}
          onSave={handleSaveContact}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </Layout>
  );
};

export default ContactComponent;
