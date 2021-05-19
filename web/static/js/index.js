$(function () {
    getGameparams("Predator prey");
})
let timer_list=[]
function getGameparams(str) {
    console.log(str);
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
        let button1 = $('<button class="btn btn-dark" onclick="stopAll();">stop all task</button>')
        $(".params").append(button1);
    });
}
function stopAll() {
    timer_list.forEach(e => {
        clearInterval(e);
    });
    $.post("/killall", (info) => {
        console.log(info);
    });
}
function submitParams() {
    let name = $("li a.active").text();
    console.log(`name${name}`);
    let params = {};
    $(".params .form-control").each(function () {
        params[this.name] = this.value;
    });
    switch (name) {
        case "Predator prey":
            // 给文件名前面补上完整服务器路径

            let prefix_path = `web/`;
            let model_R_web_path;
            let video_R_web_path;
            let model_folder = `models/${params["--save"]}/`;
            let gif_folder = `static/source/images/`;
            if (params["--video_name"] != "") {
                video_R_web_path = `${gif_folder + params["--video_name"]}`;
                params["--video_name"] = prefix_path + video_R_web_path;

            }
            if (params["--save"] != "") {
                model_R_web_path = `${model_folder + params["--save"]}`;
                params["--save"] = prefix_path + model_R_web_path;
            }

            console.log(params, name);
            // 设置gif更新
            let t0=setInterval(() => {
                $('.display img').attr('src', `${video_R_web_path}.gif?${Math.random()}`);
            }, 15000)
            timer_list.push(t0);
            break;
        case "Traffic junction":
            let socket=io();
            socket.on("connect",()=>{
                console.log('connected');
            })
            let t1=setInterval(() => {
                socket.emit("render",(data)=>{
                    console.log(`receive:${data}`)
                    render_frame(data);
                })
                // $.post("render", (data) => {
                //     render_frame(data);

                // })
            }, 500);
            timer_list.push(t1);


            break;
        default:
            break;
    }

    let test = $.post("/submit", {
        data: JSON.stringify({
            "name": name,
            "params": params
        })
    }, (info) => {
        console.log(info);
    });

    console.log(test);
}