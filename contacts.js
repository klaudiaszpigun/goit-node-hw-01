import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";

// uzyskanie pliku
const __filename = fileURLToPath(import.meta.url);
// uzyskanie katalogu
const __dirname = path.dirname(__filename);
// uzyskanie ścieżki od katalogu __dirname dp pliku contacts.json
const contactsPath = path.join(__dirname, "db", "contacts.json");

// pobiera i prasuje dane z json
export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};

// wywołuje funckję lictContacts() aby uzyskać dane i znajduje w nich kontakt z danym id
export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    console.error(error);
  }
};

// wywołuje listContacts() i filtruje kontakty tak aby zostały z nich te które nie posiadają danego id a następnie pisze plik json od nowa zestringowamnymi danymi
export const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return filteredContacts;
  } catch (error) {
    console.error(error);
  }
};

// dodaje kontakty, a dokładniej wczytuje dane z pliku contacts tworzy zdestrukturyzowany obiekt z danymi z parametru, póżniej do obiektu dodaje za pomoca .push nowy obiekt, nastepnie pisze od nowa plik z nowym juz kontaktem
export const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.error(error);
  }
};
