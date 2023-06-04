
const apiUrl = 'https://api.nasa.gov/planetary/apod';
const apiKey = 'v64fYkBhJ51CagJ2mngRizKP6sibrmZypBa9mQ7M';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentImageContainer = document.getElementById('current-image-container');
const currentImage = document.getElementById('current-image');
const searchHistory = document.getElementById('search-history');




let searches = [];

// Function to fetch the current image.
function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split('T')[0];
  const url = `${apiUrl}?date=${currentDate}&api_key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      currentImage.innerHTML = `
        
        <img src="${data.url}" alt="${data.title}">
        
        <h3>${data.title}</h3>
        <p>${data.explanation}</p>
      `;
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Function to fetch and display the image of the selected date
function getImageOfTheDay(date) {
  const url = `${apiUrl}?date=${date}&api_key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      currentImage.innerHTML = `
        <h3>${data.title}</h3>
        <img src="${data.url}" alt="${data.title}">
        <p>${data.explanation}</p>
      `;

      saveSearch(date);
      addSearchToHistory();
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function saveSearch(date) {
  searches.push(date);
  localStorage.setItem('searches', JSON.stringify(searches));
}

function addSearchToHistory() {
  searchHistory.innerHTML = '';

  searches.forEach(date => {
    const listItem = document.createElement('li');
    listItem.textContent = date;

    listItem.addEventListener('click', () => {
      getImageOfTheDay(date);
    });

    searchHistory.appendChild(listItem);
  });
}

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const selectedDate = searchInput.value;

  if (selectedDate) {
    getImageOfTheDay(selectedDate);
  }
});


getCurrentImageOfTheDay();
searches = JSON.parse(localStorage.getItem('searches')) || [];
addSearchToHistory();
