let movies;
let arr = [];
let item = 0;

// Importing the data from JSON
fetch("../src/JSON/movieDetails.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(res) {
    movies = res;
    movieList.createTable(res);
  });

// Formatting the data for table creation
let movieList = {
  createTable: res => {
    document.getElementById("listing").innerHTML = "";
    let outputTemplate = "";
    res.map(product => {
      outputTemplate += movieList.templateDOM(product);
    });
    document.getElementById("listing").innerHTML = outputTemplate;
  },


//Populating the table data
  templateDOM: data => {
    return `
                <tr>
                <td>
                  ${data.MovieName} 
                </td>
                <td>
                  ${data.Language} 
                </td>
                <td>
                  ${data.Rating} 
                </td>
                </tr>`;
  },

//Applying filter on checkbox check
  applyFilter: res => {
    let checkboxes = document.getElementsByName("movierating");
    let checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value);
      }
    }

    arr = [];

//Populating array with checkbox active values
    movies.filter(item => {
      for (const x of checkboxesChecked) {
          if (item.Rating === x) {
                arr.push(item);
              }
      }

//Condition to check if any of the checkbox is active
      if (arr.length == "0") {
        movieList.createTable(movies);
      } else {
        movieList.createTable(arr);
      }
    });
  }
};
