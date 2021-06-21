const rentProduct = () => {
    const data = {
        email: localStorage.getItem('email'),
        product_id: location.search.substring(12, location.search.length),
    }

    fetch('/rent_product', {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(async (response) => {
        if (!response.ok) {
            const error = await response.text();
            document.getElementById('error').innerHTML = 'Error : ' + error;
        }
        return response.json();
    })
    .then((data) => {
        window.alert('Rent successfully.');
    })
    .catch((err) => {
        console.log('err', err);
    });
}