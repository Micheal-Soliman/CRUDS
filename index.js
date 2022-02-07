let productName = document.getElementById('productName');
let hint1 = document.getElementById('hint1');
let productCode = document.getElementById('productCode');
let hint2 = document.getElementById('hint2');
let productPrice = document.getElementById('productPrice');
let quantity = document.getElementById('quantity');
let submit = document.getElementById('submit');
let total = document.getElementById('total');
let box2 = document.getElementById('box2');
let contentBox = document.getElementById('contentBox');
let deleteAll = document.getElementById('deleteAll');
let boxSearch = document.getElementById('boxSearch');
let search = document.getElementById('search');
let icon = document.getElementById('icon');
let head = document.getElementById('head');
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let pro;
let mood = 'create';
let scroll = document.getElementById('scroll');
let there;

// #####################################################
// edit input
function on(x) {
    x.style.cssText=`
    border: none;
    outline: none;`
    x.previousElementSibling.style.cssText=`font-size: 20px;
    font-weight: bold;`
}
function out(x) {
    x.style.cssText=`
    border-bottom: 2px solid black;`
    x.previousElementSibling.style.cssText=`font-size: 16px;
    font-weight: unset;`
}
// clear hint
function clearhint(x) {
    x.nextElementSibling.innerHTML = '';
}

// create hint to enter number in input price and quantity
function showHintWriteNumber(x) {
    x.nextElementSibling.innerHTML = 'Enter Number Please'
}
// edit submit button
submit.onmouseenter = function () {
    this.style.cssText=`
    transform: scale(1.2);
    background: rgba(128, 128, 128, 0.155);
    border: 1px solid black;
    color: black;
    transition: 0.4s;`
}
submit.onmouseleave = function () {
    this.style.cssText=`
    transform: scale(1);
    border: none;
    background-color: black;
    color: white;
    transition: 0.4s;`
}
// click on search icon get focus on search input
function getFocus() {
    document.getElementById("search").focus();
  }
