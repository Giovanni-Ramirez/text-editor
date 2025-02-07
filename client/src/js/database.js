import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('putDb');
  const jateDataBase = await openDB('jate', 1);
  const transaction = jateDataBase.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  const request = store.put({ id: 1, value: context });
  const result = await request;
  console.log('Data saved', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('getDb');
  const jateDataBase = await openDB('jate', 1);
  const tAction = jateDataBase.transaction('jate', 'readonly');
  const store = tAction.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('Data retrieved!', result.value)
    : console.log('Data not found in the database');

  return result?.value;
};

initdb();
