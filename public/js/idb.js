// db connection variable
let db;
// db connection variable
const request = window.indexedDB.open('budget_app', 1);

// event listening for db version changes
request.onupgradeneeded = function (event) {
  // db reference variable
  const db = event.target.result;
  // new "table" in db
  db.createObjectStore('new_transaction', { autoIncrement: true });
};

// event listener for successful request
request.onsuccess = function (event) {
  // **NOTE** 'db' is referencing the previously defined 'let db' so 'const db' breaks the code
  // **P.S** i'm not sure why but future me please look into it, it took me over an hour to figure this out
  db = event.target.result;
  // console.log(db);

  // send data from db to api when online
  if (navigator.onLine) {
    // uploadTransaction();
  }
};

// listener for error
request.onerror = function (event) {
  console.log(event.target.errorCode);
};


function saveRecord(submission) {
  // create new transaction with db permitting read and write
  const transaction = db.transaction(['new_transaction'], 'readwrite');

  // access the "table" (new_transaction)
  const budgetObjectStore = transaction.objectStore('new_transaction');

  // save submission to db
  budgetObjectStore.add(submission);
};