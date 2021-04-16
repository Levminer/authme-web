<template>
	<div>
		<ion-segment @ionChange="segmentChanged($event)" value="import" id="select">
			<ion-segment-button value="import">
				<ion-label>Import</ion-label>
			</ion-segment-button>
			<ion-segment-button value="export">
				<ion-label>Export</ion-label>
			</ion-segment-button>
		</ion-segment>

		<div id="container">
			<ion-card id="import">
				<ion-card-header>
					<ion-card-title>
						<h1>Import</h1>
					</ion-card-title>
				</ion-card-header>
				<ion-card-content>
					<input type="file" accept="image/jpeg, image/png" name="image" id="file" @change="loadFile($event)" multiple />
				</ion-card-content>
			</ion-card>

			<ion-card id="export">
				<ion-card-header>
					<ion-card-title>
						<h1>Export</h1>
					</ion-card-title>
				</ion-card-header>
				<ion-card-content> </ion-card-content>
			</ion-card>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
export default {
	methods: {
		segmentChanged(ev) {
			let event = ev.detail.value

			let import_div = document.querySelector("#import")
			let export_div = document.querySelector("#export")

			if (event === "import") {
				import_div.style.display = "block"
				export_div.style.display = "none"
			} else {
				import_div.style.display = "none"
				export_div.style.display = "block"
			}
		},

		loadFile(event) {
			const FileSaver = require("file-saver")
			const QrcodeDecoder = require("../../node_modules/qrcode-decoder/dist/index.js")
			/* const QrcodeDecoder = require("qrcode-decoder") */

			console.log(QrcodeDecoder)

			const arr = event.target.files

			const names = []
			const secrets = []
			const issuers = []

			for (let i = 0; i < arr.length; i++) {
				let element = arr[i]

				let image = URL.createObjectURL(element)

				const process_images = async () => {
					let qr = new QrcodeDecoder()

					// decode image
					qr.decodeFromImage(image).then((res) => {
						if (res === false) {
							// no qr code
							alert(`No QR code found on the picture: ${element.name}. \nTry to take a better picture and try again!`)
						} else {
							// construct

							let url = res.data.replaceAll(/\s/g, "")
							url = url.slice(15)
							// otpauth://totp/Authme:authme@levminer.com?secret=1234&issuer=Authme
							console.log(url)

							// get name
							let name_index = url.match(/[?]/)
							let name = url.slice(0, name_index.index)
							url = url.slice(name.length + 1)

							// get secret
							let secret_index = url.match(/[&]/)
							let secret = url.slice(7, secret_index.index)
							url = url.slice(secret.length + 14 + 1)

							// get issuer
							let issuer = url

							names.push(name)
							secrets.push(secret)
							issuers.push(issuer)

							if (arr.length === i + 1) {
								console.error("HALO")

								console.log(names)
								console.log(secrets)
								console.log(issuers)

								let str = ""

								for (let j = 0; j < names.length; j++) {
									let substr = `\nName: ${names[j]} \nSecret: ${secrets[j]} \nIssuer: ${issuers[j]} \nType:   OTP_TOTP\n`

									str += substr
								}

								const blob = new Blob([str], { type: "text/plain;charset=utf-8" })

								FileSaver.saveAs(blob, "authme_web_import.txt")
							}
						}
					})
				}

				process_images()
			}
		},
	},
}
</script>

<style scoped>
#export {
	display: none;
}

#select {
	background: #1e1e1e;
	position: relative;
	top: 10px;
	border-radius: 25px;
	width: 50%;
	margin: 0 auto;
}
</style>
