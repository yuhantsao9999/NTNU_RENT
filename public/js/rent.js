const getProduct = () => {
    const range = document.getElementById("amount").value.split("-").map(x => x.replace("$", ""));
    const min = range[0];
    const max = range[1];

    window.location.href = `./shop_price_range?min=${min}&max=${max}`;

    /*
    fetch(`./shop_price_range?min=${min}&max=${max}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(async (response) => {
            if (!response.ok){
                throw await response.text();
            }
            console.log(Object.keys(response));
        })
        .catch((err) => {
            console.log('err', err);
        });
    */
}