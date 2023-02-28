// fetching promise data from the url
const loadPhones = async () => {
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

// display url phones data
const displayPhones = phones => {
    const phonesContainer = document.getElementById('phonesContainer');
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
}

loadPhones();