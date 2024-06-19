// parsowanie argumentów terminala
import yargs from "yargs";
// przetwarzanie arguentów z terminala
import { hideBin } from "yargs/helpers";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";

// usuwa z process.argv sciezke do node i sciezke do pliku by otrzymac sparsowane elementy dzieki yargs
const argv = yargs(hideBin(process.argv)).argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await listContacts());
      break;

    case "get":
      console.log(await getContactById(id));
      break;

    case "add":
      console.log(await addContact(name, email, phone));
      break;

    case "remove":
      console.log(await removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
