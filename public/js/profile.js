window.addEventListener('load', () => {
    if (!checkLocalStorage()) {
        window.alert('Please log in first.');
        window.location = 'index.html';
    }
    const email = localStorage.getItem('email');
    //fetch 待租出的東西
    fetch(`./wait_rent_image?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(async (response) => {
            console.log('response', response);
            if (!response.ok) {
                throw await response.text();
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            for (let item of data) {
                addTr('wait_rent_tbody', item);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    //  fetch 租出的東西
    fetch(`./rent_image?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(async (response) => {
            console.log('response', response);
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
    //租回來的東西
    fetch(`./rent_back_image?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(async (response) => {
            console.log('response', response);
            if (!response.ok) {
                throw await response.text();
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            for (let item of data) {
                addTr('i_rent_tbody', item);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

const addTr = (body, { contract_id, name, paths, whoRent, brand, price, end_date }) => {
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

    if (body === 'rent_tbody') {
        for (let i of [name, brand, price, whoRent, end_date.split('T')[0]]) {
            if (i === undefined) continue;
            td = document.createElement('td');
            td.appendChild(document.createTextNode(i));
            tr.appendChild(td);
        }
    } else if (body === 'i_rent_tbody') {
        for (let i of [name, brand, price, end_date.split('T')[0]]) {
            if (i === undefined) continue;
            td = document.createElement('td');
            td.appendChild(document.createTextNode(i));
            tr.appendChild(td);
        }
    } else {
        for (let i of [name, brand, price]) {
            if (i === undefined) continue;
            td = document.createElement('td');
            td.appendChild(document.createTextNode(i));
            tr.appendChild(td);
        }
    }

    // return
    td = document.createElement('td');
    td.setAttribute('style', 'width: 15px;');

    if (body === 'rent_tbody') {
        button = document.createElement('button');
        button.setAttribute('class', 'btn btn-dark');
        button.innerHTML = '已歸還';
        button.setAttribute('onclick', 'comment(this,' + contract_id + ')');
        td.appendChild(button);
    } else if (body === 'i_rent_tbody') {
        // if (end_date > today) {
        button = document.createElement('button');
        button.setAttribute('class', 'btn btn-info');
        button.setAttribute('onclick', "location.href='./comment.html'");
        button.innerHTML = '我要評價';
        td.appendChild(button);
        // }
    }

    tr.appendChild(td);
    tbody.appendChild(tr);
};

function comment(el, contract_id) {
    fetch(`/finish_status?contract_id=${contract_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(async (response) => {
            if (!response.ok) {
                const error = await response.text();
                document.getElementById('error').innerHTML = 'Error : ' + error;
            }
            return response.json();
        })
        .then((data) => {
            console.log('update status successful');
        })
        .catch((err) => {
            console.log('err', err);
        });
    let element = el;
    element.setAttribute('class', 'btn btn-info');
    element.setAttribute('onclick', "location.href='./comment.html?title=user'");
    element.innerHTML = '我要評價';
}
