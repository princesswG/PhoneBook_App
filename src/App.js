import React, { useState, createContext, useContext, useEffect } from 'react';
import './style.css';

// Pseudo Code
// Smartphone  Frame as the first component
// Content Frame
//  Container Frame

const contactsArray = createContext([
  {
    id: 1,
    name: 'Carlos Nah',
    img_url: 'https://api.multiavatar.com/CN.png',
    address: 'Congo Town',
    msisdns: ['0776789977', '0555678934'],
  },
  {
    id: 2,
    name: 'Paul Rome',
    img_url: 'https://api.multiavatar.com/PR.png',
    address: 'Congo Town',
    msisdns: ['0776778977', '0555678934'],
  },
  {
    id: 3,
    name: 'Jacob Brown',
    img_url: 'https://api.multiavatar.com/JB.png',
    address: 'Congo Town',
    msisdns: ['0776789977', '0555678934'],
  },
  {
    id: 4,
    name: 'Flomo Kortu',
    img_url: 'https://api.multiavatar.com/FK.png',
    address: 'Congo Town',
    msisdns: ['0776789977', '0555678934'],
  },
  {
    id: 5,
    name: 'Abraham Kortu',
    img_url: 'https://api.multiavatar.com/FK.png',
    address: 'Congo Town',
    msisdns: ['0776789977', '0555678934'],
  },
  {
    id: 6,
    name: 'Flomo Kortu',
    img_url: 'https://api.multiavatar.com/FK.png',
    address: 'Congo Town',
    msisdns: ['0776789977', '0555678934'],
  },
  {
    id: 7,
    name: 'Abraham Kortu',
    img_url: 'https://api.multiavatar.com/FK.png',
    address: 'Congo Town',
    msisdns: ['0776789977', '0555678934'],
  },
]);

function SmartPhone(props) {
  return <div className="smartphone">{props.children}</div>;
}

function Content(props) {
  return <div className="content">{props.children}</div>;
}

function ContactDetails({
  contact,
  setContactDetail,
  setShow,
  setTrackContact,
}) {
  function handleClick(e) {
    e.preventDefault();
    setContactDetail({});
    setShow(true);
    setTrackContact({
      current: 'contact-list',
      previous: 'contact-detail',
      next: null,
    });
  }

  return (
    <div className="contact-details">
      <div className="bgimg">
        <span>
          <a href="" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width={20}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </a>
        </span>
        <img src={contact.img_url} width={40} alt={contact.name} />
        <h3>{contact.name}</h3>
      </div>
      <div className="contact-content">
        <ul>
          {contact.msisdns.map((msisdn) => {
            return <li>{msisdn}</li>;
          })}
          <li>{contact.address}</li>
        </ul>
      </div>
    </div>
  );
}

