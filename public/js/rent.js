const getProductByRange = () => {
    const range = document.getElementById("amount").value.split("-").map(x => x.replace("$", ""));
    const min = range[0];
    const max = range[1];
    const order = document.getElementById("basic").value;
    var last_brand = location.search;
    last_brand = last_brand.substring(last_brand.indexOf('brand=') + 6, last_brand.length);
    window.location.href = `./shop?min=${min}&max=${max}&order=${order}&brand=${last_brand}`;

}

const getProductByBrand = (brand) => {

    var last_min;
    var last_max;
    const order = document.getElementById("basic").value;
    if (location.search.split("&").length > 2){
        last_min = location.search.split("&")[0].split('=')[1];
        last_max = location.search.split("&")[1].split('=')[1];
        console.log("Brand: ", brand);
        window.location.href = `./shop?min=${last_min}&max=${last_max}&order=${order}&brand=${brand}`;
    } else{
        console.log("Brand: ", brand);
        window.location.href = `./shop?brand=${brand}`;
    }



}