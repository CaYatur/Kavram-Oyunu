// Kavram ve anlam verileri
const conceptsData = [
    { id: 1, text: "Tespih" },
    { id: 2, text: "Hamt" },
    { id: 3, text: "Vahiy" },
    { id: 4, text: "Marifet" },
    { id: 5, text: "Mükellef" },
    { id: 6, text: "İbadet" },
    { id: 7, text: "Dua" },
    { id: 8, text: "Tevbe" },
    { id: 9, text: "Mucib" },
    { id: 10, text: "Tevvab" },
    { id: 11, text: "Settar" },
    { id: 12, text: "Gaffar" },
    { id: 13, text: "Afûr" },
    { id: 14, text: "Selim akıl" },
    { id: 15, text: "Salim duyular" },
    { id: 16, text: "Fıtrat" },
    { id: 17, text: "Marifet" },
    { id: 18, text: "İrade" }
];

const meaningsData = [
    { id: 1, text: "Allah'ı anmak ve zikretmek amacıyla kullanılan, genellikle 33, 99 veya 100 tane boncuktan oluşan bir araç." },
    { id: 2, text: "Kişinin Allah'a şükretmesi ve onu methetmesi anlamına gelir." },
    { id: 3, text: "Allah’ın peygamberlere veya kullarına doğrudan ilettiği ilahi mesaj." },
    { id: 4, text: "Bilgi, anlayış, ilim. Genellikle derin bir bilgi ve anlayışa işaret eder." },
    { id: 5, text: "Dini yükümlülükleri yerine getirmekle sorumlu olan kişi." },
    { id: 6, text: "Allah'a yapılan tüm türdeki ibadet ve taat. Dinî vecibeleri yerine getirme." },
    { id: 7, text: "Allah'a yönelerek yapılan yalvarma, istekte bulunma. İkna veya yardım talebidir." },
    { id: 8, text: "Günahlardan dönüş, pişmanlık duyarak Allah’a yönelme ve af dileme." },
    { id: 9, text: "Dua edenlerin dualarını kabul eden, icabet eden Allah." },
    { id: 10, text: "Tevbeleri kabul eden, tövbe edenlere merhamet eden." },
    { id: 11, text: "Günahları örten, gizleyen, affeden." },
    { id: 12, text: "Çokça affeden, günahları bağışlayan." },
    { id: 13, text: "Affedicilik, bağışlama özelliği; günahları bağışlamak." },
    { id: 14, text: "Doğru düşünme ve mantıklı karar verme yeteneği; sağduyu ve akıl sağlığını ifade eder." },
    { id: 15, text: "Sağlıklı ve düzgün çalışan duyular; çevreyi doğru algılama yeteneği." },
    { id: 16, text: "İnsanların doğuştan sahip olduğu temel özellikler ve doğası; içindeki iyi ve doğru yönler." },
    { id: 17, text: "Derin bilgi ve anlayış; ilim ve hikmetle ilişkili." },
    { id: 18, text: "Kişinin karar verme ve harekete geçme gücü; istekler doğrultusunda seçim yapma kapasitesi." }
];

window.onload = () => {
    completedLevels = parseInt(Cookies.get('completedLevels')) || 0;
    currentLevel = parseInt(Cookies.get('currentLevel')) || 1;

    // Tamamlanan bölümleri görüntüle
    completedLevelsDisplay.textContent = `Tamamlanan Bölümler: ${completedLevels}`;
};


let completedLevels = parseInt(Cookies.get('completedLevels')) || 0;
let currentLevel = parseInt(Cookies.get('currentLevel')) || 1;

let matchedPairs = 0;
let halfBricks = 0; // Yarım parça sayacı

// Menü ve oyun bölümleri
const menu = document.getElementById('menu');
const gameSection = document.getElementById('game-section');
const completedLevelsDisplay = document.getElementById('completed-levels');
const levelTitle = document.getElementById('level-title');
const conceptsList = document.getElementById('concepts-list');
const meaningsList = document.getElementById('meanings-list');
const wall = document.getElementById('wall');
const resultMessage = document.getElementById('result-message');
const levelList = document.getElementById('level-list');


const decreaseButton = document.getElementById('decreaseButton');

const gifContainer = document.getElementById('gifContainer');
const body = document.body;
const warningMessage = document.getElementById('warningMessage'); // Uyarı mesajı için referans

