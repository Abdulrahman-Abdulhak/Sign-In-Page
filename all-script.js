class Input {

    constructor(form, input, label, icon) {
        
        this.form = form;
        this.input = input;
        this.value = this.input.value;
        this.length = this.value.length;
        this.type = this.input.type;

        this.parentNode = this.input.parentNode;

        this.label = label;
        
        this.icon = icon;
        this.iconClkCount = 0;
        this.icons = icon.children;

        this.msg = '*';

        this.emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        this.illegalInputCorrector = this.illegalInputCorrector.bind(this);
        this.leaveFocus = this.leaveFocus.bind(this);
        this.initilize = this.initilize.bind(this);
        this.isEmptyInput = this.isEmptyInput.bind(this);
        this.showHidePassword = this.showHidePassword.bind(this);
        this.validatorOnBlur = this.validatorOnBlur.bind(this);
        this.validatorOnTyping = this.validatorOnTyping.bind(this);
        this.emailValidator = this.emailValidator.bind(this);
        this.nameValidator = this.nameValidator.bind(this);
        // this.usernameValidator = this.usernameValidator.bind(this);
        // this.passwordValidator = this.passwordValidator.bind(this);
        // this.passwordConfirmValidator = this.passwordConfirmValidator.bind(this);
        
        this.initilize();
        
    }
    
    initilize() {
        
        this.input.addEventListener('blur', this.leaveFocus);
        this.icon.addEventListener('click', this.showHidePassword);
        this.input.addEventListener('keyup', this.validatorOnTyping);
    
    }

    leaveFocus(e) {

        const input = e.target;
        const val = input.value;

        if(this.isEmptyInput(val)) {
            this.label.classList.remove('activated');
        }
        else {
            this.label.classList.add('activated');
        }

        this.validatorOnBlur(e)

    }

    isEmptyInput(val) {
        return val === null || val.length === (null || 0);
    }

    illegalInputCorrector(e) {

        let value = e.target.value;
        let correctState = false;

        while(!correctState) {

            if (value[0] == ' ') {
                let newValue = '';
                for(let i = 1; i<value.length ; i++) {
                    newValue += value[i];
                }
                value = newValue;
            }
            else if (value.contains('  ')) {
                let index = value.indexOf('  ');
                value.splice(index+1,1)
            }
            else {
                correctState = true;
            }

        }

    }

    showHidePassword(e) {

        if(e.target.classList.contains('password-icon')) {
            this.iconClkCount++;
            e.target.querySelector('.fa-eye-slash').classList.toggle('active');
            e.target.querySelector('.fa-eye').classList.toggle('active');
            
            if(this.iconClkCount%2 === 1) {
                this.input.type = 'text';
            }
            else {
                this.input.type = 'password';
            }

        }

    }

    validatorOnBlur(e) {

        const type = this.type;
        const name = e.target.name;

        if(type === 'password') {

            if(name === 'password') {
                return this.passwordValidator(e);
            }
            else {
                return this.passwordConfirmValidator(e);
            }

        }

    }

    validatorOnTyping(e) {

        const type = this.type;
        const name = e.target.name;

        if(type === 'email') {
            return this.emailValidator(e);
        }
        else if(type === 'text') {

            if(name === 'name') {
                return this.nameValidator(e);
            }
            else {
                return this.usernameValidator(e);
            }

        }
        else if(type === 'password') {

            if(name === 'password') {
                return this.passwordValidator(e);
            }
            else {
                return this.passwordConfirmValidator(e);
            }

        }

        // (async function checkEmpty() {

        //     const inputs = form.querySelectorAll('input');
        //     const submitBtn = form.querySelector('.submit-btn');

        //     inputs.forEach(input => {

        //         if(input.value.length !== 0) {
        //             submitBtn.disabled = false;
        //             console.log('in if')
        //         } else {
        //             submitBtn.disabled = true;
        //             console.log('in else')
        //         }

        //     });

        // })();

    }

    emailValidator(e) {

        const value = e.target.value;
        let msg = '*';

        if(this.isEmptyInput(value)) {
            msg = '*';
            this.icon.classList.remove('valid');
            this.icon.classList.remove('invalid');
            this.input.classList.remove('valid');
            this.input.classList.remove('invalid');
        }
        else if(!value.match(this.emailPattern)) {
            msg = '*';
            this.icon.classList.remove('valid');
            this.icon.classList.add('invalid');
            this.input.classList.remove('valid');
            this.input.classList.add('invalid');
        }
        else if(checkIfExist("email", usersData, value)) {
            msg = 'this email address already have an account';
            this.icon.classList.remove('valid');
            this.icon.classList.add('invalid');
            this.input.classList.remove('valid');
            this.input.classList.add('invalid');
        }
        else {
            msg = '*';
            this.icon.classList.add('valid');
            this.icon.classList.remove('invalid');
            this.input.classList.add('valid');
            this.input.classList.remove('invalid');
        }

        this.msg = msg;
        if(this.label.style.getPropertyValue('--msg') != `"${this.msg}"`) {
            this.label.style.setProperty('--msg', `"${this.msg}"`);
        }                

    }

    nameValidator(e) {

        let value = e.target.value;
        let correctState = false;
        let msg = '*';

        while(!correctState) {

            if (value[0] == ' ') {

                let newValue = '';

                for(let i = 1; i<value.length ; i++) {
                    newValue += value[i];
                }

                value = newValue;

            }
            else if (e.key === ' ' && value[value.length - 2] == ' ') {

                let newValue = '';
                let check = true;

                for(let i = 0; i<value.length - 1 ; i++) {
                    newValue += value[i];
                }

                value = newValue;

            }
            else {
                correctState = true;
            }

        }

        let newValue = '';
        for(let i = 0; i < value.length ; i++) {

            if(value[i - 1] == ' ' || i === 0) {
                newValue += value[i].toUpperCase();
            }
            else {
                newValue += value[i];
            }

        }

        value = newValue;
        e.target.value = value;

        if(this.isEmptyInput(value)) {
            msg = '*';
            this.icon.classList.remove('valid');
            this.icon.classList.remove('invalid');
            this.input.classList.remove('valid');
            this.input.classList.remove('invalid');
        } else {
            msg = '*';
            this.input.classList.add('valid');
            this.input.classList.remove('invalid');
        }
        
    }

    usernameValidator(e) {

        let value = e.target.value;
        let msg = '*';
        
        if(e.key == ' ') {

            e.target.readonly = true;
            let newValue = '';
            
            for(let i = 0; i < value.length - 1 ; i++) {
                newValue += value[i];
            }

            value = newValue;
            e.target.value = value;

            e.target.readonly = false;

        }

        if(e.key == e.key.toUpperCase()) {
            
            let newValue = value.toLowerCase();

            value = newValue;
            e.target.value = value;

        }

        if(this.isEmptyInput(value)) {
            msg = '*';
            this.icon.classList.remove('valid');
            this.icon.classList.remove('invalid');
            this.input.classList.remove('valid');
            this.input.classList.remove('invalid');
        }
        else if(checkIfExist("username", usersData, value)) {
            msg = 'this user name already exists';
            this.icon.classList.remove('valid');
            this.icon.classList.add('invalid');
            this.input.classList.remove('valid');
            this.input.classList.add('invalid');
        }
        else {
            msg = '*';
            this.icon.classList.add('valid');
            this.icon.classList.remove('invalid');
            this.input.classList.add('valid');
            this.input.classList.remove('invalid');
        }

        this.msg = msg;
        if(this.label.style.getPropertyValue('--msg') != `"${this.msg}"`) {
            this.label.style.setProperty('--msg', `"${this.msg}"`);
        }            

    }

    passwordValidator(e) {

        const rePassField = this.form.querySelector('input[name="repassword"]');
        const rePassValue = rePassField.value;
        const value = e.target.value;
        let msg = '*';

        if(this.isEmptyInput(value)) {
            msg = '*';
            this.icon.classList.remove('valid');
            this.icon.classList.remove('invalid');
            this.input.classList.remove('valid');
            this.input.classList.remove('invalid');
        }
        else if(value.length >= 8 && value.length <= 16) {
            msg = '*';
            this.icon.classList.add('valid');
            this.icon.classList.remove('invalid');
            this.input.classList.add('valid');
            this.input.classList.remove('invalid');
        }
        else {
            msg = "password should be between 8 to 16 characters long";
            this.icon.classList.remove('valid');
            this.icon.classList.add('invalid');
            this.input.classList.remove('valid');
            this.input.classList.add('invalid');
        }

        this.msg = `"${msg}"`;

        if(this.label.style.getPropertyValue('--msg') != this.msg)
            this.label.style.setProperty('--msg', this.msg);

    }

    passwordConfirmValidator(e) {

        const passwordField = this.form.querySelector('input[name="password"]');
        const passValue = passwordField.value;
        const value = e.target.value;
        let msg = '';

        if(this.isEmptyInput(value)) {
            msg = '*';
            this.icon.classList.remove('valid');
            this.icon.classList.remove('invalid');
            this.input.classList.remove('valid');
            this.input.classList.remove('invalid');
        }
        else if(this.isEmptyInput(passValue)) {
            msg = "fill in the previous field first";
            this.icon.classList.remove('valid');
            this.icon.classList.add('invalid');
            this.input.classList.remove('valid');
            this.input.classList.add('invalid');
        }
        else if(value == passValue) {
            msg = '*';
            this.icon.classList.add('valid');
            this.icon.classList.remove('invalid');
            this.input.classList.add('valid');
            this.input.classList.remove('invalid');
        }
        else {
            msg = "rewrite the same password you created earlier";
            this.icon.classList.remove('valid');
            this.icon.classList.add('invalid');
            this.input.classList.remove('valid');
            this.input.classList.add('invalid');
        }

        this.msg = `"${msg}"`;

        if(this.label.style.getPropertyValue('--msg') != this.msg)
            this.label.style.setProperty('--msg', this.msg);

    }

}

