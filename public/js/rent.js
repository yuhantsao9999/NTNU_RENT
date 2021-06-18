window.addEventListener('load', () => {
    for (let i = 0; i < 6; i++) {
        addBox('product_box');
    }
});

const addBox = (body) => {

    const block = document.getElementById(body);
    const temp0 = document.createElement('div');
    temp0.setAttribute('class', 'col-sm-6 col-md-6 col-lg-4 col-xl-4');
    const temp1 = document.createElement('div');
    temp1.setAttribute('class', 'products-single fix');
    const temp2 = document.createElement('div');
    temp2.setAttribute('class', 'box-img-hover');
    const temp3 = document.createElement('div');
    temp3.setAttribute('class', 'type-lb');
    
    const sale = document.createElement('p');
    sale.setAttribute('class', 'sale');
    sale.appendChild(document.createTextNode('Rent'));
    temp3.appendChild(sale);
    temp2.appendChild(temp3);

    const img = document.createElement('img');
    img.src = `images/img-pro-01.jpg`;
    img.setAttribute('class', 'img-fluid');
    img.setAttribute('alt', 'Image');
    temp2.appendChild(img);

    const mask_icon = document.createElement('div');
    mask_icon.setAttribute('class', 'mask-icon');
    const icon_list = document.createElement('ul');
    const view_list = document.createElement('li');
    const view_href = document.createElement('a');
    view_href.setAttribute('href', '#');
    view_href.setAttribute('data-toggle', 'tooltip');
    view_href.setAttribute('data-placement', 'right');
    view_href.setAttribute('title', 'View');
    const view_icon = document.createElement('i');
    view_icon.setAttribute('class', 'fas fa-eye');
    view_href.appendChild(view_icon);
    view_list.appendChild(view_href);
    icon_list.appendChild(view_list);

    const compare_list = document.createElement('li');
    const compare_href = document.createElement('a');
    compare_href.setAttribute('href', '#');
    compare_href.setAttribute('data-toggle', 'tooltip');
    compare_href.setAttribute('data-placement', 'right');
    compare_href.setAttribute('title', 'Compare');
    const compare_icon = document.createElement('i');
    compare_icon.setAttribute('class', 'fas fa-sync-alt');
    compare_href.appendChild(compare_icon);
    compare_list.appendChild(compare_href);
    icon_list.appendChild(compare_list);

    mask_icon.appendChild(icon_list);
    const cart = document.createElement('a');
    cart.setAttribute('class', 'cart');
    cart.setAttribute('href', '#');
    cart.appendChild(document.createTextNode('Add to Cart'));
    mask_icon.appendChild(cart);
    temp2.appendChild(mask_icon);
    temp1.appendChild(temp2);

    const why_text = document.createElement('div');
    why_text.setAttribute('class', 'why-text');
    const name = document.createElement('h4');
    name.appendChild(document.createTextNode('Test'));
    const price = document.createElement('h5');
    price.appendChild(document.createTextNode('$42'));
    why_text.appendChild(name);
    why_text.appendChild(price);
    temp1.appendChild(why_text);
    temp0.appendChild(temp1);

    block.appendChild(temp0);
};