import Noty from 'noty';
import axios from 'axios';

const itemName = document.getElementById('itemName');
const itemImage = document.getElementById('itemImage');
const itemPrice = document.getElementById('itemPrice');
const itemQuantity = document.getElementById('itemQu');
const itemCat = document.getElementById('cata');

//size row
const sizeRow = document.getElementById('sizeRow');
const smset = document.getElementById('smset');
const mdset = document.getElementById('mdset');
const lset = document.getElementById('lset');
const xlset = document.getElementById('xlset');
const xxlset = document.getElementById('xxlset');
//size
const sSize = document.getElementById('sSize');
const mSize = document.getElementById('mSize');
const lSize = document.getElementById('lSize');
const xlSize = document.getElementById('xlSize');
const xxlSize = document.getElementById('xxlSize');



//checkbox smallSize listener
sSize.addEventListener('change', (e) => {
    var col = `
    <div class="container mb-3">
        <label>Small</label>
        <input id="smallVal" class="form-control" type="number">
    `;
    if (sSize.checked == true) {


        smset.innerHTML = col;
    } else {
        smset.innerHTML = ''
    }
});

//checkbox mediumSize listener
mSize.addEventListener('change', (e) => {
    var col = `
    <div class="container mb-3">
        <label>Medium</label>
        <input id="mediumVal" class="form-control" type="number">
    `;
    if (mSize.checked == true) {

        mdset.innerHTML = col;
    } else {
        mdset.innerHTML = ''
    }
});

//checkbox largeSize listener
lSize.addEventListener('change', (e) => {
    var col = `
    <div class="container mb-3">
        <label>Large</label>
        <input id="largeVal" class="form-control" type="number">
    `;
    if (lSize.checked == true) {

        lset.innerHTML = col;
    } else {
        lset.innerHTML = ''
    }
});

//checkbox xlargeSize listener
xlSize.addEventListener('change', (e) => {
    var col = `
    <div class="container mb-3">
        <label>XLarge</label>
        <input id="xlargeVal" class="form-control" type="number">
    `;
    if (xlSize.checked == true) {

        xlset.innerHTML = col;
    } else {
        xlset.innerHTML = ''
    }
});

//checkbox xxlargeSize listener
xxlSize.addEventListener('change', (e) => {
    var col = `
    <div class="container mb-3">
        <label>XXLarge</label>
        <input id="xxlargeVal" class="form-control" type="number">
    `;
    if (xxlSize.checked == true) {

        xxlset.innerHTML = col;
    } else {
        xxlset.innerHTML = ''
    }
});





//sumbit button
document.querySelector('#itemBu').addEventListener('click', (e) => {
    const smallVal = document.querySelector('#smallVal');
    const mediumVal = document.getElementById('mediumVal');
    const largeVal = document.getElementById('largeVal');
    const xlargeVal = document.getElementById('xlargeVal');
    const xxlargeVal = document.getElementById('xxlargeVal');

    var s = 0;
    var m = 0;
    var l = 0;
    var xl = 0;
    var xxl = 0;


    if (itemCat.value == 'selectoption') {
        alert('Please select catagory...')
        return;
    }





    if (itemName.value == '') {

        new Noty({
            type: 'error',
            text: 'Name can not be empty...',
            timeout: 2000,
            progressBar: false
        }).show();

        return;
    }
    if (itemImage.value == '') {

        new Noty({
            type: 'error',
            text: 'Image can not be empty...',
            timeout: 2000,
            progressBar: false
        }).show();
        return
    }

    if (itemPrice.value == '') {

        new Noty({
            type: 'error',
            text: 'Price can not be empty...',
            timeout: 2000,
            progressBar: false
        }).show();
        return
    }
    if (itemQuantity.value == '') {

        new Noty({
            type: 'error',
            text: 'Quantity can not be empty...',
            timeout: 2000,
            progressBar: false
        }).show();
        return
    }


    if (sSize.checked == false && mSize.checked == false &&
        lSize.checked == false && xlSize.checked == false &&
        xxlSize.checked == false
    ) {

        new Noty({
            type: 'error',
            text: 'Please add minimun one size...',
            timeout: 2000,
            progressBar: false
        }).show();
        return
    }

    if (smallVal != null) {
        if (smallVal.value == '') {
            new Noty({
                type: 'error',
                text: 'Please enter small size...',
                timeout: 2000,
                progressBar: false
            }).show();

            return;
        } else {
            s = parseInt(smallVal.value);
        }
    }

    if (mediumVal != null) {
        if (mediumVal.value == '') {
            new Noty({
                type: 'error',
                text: 'Please enter medium size...',
                timeout: 2000,
                progressBar: false
            }).show();

            return;
        } else {
            m = parseInt(mediumVal.value);

        }
    }
    if (largeVal != null) {
        if (largeVal.value == '') {
            new Noty({
                type: 'error',
                text: 'Please enter large size...',
                timeout: 2000,
                progressBar: false
            }).show();

            return;
        } else {
            l = parseInt(largeVal.value);
        }
    }
    if (xlargeVal != null) {
        if (xlargeVal.value == '') {
            new Noty({
                type: 'error',
                text: 'Please enter XLarge size...',
                timeout: 2000,
                progressBar: false
            }).show();

            return;
        } else {
            xl = parseInt(xlargeVal.value);
        }
    }
    if (xxlargeVal != null) {
        if (xxlargeVal.value == '') {
            new Noty({
                type: 'error',
                text: 'Please enter XXLarge size...',
                timeout: 2000,
                progressBar: false
            }).show();

            return;
        } else {
            xxl = parseInt(xxlargeVal.value);
        }
    }
    //console.log(itemQuantity.value);
    //console.log((s + m + l + xl + xxl));
    if (itemQuantity.value == (s + m + l + xl + xxl)) {
        new Noty({
            type: 'success',
            text: 'Quantity size match with all sizes...',
            timeout: 2000,
            progressBar: false
        }).show();
    } else if (itemQuantity.value < (s + m + l + xl + xxl)) {
        new Noty({
            type: 'error',
            text: "Quantity size less than from all sizes...",
            timeout: 2000,
            progressBar: false
        }).show();
        return;
    }

    console.log(s);
    console.log(m);
    console.log(l);
    console.log(xl);
    console.log(xxl);


    ///main code from here
    var data = {
        name: itemName.value,
        image: itemImage.value,
        price: itemPrice.value,
        quantity: itemQuantity.value,
        catagory: itemCat.value,
        size: {
            S: s,
            M: m,
            L: l,
            XL: xl,
            XXL: xxl
        }
    }
    axios.post('/itemAdd', data).then(
        res => {
            const result = res.data.success;
            const error = res.data.error;
            console.log(result);
            if (result == 'true') {
                new Noty({
                    type: 'success',
                    text: 'Item Added Successfully....',
                    timeout: 3000,
                    progressBar: false
                }).show();

                //set all field blank
                itemCat.value = 'selectoption';
                itemName.value = '';
                itemImage.value = '';
                itemPrice.value = '';
                itemQuantity.value = '';
                sSize.checked = false;
                mSize.checked = false;
                lSize.checked = false;
                xlSize.checked = false;
                xxlSize.checked = false;

                return;
            }
            if (error != '') {
                new Noty({
                    type: 'error',
                    text: error,
                    timeout: 3000,
                    progressBar: false
                }).show();
            }

        }
    ).catch(err => {
        new Noty({
            type: 'error',
            text: err,
            timeout: 3000,
            progressBar: false
        }).show();
    })
});



//itemButton.addEventListener('click', (e) => {
//    console.log('hello');
//});