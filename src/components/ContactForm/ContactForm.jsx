import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/slices/contacts';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const getContacts = state => state.contacts;
  const contacts = useSelector(getContacts);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContacts({ id: nanoid(), name, number }));
    }
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
        return (
            <div className={s.phonebook}>
                <h2>Phonebook 📞</h2>
                  <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <br />
        <label htmlFor="number">Number</label>
        <input
          type="tel"
          name="number"
          value={number}
          placeholder="Enter phone number"
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit">Add contact</button>
        <br />
      </form>
    </div>
  );
};

export default ContactForm;
