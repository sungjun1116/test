var google = require("googleapis");
var googleAuth = require("google-auth-library");
const template = require("./js/template");
var { count, Q } = require("./js/var");

var dummyQuestions = [];

// google spreadsheet를 연동 시킴
function main() {
  var sheets = google.sheets("v4");
  sheets.spreadsheets.values.get(
    {
      key: "AIzaSyB-_ak6FxsC0-Hb2XI4gUKcEG4dPJeHkYs",
      spreadsheetId: "1GaQ91Rk8kw46UCw-c8k8VDVmByDO3nbLDlcDRTXVGGw",
      range: "A:F",
    },
    function (err, response) {
      if (err) {
        console.log("The API returned an error: " + err);
        return;
      }
      var rows = response.values;
      if (rows.length == 0) {
        console.log("No data found.");
      } else {
        // A열은 문제, B열 ~ E열은 보기, F열은 정답번호
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          let obj = {};
          obj["id"] = i;
          obj["q"] = row[0];
          obj["o"] = row.slice(1, 5);
          obj["selected"] = -1;
          obj["shouldbe"] = row[5];
          dummyQuestions.push(obj);
          console.log(obj);
        }
      }

      for (i = 0; i < dummyQuestions.length; i++) {
        localforage.setItem("q" + (i + 1), dummyQuestions[i], function (
          err,
          value
        ) {
          if (err) {
            console.log(err);
          }
        });
      }

      template.shuffle();
      template.loadQuestionLinks();

      // user value를 가져옴
      localforage.getItem("user", function (err, value) {
        user = value;
        template.loadQuestion(count);
      });

      $(".nxt").click(() => {
        template.nextQuestion();
      });

      // 문제의 보기중 하나를 체크시 표시됨
      $(".answers").on("click", ".option", () => {
        localforage.getItem(Q[count], (err, value) => {
          value.selected = $(".option:checked").val();
          localforage.setItem(Q[count++], value, (err, value) => {
            if (err) {
              console.log(err);
            }
          });
        });
      });

      $(".submit-btn").click(() => {
        window.location = "results.html";
      });
    }
  );
}
main();

// 문제별 time관련 함수
document.addEventListener("DOMContentLoaded", () => {
  const timeLeftDisplay = document.querySelector("#time-left");
  let timeLeft = 10;
  let cnt = 1;

  function countDown() {
    setInterval(function () {
      if (timeLeft <= 0) {
        clearInterval((timeLeft = 0));
        if (cnt === 15) {
          window.location = "results.html";
        }
        template.nextQuestion();
        timeLeft = 10;
        cnt++;
      }
      timeLeftDisplay.innerHTML = timeLeft;
      timeLeft -= 1;
    }, 1000);
  }
  countDown();
});
