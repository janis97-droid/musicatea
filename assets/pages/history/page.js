function renderHistoryPage() {
  const historyList = document.getElementById('history-list');
  if (!historyList || typeof history === 'undefined') return;

  historyList.innerHTML = '';
  history.forEach((h, i) => historyList.appendChild(createHistorySection(h, i)));
}

renderHistoryPage();
