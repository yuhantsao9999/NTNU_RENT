let loginSignup = new Vue({
    el : '#login-signup',
    data : {
        signUp : {email:'', password:'', name:'', phone:'', errmsg:''},
        login : {email:'', password:'', errmsg:''}
    },
    methods : {
        SignUp : async function ($event) {
            try {
                const data = {
                    name:this.signUp.name,
                    email:this.signUp.email,
                    password:this.signUp.password,
                    phone:this.signUp.phone
                };
                const response = await fetch('./signUp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }).then((res) => {return res.json();});
                if (!response.ok) {
                    this.signUp.errmsg = response.error;
                    throw this.signUp.errmsg;
                }
                else {
                    localStorage.setItem('name', this.signUp.name);
                    localStorage.setItem('email', this.signUp.email);
                    window.location = 'index.html';
                }
            }
            catch (err) {
                console.log(err);
            }
        },
        Login : async function ($event) {
            try {
                const data = {
                    email: this.login.email,
                    password: this.login.password
                };
                const response = await fetch('./signIn', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }).then((res) => {return res.json();})
                if (!response.ok) {
                    this.login.errmsg = response.error;
                    throw this.login.errmsg;
                }
                else {
                    localStorage.setItem('email', this.login.email);
                    switch (response.authority) {
                        case -1:
                            this.login.errmsg = 'Your account had been banned';
                            break;
                        case 1:
                            window.location = 'admin_account.html';
                            break;
                        default:
                            window.location = 'index.html';
                            break;
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }
});

$('.tab a').on('click', function (e) {
    e.preventDefault();
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    let target = $(this).attr('href');
    $('.tab-content > div').not(target).hide();
    $(target).fadeIn(600);
})

$('.form')
.find('input, textarea')
.on('keyup blur focus', function (e) {
    let $this = $(this);
    let label = $this.prev('label');
    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    }
    else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } 
    else if (e.type === 'focus') {
        if ($this.val() === '') {
            label.removeClass('highlight');
        } else if ($this.val() !== '') {
            label.addClass('highlight');
        }
    }
});