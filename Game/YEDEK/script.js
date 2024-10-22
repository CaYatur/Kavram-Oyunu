const conceptsData = [
    { id: 1, text: "Kavram 1" },
    { id: 2, text: "Kavram 2" },
    { id: 3, text: "Kavram 3" },
    { id: 4, text: "Kavram 4" },
    { id: 5, text: "Kavram 5" },
    { id: 6, text: "Kavram 6" },
    { id: 7, text: "Kavram 7" },
    { id: 8, text: "Kavram 8" }
];

const meaningsData = [
    { id: 1, text: "Anlam 1" },
    { id: 2, text: "Anlam 2" },
    { id: 3, text: "Anlam 3" },
    { id: 4, text: "Anlam 4" },
    { id: 5, text: "Anlam 5" },
    { id: 6, text: "Anlam 6" },
    { id: 7, text: "Anlam 7" },
    { id: 8, text: "Anlam 8" }
];

const conceptsList = document.getElementById('concepts-list');
const meaningsList = document.getElementById('meanings-list');
const wall = document.getElementById('wall');
const resultMessage = document.getElementById('result-message');
let matchedPairs = 0;
let halfBricks = 0; // Yarım parça sayacı

// Dizileri karıştırma fonksiyonu
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 6 çift kavram ve anlamı seç, ancak rasgele sırayla ekrana yerleştir
function renderGame() {
    const selectedPairs = shuffleArray([...conceptsData]).slice(0, 6).map(concept => {
        const matchingMeaning = meaningsData.find(meaning => meaning.id === concept.id);
        return { concept, meaning: matchingMeaning };
    });

    // Kavramları ve anlamları ayrı ayrı rastgele karıştır
    const shuffledConcepts = shuffleArray(selectedPairs.map(pair => pair.concept));
    const shuffledMeanings = shuffleArray(selectedPairs.map(pair => pair.meaning));

    // Kavramları HTML'ye ekle
    shuffledConcepts.forEach(concept => {
        const li = document.createElement('li');
        li.textContent = concept.text;
        li.setAttribute('draggable', 'true');
        li.dataset.concept = concept.id;
        li.addEventListener('dragstart', handleDragStart);
        conceptsList.appendChild(li);
    });

    // Anlamları HTML'ye ekle
    shuffledMeanings.forEach(meaning => {
        const li = document.createElement('li');
        li.textContent = meaning.text;
        li.dataset.meaning = meaning.id;
        li.addEventListener('dragover', handleDragOver);
        li.addEventListener('drop', handleDrop);
        meaningsList.appendChild(li);
    });
}

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.concept);
}

function handleDragOver(event) {
    event.preventDefault();
}


function handleDrop(event) {
    event.preventDefault();
    const draggedConceptId = event.dataTransfer.getData('text/plain');
    const droppedMeaningId = event.target.dataset.meaning;

    if (draggedConceptId === droppedMeaningId) {
        // Anlam ve kavram doğru eşleştirildiğinde yeşil renkte olacaklar
        event.target.classList.add('correct');
        const draggedElement = document.querySelector(`[data-concept='${draggedConceptId}']`);
        draggedElement.classList.add('correct');

        // Artık sürüklenemez hale getir
        draggedElement.setAttribute('draggable', 'false');
        event.target.setAttribute('draggable', 'false');

        halfBricks++;  // Yarım tuğla sayısını artır
        addHalfBrick(draggedConceptId);  // Yarım tuğla ekleniyor
        matchedPairs++;
        checkIfWallIsBuilt();
    } else {
        resultMessage.textContent = 'Yanlış eşleştirme! Duvar yıkıldı.';
        
        // Yıkılma animasyonunu tetikle
        const existingHalfBricks = wall.querySelectorAll('.half-brick');
        const existingFullBricks = wall.querySelectorAll('.full-brick');

        existingHalfBricks.forEach(brick => {
            brick.classList.add('crumble'); // Yıkılma animasyonu
        });

        existingFullBricks.forEach(brick => {
            brick.classList.add('crumble'); // Yıkılma animasyonu
        });

        wall.classList.add('shake');
        setTimeout(() => {
            wall.classList.remove('shake');
            resetGame();
        }, 800);  // Animasyon süresi kadar bekleyip oyunu sıfırlıyoruz
    }
}


// Yarım tuğla ekleme, kavramın ismi yazılmayacak
function addHalfBrick(conceptId) {
    const halfBrick = document.createElement('div');
    halfBrick.classList.add('half-brick');
    wall.appendChild(halfBrick);  // Duvara sadece tuğla eklenir, yazı eklenmez

    // Eğer 2 yarım tuğla olduysa tam bir tuğla oluştur
    if (halfBricks % 2 === 0) {
        const fullBrick = document.createElement('div');
        fullBrick.classList.add('full-brick');
        wall.appendChild(fullBrick);  // Tam tuğla ekleniyor

        // Eski yarım tuğlaları temizle
        const existingHalfBricks = wall.querySelectorAll('.half-brick');
        existingHalfBricks.forEach(brick => {
            wall.removeChild(brick);
        });
    }
}


function completeFullBrick() {
    // Yarım tuğlaları kaldır ve tam tuğla ekle
    const halfBricksInWall = wall.querySelectorAll('.half-brick');
    halfBricksInWall.forEach(half => half.remove());

    const fullBrick = document.createElement('div');
    fullBrick.classList.add('full-brick');
    fullBrick.textContent = 'Tamamlandı!';
    wall.appendChild(fullBrick);
}

function checkIfWallIsBuilt() {
    if (matchedPairs === conceptsData.length) {
        resultMessage.textContent = 'Tebrikler! Duvarı başarıyla inşa ettiniz!';
    }
}

// Tüm eşleşmeler yapıldı mı kontrol et
function checkIfWallIsBuilt() {
    if (matchedPairs === 6) {
        resultMessage.textContent = 'Duvar başarıyla tamamlandı!';
    }
}

// Oyun sıfırlama fonksiyonu
function resetGame() {
    matchedPairs = 0;
    halfBricks = 0;
    resultMessage.textContent = '';
    wall.innerHTML = '';
    conceptsList.innerHTML = '';
    meaningsList.innerHTML = '';
    renderGame();
}

// Yardımcı karıştırma fonksiyonu
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Oyunu başlat
renderGame();