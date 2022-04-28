// db connection variable
let db;

// create connection to IDB database and set it to version 1
const request = window.indexedDB.open('budget_tracker_app', 1);

// event listening for db version changes
request.onupgradeneeded = function(event) {
  // db reference variable
  const db = event.target.result;
  // new "table" in db
  db.createObjectStore('new_transaction', {autoIncrement: true});
}

// event listener for successful request
request.onsuccess = function(event) {
  const db = event.target.result;
  console.log(db);

  // listener for error
  request.onerror = function (event) {
    console.log(event.target.errorCode);
  }
}