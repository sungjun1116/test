const { ipcRenderer } = require("electron");

localforage.removeItem("user", function (err) {
  console.log("clear");
});

$(".start").on("click", (e) => {
  e.preventDefault();
  obj = {
    name: name,
    number: number,
  };
  if (number && name) {
    localforage.setItem("user", obj, (err, value) => {});
  }
  if (obj.name && obj.number) {
    ipcRenderer.send("test");
  }
});
var name;
var number;
var obj;
$("#name").change(() => {
  name = $("#name").val();
});
$("#number").change(() => {
  number = $("#number").val();
});
