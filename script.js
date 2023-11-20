const borrowed = [
    { date: '2023-07-03', amount: 650, comment: "iki sios dienos" },
    { date: '2023-08-26', amount: 69},
    { date: '2023-09-16', amount: 40, comment: "20 - i rankas" },
    { date: '2023-09-23', amount: 20},
    { date: '2023-09-30', amount: 20},
    { date: '2023-11-02', amount: 310},
    { date: '2023-11-14', amount: 60},
    { date: '2023-11-20', amount: 50}
  ];
  
  const paid = [
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
  
  document.addEventListener('DOMContentLoaded', () => {
    borrowed.forEach(item => addItemToList('borrowedList', item));
    paid.forEach(item => addItemToList('paidList', item));
    calculateTotals();
  });
  