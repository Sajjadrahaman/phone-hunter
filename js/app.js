/* // fetching promise data from the url
let query = '';
const loadPhones = async (dataLimit) => {
    console.log(query);
    const url = `https://openapi.programming-hero.com/api/phones?search=${query}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
} */

// fetching promise data from the url
const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

// display url phones data
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phonesContainer');
    phonesContainer.textContent = '';

    // display Ten-Phones or all-phones by condition
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // display No-Phones Found Message
    const warningNoPhone = document.getElementById('warning-Message');
    if (phones.length === 0) {
        warningNoPhone.classList.remove('d-none');
    }
    else {
        warningNoPhone.classList.add('d-none');
    }

    // display All Phones
    phones.forEach(phone => {
        // console.log(phone);
        const phonesDiv = document.createElement('div');
        phonesDiv.classList.add('col');
        phonesDiv.innerHTML = `
            <div class="card h-100 p-5">
                <img src="${phone.image}" class="card-img-top h-75 p-5" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text since the 1500s.</p>
                    <button onclick="phoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phonesDiv);
    })
    // Spin Loader Stop here......
    toggleSpinner(false);

}

/* // used common function for searchButton & ShowAll button
const processSearch = (dataLimit, isEmptyValue) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    if(!isEmptyValue === true){
        query = searchField.value;
    }
    const searchText = searchField.value;
    searchField.value = '';
    loadPhones(searchText, dataLimit);
} */


// used common function for searchButton & ShowAll button
const processSearch = (dataLimit, isEmptyValue) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
    if(isEmptyValue === true){
        searchField.value = '';
    }
}

//handle search-button clicked
document.getElementById('btn-search').addEventListener('click', function () {
    /*-----Spin Loader Start here-------*/
    processSearch(10);
})
// input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

// Spin Loader Data here -------
const toggleSpinner = isLoading => {
    const spinLoader = document.getElementById('spin-loader');
    if (isLoading) {
        spinLoader.classList.remove('d-none');
    }
    else {
        spinLoader.classList.add('d-none');
    }
}

// not the best way to show all 
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch(undefined, true);
})

// phone Details information
const phoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = (details) => {
    console.log(details);
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = details.name;
    const detailsPhone = document.getElementById('phone-details');
    detailsPhone.innerHTML = `
        <img class="text-center" src="${details.image}">
        <div class="mt-3 text-center">
            <h5>Release-date: ${ details.releaseDate ? details.releaseDate : 'No release date'}</h5>
            <h5>Brand: ${details.brand}</h5>
            <h5>ChipSet: ${details.mainFeatures.chipSet}</h5>
            <h5>Storage: ${details.mainFeatures ? details.mainFeatures.storage : 'No Storage'}</h5>
            <h5>Bluetooth: ${ details.others ? details.others.Bluetooth : 'No Bluetooth'}</h5>
        </div>
    `
}

loadPhones('apple');