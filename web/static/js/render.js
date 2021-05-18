
const dead_loc = [0, 0];
function render_frame(data) {
    let car_loc = data["car_loc"];
    if (car_list.length <= 5) {
        for (let i = 0; i < car_loc.length; i++) {
            if (car_list[i] == undefined) {
                console.log(car_list);
                car_list[i] = new Car(car_loc[i]);
                drawmap(data["routes"]);
            }
            else {
                car_list[i].action(car_loc[i]);
            }
        }

    }
}
const grid_width = 50;
const grid_height = 50;
function drawmap(routes) {
    let container = $("#render-board");
    container.width(routes[0].length * 50);
    container.height(routes[1].length * 50);

    for (let road = 0; road < routes.length; road++) {
        for (let loc = 0; loc < routes[road].length; loc++) {
            let x = routes[road][loc][0];
            let y = routes[road][loc][1]
            let cur_grid = $('<div></div>')
            cur_grid.attr("class", "grid road");
            cur_grid.css("transform", translate(x * grid_width, y * grid_height));
            container.append(cur_grid);
        }
    }
}

let car_list = []
class Car {
    constructor(car_loc) {
        this.loc = car_loc;
        this.element = $('<div class="car"></div>');
        $("#render-board").append(this.element);
    }
    moveTo(car_loc) {
        let x = car_loc[0];
        let y = car_loc[1];
        let point=[x-this.loc[0],y-this.loc[1]];
        let angel =getAngle(point);
        console.log(`move to ${x},${y}`);
        this.element.css("background-image", "url(static/source/data/run.png)");
        this.element.css("transform", `${translate(x * grid_width, y * grid_height)} rotate(${angel*180/Math.PI+180}deg)`);
        this.loc = car_loc;
    }
    action(car_loc) {
        if (car_loc.toString() == this.loc.toString()) {
            this.break();
        }
        else {
            this.moveTo(car_loc);
        }
    }
    break() {
        this.element.css("background-image", "url(static/source/data/stop.png)");
    }
    remove() {
        this.element.remove();
    }
}
function translate(a, b) {
    return 'translate3d(' + a + 'px, ' + b + 'px, ' + '0' + 'px)';
}
function getAngle(point){
    return Math.atan(point[1]/point[0])
}