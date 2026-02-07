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
        // Initialize gallery when showing third page
        initGallery();
    }
}

/* Gallery slideshow for third page */
let galleryIndex = 0;
let galleryInitialized = false;

function initGallery() {
    if (galleryInitialized) return;
    const gallery = document.querySelectorAll('#third-page .gallery-image');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const captions = document.querySelectorAll('#third-page .caption');
    const textPanel = document.querySelector('#third-page .text-column.panel-white');
    if (!gallery.length || !prevBtn || !nextBtn) return;

    function showSlide(idx) {
        galleryIndex = idx;
        gallery.forEach((img, i) => {
            img.classList.toggle('active', i === idx);
        });
        // Toggle captions (they should be in same order as images)
        if (captions && captions.length) {
            captions.forEach((c, i) => c.classList.toggle('active', i === idx));
        }
        // adjust text panel height to match active image
        updatePanelHeight(idx);
        prevBtn.disabled = idx === 0;
        nextBtn.disabled = idx === gallery.length - 1;
    }

    prevBtn.addEventListener('click', () => {
        if (galleryIndex > 0) showSlide(galleryIndex - 1);
    });
    nextBtn.addEventListener('click', () => {
        if (galleryIndex < gallery.length - 1) showSlide(galleryIndex + 1);
    });

    // show first slide
    showSlide(0);
    galleryInitialized = true;

    // ensure panel height remains synced on window resize
    window.addEventListener('resize', () => updatePanelHeight(galleryIndex));

    function updatePanelHeight(idx) {
        if (!textPanel) return;
        const img = gallery[idx];
        if (!img) return;
        // If image height is zero (not loaded yet), wait for load event
        const applyHeight = () => {
            const h = img.getBoundingClientRect().height;
            if (h && h > 0) {
                textPanel.style.height = h + 'px';
            } else {
                // retry shortly
                setTimeout(() => updatePanelHeight(idx), 120);
            }
        };
        if (img.complete) applyHeight();
        else img.addEventListener('load', applyHeight, { once: true });
    }
}
