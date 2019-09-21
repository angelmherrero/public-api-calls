// Starting page with the header and a button to order a new group of employees
$(".search-container").html(
  '<form action="https://randomuser.me/api/?results=12" method="get">' +
    '<label for="search-input"> Click for a new group of employees: ' +
    "</label>" +
    '<button type="click" id="search-submit" class="search-submit"></button>' +
    "</form>"
);

// Employeedata" is the array of objects. Each object contains the
// exhaustive employee info
let employeedata = "";
// EmployeeHTML includes all the HTML that defines all the cards
let employeeHTML = "";
// ModalemployeeHTML includes the HTML for the employee modal page
// The modal page has two usages: to search for an employee and to
// show a choosen employee
let modalemployeeHTML = "";
let newemployeedataHTML = "";
// Subset of employee object information properties
let imagelarge = "";
let firstname = "";
let lastname = "";
let email = "";
let city = "";
let state = "";
let phone = "";
let street = "";
let postcode = "";
let dobdatehour = "";
let dob = "";
let nationality = "";
// Clicking to order a new group of employees coming from external web "randomuser"
$(".search-submit").click(employeedata, function(evt) {
  evt.preventDefault();
  $.ajax({
    //Limiting to data in the English alphabet. Turkey and Iran are out of choice
    url:
      "https://randomuser.me/api/?results=12&nat=au,br,ca,ch,de,dk,es,fi,fr,gb,ie,nl,nz,us",
    dataType: "json",
    success: function(data) {
      $(".search-container").remove("form"); // Eliminating starting page button/comment
      // Creating HTML to enter first and last name to search an employee
      searchemployeeHTML("Find an employee:");
      employeedata = data.results; // Storing all the employee properties
      allcards(employeedata); // Generates the HTML of all the cards
      employeeHTML = allcards(employeedata); // Stores this HTML for later usage

      // Once we have all the basic HTML employee card info We have two potential paths:
      // searching for an introduced first/last names or looking for more employee info

      // Path 1: searching for an employee
      $("#search-employee").click(employeedata, function(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        // Checks if employee is in the group and calls functions to create the HTML code:
        // function "validsearch" when the search is positive or
        // function "invalidsearch"  when the search is negative
        searchemployee(employeedata);
      });
      // Path 2: looking for more employee info from one of the employee cards
      $(".card").click(employeedata, function(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        // Identifying the email address of the choosed (clicked) employee
        let emailmodal = $(this)
          .find(".card-text")
          .first(".card-text")
          .text();
        // Let´s create the HTML for the modal page with lots of info details of
        // the choosen employee and prev and next buttons
        choosecard(employeedata, emailmodal, employeeHTML);
        // Activating the prev and next buttons to be usud as many times as we need
        prevnext(employeedata, employeeHTML);
      });
    }
  });
});

// There are four auxiliary functions that are valid for both processes of "search"
// and "looking for more employee info": the four functions are "modalHTMLsubset",
// "findflag", "findcountry" and "modalHTML"

// Preparing the creation of the modal page with the function "modalHTMLsubset"
// Function "modalHTMLsubset" creates HTML for a requested modal page
// It returns the HTML code for the modal employee
// It also calls for the flag and full country name of the employee country
function modalHTMLsubset(employeedata, modalindex, type) {
  imagelarge = employeedata[modalindex].picture.large;
  firstname = employeedata[modalindex].name.first;
  lastname = employeedata[modalindex].name.last;
  email = employeedata[modalindex].email;
  city = employeedata[modalindex].location.city;
  state = employeedata[modalindex].location.state;
  phone = employeedata[modalindex].phone;
  street = employeedata[modalindex].location.street;
  postcode = employeedata[modalindex].location.postcode;
  dobdatehour = employeedata[modalindex].dob.date;
  dob =
    dobdatehour.substring(8, 10) +
    "/" +
    dobdatehour.substring(5, 7) +
    "/" +
    dobdatehour.substring(2, 4);
  nationality = employeedata[modalindex].nat;
  // Calling for the flag of the modal employee
  let flagimage = findflag(nationality);
  // Calling for the full country name of the modal employee
  let country = findcountry(nationality);
  modalemployeeHTML =
    '<div class="modal-container">' +
    '<div class="modal">' +
    '<div class="modal-info-container">' +
    '<img class="modal-img" src="' +
    imagelarge +
    '"<alt="profile-picture">' +
    '<h3 id="name" class="modal-name cap">' +
    firstname +
    " " +
    lastname +
    "</h3>" +
    '<p class="modal-text">' +
    email +
    "</p>" +
    '<p class="modal-text cap">' +
    city +
    "</p>" +
    "<hr>" +
    '<p class="modal-text">' +
    phone +
    "</p>" +
    '<p class="modal-text">' +
    street +
    ", " +
    city +
    ", " +
    state +
    " " +
    postcode +
    "</p>" +
    "<div>" +
    flagimage +
    "</div>" +
    "<div>" +
    country +
    "</div>" +
    "</p>" +
    '<p class="modal-text">Birthday:' +
    dob +
    "</p>" +
    "</div>" +
    "</div>" +
    '<div class="modal-btn-container">' +
    '<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>' +
    '<button type="button" id="modal-next" class="modal-next btn">Next</button>' +
    "</div>" +
    "</div>";
  // It returns the HTML code for the modal employee
  return modalemployeeHTML;
}

