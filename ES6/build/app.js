"use strict";

var movies = void 0;
var arr = [];
var item = 0;

// Importing the data from JSON
fetch("../src/JSON/movieDetails.json").then(function (response) {
  return response.json();
}).then(function (res) {
  movies = res;
  movieList.createTable(res);
});

// Formatting the data for table creation
var movieList = {
  createTable: function createTable(res) {
    document.getElementById("listing").innerHTML = "";
    var outputTemplate = "";
    res.map(function (product) {
      outputTemplate += movieList.templateDOM(product);
    });
    document.getElementById("listing").innerHTML = outputTemplate;
  },

  //Populating the table data
  templateDOM: function templateDOM(data) {
    return "\n                <tr>\n                <td>\n                  " + data.MovieName + " \n                </td>\n                <td>\n                  " + data.Language + " \n                </td>\n                <td>\n                  " + data.Rating + " \n                </td>\n                </tr>";
  },

  //Applying filter on checkbox check
  applyFilter: function applyFilter(res) {
    var checkboxes = document.getElementsByName("movierating");
    var checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value);
      }
    }

    arr = [];

    //Populating array with checkbox active values
    movies.filter(function (item) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = checkboxesChecked[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var x = _step.value;

          if (item.Rating === x) {
            arr.push(item);
          }
        }

        //Condition to check if any of the checkbox is active
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (arr.length == "0") {
        movieList.createTable(movies);
      } else {
        movieList.createTable(arr);
      }
    });
  }
};