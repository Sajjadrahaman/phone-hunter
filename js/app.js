// fetching promise data from the url
const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

// display url phones data
const displayPhones = phones => {
    const phonesContainer = document.getElementById('phonesContainer');
    phonesContainer.textContent = '';
    // display 22 phones only
    phones = phones.slice(0,22);

    // display No-Phones Found Message
    const warningNoPhone = document.getElementById('warning-Message');
    if(phones.length === 0){
        warningNoPhone.classList.remove('d-none');
    }else{
        warningNoPhone.classList.add('d-none');
    }

    // display All Phones
    phones.forEach(phone => {
        console.log(phone);
        const phonesDiv = document.createElement('div');
        phonesDiv.classList.add('col');
        phonesDiv.innerHTML = `
            <div class="card h-100 p-5">
                <img src="${phone.image}" class="card-img-top h-75 p-5" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text since the 1500s.</p>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phonesDiv);
    })
    // Spin Loader Stop here......
    toggleSpinner(false);

}

//handle search-button clicked
document.getElementById('btn-search').addEventListener('click', function(){
    /*-----Spin Loader Start here-------*/
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    loadPhones(searchText);
})

// Spin Loader Data here -------
const toggleSpinner = isLoading => {
    const spinLoader = document.getElementById('spin-loader');
    if(isLoading){
        spinLoader.classList.remove('d-none');
    }
    else{
        spinLoader.classList.add('d-none');
    }
};

// loadPhones();