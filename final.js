let letters = []
let animatedLetters = []
let bgh
let circ
let gschmeus = []
let animatedGschmeus = []
let shower

function setup() {
	noCanvas() //@paulina & luke: poster switching logics should be changed accordingly. our sketch basically takes places in a svg with id "svg" with aspect ratio of 18:16 instead of default canvas
	setupOSC(false) // impartant! Don't modify this line.
	frameRate(60)
	angleMode(DEGREES)
	frameRate(60)
	letters.push(SVG.find("#t1")[0])
	letters.push(SVG.find("#i")[0])
	letters.push(SVG.find("#k1")[0])
	letters.push(SVG.find("#t2")[0])
	letters.push(SVG.find("#a")[0])
	letters.push(SVG.find("#k2")[0])
	gschmeus.push(SVG.find("#links-gschmeus")[0])
	gschmeus.push(SVG.find("#rechts-gschmeus")[0])
	bgh = SVG.find("#bgh")[0]
	circ = SVG.find("#circ")[0]

	letters.forEach((item, index) => {
		animatedLetters[index] = []
		item.each(function (i, children) {
			let animated = this.animate(new SVG.Spring(400, 15))
			animatedLetters[index].push(animated)
		})
	})

	gschmeus.forEach((item, index) => {
		animatedGschmeus[index] = []
		item.each(function (i, children) {
			let animated = this.animate(new SVG.Spring(400, 15))
			animatedGschmeus[index].push(animated)
		})
	})

	setInterval(() => {
		// realTime()
		realTimeGschmeus()
	}, 1000)
	setInterval(dayNight, 1000 * 60)

	// realTime()
	realTimeGschmeus()
	dayNight()

	shower = document.querySelector("#shower")
}
let enableRealTime = true
let speed = 0.8

let circCounter = 0
let circAngle = 0

let trackedX = 500
let inside = true
function draw() {
	trackedX = map(posNormal.x, 0, 1.26, 0, windowWidth)
	// console.log(windowWidth)
	trackedX = mouseX
	console.log(trackedX)

	circ.transform({ rotate: map(circAngle, 0, 114 / speed, -100, 100), origin: [1080, -300] })
	circAngle += sin(frameCount * speed)
	//circ.hide()

	shower.innerHTML = windowWidth

	if (trackedX < 50 || trackedX < windowWidth - 10) inside = true
	else inside = false
	console.log("inside", inside)

	if (inside) {
		console.log("in inside")
		enableRealTime = false
		letters.forEach((item, index) => {
			item.each(function (i, children) {
				let x = this.attr("x") ?? 0
				let y = this.attr("y") ?? 0

				let mappedXhour = trackedX < windowWidth / 2 ? map(trackedX, 0, windowWidth / 2, hAngle, 360) : map(trackedX, windowWidth / 2, windowWidth, 0, hAngle)
				let mappedXmin = trackedX < windowWidth / 2 ? map(trackedX, 0, windowWidth / 2, mAngle, 720) : map(trackedX, windowWidth / 2, windowWidth, 0, 720)
				let mappedXsec = trackedX < windowWidth / 2 ? map(trackedX, 0, windowWidth / 2, sAngle, 1440) : map(trackedX, windowWidth / 2, windowWidth, 0, 1440)

				if (this.attr("width") == 10 || this.attr("height") == 10) {
					animatedLetters[index][i].transform({ rotate: floor(mappedXsec), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
				} else if (this.attr("width") == 80 || this.attr("height") == 80) {
					animatedLetters[index][i].transform({ rotate: floor(mappedXmin), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
				} else if (this.attr("width") == 160 || this.attr("height") == 160) {
					this.transform({ rotate: floor(mappedXhour), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
				}
			})
		})
	} else {
		enableRealTime = true
	}

	console.log(enableRealTime)

	posterTasks() // do not remove this last line!
}

let d, h, m, s, hAngle, mAngle, sAngle
const realTimeGschmeus = () => {
	d = new Date()
	h = d.getHours() > 12 ? d.getHours() - 12 : d.getHours()
	m = d.getMinutes()
	s = d.getSeconds()
	h += m / 60
	hAngle = h * 30
	mAngle = (m / 60) * 360 + 90
	sAngle = (s / 60) * 360 + 90

	gschmeus.forEach((item, index) => {
		item.each(function (i, children) {
			let x = this.attr("x") ?? 0
			let y = this.attr("y") ?? 0
			if (this.attr("width") == 10 || this.attr("height") == 10) {
				animatedGschmeus[index][i].transform({ rotate: floor(sAngle), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
			} else if (this.attr("width") == 80 || this.attr("height") == 80) {
				animatedGschmeus[index][i].transform({ rotate: floor(mAngle), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
			} else if (this.attr("width") == 160 || this.attr("height") == 160) {
				this.transform({ rotate: floor(hAngle), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
			}
		})
	})

	if (enableRealTime) {
		letters.forEach((item, index) => {
			item.each(function (i, children) {
				let x = this.attr("x") ?? 0
				let y = this.attr("y") ?? 0
				if (this.attr("width") == 10 || this.attr("height") == 10) {
					animatedLetters[index][i].transform({ rotate: floor(sAngle), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
				} else if (this.attr("width") == 80 || this.attr("height") == 80) {
					animatedLetters[index][i].transform({ rotate: floor(mAngle), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
				} else if (this.attr("width") == 160 || this.attr("height") == 160) {
					this.transform({ rotate: floor(hAngle), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
				}
			})
		})
	}
}

const realTime = () => {}

const dayNight = () => {
	if (h < 12) bgh.attr({ cy: 10000 + floor(map(h, 0, 12, 0, 1920)) })
	else bgh.attr({ cy: 10000 + floor(map(h, 12, 24, 1920, 0)) })
}
