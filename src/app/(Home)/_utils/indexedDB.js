import { IDBKeyRange } from 'idb';

const dbName = 'ithana-copilot-staging';
const storeName = 'encounterData';

export async function createIndexedDB() {
    if (!window.indexedDB) {
        throw new Error('IndexedDB not supported');
    }

    const db = await new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1); // Version 1

        request.onerror = (event) => {
            reject(event.target.error);
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore(storeName, { keyPath: 'id' });
        };
    });

    return db;
}

export async function getEncounter(db, id) {
    const transaction = db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.get(id);

    return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

export async function setEncounter(db, encounterData) {
    const transaction = db.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.put(encounterData);

    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

export async function getAllEncounters(db) {
    const transaction = db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.getAllKeys(); // Or use IDBKeyRange for specific ranges

    return new Promise((resolve, reject) => {
        const encounters = [];
        request.onsuccess = (event) => {
            if (event.target.result) {
                encounters.push(event.target.result);
            } else {
                resolve(encounters);
            }
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

export async function deleteEncounter(db, id) {
    const transaction = db.transaction(storeName, 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.delete(id);

    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}
