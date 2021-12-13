const contactsModule = require("./contacts");
const { Command } = require("commander");

console.log("----------------------------------------");
console.log("-----------------START------------------");
console.log("----------------------------------------");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsModule.listContacts().then(console.log);
      break;

    case "get":
      contactsModule.getContactById(id).then(console.log);
      break;

    case "add":
      contactsModule.addContact(name, email, phone);
      break;

    case "remove":
      contactsModule.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
