window.addEventListener('load', () => {
    fetch(`./index_shop?order=hot`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(async (response) => {
            console.log('JS response: ', response);
            if (!response.ok) {
                throw await response.text();
            }
            return response.json();
        })
        .then((data) => {
            console.log('JS data: ', data);
            for (let i = 0; i < data.photo.length && i < 4; i++) {
                fillInProduct('rank'+i, data.product_id[i], data.photo[i], data.name[i], data.price[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        })

    fetch(`./index_shop?order=new`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(async (response) => {
            console.log('JS response: ', response);
            if (!response.ok) {
                throw await response.text();
            }
            return response.json();
        })
        .then((data) => {
            console.log('JS data: ', data);
            for (let i = 0; i < data.photo.length && i < 4; i++) {
                fillInProduct('new'+i, data.product_id[i], data.photo[i], data.name[i], data.price[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        })
})

const fillInProduct = (id, product_id, photo, name, price) =>{
    const img = document.getElementById(id+'img');
    img.setAttribute('src', `https://ntnurent.s3.amazonaws.com/${photo.split(',')[0]}`);
    const href = document.getElementById(id+'href');
    href.setAttribute('href', '/product?product_id=' + product_id);
    const text = document.getElementById(id+'text');
    const name_h4 = document.createElement('h4');
    name_h4.textContent = name;
    text.appendChild(name_h4);
    const price_h5 = document.createElement('h5');
    price_h5.textContent = price;
    text.appendChild(price_h5);
}

const fillIn = () => {
    fetch(`./index_shop`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(async (response) => {
            console.log('JS response: ', response);
            if (!response.ok) {
                throw await response.text();
            }
            return response.json();
        })
        .then((data) => {
            console.log('JS data: ', data);
            for (let i = 0; i < data.photo.length && i < 4; i++) {
                addProduct('products_list', 'all', data.product_id[i], data.photo[i], data.name[i], data.price[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

const addProduct = (body, filter, id, photo, name, price) => {

    const div = document.getElementById(body);

    const filter_class = document.createElement('div');
    filter_class.setAttribute('class', 'col-lg-3 col-md-6 special-grid ' + filter)

    const fix = document.createElement('div');
    fix.setAttribute('class', 'products-single fix')
    const box_img = document.createElement('div');
    box_img.setAttribute('class', 'box-img-hover');
    const lb_class = document.createElement('div');
    lb_class.setAttribute('class', 'type-lb');
    const lb = document.createElement('p');
    lb.setAttribute('class', 'sale');
    lb.textContent = 'sale';
    lb_class.appendChild(lb);
    box_img.appendChild(lb_class);
    const img = document.createElement('img');
    img.src = `https://ntnurent.s3.amazonaws.com/${photo.split(',')[0]}`;
    img.setAttribute('class', 'img-fluid');
    img.setAttribute('alt', 'Image');
    box_img.appendChild(img);
    const mask_icon = document.createElement('div');
    mask_icon.setAttribute('class', 'mask-icon');
    const list = document.createElement('ul');
    const view = document.createElement('li');
    const view_href = document.createElement('a');
    view_href.setAttribute('href', '/product?product_id=' + id);
    view_href.setAttribute('data-toggle', 'tooltip');
    view_href.setAttribute('data-placement', 'right');
    view_href.setAttribute('title', 'View');
    const view_i = document.createElement('i');
    view_i.setAttribute('class', 'fas fa-eye');
    view_href.appendChild(view_i);
    view.appendChild(view_href);
    mask_icon.appendChild(view);
    const compare = document.createElement('li');
    const compare_href = document.createElement('a');
    compare_href.setAttribute('href', '#');
    compare_href.setAttribute('data-toggle', 'tooltip');
    compare_href.setAttribute('data-placement', 'right');
    compare_href.setAttribute('title', 'Compare');
    const compare_i = document.createElement('i');
    compare_i.setAttribute('class', 'fas fa-sync-alt');
    compare_href.appendChild(compare_i);
    compare.appendChild(compare_href);
    mask_icon.appendChild(compare);
    const wish = document.createElement('li');
    const wish_href = document.createElement('a');
    wish_href.setAttribute('href', '#');
    wish_href.setAttribute('data-toggle', 'tooltip');
    wish_href.setAttribute('data-placement', 'right');
    wish_href.setAttribute('title', 'Add to Wishlist');
    const wish_i = document.createElement('i');
    wish_i.setAttribute('class', 'fas fa-heart');
    wish_href.appendChild(wish_i);
    wish.appendChild(wish_href);
    mask_icon.appendChild(wish);
    box_img.appendChild(mask_icon);
    fix.appendChild(box_img);
    const why_text = document.createElement('div');
    const name_h4 = document.createElement('h4');
    name_h4.textContent = name;
    why_text.appendChild(name_h4);
    const price_h5 = document.createElement('h5');
    price_h5.textContent = price;
    why_text.appendChild(price_h5);
    fix.appendChild(why_text);
    filter_class.appendChild(fix);

    div.appendChild(filter_class);
}
