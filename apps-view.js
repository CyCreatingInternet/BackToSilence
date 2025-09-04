document.addEventListener("DOMContentLoaded", function () {
    const selectableItems = [
        ...document.querySelectorAll('.App-List img'),
        ...document.querySelectorAll('.Social-List img')
    ];
    const finalList = document.getElementById('Final-List');
    const placeholders = [
        document.getElementById('placeholder1'),
        document.getElementById('placeholder2'),
        document.getElementById('placeholder3'),
        document.getElementById('placeholder4')
    ];
    let selectedCount = 0;

    selectableItems.forEach(item => {
        item.addEventListener('click', function () {
            if (selectedCount >= 4) return;
            // Finde den nächsten freien Platzhalter
            const nextIndex = placeholders.findIndex(ph => ph.style.display !== 'none');
            if (nextIndex === -1) return;
            // Erstelle ein neues Bild und übernehme Style und Attribute vom Platzhalter
            const ph = placeholders[nextIndex];
            const newImg = document.createElement('img');
            newImg.src = item.src;
            newImg.className = ph.className; // Klasse vom Platzhalter übernehmen
            newImg.style.cssText = ph.style.cssText; // Style vom Platzhalter übernehmen
            // Ersetze den Platzhalter
            finalList.replaceChild(newImg, ph);
            ph.style.display = 'none';
            selectedCount++;
        });
    });
});
//Hilfe von KI (teilweise) 