// check the length of number in input price and count
function checknumber(num) {
    if (num.length >= 11) {
        alert('Enter 10 Numbers only')
        return 'false'
    }
}
// #####################################################
// check data
function check_name(name) {
    if (/[`!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/.test(name)) {
        alert('Please Enter Letters And Number And Underscroe And Dash Line Only')
        return 'false'
    }else if (name.length > 30) {
        alert('Please Enter Word Contains 30 Letters Only')
        return 'false'
    }
}
// ##################################################### 
// create data and save data at local storage
if(localStorage.product != null){
	pro = JSON.parse(localStorage.product)
}else{
	pro = [];
}
function create() {
    let newPro = {
        productName: productName.value.toLowerCase(),
        productCode: productCode.value.toLowerCase(),
        productPrice: productPrice.value,
        quantity: quantity.value,
    }
    if (productName.value != '' && productCode.value != '' && productPrice.value != '' && quantity.value != '' && existName(productName.value) != 'false' && existCode(productCode.value) != 'false'  && check_name(productName.value) != 'false' && check_name(productCode.value) != 'false' && checknumber(productPrice.value) != 'false'&& checknumber(quantity.value) != 'false') {
        if (mood === 'create') {
            pro.push(newPro)
        }else{
            pro[pro.length] = newPro
            mood = 'create'
            submit.value = 'Submit'
        }
        clear()
    }else if (productName.value === '' || productCode.value === '' || productPrice.value === '' || quantity.value === '') {
        alert('Fill All Inputs')
    }
    localStorage.setItem('product', JSON.stringify(pro))
    show()
}
// ##################################################### 
// clear data
function clear() {
    productName.value = ''
    productCode.value = ''
    productPrice.value = ''
    quantity.value = ''
}
// ##################################################### 
// show data
function show() {
    let data = '';
    for (let i = 0; i < pro.length; i++) {
        data += `
        <div id='item'>
            <span>${pro[i].productName}</span>
            <span>${pro[i].productCode}</span>
            <span>${pro[i].productPrice}</span>
            <span>${pro[i].quantity}</span>
            <span id='total'>${pro[i].quantity * pro[i].productPrice}</span>
            <button id="btn1" onclick="updateitem(${i})"> <i class="bi bi-pencil"></i> <span>Update</span></button>
            <button id="btn2" onclick="deleteitem(${i})"><i class="bi bi-x-circle"></i> <span>Delete</span></button>
        </div>`
    }
    contentBox.innerHTML = data
    if (pro.length > 0) {
        head.innerHTML = `                
        <span>Product Name</span>
        <span>Product Code</span>
        <span>Product Price</span>
        <span>Quantity</span>
        <span>Total</span>
        <span>Update</span>
        <span>Delete</span>`

        deleteAll.innerHTML =`<button onclick='deleteall()'> <i class="bi bi-x-circle"></i> <span>Delete All(${pro.length})</span></button>`
        boxSearch.innerHTML = `
        <i class="bi bi-search" id="icon" onclick="getFocus()"></i>
        <input type="search" id="search" onkeyup="searchWord(this.value)" onfocus="on(this)" onblur="out(this)" placeholder="Search By Name Or Code">`
        box2.style.borderTop='1px solid black'
    }else{
        box2.style.borderTop='0px'
        deleteAll.innerHTML = ''
        boxSearch.innerHTML = ''
        head.innerHTML = ''
    }
}
show()
// ##################################################### 
// delete item
function deleteitem(i) {
    pro.splice(i,1)
    localStorage.product = JSON.stringify(pro)
    show()
}
// ##################################################### 
// delete all
function deleteall() {
    localStorage.clear()
    pro.splice(0)
    show()
}
// ##################################################### 
// update item
function updateitem(i) {
    productName.value = pro[i].productName
    productCode.value = pro[i].productCode
    quantity.value = pro[i].quantity
    productPrice.value = pro[i].productPrice
    deleteitem(i)
    submit.value = 'Update'
    mood = 'update'
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}
// #####################################################
// check exist item
function existNameHint(x) {
    for (let i = 0; i < pro.length; i++) {
        if (pro[i].productName == x.value.toLowerCase()) {
            x.nextElementSibling.innerHTML = `* This Name ${x.value} Is Already Exist`
        }
    }
}
function existName(value) {
    for (let i = 0; i < pro.length; i++) {
        if (pro[i].productName === value.toLowerCase()) {
            return 'false'
        }
    }
}
function existCodeHint(x) {
    for (let i = 0; i < pro.length; i++) {
        if (pro[i].productCode == x.value.toLowerCase()) {
            x.nextElementSibling.innerHTML = `* This Code ${x.value} Is Already Exist`
        }
    }
}
function existCode(value) {
    for (let i = 0; i < pro.length; i++) {
        if (pro[i].productCode === value.toLowerCase()) {
            return 'false'
        }
    }
}
// ##################################################### 
// search item
function searchWord(value) {
    let data = ''
    for (let i = 0; i < pro.length; i++) {
        if (pro[i].productName.includes(value.toLowerCase()) || pro[i].productCode.includes(value.toLowerCase())) {
            data += `
            <div id='item'>
                <span>${pro[i].productName}</span>
                <span>${pro[i].productCode}</span>
                <span>${pro[i].productPrice}</span>
                <span>${pro[i].quantity}</span>
                <span>${pro[i].quantity * pro[i].productPrice}</span>
                <button id="btn1" onclick="updateitem(${i})"> <i class="bi bi-pencil"></i> <span>Update</span></button>
                <button id="btn2" onclick="deleteitem(${i})"><i class="bi bi-x-circle"></i> <span>Delete</span></button>
            </div>`
        }
    }
    contentBox.innerHTML = data
}
// #####################################################
// scroll to top
window.onscroll = function () {
    if (window.scrollY >= 100) {
        scroll.style.right = '1%'
    } else{
        scroll.style.right = '-20%'
    }
}
function toTop() {
    window.scrollTo({
        top:0,
        behavior:'smooth',
    })
}
// #####################################################