completedLevelsDisplay.textContent = `Tamamlanan Bölümler: ${completedLevels}`;

decreaseButton.addEventListener('click', () => {
    if (completedLevels < 3) {
        // Eğer 10'dan az ise uyarı mesajını göster
        warningMessage.style.display = 'block';
    } else {
        // Uyarı mesajını gizle
        warningMessage.style.display = 'none';
        
        // 10'dan fazla azalmaması için
        completedLevels = Math.max(0, completedLevels - 3); 
        completedLevelsDisplay.textContent = `Tamamlanan Bölümler: ${completedLevels}`;
        
        // Çerezleri güncelle
        Cookies.set('completedLevels', completedLevels, { expires: 14 });

        // Arka planı bulanıklaştır
        body.classList.add('blur');

        // GIF container'ını göster
        gifContainer.style.display = 'block';

        // 5 saniye sonra GIF'i gizle ve bulanıklığı kaldır
        setTimeout(() => {
            gifContainer.style.display = 'none';
            body.classList.remove('blur');
        }, 3000);
    }
});

// Ana menüde kaç bölüm olduğunu göster
function updateLevelList() {
    levelList.innerHTML = '';  // Eski listeyi temizle
    const totalLevels = Math.floor(conceptsData.length / 6);
    for (let i = 1; i <= totalLevels; i++) {
        const levelButton = document.createElement('button');
        levelButton.textContent = `Bölüm ${i}`;
        levelButton.addEventListener('click', () => startLevel(i));
        levelList.appendChild(levelButton);
    }
}

// Bölümü başlatma fonksiyonu
function startLevel(level) {
    currentLevel = level;
    levelTitle.textContent = `Bölüm ${level}`;
    menu.style.display = 'none';
    gameSection.style.display = 'block';
    renderGame(level);
}

// Ana menüye dönme fonksiyonu
document.getElementById('back-to-menu').addEventListener('click', () => {
    gameSection.style.display = 'none';
    menu.style.display = 'block';
    matchedPairs = 0; // Menüye dönerken eşleşme sayısını sıfırla
    updateLevelList();
});


// Oyun verilerini oluşturma
function renderGame(level) {
    const startIndex = (level - 1) * 6;
    const selectedConcepts = conceptsData.slice(startIndex, startIndex + 6);
    const selectedMeanings = meaningsData.slice(startIndex, startIndex + 6);

    conceptsList.innerHTML = '';
    meaningsList.innerHTML = '';
    wall.innerHTML = '';
    resultMessage.textContent = '';

    // ... Önceki kod
    selectedConceptId = null; // Seçimi sıfırla

    // Kavramları karıştır ve ekrana yerleştir
    shuffleArray(selectedConcepts).forEach(concept => {
        const li = document.createElement('li');
        li.textContent = concept.text;
        li.dataset.concept = concept.id;
        li.setAttribute('draggable', 'true'); // Sürüklenebilir hale getir
        li.addEventListener('click', handleConceptClick); // Tıklama olayı
        li.addEventListener('dragstart', handleDragStart); // Sürükleme başlangıç olayı
        conceptsList.appendChild(li);
    });

    // Anlamları karıştır ve ekrana yerleştir
    shuffleArray(selectedMeanings).forEach(meaning => {
        const li = document.createElement('li');
        li.textContent = meaning.text;
        li.dataset.meaning = meaning.id;
        li.addEventListener('click', handleMeaningClick); // Tıklama olayı
        li.addEventListener('dragover', handleDragOver); // Sürükleme alanı olayı
        li.addEventListener('drop', handleDrop); // Sürükleme bırakma olayı
        meaningsList.appendChild(li);
    });
}

// Diziyi karıştırma fonksiyonu
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Oyun başlangıcı için ana menüdeki buton
document.getElementById('start-game').addEventListener('click', () => {
    startLevel(1);  // İlk bölümle başlat
});

let selectedConceptId = null; // Seçilen kavram ID'sini tutan değişken

function handleConceptClick(event) {
    const conceptId = event.currentTarget.dataset.concept;

    // Daha önce bir kavram seçilmişse
    if (selectedConceptId) {
        // Seçilen kavramı sıfırlayın
        const previouslySelected = document.querySelector(`[data-concept='${selectedConceptId}']`);
        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
        }
    }

    // Yeni kavramı seç
    selectedConceptId = conceptId;
    event.currentTarget.classList.add('selected'); // Seçilen kavramın stilini değiştirmek için
}

