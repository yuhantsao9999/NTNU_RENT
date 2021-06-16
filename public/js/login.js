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
        } else if (e.type === 'blur') {
            if ($this.val() === '') {
                label.removeClass('active highlight');
            } else {
                label.removeClass('highlight');
            }
        } else if (e.type === 'focus') {
            if ($this.val() === '') {
                label.removeClass('highlight');
            } else if ($this.val() !== '') {
                label.addClass('highlight');
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
});

const signUp = () => {
    const data = {
        last_name: document.getElementById('last_name').value,
        first_name: document.getElementById('first_name').value,
        email: document.getElementById('email_signUp').value,
        password: document.getElementById('password').value,
    };

    fetch('./signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(async (response) => {
            if (!response.ok) {
                const error = await response.text();
                console.log(error);
                document.getElementById('error_signUp').innerHTML = error;
            } else {
                return response.json();
            }
        })
        .then((data) => {
            // all storage need to be cookies
            localStorage.setItem('last_name', data.last_name);
            localStorage.setItem('first_name', data.first_name);
            localStorage.setItem('email', data.email);
            window.location = 'index.html';
        })
        .catch((err) => {
            console.log(err);
        });
};

const signIn = () => {
    const data = {
        email: document.getElementById('email_signIn').value,
        password: document.getElementById('password2_signIn').value,
    };

    fetch('./signIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(async (response) => {
            if (!response.ok) {
                const error = await response.text();
                document.getElementById('login_title').remove();
                document.getElementById('error_signIn').innerHTML = error;
            }
            return response.json();
        })
        .then((data) => {
            // all storage need to be cookies
            localStorage.setItem('last_name', data.last_name);
            localStorage.setItem('first_name', data.first_name);
            localStorage.setItem('email', data.email);
            window.location = 'index.html';
        })
        .catch((err) => {
            console.log(err);
        });
};
