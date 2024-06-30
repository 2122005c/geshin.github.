let teamATime = 180; // 3 minutes in seconds
let teamBTime = 180; // 3 minutes in seconds
let teamATimer;
let teamBTimer;
let teamABanCount = 0;
let teamBBanCount = 0;
let teamAPickCount = 0;
let teamBPickCount = 0;
const maxBanCount = 2;
const maxPickCount = 4;

function startTimer(team) {
    if (team === 'team-a') {
        teamATimer = setInterval(() => {
            if (teamATime > 0) {
                teamATime--;
                document.getElementById('team-a-timer').textContent = formatTime(teamATime);
            } else {
                clearInterval(teamATimer);
                alert('Team 1 has run out of time!');
                logHistory('team-a', 'lost turn');
                startTimer('team-b');
            }
        }, 1000);
    } else if (team === 'team-b') {
        teamBTimer = setInterval(() => {
            if (teamBTime > 0) {
                teamBTime--;
                document.getElementById('team-b-timer').textContent = formatTime(teamBTime);
            } else {
                clearInterval(teamBTimer);
                alert('Team 2 has run out of time!');
                logHistory('team-b', 'lost turn');
                startTimer('team-a');
            }
        }, 1000);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function banCharacter(team) {
    if (team === 'team-a' && teamABanCount < maxBanCount) {
        clearInterval(teamATimer);
        const banInput = document.getElementById('team-a-ban-input');
        const banList = document.getElementById('team-a-ban-list');
        const character = banInput.value.trim();
        
        if (character && !isAlreadyBannedOrPicked(character)) {
            const listItem = document.createElement('li');
            listItem.textContent = character;
            banList.appendChild(listItem);
            banInput.value = '';
            teamABanCount++;
            logHistory('team-a', `banned ${character}`);
        }
        
        teamATime = 180; // Reset time for next turn
        document.getElementById('team-a-timer').textContent = formatTime(teamATime);
        
        if (teamABanCount < maxBanCount) {
            startTimer('team-b');
        } else {
            checkEnd();
        }
    } else if (team === 'team-b' && teamBBanCount < maxBanCount) {
        clearInterval(teamBTimer);
        const banInput = document.getElementById('team-b-ban-input');
        const banList = document.getElementById('team-b-ban-list');
        const character = banInput.value.trim();
        
        if (character && !isAlreadyBannedOrPicked(character)) {
            const listItem = document.createElement('li');
            listItem.textContent = character;
            banList.appendChild(listItem);
            banInput.value = '';
            teamBBanCount++;
            logHistory('team-b', `banned ${character}`);
        }
        
        teamBTime = 180; // Reset time for next turn
        document.getElementById('team-b-timer').textContent = formatTime(teamBTime);
        
        if (teamBBanCount < maxBanCount) {
            startTimer('team-a');
        } else {
            checkEnd();
        }
    }
}

function pickCharacter(team) {
    if (team === 'team-a' && teamAPickCount < maxPickCount) {
        clearInterval(teamATimer);
        const pickInput = document.getElementById('team-a-pick-input');
        const pickList = document.getElementById('team-a-pick-list');
        const character = pickInput.value.trim();
        
        if (character && !isAlreadyBannedOrPicked(character)) {
            const listItem = document.createElement('li');
            listItem.textContent = character;
            pickList.appendChild(listItem);
            pickInput.value = '';
            teamAPickCount++;
            logHistory('team-a', `picked ${character}`);
        }
        
        teamATime = 180; // Reset time for next turn
        document.getElementById('team-a-timer').textContent = formatTime(teamATime);
        
        if (teamAPickCount < maxPickCount) {
            startTimer('team-b');
        } else {
            checkEnd();
        }
    } else if (team === 'team-b' && teamBPickCount < maxPickCount) {
        clearInterval(teamBTimer);
        const pickInput = document.getElementById('team-b-pick-input');
        const pickList = document.getElementById('team-b-pick-list');
        const character = pickInput.value.trim();
        
        if (character && !isAlreadyBannedOrPicked(character)) {
            const listItem = document.createElement('li');
            listItem.textContent = character;
            pickList.appendChild(listItem);
            pickInput.value = '';
            teamBPickCount++;
            logHistory('team-b', `picked ${character}`);
        }
        
        teamBTime = 180; // Reset time for next turn
        document.getElementById('team-b-timer').textContent = formatTime(teamBTime);
        
        if (teamBPickCount < maxPickCount) {
            startTimer('team-a');
        } else {
            checkEnd();
        }
    }
}

function logHistory(team, action) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${team.toUpperCase()}: ${action}`;
    historyList.appendChild(listItem);
}

function isAlreadyBannedOrPicked(character) {
    const teamABanList = document.getElementById('team-a-ban-list').getElementsByTagName('li');
    const teamBBanList = document.getElementById('team-b-ban-list').getElementsByTagName('li');
    const teamAPickList = document.getElementById('team-a-pick-list').getElementsByTagName('li');
    const teamBPickList = document.getElementById('team-b-pick-list').getElementsByTagName('li');
    
    const lists = [teamABanList, teamBBanList, teamAPickList, teamBPickList];
    
    for (const list of lists) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].textContent.toLowerCase() === character.toLowerCase()) {
                alert(`${character} is already banned or picked`);
                return true;
            }
        }
    }
    return false;
}

function checkEnd() {
    if (teamABanCount === maxBanCount && teamBBanCount === maxBanCount && teamAPickCount === maxPickCount && teamBPickCount === maxPickCount) {
        document.getElementById('team-a-timer').style.display = 'none';
        document.getElementById('team-b-timer').style.display = 'none';
    }
}

startTimer('team-a'); // Start the timer for Team A initially