function handleMeaningClick(event) {
    const meaningId = event.currentTarget.dataset.meaning;

    // Kavram ve anlam eşleştirmesini kontrol et
    if (selectedConceptId === meaningId) {
        // Eşleşme başarılı
        event.currentTarget.classList.add('correct');
        const draggedElement = document.querySelector(`[data-concept='${selectedConceptId}']`);
        draggedElement.classList.add('correct');

        // Artık sürüklenemez hale getir
        draggedElement.setAttribute('draggable', 'false');
        event.currentTarget.setAttribute('draggable', 'false');

        halfBricks++;  // Yarım tuğla sayısını artır
        addHalfBrick(selectedConceptId);  // Yarım tuğla ekleniyor
        matchedPairs++;
        checkIfLevelCompleted();
    } else {
        resultMessage.textContent = 'Yanlış eşleştirme! Bölüm yeniden başlatılıyor.';
        
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
            resetGame(); // Oyunu sıfırlıyoruz
        }, 800);  // Animasyon süresi kadar bekleyip oyunu sıfırlıyoruz
    }
}

function handleDragStart(event) {
    const conceptId = event.currentTarget.dataset.concept;
    event.dataTransfer.setData('text/plain', conceptId);
    event.currentTarget.classList.add('dragging'); // Sürüklenirken stil değişikliği
}

function handleDragOver(event) {
    event.preventDefault(); // Geçersiz alan
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
        checkIfLevelCompleted();
    } else {
        resultMessage.textContent = 'Yanlış eşleştirme! Bölüm yeniden başlatılıyor.';
        
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
            resetGame(); // Oyunu sıfırlıyoruz
        }, 800);  // Animasyon süresi kadar bekleyip oyunu sıfırlıyoruz
    }
}


function resetSelection() {
    const previouslySelected = document.querySelector(`[data-concept='${selectedConceptId}']`);
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
    }
    selectedConceptId = null; // Seçimi sıfırla
}


// Yarım tuğla ekleme
function addHalfBrick(conceptId) {
    const wall = document.getElementById('wall');
    const halfBrick = document.createElement('div');
    halfBrick.classList.add('half-brick');
    wall.insertBefore(halfBrick, wall.firstChild); // Yeni tuğlayı en üstte ekle

    // Eğer 2 yarım tuğla olduysa tam bir tuğla oluştur
    if (halfBricks % 2 === 0) {
        const fullBrick = document.createElement('div');
        fullBrick.classList.add('full-brick');
        wall.insertBefore(fullBrick, wall.firstChild);

        // Eski yarım tuğlaları temizle
        const existingHalfBricks = wall.querySelectorAll('.half-brick');
        existingHalfBricks.forEach(brick => {
            wall.removeChild(brick);
        });
    }
}

function checkIfLevelCompleted() {
    if (matchedPairs === 6) {  
        // Oyun tamamlandığında matchedPairs sıfırlanabilir
        matchedPairs = 0;  // Tamamlandığında sıfırla
        completedLevels++;
        completedLevelsDisplay.textContent = `Tamamlanan Bölümler: ${completedLevels}`;
        resultMessage.textContent = 'Tebrikler! Bölümü başarıyla tamamladınız!';
        
        // Çerezleri güncelle
        Cookies.set('completedLevels', completedLevels, { expires: 7 });
        Cookies.set('currentLevel', currentLevel, { expires: 7 });

        setTimeout(() => {
            if (completedLevels < Math.floor(conceptsData.length / 6)) {
                startLevel(completedLevels + 1);  // Sonraki bölüme geç
            } else {
                resultMessage.textContent = 'Tüm bölümler tamamlandı!';
                //resetGame();  // Oyun bitiyor
                gameSection.style.display = 'none';
                menu.style.display = 'block';
                matchedPairs = 0; // Menüye dönerken eşleşme sayısını sıfırla
                updateLevelList();
            }
        }, 2000);
    }
}

function resetGame() {
    matchedPairs = 0;
    halfBricks = 0;  // Yarım tuğla sayacını sıfırlıyoruz
    conceptsList.innerHTML = '';
    meaningsList.innerHTML = '';
    wall.innerHTML = '';
    resultMessage.textContent = '';
    renderGame(currentLevel);
}





// İlk başlatma
updateLevelList();
