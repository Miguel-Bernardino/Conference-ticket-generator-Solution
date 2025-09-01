document.addEventListener('DOMContentLoaded', function () {
    const avatar      =    document.getElementById('avatar-img');
    const fullName1   =    document.getElementById('gradient-text');
    const fullName2   =    document.getElementById('full-name');
    const email       =    document.getElementById('orange-text-email');
    const gitUsername =    document.getElementById('github-username');

    const day =    document.getElementById('day');
    const month =    document.getElementById('month');
    const year =    document.getElementById('year');
    const city =    document.getElementById('city');
    const state =    document.getElementById('state');

    avatar.src = localStorage.getItem('foto');

    fullName1.textContent  = localStorage.getItem('nome');
    fullName2.textContent  = localStorage.getItem('nome');
    email.textContent = localStorage.getItem('email');
    gitUsername.textContent = localStorage.getItem('github');

    const currentDate = new Date();
    
    day.textContent = currentDate.getDate();
    month.textContent = currentDate.toLocaleString('default', { month: 'short' });
    year.textContent = currentDate.getFullYear();

    city.textContent = 'salvador';
    state.textContent = 'BA';


});