    // MODAL SCREEN DETAILS - PROGRESS BAR
    //need to move this to a javascript for the modal
    function showWaitingModal() {
      document.getElementById("myStatusModal").style.display = "block";
      simulateProgress(true);
    }

  function closeWaitingModal() {
    document.getElementById("myStatusModal").style.display = "none";
    simulateProgress(false);
  }
 let width = 0;
  function simulateProgress() {
    const progressBar = document.getElementById("progress");
    if (width >= 100) {
         width = 0;
    }
    width += 2;
    progressBar.style.width = width + "%";
  }

  // Start the progress interval
  let progressInterval = setInterval(simulateProgress, 150);

  // Function to stop the progress and reset the progress bar
  function stopProgress() {
    width = 100;
    clearInterval(progressInterval);
    width = 0;
    progressBar.style.width = width + "%";
  }