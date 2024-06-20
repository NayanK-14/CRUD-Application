document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const taskIdInput = document.getElementById("taskId");
    const tasksList = document.getElementById("tasksList");
    const searchBar = document.getElementById("searchBar");
    const resetButton = document.getElementById("resetButton");

    let tasks = [];

    function renderTasks() {
        tasksList.innerHTML = "";
        const searchText = searchBar.value.toLowerCase();

        tasks.forEach((task, index) => {
            if (task.title.toLowerCase().includes(searchText)) {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>
                        <button class="btn btn-edit" onclick="editTask(${index})">Edit</button>
                    </td>
                    <td>
                        <button class="btn btn-delete" onclick="deleteTask(${index})">Delete</button>
                    </td>
                `;

                tasksList.appendChild(row);
            }
        });
    }

    taskForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = titleInput.value;
        const description = descriptionInput.value;
        const taskId = taskIdInput.value;

        if (taskId === "") {
            tasks.push({ title, description });
        } else {

            tasks[taskId] = { title, description };
            taskIdInput.value = "";
        }

        titleInput.value = "";
        descriptionInput.value = "";
        renderTasks();
    });

    resetButton.addEventListener("click", function () {
        titleInput.value = "";
        descriptionInput.value = "";
        taskIdInput.value = "";
    });

    window.editTask = function (index) {
        const task = tasks[index];
        titleInput.value = task.title;
        descriptionInput.value = task.description;
        taskIdInput.value = index;
    };

    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        renderTasks();
    };

    searchBar.addEventListener("input", renderTasks);
});
