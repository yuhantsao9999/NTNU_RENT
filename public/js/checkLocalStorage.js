window.addEventListener('load', () => {
  if (checkLocalStorage()) {
    document.getElementById('signed').setAttribute('href', '')
    document.getElementById('signed').innerHTML = 'Log Out'
    document.getElementById('signed').setAttribute('onclick', 'logOut()')
    const lastName = localStorage.getItem('last_name')
    const firstName = localStorage.getItem('first_name')
    document.getElementById('last_name').innerHTML = 'last_name : ' + lastName
    document.getElementById('first_name').innerHTML = 'first_name : ' + firstName
    document.getElementById('hello').setAttribute('style', '{display:inline;}')
  }
})

const logOut = () => {
  localStorage.removeItem('last_name')
  localStorage.removeItem('first_name')
  localStorage.removeItem('email')
  document.getElementById('signed').innerHTML = 'Sing In'
  document.getElementById('signed').setAttribute('href', 'index.html')
  document.getElementById('signed').removeAttribute('onclick')
}

const checkLocalStorage = () => {
  const lastName = localStorage.getItem('last_name')
  const firstName = localStorage.getItem('first_name')
  const email = localStorage.getItem('email')
  return (lastName !== null || firstName !== null || email !== null)
}
