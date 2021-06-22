const rentUpload = () => {
    const data = [
        localStorage.getItem('email'),
        document.getElementById('name').value,
        document.getElementById('main_category').value,
        document.getElementById('brand').value,
        document.getElementById('price').value,
        document.getElementById('long').value,
        document.getElementById('intro').value,
        document.getElementById('place').value,
    ];
    const input = document.querySelector('input[type="file"]');
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
            return response;
        })
        .then((data) => {
            window.alert('Upload successfully.');
            window.location = 'profile.html';
        })
        .catch((err) => {
            console.log('err', err);
        });
};