// Gets two letters that identify the country and returns the flag of
// the modal employee
function findflag(nationality) {
  let nation = nationality;
  let flag = "";
  if (
    nation === "AU" ||
    nation === "BR" ||
    nation === "CA" ||
    nation === "CH" ||
    nation === "DE" ||
    nation === "DK" ||
    nation === "ES" ||
    nation === "FI" ||
    nation === "FR" ||
    nation === "GB" ||
    nation === "IE" ||
    nation === "NL" ||
    nation === "NZ" ||
    nation === "US"
  ) {
    flag =
      '<img src="https://www.countryflags.io/' + nation + '/shiny/48.png">';
  }
  return flag;
}

// Gets two letters that identify the country and returnss the full country
// name of the modal employee
function findcountry(nationality) {
  let nation = nationality;
  let country = "";
  if (nation === "AU") {
    country = "AUSTRALIA";
  } else if (nation === "BR") {
    country = "AUSTRALIA";
  } else if (nation === "CA") {
    country = "CANADA";
  } else if (nation === "CH") {
    country = "SWITZERLAND";
  } else if (nation === "DE") {
    country = "GERMANY";
  } else if (nation === "DK") {
    country = "DENMARK";
  } else if (nation === "ES") {
    country = "SPAIN";
  } else if (nation === "FI") {
    country = "FINLAND";
  } else if (nation === "FR") {
    country = "FRANCE";
  } else if (nation === "GB") {
    country = "UK";
  } else if (nation === "IE") {
    country = "IRELAND";
  } else if (nation === "NL") {
    country = "NETHERLANDS";
  } else if (nation === "NZ") {
    country = "NEW ZEALAND";
  } else if (nation === "US") {
    country = "USA";
  }

  return country;
}

// Function "modalHTML" finishes the creation of  the modal page after a "search" or
// "more info" requests.
// It calls to "modalHTMLsubset" combining it with  the cliked Prev or Next button
// to produce the Prev or Next HTML.
// It returns the HTML code for the Prev or Next modal employee
function modalHTML(employeedata, test1) {
  // Finds the email of the employee from which we want to get Prev or Next
  let highlightedemployeeemail = $(".modal-text")
    .first(".modal-text")
    .text();

  // Listdirection indicates Prev or Next
  let listdirection = test1;

  // Finds the index of the employee from which we want to get Prev or Next
  let modalindex = "";
  modalindex = employeedata.findIndex(employee => {
    if (employee.email === highlightedemployeeemail) {
      return true;
    } else {
      return false;
    }
  });

  // Increases(Next)  or decreases(Prev) by one the index to show the new modal
  if ((listdirection === "Prev") & (modalindex !== 0)) {
    modalindex = modalindex - 1;
  } else if ((listdirection === "Prev") & (modalindex === 0)) {
    modalindex = 11;
  } else if ((listdirection === "Next") & (modalindex !== 11)) {
    modalindex += 1;
  } else if ((listdirection === "Next") & (modalindex === 11)) {
    modalindex = 0;
  }
  // Calls for the new modal with the new calculated index
  modalemployeeHTML = modalHTMLsubset(employeedata, modalindex);
  // It returns the HTML code for the Prev or Next modal employee
  return modalemployeeHTML;
}

// The next three functions "choosecard", "prevnext" and "repetitiveprevnext"
// are used to show the employee page with more detailed info

// Function "choosecard" finishes the creation of  the modal page after a
// "more info" requests.
// It calls to "modalHTMLsubset" combining it with the choosen (cliked)
// employee identified thorugh his/her email address
// It calls the function "prevnext" to activates the buttons to choose Prev
// or Next employees
// It returns the HTML code for choosen (clicked) modal employee
function choosecard(employeedata, emailmodal, employeeHTML) {
  $.each(employeedata, function(i, emailaddress) {
    if (employeedata[i].email === emailmodal) {
      newemployeedataHTML = employeeHTML + modalHTMLsubset(employeedata, i);
      $(".gallery").html(newemployeedataHTML);
      $("form").hide();
    }
  });
  prevnext(employeedata, employeeHTML);
}

// The function prevnext activates the buttons to choose Prev or Next employees
// and reads which button has been clicked: Prev or Next.
// This function does not return anything.
// It provides this reading to a new function called "repetitiveprevnext" that
// returns the HTML code of the new modal page of the previous or following employee
function prevnext(employeedata, employeeHTML) {
  $(".btn").click(employeedata, function(evt) {
    evt.stopImmediatePropagation();
    let test1 = $(this).text();
    repetitiveprevnext(employeedata, test1, employeeHTML);
  });
}

// The function "repetitiveprevnext" returns the HTML code of the new modal page
// of the previous or following employee
function repetitiveprevnext(employeedata, test1, employeeHTML) {
  newemployeedataHTML = employeeHTML + modalHTML(employeedata, test1);
  $(".gallery").html(newemployeedataHTML);
  prevnext(employeedata, employeeHTML);
  return newemployeedataHTML;
}

