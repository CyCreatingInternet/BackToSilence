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
            label.textContent = `Gib die Namen und Links der ${count} Apps ein:`;
            appInputContainer.appendChild(label);
            const appInputs = [];
            for (let i = 0; i < count; i++) {
                const wrapper = document.createElement('div');
                wrapper.style.display = 'flex';
                wrapper.style.gap = '8px';
                wrapper.style.width = '100%';
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = `App ${i+1} Name`;
                input.className = 'yourDesignInput';
                input.style.flex = '2';
                const linkInput = document.createElement('input');
                linkInput.type = 'url';
                linkInput.placeholder = 'https://link-zur-app.de';
                linkInput.className = 'yourDesignInput';
                linkInput.style.flex = '3';
                wrapper.appendChild(input);
                wrapper.appendChild(linkInput);
                appInputContainer.appendChild(wrapper);
                appInputs.push({name: input, url: linkInput});
            }
            // Zeit-Auswahl
            const timeLabel = document.createElement('label');
            timeLabel.textContent = 'Wie lange soll der Home Screen angezeigt werden? (Minuten)';
            timeLabel.style.marginTop = '18px';
            const timeInput = document.createElement('input');
            timeInput.type = 'number';
            timeInput.min = '1';
            timeInput.max = '180';
            timeInput.value = '10';
            timeInput.className = 'yourDesignInput';
            timeInput.style.width = '80px';
            appInputContainer.appendChild(timeLabel);
            appInputContainer.appendChild(timeInput);
            const finishBtn = document.createElement('button');
            finishBtn.textContent = 'Fertig';
            finishBtn.className = 'continue-button';
            finishBtn.onclick = function() {
                const appData = appInputs.map(obj => ({
                    name: obj.name.value.trim(),
                    url: obj.url.value.trim()
                })).filter(app => app.name && app.url);
                const time = parseInt(timeInput.value);
                if (appData.length === count && time > 0) {
                    showAppListScreen(phoneName, appData, time);
                } else {
                    alert('Bitte alle App-Namen und Links eingeben und eine Zeit wählen.');
                }
            };
            appInputContainer.appendChild(finishBtn);
        }

        function showAppListScreen(phoneName, appNames) {
            appInputContainer.style.display = 'none';
            appListScreen.style.display = 'flex';
            appListScreen.innerHTML = '';
            appListScreen.style.flexDirection = 'column';
            appListScreen.style.alignItems = 'center';
            appListScreen.style.justifyContent = 'center';
            appListScreen.style.padding = '16px';
            appListScreen.style.boxSizing = 'border-box';
            // Countdown Timer
            const timerDiv = document.createElement('div');
            timerDiv.style.fontSize = '1.2rem';
            timerDiv.style.marginBottom = '18px';
            appListScreen.appendChild(timerDiv);
            let secondsLeft = arguments[2] * 60;
            function updateTimer() {
                const min = Math.floor(secondsLeft / 60);
                const sec = secondsLeft % 60;
                timerDiv.textContent = `Verbleibende Zeit: ${min}:${sec.toString().padStart(2,'0')} min`;
            }
            updateTimer();
            const timerInterval = setInterval(() => {
                secondsLeft--;
                if (secondsLeft <= 0) {
                    clearInterval(timerInterval);
                    appListScreen.innerHTML = '<h2>Die Zeit ist abgelaufen.</h2>';
                } else {
                    updateTimer();
                }
            }, 1000);
            // Headline
            const headline = document.createElement('h1');
            headline.textContent = `${phoneName}`;
            headline.style.marginBottom = '18px';
            headline.style.fontSize = '2.2rem';
            headline.style.textAlign = 'center';
            appListScreen.appendChild(headline);
            // App-Links
            const appList = document.createElement('ul');
            appList.style.listStyle = 'none';
            appList.style.padding = '0';
            appList.style.fontSize = '1.5rem';
            appList.style.fontWeight = '600';
            appList.style.width = '100%';
            appList.style.maxWidth = '400px';
            appList.style.display = 'flex';
            appList.style.flexDirection = 'column';
            appList.style.gap = '18px';
            arguments[1].forEach(app => {
                const li = document.createElement('li');
                li.style.margin = '0';
                li.style.width = '100%';
                const a = document.createElement('a');
                a.textContent = app.name;
                a.href = app.url;
                a.target = '_blank';
                a.style.display = 'block';
                a.style.background = '#f2f2f2';
                a.style.color = '#222';
                a.style.borderRadius = '12px';
                a.style.padding = '18px 0';
                a.style.textAlign = 'center';
                a.style.textDecoration = 'none';
                a.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                a.style.fontWeight = '700';
                a.style.fontSize = '1.2em';
                a.style.transition = 'background 0.2s, color 0.2s';
                a.onpointerdown = () => a.style.background = '#e0e0e0';
                a.onpointerup = () => a.style.background = '#f2f2f2';
                li.appendChild(a);
                appList.appendChild(li);
            });
            appListScreen.appendChild(appList);
        }
});
