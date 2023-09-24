window.addEventListener("DOMContentLoaded", function () {
    // Get the form elements
    var form = document.getElementById("form");

    // add event listener for form submission
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      calculateDoses();
    });

    // calculate doses
    function calculateDoses() {
      testosteroneBoost.textContent = "";

      // id ="appendcontent" make innerHTML = ""
      var appendcontent = document.getElementById("appendcontent");
      appendcontent.innerHTML = "";

      // id = "symptomaticTestosterone" is checked
      var symptomaticTestosterone = document.getElementById("symptomaticTestosterone").checked;

      if (isCalculatable()) {
        if (symptomaticTestosterone === false) {
          testosteroneBoost.textContent = "0mg";

          var testosteroneDoseBlock = document.getElementById("appendcontent");
          var testosteroneDoseBlockP = document.createElement("p");
          testosteroneDoseBlockP.textContent = "Boost dosage is zero when the patient is not symptomatic";
          testosteroneDoseBlockP.style.color = "black";
          testosteroneDoseBlock.appendChild(testosteroneDoseBlockP);
        } else {
           var result = calculateTestosteroneBoost();
          //console.log(result)
          testosteroneBoost.innerHTML = "<br>"+
          "Conservative: " + result * 0.50 +"mg pellets<br>"
          + " Median: " + result * 0.75 + "mg pellets<br>"
          + " Aggresive: " + result + " mg pellets";
        }
      } else {
        testosteroneBoost.textContent = "0mg";

        var testosteroneDoseBlock = document.getElementById("appendcontent");
        var testosteroneDoseBlockP = document.createElement("p");
        testosteroneDoseBlockP.textContent = "Consider the next full procedure round of pellets instead of a boost.";
        testosteroneDoseBlockP.style.color = "black";
        testosteroneDoseBlock.appendChild(testosteroneDoseBlockP);
      }
    }

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("calculate");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function () {
      if (isCalculatable()) {
        calculateDoses();
        modal.style.display = "block";
      } else {
        calculateDoses();
      }
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    // check if the last procedure date is within the last three months from today
    function isCalculatable() {
      var lastProcedureDateInput = document.getElementById("lastProcedureDate");
      var lastProcedureDate = new Date(lastProcedureDateInput.value);
      var currentDate = new Date();
      var threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      return lastProcedureDate >= threeMonthsAgo && lastProcedureDate <= currentDate;
    }

    // calculate testosterone boost
    function calculateTestosteroneBoost() {
      // check if id="symptomaticTestosterone" is checked
      var symptomaticTestosterone = document.getElementById("symptomaticTestosterone");
      if (symptomaticTestosterone.checked === true) {
        var testosteronecal = document.getElementById("testosteroneLabs").value;

        if (testosteronecal >= 0 && testosteronecal <= 499) {
          return 800;
        }
        if (testosteronecal >= 500 && testosteronecal <= 699) {
          return 600;
        }
        if (testosteronecal >= 700 && testosteronecal <= 899) {
          return 400;
        }
        if (testosteronecal >= 900 && testosteronecal <= 1199) {
          return 200;
        }
        if (testosteronecal > 1200) {
          var testosteroneDoseBlock = document.getElementById("appendcontent");
          var testosteroneDoseBlockP = document.createElement("p");
          testosteroneDoseBlockP.textContent =
            "Boost dosage is zero when testosterone labs are greater than or equal to 1200";
          testosteroneDoseBlockP.style.color = "black";
          testosteroneDoseBlock.appendChild(testosteroneDoseBlockP);

          return 0;
        }
      }
    }
  });