// The next five functions "searchemployeeHTML", "searchemployee", "allcards",
// "validsearch" and "invalidsearch" are used to show the searched employee page

// The function "seachemployeeHTML" creates the HTML code of the form with two
// formats:
// First, to create fields to introduce first name and last name of the searched employee
// plus a button to request the search
// Second, to communicate that the searched employee is not in the group or the spelling
// of the first and/or last name were incorrect.
// The different countries supported have special local characters taht must be introduced
// correctly to mathc the employee names taht contain those characters.
// There is no return of this function
function searchemployeeHTML(title) {
  let content = title;
  $(".search-container").html(
    '<form action="#" method="get">' +
      '<label id="title" for="search-input">' +
      content +
      "</label>" +
      '<div id="first-name">' +
      '<input type="search" id="search-input-first" class="search-input" placeholder="First Name:">' +
      "</div>" +
      '<div id="last-name">' +
      '<input type="search" id="search-input-last" class="search-input" placeholder="Last Name:">' +
      "</div>" +
      '<div id="submit">' +
      '<input type="submit" value="Search" id="search-employee" class="search-submit">' +
      "</div>" +
      '<label id="warning" for="search-input">Type correctly special local characters</label>' +
      "</form>"
  );
}

// The function "searchemployee" compares the first and last names typed in the search
// form with all the first and last names of the group employees and calls to one
// function that it chooses from two alternate functions:
// to the "validsearch" function if they match with any of the employees or
// to the "invalidsearch" function if they do not match with any employee names
// The function returns a "counter" variable that the functions "validsearch" and
// "invalidsearch" need to receive.
function searchemployee(employedata) {
  let searchname =
    $("#search-input-first")
      .val()
      .replace(/\s/g, "")
      .toLowerCase() +
    $("#search-input-last")
      .val()
      .replace(/\s/g, "")
      .toLowerCase();

  // We need to create a counter to distinguish valid and invalid searches
  // Valid searches reduce the scope to 11 employees, while invalid reach
  // the number 12
  let counter = 0;
  $.each(employeedata, function(i, employee) {
    let findname =
      employeedata[i].name.first.replace(/\s/g, "").toLowerCase() +
      employeedata[i].name.last.replace(/\s/g, "").toLowerCase();
    if (findname === searchname) {
      counter = validsearch(i, counter);
    }
    counter = counter + 1;
    if (counter > 11) {
      invalidsearch(counter);
    }
  });
  return counter;
}

// The function "validsearch" makes four tasks:
// (1) creates the HTML for the answer page to the searched first/last name
//     combination when the employee is included in the group of employees
// (2) replaces the Prev and Next buttons with a new button
// (3) activates the new button that allows a new search
// (4) recreates the original page where the search was typed and clicked
// The function returns the updated counter
function validsearch(i, counter) {
  counter = counter - 1;
  newemployeedataHTML =
    allcards(employeedata) + modalHTMLsubset(employeedata, i);

  $(".gallery").html(newemployeedataHTML);
  $(".btn").hide();
  $("form").hide();
  $(".modal-btn-container").html(
    '<button type="button" class="back-search">Back to group</button>'
  );
  $(".back-search").click(employeedata, function(evt) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    allcards(employeedata);
    $(".back-search").remove("button");
    choosecard(employeedata);
    $("form").show();
    $(".search-input").show();
    $("label").text("Find an employee:");
  });
  return counter;
}

// The function "invalidsearch" makes three tasks
// (1) creates the HTML to modify the search form and pass the message
//     that the employee is not included in the group of employees
//     or the spelling was not correct
// (2) reactivates the search button that allows a new search
// (3) recreates the original page where the search was typed and clicked
// The function does not return anything
function invalidsearch(counter) {
  searchemployeeHTML(
    "Employee not in the group/Wrong Spelling. Try new search"
  );
  $("#search-employee").click(employeedata, function(evt) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    allcards(employeedata);
    choosecard(employeedata);
    searchemployee(employeedata);
  });
}

// Creates and returns the HTML for "all the employee cards" page that is requested
// at various points by the code
function allcards(employeedata) {
  $.each(employeedata, function(i, employee) {
    nationality = employeedata[i].nat;
    let flagimage = findflag(nationality);
    employeeHTML +=
      '<div class="card">' +
      "<div>" +
      flagimage +
      "</div>" +
      '<div class="card-img-container">' +
      '<img class="card-img" src="' +
      employeedata[i].picture.large +
      '"' +
      'alt="profile picture">' +
      "</div>" +
      '<div class="card-info-container">' +
      '<h3 id="name" class="card-name cap">' +
      employeedata[i].name.first +
      " " +
      employeedata[i].name.last +
      "</h3>" +
      '<p class="card-text">' +
      employeedata[i].email +
      "</p>" +
      '<p class="card-text cap">' +
      employeedata[i].location.city +
      ", " +
      employeedata[i].location.state +
      "</p>" +
      "</div>" +
      "</div>";
  });
  $(".gallery").html(employeeHTML);
  return employeeHTML;
}
