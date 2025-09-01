document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector(".yourDesignInput");
    const continueButton = document.getElementById("continue-button");
        const appInputContainer = document.querySelector('.app-input-container');
        const appListScreen = document.querySelector('.app-list-screen');

    continueButton.addEventListener("click", function () {
        const phoneName = inputField.value.trim();

        if (phoneName) {
                document.querySelector('.input-container').style.display = 'none';
                askAppCount(phoneName);
        } else {
            alert("Bitte gib einen Gerätenamen ein.");
        }
    });

        function askAppCount(phoneName) {
            appInputContainer.innerHTML = '';
            appInputContainer.style.display = 'flex';
            const label = document.createElement('label');
            label.textContent = 'Wie viele Apps möchtest du auf dem Screen sehen (1-5)';
            const numberInput = document.createElement('input');
            numberInput.type = 'number';
            numberInput.min = '1';
            numberInput.max = '5';
            numberInput.value = '5';
            numberInput.style.padding = '8px';
            numberInput.style.borderRadius = '8px';
            numberInput.style.border = 'none';
            numberInput.style.width = '60px';
            const nextBtn = document.createElement('button');
            nextBtn.textContent = 'Weiter';
            nextBtn.className = 'continue-button';
            nextBtn.onclick = function() {
                const count = parseInt(numberInput.value);
                if (count >= 1 && count <= 5) {
                    askAppNames(count, phoneName);
                } else {
                    alert('Bitte gib eine Zahl zwischen 1 und 5 ein.');
                }
            };
            appInputContainer.appendChild(label);
            appInputContainer.appendChild(numberInput);
            appInputContainer.appendChild(nextBtn);
        }

        function askAppNames(count, phoneName) {
            appInputContainer.innerHTML = '';
            const label = document.createElement('label');
            label.textContent = `Gib die Namen der ${count} Apps ein:`;
            appInputContainer.appendChild(label);
            const appInputs = [];
            for (let i = 0; i < count; i++) {
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = `App ${i+1}`;
                input.className = 'yourDesignInput';
                appInputContainer.appendChild(input);
                appInputs.push(input);
            }
            const finishBtn = document.createElement('button');
            finishBtn.textContent = 'Fertig';
            finishBtn.className = 'continue-button';
            finishBtn.onclick = function() {
                const appNames = appInputs.map(inp => inp.value.trim()).filter(Boolean);
                if (appNames.length === count) {
                    showAppListScreen(phoneName, appNames);
                } else {
                    alert('Bitte alle App-Namen eingeben.');
                }
            };
            appInputContainer.appendChild(finishBtn);
        }

        function showAppListScreen(phoneName, appNames) {
            appInputContainer.style.display = 'none';
            appListScreen.style.display = 'flex';
            appListScreen.innerHTML = '';
            const headline = document.createElement('h1');
            headline.textContent = `${phoneName}`;
            headline.style.marginBottom = '30px';
            appListScreen.appendChild(headline);
            const appList = document.createElement('ul');
            appList.style.listStyle = 'none';
            appList.style.padding = '0';
            appList.style.fontSize = '2rem';
            appList.style.fontWeight = '600';
            appNames.forEach(app => {
                const li = document.createElement('li');
                li.textContent = app;
                li.style.margin = '18px 0';
                appList.appendChild(li);
            });
            appListScreen.appendChild(appList);
        }
});
