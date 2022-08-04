// ITERATION 1
function updateSubtotal(product) {
    const price = product.querySelector('.price span')?.textContent || 0;
    const quantity = product.querySelector('.quantity input')?.value || 0;

    product.querySelector('.subtotal span').textContent = price * quantity;

    return price * quantity;
}

function calculateAll() {
    const totalPrice = [...document.querySelectorAll('.product')].map(product => updateSubtotal(product)).reduce((a, b) => a + b);
    document.querySelector('#total-value span').textContent = totalPrice;
}

// ITERATION 4
function removeProduct(event) {
    event.currentTarget.closest('.product').remove();
    calculateAll();
}

// ITERATION 5
function createProduct() {
    const name = document.querySelector('.create-product [type="text"]').value;
    if (name === "") {
        throw new Error('Product must have a name!');
    }
    const price = document.querySelector('.create-product [type="number"]').value;
    if (price <= 0) {
        throw new Error('Product must have a positive price!');
    }

    const productElement = `<tr class="product">
          <td class="name">
            <span>${name}</span>
          </td>
          <td class="price">$<span>${price}</span></td>
          <td class="quantity">
            <input type="number" value="0" min="0" placeholder="Quantity" />
          </td>
          <td class="subtotal">$<span>0</span></td>
          <td class="action">
            <button class="btn btn-remove">Remove</button>
          </td>
        </tr>`;

    document.querySelector('#cart tbody').innerHTML += productElement;

    // document.querySelector('#cart tbody tr:last-child').addEventListener('click', removeProduct);
    [...document.querySelectorAll('.action .btn-remove')].forEach(el => el.addEventListener('click', removeProduct));
}


window.addEventListener('load', () => {
    document.getElementById('calculate').addEventListener('click', calculateAll);

    [...document.querySelectorAll('.action .btn-remove')].forEach(el => el.addEventListener('click', removeProduct));

    document.querySelector('#create').addEventListener('click', createProduct);
});
