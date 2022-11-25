function ShowAlert() {
    let basket = JSON.parse(localStorage.getItem('products'));

    if(basket.length === 0) {
        document.querySelector('.empty-cart').classList.remove('d-none')
        document.querySelector('.table').classList.add('d-none')
    }
    else{
        document.querySelector('.empty-cart').classList.add('d-none')
        document.querySelector('.table').classList.remove('d-none')
    }
}


ShowAlert();


function GetList() {
    let basket = JSON.parse(localStorage.getItem('products'));
    let row = '';
    basket.forEach(pr => {
        let int_price = pr.Price.slice(-(pr.Price.length),-4);
        row += `
            <tr>
                <th scope="row">${pr.Id}</th>
                <td class="img-td">
                    <img src=${pr.Image} alt="">
                </td>
                <td>${pr.Name.length > 10 ? pr.Name.slice(0,20) + "..." : pr.Name}</td>
                <td>
                    <input class="inp" type="number" value=${pr.Count}>
                </td>
                <td>
                 <span class="text-success for_total fw-bold" id="dollar">${int_price} AZN</span>
                </td>
            </tr>
        `
    })

    document.getElementById('tbdy').innerHTML = row;
}

GetList();

let inputs=document.querySelectorAll('.inp');


let total_price=document.querySelector(".total")
let total_elements=document.querySelectorAll(".for_total")
let total_value_basket=0;
inputs.forEach(ipt=>{
    ipt.addEventListener('input',(e)=>{
        let idipt= +(ipt.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText)
        let basket_data = JSON.parse(localStorage.getItem('products'));
        let item= basket_data.find(x=>x.Id==idipt)
        ipt.parentElement.nextElementSibling.children[0].innerText=+item.Price.slice(-(item.Price.length),-4)*(+ipt.value)+" AZN";
        total_value_basket=0;
        total_elements.forEach(e=>{
            total_value_basket+=Number(e.innerText.slice(-(e.innerText.length),-4))
        })
        //console.log(total_value_basket)
        total_price.innerText=total_value_basket;
    })
})


