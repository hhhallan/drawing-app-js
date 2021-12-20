const colors = [...document.querySelectorAll('.color')];
colors.forEach(color => {
    color.style.backgroundColor = color.dataset.color;
})

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 60;

let context = canvas.getContext('2d');

let draw_color = "black";
let draw_width = "6";
let is_drawing = false;

canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('touchemove', draw, false);
canvas.addEventListener('mousemove', draw, false);

canvas.addEventListener('touchend', stop, false);
canvas.addEventListener('mouseup', stop, false);
canvas.addEventListener('mouseout', stop, false);

function start(e) {
    e.preventDefault();

    const mouse_pos = get_mouse_pos(e);

    is_drawing = true;
    context.beginPath();
    context.moveTo(
        mouse_pos.x,
        mouse_pos.y,
    );
}

function stop(e) {
    e.preventDefault();

    if ( is_drawing ) {
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
}

function draw(e) {
    e.preventDefault();

    if ( is_drawing ) {
        const mouse_pos = get_mouse_pos(e);

        context.lineTo(
            mouse_pos.x,
            mouse_pos.y,
        );
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
}

function get_mouse_pos(e) {
    const rect = canvas.getBoundingClientRect();

    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

function change_color(el) {
    draw_color = el.dataset.color;
}

reset.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
})