function ContactList(props) {
  const [show, setShow] = useState(true);
  const [contactDetail, setContactDetail] = useState({});
  const [trackContact, setTrackContact] = useState({
    current: 'contact-list',
    previous: null,
    next: null,
  });

  const cntArr = useContext(contactsArray);

  const [contacts, setContacts] = useState(cntArr);

  function getContactArrInfo(id) {
    return contacts.filter((contact) => contact.id === id)[0];
  }

  function handleShow(e) {
    e.preventDefault();
    const id = Number(e.target.id);
    setContactDetail(getContactArrInfo(id));
    setShow(!show);
    tracker({
      current: 'contact-list',
      previous: null,
      next: 'contact-detail',
    });
  }

  function handleIcon(e) {
    e.preventDefault();
    // setShow(!show);
    console.log(e.target.id);
    tracker({ current: 'contact-list', previous: null, next: 'add-contact' });
  }

  function tracker({ current, previous, next }) {
    setTrackContact({
      current: current ?? null,
      previous: previous ?? null,
      next: next ?? null,
    });
  }

  function displayContent() {
    if (show && trackContact.next === 'add-contact') {
      return (
        <AddContact
          setShow={setShow}
          setTrackContact={setTrackContact}
          setContacts={setContacts}
          contacts={contacts}
        />
      );
    } else if (
      show &&
      trackContact.current === 'contact-list' &&
      trackContact.next === null
    ) {
      return (
        <div class="contact-list">
          <ul>
            {contacts.map((contact) => {
              return <ContactItem contact={contact} handleShow={handleShow} />;
            })}
          </ul>
          <div className="add-contact">
            <a href="" onClick={handleIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width={30}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <ContactDetails
          contact={contactDetail}
          setShow={setShow}
          setContactDetail={setContactDetail}
          setTrackContact={setTrackContact}
        />
      );
    }
  }

  return displayContent();
}

function Avatar({ src, name }) {
  return (
    <div className="contact-img">
      <img src={src} width={40} height={40} alt={name} />
    </div>
  );
}

function AddContact({ setShow, setTrackContact, setContacts, contacts }) {
  const [cancelBtn, setCancelBtn] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [imgUrlInput, setImgUrlInput] = useState('');
  const [msisdnsInput, setMSISDNSInput] = useState('');

  function handleCancelBtn() {
    setTrackContact({
      current: 'contact-list',
      previous: null,
      next: null,
    });

    setShow(true);
  }

  function handleSaveBtn() {
    if (
      nameInput.length > 0 &&
      addressInput.length > 0 &&
      imgUrlInput.length > 0 &&
      msisdnsInput.length > 0
    ) {
      setContacts([
        ...contacts,
        {
          id: contacts[contacts.length - 1].id + 1,
          name: nameInput,
          img_url: imgUrlInput,
          address: addressInput,
          msisdns: msisdnsInput.split('/'),
        },
      ]);

      setTrackContact({
        current: 'contact-list',
        previous: null,
        next: null,
      });
    }
  }

  return (
    <div id="form-container">
      <div className="form-item">
        <label htmlFor="name">Name:</label>
        <input
          onChange={(e) => setNameInput(e.target.value)}
          name="name"
          type="text"
        />
      </div>
      <div className="form-item">
        <label htmlFor="address">Address: </label>
        <input
          onChange={(e) => setAddressInput(e.target.value)}
          name="address"
          type="text"
        />
      </div>
      <div className="form-item">
        <label htmlFor="msisdns">MSISDNS: </label>
        <input
          onChange={(e) => setMSISDNSInput(e.target.value)}
          name="msisdns"
          type="text"
        />
      </div>
      <div className="form-item">
        <label htmlFor="img-url">Image Url: </label>
        <input
          onChange={(e) => setImgUrlInput(e.target.value)}
          name="img-url"
          type="text"
        />
      </div>
      <div className="form-item button-container">
        <div className="button-item">
          <button onClick={handleSaveBtn}>Create Contact</button>
        </div>
        <div className="button-item">
          <button onClick={handleCancelBtn}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function SearchResults({ contacts }) {
  return (
    <div id="search-results">
      <h3>{contacts.length} results found</h3>
      {contacts.map((contact) => {
        return (
          <div className="search-content">
            <div className="search-item">
              <div className="avatar">
                <img src={contact.img_url} width={40} alt={contact.name} />
              </div>
              <div className="content">
                <h4>{contact.name}</h4>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ContactItem({ contact, handleShow }) {
  function changeNewView(e) {
    e.preventDefault();
    const id = Number(e.target.id);
    console.log({ id });
  }

  return (
    <li key={contact.name} className="contact-item">
      <Avatar src={contact.img_url} name={contact.name} />
      <div className="contact-info">
        <a href="" id={contact.id} onClick={handleShow}>
          {contact.name}
        </a>
      </div>
    </li>
  );
}

function Container(props) {
  const [searching, setSearching] = useState({
    isSearching: false,
    val: '',
  });

  const [contacts, setContacts] = useState(useContext(contactsArray));

  function searchContactsByName(e) {
    const value = e.target.value;

    const filteredResult = [...contacts].filter((contact) => {
      const jb = contact.name.toLowerCase().includes(value.toLowerCase());
      return jb;
    });

    console.log({ filteredResult });

    setContacts(filteredResult);

    // console.log({ contact2: contacts });

    setSearching({
      isSearching: true,
      val: value,
    });
  }

  // useEffect(() => {
  //   setContacts(contacts);
  // }, [contacts]);

  return (
    <div className="container">
      <h2 id="project-title">Phonebook App</h2>

      <div class="search-container">
        <input onChange={searchContactsByName} type="text" />
      </div>

      {searching.isSearching && searching.val.length > 0 ? (
        <SearchResults contacts={contacts} />
      ) : (
        <ContactList />
      )}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <SmartPhone>
        <Content>
          <Container />
        </Content>
      </SmartPhone>
    </div>
  );
}
