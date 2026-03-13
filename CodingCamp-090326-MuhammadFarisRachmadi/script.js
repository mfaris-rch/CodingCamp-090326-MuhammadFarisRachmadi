// Greeting and Time
function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const greetingText = document.getElementById('greeting-text');
    
    if (hour < 12) {
        greetingText.textContent = 'Selamat Pagi';
    } else if (hour < 18) {
        greetingText.textContent = 'Selamat Siang';
    } else {
        greetingText.textContent = 'Selamat Malam';
    }
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID');
    const dateString = now.toLocaleDateString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    document.getElementById('current-time').textContent = timeString;
    document.getElementById('current-date').textContent = dateString;
}

// Focus Timer
let timerInterval = null;
let timeLeft = 25 * 60; // 25 minutes in seconds

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer-display').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById('start-btn').addEventListener('click', () => {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                alert('Sesi fokus selesai!');
            }
        }, 1000);
    }
});

document.getElementById('stop-btn').addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
});

document.getElementById('reset-btn').addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timeLeft = 25 * 60;
    updateTimerDisplay();
});

// To-Do List
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.done ? 'done' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', () => {
            tasks[index].done = checkbox.checked;
            saveTasks();
            renderTasks();
        });
        
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;
        span.contentEditable = false;
        
        const editBtn = document.createElement('button');
        editBtn.className = 'task-edit-btn';
        editBtn.textContent = 'Ubah';
        editBtn.addEventListener('click', () => {
            if (span.contentEditable === 'false') {
                span.contentEditable = 'true';
                span.focus();
                span.classList.add('editing');
                editBtn.textContent = 'Simpan';
            } else {
                span.contentEditable = 'false';
                span.classList.remove('editing');
                tasks[index].text = span.textContent;
                saveTasks();
                editBtn.textContent = 'Ubah';
            }
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'task-delete-btn';
        deleteBtn.textContent = 'Hapus';
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

document.getElementById('add-task-btn').addEventListener('click', () => {
    const input = document.getElementById('task-input');
    const text = input.value.trim();
    
    if (text) {
        tasks.push({ text, done: false });
        saveTasks();
        renderTasks();
        input.value = '';
    }
});

document.getElementById('task-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('add-task-btn').click();
    }
});

// Quick Links
let links = JSON.parse(localStorage.getItem('links')) || [];

function saveLinks() {
    localStorage.setItem('links', JSON.stringify(links));
}

function renderLinks() {
    const container = document.getElementById('links-container');
    container.innerHTML = '';
    
    links.forEach((link, index) => {
        const div = document.createElement('div');
        div.className = 'link-item';
        
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.className = 'link-btn';
        a.textContent = link.name;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'link-delete-btn';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', () => {
            links.splice(index, 1);
            saveLinks();
            renderLinks();
        });
        
        div.appendChild(a);
        div.appendChild(deleteBtn);
        container.appendChild(div);
    });
}

document.getElementById('add-link-btn').addEventListener('click', () => {
    const nameInput = document.getElementById('link-name');
    const urlInput = document.getElementById('link-url');
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
    
    if (name && url) {
        links.push({ name, url });
        saveLinks();
        renderLinks();
        nameInput.value = '';
        urlInput.value = '';
    }
});

// Initialize
updateGreeting();
updateTime();
updateTimerDisplay();
renderTasks();
renderLinks();

setInterval(updateTime, 1000);
setInterval(updateGreeting, 60000);
