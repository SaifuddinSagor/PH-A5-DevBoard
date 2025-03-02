

document.addEventListener("DOMContentLoaded", function () {
    const completedButtons = document.querySelectorAll(".completed-btn");
    const taskCounter = document.querySelector("#taskCounter");
    const headerCounter = document.querySelector("#headerCounter");
    const activityContainer = document.querySelector("#activityContainer");
    const clearHistoryBtn = document.querySelector("#clearHistory");

    completedButtons.forEach(button => {
        button.addEventListener("click", function () {
            const taskId = this.dataset.taskId;
            const taskName = this.parentElement.parentElement.querySelector("h2").innerText;
            const now = new Date();
            const timeString = now.toLocaleTimeString();

            localStorage.setItem(`task_${taskId}_lastClicked`, now.getTime());
            alert("Board updated successfully!");

            this.style.backgroundColor = "gray";
            this.innerText = "Completed";
            this.disabled = true;

            let currentTaskCount = parseInt(taskCounter.innerText);
            if (currentTaskCount > 0) {
                taskCounter.innerText = currentTaskCount - 1;
            }

            let currentHeaderCount = parseInt(headerCounter.innerText);
            headerCounter.innerText = currentHeaderCount + 1;

            const logEntry = document.createElement("p");
            logEntry.classList.add("text-sm", "text-gray-700", "bg-white", "p-2", "rounded-lg", "shadow-sm", "mt-2");
            logEntry.innerHTML = `✅ You have completed the task '<b>${taskName}</b>' at <b>${timeString}</b>`;
            activityContainer.prepend(logEntry);

            
            const remainingTasks = document.querySelectorAll(".completed-btn:not([disabled])");
            if (remainingTasks.length === 0) {
                setTimeout(() => {
                    alert("🎉 Congrats!!! You have completed all the current tasks.");
                }, 500); 
            }
        });
    });

    clearHistoryBtn.addEventListener("click", function () {
        activityContainer.innerHTML = "";
    });
});


// background color change----------------------------

document.getElementById("changeBgDiv").addEventListener("click", function () {
    
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = randomColor;
});


// real time date -------------------------------------------------
function updateDate() {
    const today = new Date();

    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options); 

    document.getElementById("currentDate").innerText = formattedDate;
}

updateDate();
