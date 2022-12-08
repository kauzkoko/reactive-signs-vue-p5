let scaler = 60
let w = 9 * scaler
let h = 16 * scaler
let tickAngle = 6
let tickTotal = 0
let tickSpeed = 25 //25 equals 1 tick per second when used 25fps
let t, i, k, a
let mouseOverCanvas = false

function setup() {
	frameRate(25)
	background(255)
	let cnv = createCanvas((windowHeight / 16) * 9 * 2, windowHeight)
	cnv.parent("canvas1")
	cnv.mouseOver(() => {
		console.log("mouseover")
		mouseOverCanvas = true
	})
	cnv.mouseOut(() => {
		console.log("mouseout")
		mouseOverCanvas = false
	})
	background(255)
	stroke(0)
	strokeWeight(0)
	fill(0)
	angleMode(DEGREES)
	rectMode(CENTER)
	t = new T([1, 2, 4, 1], [2, 3, 5, 2, 4, 2, 5])
	t2 = new T([2, 5, 3], [2, 1, 5, 7])
	i = new I([2, 3, 5, 2, 4, 2, 5], [2, 1, 5, 7], [2, 1, 5, 7])
	k = new K([2, 1, 5, 7])
	a = new A([2, 1, 5, 7])
}

function draw() {
	background(daytimeColor)
	text(floor(getFrameRate()), 20, 20)

	push()
	t.draw()
	i.draw()
	k.draw()
	translate(0, height / 2)
	t2.draw()
	a.draw()
	k.draw()
	pop()

	push()
	translate(width / 2, 0)
	t2.draw()
	a.draw()
	k.draw()
	translate(0, height / 2)
	t.draw()
	i.draw()
	k.draw()
	pop()

	if (!mouseOverCanvas || mouseX < 1 || mouseX > width - 1) tickSpeed = 25
	else if (mouseX > width / 2 - 30 && mouseX < width / 2 + 30) tickSpeed = 0
	else if (mouseX > width / 2) tickSpeed = floor(map(mouseX, width / 2 + 30, width, 50, 1))
	else tickSpeed = floor(map(mouseX, 0, width / 2 - 30, 1, 50))

	if (frameCount % tickSpeed == 0) {
		tickTotal += tickAngle
	}
	//noLoop()
}

let daytimeColor = 200
setInterval(() => {
	let hour = new Date().getHours()
	if (hour < 18) daytimeColor = map(hour, 0, 14, 200, 255)
	if (hour > 14) daytimeColor = map(hour, 14, 23, 255, 200)
}, 1000)
