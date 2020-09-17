let notattempted = -1;
let correct = -1;
let wrong = -1;

// 결과를 계산해줌
localforage
  .iterate(function (value, key, iterationNumber) {
    if (value.selected == -1) {
      notattempted += 1;
    }
    if (value.selected == value.shouldbe) {
      correct += 1;
    } else {
      wrong += 1;
    }
  })
  .then(function () {
    $(".correct").html(correct);
    $(".wrong").html(wrong);
    $(".attempted").html(notattempted);
  });
$(".close").click(function () {
  window.close();
});
