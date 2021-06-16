window.addEventListener('load', () => {
    if (!checkLocalStorage()) {
        window.alert('Please log in first.');
        window.location = 'index.html';
    }
    const email = localStorage.getItem('email');
    fetch(`./rent_image?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(async (response) => {
            if (!response.ok) {
                throw await response.text();
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            for (let item of data) {
                addTr('rent_tbody', item);
            }
        })
        .catch((err) => {
            console.log(err);
        });

    fetch(`./sell_image?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(async (response) => {
            if (!response.ok) {
                throw await response.text();
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            for (let item of data) {
                addTr('sell_tbody', item);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

const addTr = (body, { name, paths, amount, price, long }) => {
    const tbody = document.getElementById(body);
    const tr = document.createElement('tr');

    // img
    let td = document.createElement('td');
    td.setAttribute('class', 'thumbnail-img');
    const img = document.createElement('img');
    img.src = `https://ntnurent.s3.amazonaws.com/${paths.split(',')[0]}`;
    img.setAttribute('class', 'img-fluid');
    td.appendChild(img);
    tr.appendChild(td);

    for (let i of [name, amount, price, long]) {
        if (i === undefined) continue;
        td = document.createElement('td');
        td.appendChild(document.createTextNode(i));
        tr.appendChild(td);
    }

    // edited
    td = document.createElement('td');
    td.setAttribute('style', 'width: 15px;');
    let button = document.createElement('button');
    button.setAttribute('class', 'btn btn-info');
    button.innerHTML = '編輯';
    td.appendChild(button);
    tr.appendChild(td);

    // remove
    td = document.createElement('td');
    td.setAttribute('style', 'width: 15px;');
    button = document.createElement('button');
    button.setAttribute('class', 'btn btn-dark');
    button.innerHTML = '移除';
    td.appendChild(button);
    tr.appendChild(td);

    tbody.appendChild(tr);
};
