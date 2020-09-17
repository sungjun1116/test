var { count, Q, max } = require("./var");

// 문제들을 랜덤하게 뿌려줌
exports.shuffle = () => {
  let currentIndex = Q.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = Q[currentIndex];
    Q[currentIndex] = Q[randomIndex];
    Q[randomIndex] = temporaryValue;
  }

  return Q;
};

exports.loadQuestionLinks = () => {
  var str = "";
  for (i = 1; i <= max; i++) {
    str += `<a class="btn-floating waves-effect waves-light btn q-jump green accent-4" data-id="${i}">${i}</a>`;
  }
  $(".q-jump-container").html(str);
};

// 화면 좌측에 문제 순서에 따라 색을 표시해줌
exports.loadQuestion = (count) => {
  localforage.getItem(Q[count], function (err, value) {
    $(".q-jump").removeClass("green");
    $(".q-jump[data-id=" + (count + 1) + "]").addClass("green");
    $(".question-content").html(value.q);
    let say = "";
    say += value.q;
    var qContainer = $("#q-options");
    var options = value.o;
    let optionStr = "";
    for (i = 0; i < options.length; i++) {
      let str = "";
      say += String.fromCharCode(65 + i) + "." + options[i] + " .";
      if (value.selected == i + 1) {
        str = "checked";
      }
      optionStr += `
      <li class="collection-item">
        <input type="radio" class="option" name="options" value="${i + 1
        }" id="option${i + 1}" ${str}  />
        <label for="option${i + 1}" >${options[i]}</label>
      </li>
    `;
    }
    qContainer.html(optionStr);
  });
};

// 다음 문제로 넘어가는 것과 관련
exports.nextQuestion = () => {
  count = (count + 1) % max;
  this.loadQuestion(count);
};
