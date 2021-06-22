window.addEventListener('load', () => {
    if (checkLocalStorage()) {
        document.getElementById('signed').setAttribute('href', '');
        document.getElementById('signed').innerHTML = 'Log Out';
        document.getElementById('signed').setAttribute('onclick', 'logOut()');
        const UserName = localStorage.getItem('name');
        console.log('UserName', UserName);
        document.getElementById('UserName').innerHTML = '你好，' + UserName;
        document.getElementById('hello').setAttribute('style', '{display:inline;}');
    }
});

const logOut = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    document.getElementById('signed').innerHTML = 'Sing In';
    document.getElementById('signed').setAttribute('href', 'index.html');
    document.getElementById('signed').removeAttribute('onclick');
};

const checkLocalStorage = () => {
    const UserName = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    return UserName !== null || email !== null;
};
