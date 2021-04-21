function getGameparams(str) {
  $(".params").empty();
  $.post('/getparams', {
    gameName: str
  }, function (game) {
    for (let param in game.params) {
      if (game.params[param] instanceof Array) {
        let select = $(`<select class="form-control" id="${param}" name=${param}>`);
        for (let option of game.params[param]) {
          select.append(`<option>${option}</option>`);
        }
        let paramItem = $("<div class='float-left ml-1 mr-1'></div>")
        paramItem.append(`<label>${param}</label>`); +
        paramItem.append(select);
        $(".params").append(paramItem);
      } else {
        let input = $(`<input class='form-control' name='${param}' id='${param}' type=${game.params[param]["type"]} value=${game.params[param]["default"]} >`)
        let paramItem = $("<div class='float-left ml-1 mr-1'></div>")
        paramItem.append(`<label>${param}</label>`); +
        paramItem.append(input);
        $(".params").append(paramItem);
      }
    }

    let button = $('<button class="btn btn-dark" onclick="submitParams();">commit</button>');
    $(".params").append(button).addClass("Box");
  });
}

function submitParams() {
  let name = $(".params-setting .game-select select").val();
  let params = {};
  $(".params .form-control").each(function () {
    params[this.name] = this.value;
  });

  console.log(params, name);
  let test = $.post("/submit", {
    data: JSON.stringify({
      "name": name,
      "params": params
    })
  });
  let videoName = params["--video_name"];
  $('.display img').attr('src', `static/source/images/${videoName}.gif`);
  setInterval(()=>{
    $('.display img').attr('src', `static/source/images/${videoName}.gif?${Math.random()}`);
  },9000)
  console.log(test);
}