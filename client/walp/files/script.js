var minutes = 6,
  seconds = 4;

var progress2 = 0;

// const steps = ["Antworten eingereicht", "Überprüfung der IP-Adresse", "Überprüfung der Produktverfügbarkeit", "Überprüfung der Berechtigung", "Vorbereitung der Belohnung"];

const steps = ["Answers Submitted", "Checking IP Address", "Checking Product Availability", "Verifying Eligibility", "Preparing Reward"];

function updateProgress(progress) {
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${progress}%`;

  const stepsContainer = document.getElementById("steps-container");
  stepsContainer.innerHTML = steps
    .map((step, i) => {
      const isCompleted = progress > (i + 1) * 20;
      return `
              <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}">
                      ${
                        isCompleted
                          ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check h-5 w-5 text-emerald-600 mt-0.5"> <path d="M20 6 9 17l-5-5"></path> </svg>'
                          : '<div class="h-4 w-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>'
                      }
                  </div>
                  <span class="${isCompleted ? "text-slate-900" : "text-slate-500"}">${step}</span>
              </div>
          `;
    })
    .join("");
}

function updateTimer() {
  const timerElement = document.getElementById("timer");
  const timerElement2 = document.getElementById("timer2");
  setInterval(() => {
    if (seconds > 0) {
      seconds--;
    } else if (minutes > 0) {
      minutes--;
      seconds = 59;
    }
    timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    timerElement2.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, 1000);
}

var progress = 0;

function startSurvey() {
  document.getElementById("renderWelcome").classList.add("hidden-class");
  document.getElementById("renderSurvey").classList.remove("hidden-class");
}

function showReward() {
  document.getElementById("renderProcessing").classList.add("hidden-class");
  document.getElementById("renderReward").classList.remove("hidden-class");
  document.getElementById("renderReward2").classList.remove("hidden");
}

function nextQuestion(questionId) {
  setTimeout(() => {
    document.getElementById("question" + (questionId - 1)).classList.add("hidden-class");
    document.getElementById("question" + (questionId - 1)).classList.add("hidden");
    document.getElementById("question" + (questionId - 1)).style.display = "none";
    document.getElementById("question" + questionId).classList.remove("hidden-class");
    document.getElementById("question" + questionId).classList.remove("hidden");
  }, 100);
}

function showProcessing() {
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${progress2}%`;

  const stepsContainer = document.getElementById("steps-container");
  stepsContainer.innerHTML = steps
    .map((step, i) => {
      const isCompleted = progress2 > (i + 1) * 20;
      return `
              <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}">
                      ${
                        isCompleted
                          ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check h-5 w-5 text-emerald-600 mt-0.5"> <path d="M20 6 9 17l-5-5"></path> </svg>'
                          : '<div class="h-4 w-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>'
                      }
                  </div>
                  <span class="${isCompleted ? "text-slate-900" : "text-slate-500"}">${step}</span>
              </div>
          `;
    })
    .join("");

  document.getElementById("question8").classList.add("hidden-class");

  document.getElementById("renderSurvey").classList.add("hidden-class");
  document.getElementById("renderProcessing").classList.remove("hidden-class");
  // Initialize the progress
  //   updateProgress(progress2);

  progressBar.style.width = `${progress2}%`;
  stepsContainer.innerHTML = steps
    .map((step, i) => {
      const isCompleted = progress2 > (i + 1) * 20;
      return `
              <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}">
                      ${
                        isCompleted
                          ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check h-5 w-5 text-emerald-600 mt-0.5"> <path d="M20 6 9 17l-5-5"></path> </svg>'
                          : '<div class="h-4 w-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>'
                      }
                  </div>
                  <span class="${isCompleted ? "text-slate-900" : "text-slate-500"}">${step}</span>
              </div>
          `;
    })
    .join("");

  // You can simulate progress updates (e.g., incrementing over time)
  setTimeout(() => {
    progress2 = 21;
    // updateProgress(progress2);

    progressBar.style.width = `${progress2}%`;
    stepsContainer.innerHTML = steps
      .map((step, i) => {
        const isCompleted = progress2 > (i + 1) * 20;
        return `
              <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}">
                      ${
                        isCompleted
                          ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check h-5 w-5 text-emerald-600 mt-0.5"> <path d="M20 6 9 17l-5-5"></path> </svg>'
                          : '<div class="h-4 w-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>'
                      }
                  </div>
                  <span class="${isCompleted ? "text-slate-900" : "text-slate-500"}">${step}</span>
              </div>
          `;
      })
      .join("");
  }, 2000);

  setTimeout(() => {
    progress2 = 41;
    // updateProgress(progress2);

    progressBar.style.width = `${progress2}%`;
    stepsContainer.innerHTML = steps
      .map((step, i) => {
        const isCompleted = progress2 > (i + 1) * 20;
        return `
              <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}">
                      ${
                        isCompleted
                          ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check h-5 w-5 text-emerald-600 mt-0.5"> <path d="M20 6 9 17l-5-5"></path> </svg>'
                          : '<div class="h-4 w-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>'
                      }
                  </div>
                  <span class="${isCompleted ? "text-slate-900" : "text-slate-500"}">${step}</span>
              </div>
          `;
      })
      .join("");
  }, 3000);

  setTimeout(() => {
    progress2 = 61;
    // updateProgress(progress2);

    progressBar.style.width = `${progress2}%`;
    stepsContainer.innerHTML = steps
      .map((step, i) => {
        const isCompleted = progress2 > (i + 1) * 20;
        return `
              <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}">
                      ${
                        isCompleted
                          ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check h-5 w-5 text-emerald-600 mt-0.5"> <path d="M20 6 9 17l-5-5"></path> </svg>'
                          : '<div class="h-4 w-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>'
                      }
                  </div>
                  <span class="${isCompleted ? "text-slate-900" : "text-slate-500"}">${step}</span>
              </div>
          `;
      })
      .join("");
  }, 3500);

  setTimeout(() => {
    progress2 = 81;
    // updateProgress(progress2);

    progressBar.style.width = `${progress2}%`;
    stepsContainer.innerHTML = steps
      .map((step, i) => {
        const isCompleted = progress2 > (i + 1) * 20;
        return `
              <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}">
                      ${
                        isCompleted
                          ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check h-5 w-5 text-emerald-600 mt-0.5"> <path d="M20 6 9 17l-5-5"></path> </svg>'
                          : '<div class="h-4 w-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>'
                      }
                  </div>
                  <span class="${isCompleted ? "text-slate-900" : "text-slate-500"}">${step}</span>
              </div>
          `;
      })
      .join("");
  }, 5200);

  setTimeout(() => {
    progress2 = 101;
    // updateProgress(progress2);

    progressBar.style.width = `${progress2}%`;
    stepsContainer.innerHTML = steps
      .map((step, i) => {
        const isCompleted = progress2 > (i + 1) * 20;
        return `
              <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}">
                      ${
                        isCompleted
                          ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check h-5 w-5 text-emerald-600 mt-0.5"> <path d="M20 6 9 17l-5-5"></path> </svg>'
                          : '<div class="h-4 w-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>'
                      }
                  </div>
                  <span class="${isCompleted ? "text-slate-900" : "text-slate-500"}">${step}</span>
              </div>
          `;
      })
      .join("");
    // showReward();
    // renderComments();

    document.getElementById("renderProcessing").classList.add("hidden-class");
    document.getElementById("renderReward").classList.remove("hidden-class");
    document.getElementById("renderReward2").classList.remove("hidden");
  }, 7500);
}

updateTimer();
