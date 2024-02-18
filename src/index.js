//npm install axios

// instal netiflix:  npm i notiflix  (https://www.npmjs.com/package/notiflix)
//Notiflix is a pure JavaScript library for client-side non-blocking notifications, popup boxes, loading indicators, and more that makes your web projects much better.

import { Notify } from 'notiflix/build/notiflix-notify-aio';

//instal slim-select: npm install slim-select (https://slimselectjs.com/install#npm)
import SlimSelect from 'slim-select';

// API-uri
import { fetchBreeds, fetchCatByBreed } from './cat-api';

//select elements
const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const errorElement = document.querySelector('.error');
const loaderElement = document.querySelector('.loader');

//Functions for View Manipulation
const toggleLoaderAndElements = (
  loaderVisible,
  catInfoVisible,
  errorVisible
) => {
  loaderElement.style.display = loaderVisible ? 'block' : 'none';
  catInfoDiv.style.display = catInfoVisible ? 'block' : 'none';
  errorElement.style.display = errorVisible ? 'block' : 'none';
};
const toggleError = (errorVisible, message = '') => {
  const errorMessage =
    message || 'Oops! Something went wrong! Try reloading the page!';
  errorElement.textContent = errorMessage;
  toggleLoaderAndElements(false, false, false, errorVisible);
};

//Querying the Breed List API
fetchBreeds()
  .then(breeds => {
    toggleLoaderAndElements(false, false, false);
    const fragmentElement = document.createDocumentFragment();

    breeds.forEach(breed => {
      const optionElement = document.createElement('option');
      optionElement.textContent = breed.name;
      optionElement.value = breed.id;
      fragmentElement.append(optionElement);
    });

    breedSelect.appendChild(fragmentElement);

    //Handling and Display of Selected Breed
    breedSelect.addEventListener('change', () => {
      toggleLoaderAndElements(true, false, false);
      const selectedBreedId = breedSelect.value;

      //API Query for Cat Info
      fetchCatByBreed(selectedBreedId)
        .then(catInformation => {
          //Handling and Displaying Information About Cat
          const catBreed =
            catInformation[0].breeds.length > 0
              ? catInformation[0].breeds[0]
              : null;

          if (catBreed) {
            //Displaying Information About Cat
            catInfoDiv.innerHTML = `
              <img src="${catInformation[0].url}" alt="Cat Image">
              <p><strong>Breed:</strong> ${catBreed.name}</p>
              <p><strong>Description:</strong> ${catBreed.description}</p>
              <p><strong>Temperament:</strong> ${catBreed.temperament}</p>
            `;
          } else {
            console.error('No breed information found for the selected cat.');
          }

          toggleLoaderAndElements(false, true, false);
        })
        .catch(error => {
          console.error('Error fetching cat breeds:', error.response || error);
          toggleLoaderAndElements(false, true, true);
        });
    });
  })
  //Error Handling
  .catch(error => {
    console.error('Error fetching cat information:', error.response || error);
    toggleLoaderAndElements(false, true, true);
  });
