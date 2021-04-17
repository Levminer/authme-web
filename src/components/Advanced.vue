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
					<h3>You can import from stand alone QR codes here.</h3>

					<ion-button @click="upload()" class="upload" color="dark" shape="round">Upload QR code(s)</ion-button>
					<input type="file" accept="image/jpeg, image/png" name="image" id="upload" @change="loadFile($event)" multiple />
					<br />
					<br />
					<h3>If you failed the process restart here.</h3>

					<ion-button @click="reload()" class="restart" color="dark" shape="round">Restart</ion-button>
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
import { alertController } from "@ionic/vue"
export default {
	methods: {
		upload() {
			document.getElementById("upload").click()
		},

		reload() {
			location.reload()
		},

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

			const button = document.querySelector(".upload")

			for (let i = 0; i < arr.length; i++) {
				let element = arr[i]

				let image = URL.createObjectURL(element)

				const process_images = async () => {
					let qr = new QrcodeDecoder()

					// decode image
					qr.decodeFromImage(image).then((res) => {
						if (res === false) {
							// no qr code
							this.failedAlert(element.name)

							button.textContent = "Processing failed"
						} else {
							button.textContent = "Processing completed"

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
								console.log(names)
								console.log(secrets)
								console.log(issuers)

								this.downloadAlert()

								setTimeout(() => {
									let str = ""

									for (let j = 0; j < names.length; j++) {
										let substr = `\nName: ${names[j]} \nSecret: ${secrets[j]} \nIssuer: ${issuers[j]} \nType:   OTP_TOTP\n`

										str += substr
									}

									const blob = new Blob([str], { type: "text/plain;charset=utf-8" })

									FileSaver.saveAs(blob, "authme_web_import.txt")
								}, 500)
							}
						}
					})
				}

				process_images()
			}
		},
		async downloadAlert() {
			const alert = await alertController.create({
				header: "Authme Web",
				message: `QR code(s) processed sucesfully! <br><br> A download window will open shortly! <br><br>You can import your codes now on the codes tab!`,
				backdropDismiss: false,
				buttons: [
					{
						text: "Close",
						role: "cancel",
						handler: () => {
							console.log("Alert closed")
						},
					},
				],
			})
			return alert.present()
		},
		async failedAlert(name) {
			const alert = await alertController.create({
				header: "Authme Web",
				message: `No QR code found on the picture: ${name} <br><br> Try to take a better picture and try again! <br><br> You can restart with the restart button!`,
				backdropDismiss: false,
				buttons: [
					{
						text: "Close",
						role: "cancel",
						handler: () => {
							console.log("Alert closed")
						},
					},
				],
			})
			return alert.present()
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

input[type="file"] {
	display: none;
}

.upload {
	width: 300px !important;
}

.restart {
	width: 150px !important;
}

@media only screen and (max-width: 600px) {
	#select {
		width: 75%;
	}

	.upload {
		width: 200px !important;
	}

	.restart {
		width: 100px !important;
	}
}
</style>
