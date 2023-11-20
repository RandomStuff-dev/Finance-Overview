const api_url = 'https://jsonblob.com/api/1176249705687801856'; // Replace YOUR_BLOB_ID with your actual blob ID from jsonblob.com

let borrowed = [
    { date: '2023-07-03', amount: 650, comment: "iki sios dienos" },
    { date: '2023-08-26', amount: 69},
    { date: '2023-09-16', amount: 40, comment: "20 - i rankas" },
    { date: '2023-09-23', amount: 20},
    { date: '2023-09-30', amount: 20},
    { date: '2023-11-02', amount: 310},
    { date: '2023-11-14', amount: 60},
    { date: '2023-11-20', amount: 50}
  ];
  
  let paid = [
    { date: '2023-11-02', amount: 30 },
    { date: '2023-11-02', amount: 40 }
  ];
  
  function formatCurrency(value) {
    return `${value.toFixed(2)}€`;
  }
  
  function addItemToList(listId, item) {
    const listElement = document.getElementById(listId);
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span class="date">${item.date}</span><span class="amount">${formatCurrency(item.amount)}</span>`;
    listElement.appendChild(listItem);
  }
  
  function calculateTotals() {
    const totalBorrowed = borrowed.reduce((acc, item) => acc + item.amount, 0);
    const totalPaid = paid.reduce((acc, item) => acc + item.amount, 0);
    const leftToPay = totalBorrowed - totalPaid;
    document.getElementById('leftToPay').textContent = formatCurrency(leftToPay);
  }

  // Add new borrowed entry
  document.addEventListener('DOMContentLoaded', fetchData);

  
  // Function to fetch data on app load
  function fetchData() {
    fetch(api_url)
      .then(response => response.json())
      .then(data => {
        console.log('Data fetched:', data);

        borrowed = data.borrowed;
        paid = data.paid;

        borrowed.forEach(item => addItemToList('borrowedList', item));
        paid.forEach(item => addItemToList('paidList', item));
        calculateTotals();
        
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  
  // Function to update data on jsonblob.com
  function updateData(data) {
    fetch(api_url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest' // Required by jsonblob.com
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(updatedData => {
      console.log('Data updated:', updatedData);
    })
    .catch(error => console.error('Error updating data:', error));
  }
  
  // Function to add a borrowed entry
  function addBorrowed(newEntry) {
    data = {borrowed: borrowed, paid: paid};
    borrowed.push(newEntry);
    updateData(data);
    addItemToList('borrowedList', newEntry);
    calculateTotals();
    // After fetching data, add the new borrowed entry to it and call updateData with the new data
  }
  
  // Function to add a paid entry
  function addPaid(newEntry) {
    data = {borrowed: borrowed, paid: paid};
    paid.push(newEntry);
    updateData(data);
    addItemToList('paidList', newEntry);
    calculateTotals();
  }
  
  // Example functions to call when adding borrowed or paid money
  // These would be triggered by user actions in your actual application
  function addNewBorrowed() {
    const amount = parseInt(prompt('Enter the amount borrowed:'));
    const currentDate = new Date();
    const date = currentDate.toISOString().split('T')[0];

    if (amount && amount != NaN && amount > 0 && date) {
      const newEntry = { date, amount };
      addBorrowed(newEntry);
    }
  }
  
  function addNewPaid() {
    const amount = parseInt(prompt('Enter the amount paid:'));
    const pass = prompt('password:');
    const currentDate = new Date();
    const date = currentDate.toISOString().split('T')[0];

    if (pass != "pimpius2"){
        alert("Incorrect password!")
        return;
    }

    if (amount && amount != NaN && amount > 0 && date) {
      const newEntry = { date , amount };
      addPaid(newEntry);
    }
  }
  
  
  