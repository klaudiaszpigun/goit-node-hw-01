import { program } from "commander";
import { promises as fs } from "fs";

program.option(
  "-f, --file [type]",
  "file for saving contacts",
  "contacts.json"
);
program.parse(process.argv);
const contactsPath = program.opts().file;

const listContacts = () => {
  const contacts = fs.readFile();
  console.log(contacts);
};

const getContactById = (contactId) => {
  // ...twój kod
};

const removeContact = (contactId) => {
  // ...twój kod
};

const addContact = (name, email, phone) => {
  // ...twój kod
};
listContacts();
