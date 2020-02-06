

let cartStore;


function fetchData(url) {

    fetch(url).
        then((resp) => {
            console.log('response handler', resp);
            if (resp.status === 200) {
                return resp.json();
            }
        }, (fault) => {
            console.log('Some error occured while fetching data.')
        }).
        then((result) => {
            cartStore = result.products;
            displayProductsList(cartStore)
            totalcart(cartStore);
        })
}

fetchData('./data/data.json');



function displayProductsList(list) {
    list.map((item, i) => {
     
        //create parent container div
        const container = document.createElement('div');
        container.classList.add('container');

        const leftContainer = document.createElement('div');
        const image = document.createElement('img');

        image.src = "./images/" + item.image;

        const label = document.createTextNode("Name");
        const name = document.createElement('p');
        name.appendChild(label)
        name.innerHTML = `Name:       ` + item.name;

        name.setAttribute("class", "prod-name");

        const select = document.createElement('SELECT')
        select.addEventListener('change',updateTotal)
        select.innerHTML = 'Quantity:'
        select.setAttribute("id", "qty")
        
        // 
        for (let i = 1; i <= 10; i++) {
            const option = document.createElement("option");
            option.setAttribute("value", i);
            const value = document.createTextNode(i);
            if (i === item.quantity * 1) {
                option.setAttribute('selected', 'selected')
            }
            option.appendChild(value);
            select.appendChild(option);

        }
       

        const price = document.createElement('p')
        price.innerHTML = item.price;
      
        price.setAttribute("class", "price");

        const variant = document.createElement('p')
        variant.innerHTML = `Variant:          ` + item.variant;
        const btn = document.createElement('button')
        btn.innerHTML = 'Remove from Cart'

        btn.addEventListener('click', removechild);

     

        leftContainer.classList.add('left-container')
        leftContainer.appendChild(name);
        leftContainer.appendChild(price);
        leftContainer.appendChild(select);
        leftContainer.appendChild(variant);

        container.appendChild(leftContainer);
        container.appendChild(image);
        container.appendChild(btn)

        document.querySelector('.list-container').appendChild(container);

    }
    
   
    )
  
}

function totalcart(list){
    let result = 0
    let totalresult = 0
     list.forEach(item => {
      
        result = result +parseInt(item.price)*parseInt(item.quantity);
       
         
     });
    const amount = document.createElement('div');
    amount.classList.add('amount-container');

    const value = document.createElement('p')
    value.innerHTML =  result;

    amount.appendChild(value)

    document.querySelector('.total-cotainer').appendChild(amount)
    
}
// let pay = document.createElement('BUTTON');
// pay.classList.add('proceed-to-pay');
// pay.appendChild('')


function removechild(event) {

    const target = event.currentTarget;
    target.closest('.container').remove();
    updateTotal();

}

function updateTotal() {

    const leftContainers = document.querySelectorAll('.left-container');

    let totalPrice = 0;

    leftContainers.forEach((left)=>{
        let price = left.querySelector('.price').textContent;
        let qty = left.querySelector('#qty').value;
        totalPrice = totalPrice +  parseInt(price)* parseInt(qty);
    })

    document.querySelector('.total-cotainer .amount-container p').innerHTML = `Total:          ` + totalPrice;

}

// function rerenderCartList() {
//     //clean the list container
    
//     const container = document.querySelector('.list-container');
//     while (container.hasChildNodes()) {
//         container.removeChild(container.lastChild);
//     }
// }

