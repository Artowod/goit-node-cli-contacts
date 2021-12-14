"use strict";

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.dirname("./db/contacts.json");
const ext = path.extname("./db/contacts.json");

function readJsonFile() {
  const result = fs.readFile(`${contactsPath}\\contacts.json`, "utf-8");
  const resultedList = result.then(JSON.parse);
  return resultedList;
}

async function listContacts() {
  try {
    return readJsonFile();
  } catch (error) {
    console.log("getContactById error:", error);
  }
}

async function getContactById(contactId) {
  try {
    return readJsonFile().then((data) => data.filter((item) => item.id == contactId));
  } catch (error) {
    console.log("getContactById error:", error);
  }
}

async function removeContact(contactId) {
  try {
    const listOfContactsAfterRemovimg = await readJsonFile().then((data) =>
      data.filter((item) => item.id != contactId)
    );
    await fs
      .writeFile(`${contactsPath}\\contacts.json`, JSON.stringify(listOfContactsAfterRemovimg), (err) => {
        if (err) throw err;
        console.log("Data written to file");
      })
      .then(console.log(`Contact with ID=${contactId} has been successfully removed from the list`));
  } catch (error) {
    console.log("getContactById error:", error);
  }
}

async function getNextUniqueId() {
  try {
    let lastId = 0;

    const listOfContacts = await readJsonFile();
    listOfContacts.forEach((item) => (+item.id > lastId ? (lastId = +item.id) : (lastId = lastId)));
    return +lastId + 1;
  } catch (error) {
    console.log("getContactById error:", error);
  }
}

async function addContact(name, email, phone) {
  try {
    let newContact;
    getNextUniqueId().then((id) => {
      newContact = {
        id: id.toString(),
        name,
        email,
        phone,
      };
      console.log("newContact", newContact);
    });

    const listOfContacts = await readJsonFile();
    listOfContacts.push(newContact);
    console.log("listOfContacts", listOfContacts);

    await fs.writeFile(`${contactsPath}\\contacts.json`, JSON.stringify(listOfContacts), (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
  } catch (error) {
    console.log("addContact error:", error);
  }
}

module.exports = { ext, contactsPath, listContacts, getContactById, removeContact, addContact, readJsonFile };
