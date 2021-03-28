import $ from 'jquery'
import html2canvas from 'html2canvas'
import printJs from 'print-js'

export async function downloadPng(that) {
	await that.$Message.loading("正在下载")
	await exportPNG(that)
	return "success"
}

function exportPNG(that) {
	let type = "image/png"
	let scale = 2
	let name = that.fileName

	if (that.type == "JPG") { type = "image/jpeg" }
	if (that.quality == "超清") { scale = 3 }
	if (that.fileName == "") { name = "默认表单" }

	let shareContent = document.querySelector(".constrainGridBox")
	let width = shareContent.offsetWidth
	let height = shareContent.offsetHeight
	let canvas = document.createElement("canvas")
	canvas.width = width * scale
	canvas.height = height * scale
	//画布大小超出一定范围会下载失败
	canvas.getContext("2d").scale(scale, scale)
	let opts = {
		scale: 1,
		canvas: canvas,
		width: width,
		height: height,
		useCORS: true
	}
	html2canvas(shareContent, opts).then(function (canvas) {
		let context = canvas.getContext('2d')
		context.mozImageSmoothingEnabled = false
		context.webkitImageSmoothingEnabled = false
		context.msImageSmoothingEnabled = false
		context.imageSmoothingEnabled = false

		let save_url = canvas.toDataURL(type, 1.0)
		let a = document.createElement('a')
		document.body.appendChild(a)
		a.href = save_url

		new Promise((resolve) => {
			a.download = name
			a.click()
			resolve("success")

		}).then(() => {
			that.$Message.success("下载成功")
		})
	})
}

//浏览器直接打印
export function printPNG() {
	$(".paperScale").css({ "transform": "scale(1,1)" })

	let cntElem = document.getElementById("exportCanvas")
	let shareContent = cntElem
	let width = shareContent.offsetWidth
	let height = shareContent.offsetHeight
	let canvas = document.createElement("canvas")
	let scale = 3
	canvas.width = width * scale
	canvas.height = height * scale
	canvas.getContext("2d").scale(scale, scale)
	let opts = {
		scale: scale,
		canvas: canvas,
		width: width,
		height: height,
		useCORS: true
	}

	html2canvas(shareContent, opts).then(function (canvas) {
		let context = canvas.getContext('2d')
		context.mozImageSmoothingEnabled = false
		context.webkitImageSmoothingEnabled = false
		context.msImageSmoothingEnabled = false
		context.imageSmoothingEnabled = false


		printJs({
			printable: canvas.toDataURL("image/png", 1.0),
			type: 'image',
			header: null
		})
	})
}

// 去掉浏览器自带页眉页脚