const cookieStorage = {
    
    getCookie: key => {

        const cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce(( prev, [key, value]) => ({ ...prev, [key.trim()]: value}) );

        for(let i = 0; i<cookies.length; i+=2) {
            if(cookies[i] == key) {
                return cookies[i+1]
            }
        }

    },
    setItem: (key, value) => {
        document.cookie = `${key}=${value}`;
    },
    removeItem: key => {
        const value = getCookie(key);
        document.cookie = `${key}=${value}; max-Age=-60`;
    }
    
}

const checkIfExist = (type, fileObj, value) => {

    let result = false;
    
    fileObj.forEach(obj => {
        
        if(obj[`${type}`]) {   
            if(obj[`${type}`] === value) {
                result = true;
            }
        }
        
    });
    
    return result;
    
}

let storageType = cookieStorage;
let usersData;
let userId;

const signInForm = document.querySelector("form");
const signInputsList = signInForm.querySelectorAll('.sign-in-container input');
const signLabelsList = signInForm.querySelectorAll('.sign-in-container label');
const submitBtn = signInForm.querySelector('.submit-btn')

signInputsList.forEach(input => {

    let label = input.nextElementSibling;
    let icon = label.nextElementSibling;

    new Input(signInForm, input, label, icon);

});


signInForm.addEventListener('submit', e => {

    e.preventDefault();
    let approveSubmit = true;
    const formData = new FormData(signInForm);

    signInputsList.forEach(input => {

        if(!input.classList.contains('valid'))
            approveSubmit = false;

    });

    formData.id = userId;

    if(approveSubmit) {

        fetch("./path.html", {
            method: 'post',
            body: formData
        }).then(res => {
            return res.text();
        }).then(text => {
            console.log(text);
        }).catch(err => {
            console.error(err);
        })

    }

});


const checkCurrentUser = () => {
    if(usersData) {

        if (storageType.getCookie("id")) {
            userId = storageType.getCookie("id");
        }
        else {
            creatUser();
        }

    }
}

const creatUser = () => {
    storageType.setItem("id", getLastUserId() + 1);
    userId = storageType.getCookie("id");
}

const getLastUserId = () => {
    let length = usersData.length;
    let lastId = usersData[length-1].id;

    return lastId;
}

fetch('./users.json')
    .then(res => {
        return res.json();
    })
    .then(data => {
        usersData = data;
        checkCurrentUser();
    })
    .catch(err => {
        console.error(err);
    })
