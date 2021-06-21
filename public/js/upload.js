const rentUpload = () => {
    const data = [
        localStorage.getItem('email'),
        document.getElementById('main_category').value,
        document.getElementById('brand').value,
        document.getElementById('price').value,
        document.getElementById('long').value,
        document.getElementById('intro').value,
        document.getElementById('place').value,
    ];
    console.log(data);
    const input = document.querySelector('input[type="file"]');
    console.log('input', input);
    const formData = new FormData();

    for (const file of input.files) {
        formData.append('image', file, file.name);
    }

    formData.append('data', JSON.stringify(data));

    fetch('/rent_upload', {
        method: 'post',
        body: formData,
    })
        .then(async (response) => {
            if (!response.ok) {
                const error = await response.text();
                document.getElementById('error').innerHTML = 'Error : ' + error;
            }
            return response.json();
        })
        .then((data) => {
            window.alert('Upload successfully.');
            window.location = 'profile.html';
        })
        .catch((err) => {
            console.log('err', err);
        });
};

const sellUpload = () => {
    const data = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        amount: document.getElementById('amount').value,
        main_category: document.getElementById('main_category').value,
        second_category: document.getElementById('second_category').value,
        email: localStorage.getItem('email'),
    };
    const input = document.querySelector('input[type="file"]');
    const formData = new FormData();

    for (const file of input.files) {
        formData.append('image', file, file.name);
    }

    formData.append('data', JSON.stringify(data));

    fetch('/sell_upload', {
        method: 'post',
        body: formData,
    })
        .then(async (response) => {
            if (!response.ok) {
                const error = await response.text();
                document.getElementById('error').innerHTML = 'Error : ' + error;
            }
            return response.json();
        })
        .then((data) => {
            window.alert('Upload successfully.');
            window.location = 'profile.html';
        })
        .catch((err) => {
            console.log('err', err);
        });
};
