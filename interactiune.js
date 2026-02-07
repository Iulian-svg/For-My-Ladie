let noAlertShown = false;

function moveButton() {
    const btnNo = document.getElementById('btnNo');
    
    // Luăm dimensiunile ferestrei vizibile (fără scroll)
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    // Calculăm limitele maxime (scădem dimensiunea butonului + o mică marjă de 20px)
    const maxX = containerWidth - btnNo.offsetWidth - 20;
    const maxY = containerHeight - btnNo.offsetHeight - 20;

    // Generăm poziții între 0 și maximul calculat
    const x = Math.max(0, Math.floor(Math.random() * maxX));
    const y = Math.max(0, Math.floor(Math.random() * maxY));

    // Arătăm o alertă doar la prima apăsare
    if (!noAlertShown) {
        alert('Nu te poți abține, nu-i așa? 😜');
        noAlertShown = true;
    }

    // Aplicăm poziția fixă pentru a ignora restul conținutului paginii
    btnNo.style.position = 'fixed';
    btnNo.style.left = x + 'px';
    btnNo.style.top = y + 'px';
}
 
function handleYes() {
    const first = document.getElementById('first-page');
    const second = document.getElementById('second-page');

    if (first && second) {
        first.style.display = 'none'; // Metoda sigură
        second.classList.remove('hidden');
        second.style.display = 'block'; // Forțăm afișarea
        const nextButtons = document.getElementById('second-page-buttons');
        if (nextButtons) {
            nextButtons.classList.remove('hidden');
            nextButtons.style.display = 'flex';
        }
        // Add fade-in animation when showing page two
        second.classList.add('fade-in');
        second.addEventListener('animationend', function () {
            second.classList.remove('fade-in');
        }, { once: true });
    }
}

function goNext() {
    const second = document.getElementById('second-page');
    const third = document.getElementById('third-page');

    if (second && third) {
        second.classList.add('hidden');
        third.classList.remove('hidden');
        third.style.display = 'block';
        const nextButtons = document.getElementById('second-page-buttons');
        if (nextButtons) {
            nextButtons.classList.add('hidden');
            nextButtons.style.display = 'none';
        }
        // Add fade-in animation when showing page three
        third.classList.add('fade-in');
        third.addEventListener('animationend', function () {
            third.classList.remove('fade-in');
        }, { once: true });
    }
}
