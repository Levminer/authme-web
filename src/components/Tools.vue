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
			<div class="container">
				<ion-card id="import" class="tab">
					<ion-card-header>
						<ion-card-title>
							<h2>Import</h2>
						</ion-card-title>
					</ion-card-header>
					<ion-card-content>
						<h3>You can import from 2FA QR codes here.</h3>

						<button @click="upload()" class="buttoni xl">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<line x1="15" y1="8" x2="15.01" y2="8"></line>
								<rect x="4" y="4" width="16" height="16" rx="3"></rect>
								<path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5"></path>
								<path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2"></path>
							</svg>
							Choose images
						</button>
						<input type="file" accept=".jpg, .jpeg, .png, .bmp" name="image" id="upload" @change="loadFile($event)" multiple />
					</ion-card-content>
				</ion-card>

				<ion-card id="export" class="tab">
					<ion-card-header>
						<ion-card-title>
							<h2>Export</h2>
						</ion-card-title>
					</ion-card-header>
					<ion-card-content>
						<h3>You can export your 2FA codes if you saved them.</h3>

						<button @click="download()" class="buttoni xl">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							Confirm
						</button>
					</ion-card-content>
				</ion-card>
			</div>
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

			if (window.navigator.vibrate) {
				window.navigator.vibrate(25)
			}

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
			const QrcodeDecoder = require("qrcode-decoder").default

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
						} else if (res.data.startsWith("otpauth://totp/")) {
							// construct
							let url = res.data.replaceAll(/\s/g, "")
							url = url.slice(15)

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
								this.downloadAlert()

								setTimeout(() => {
									let str = ""

									for (let j = 0; j < names.length; j++) {
										const substr = `\nName:   ${names[j].trim()} \nSecret: ${secrets[j].trim()} \nIssuer: ${issuers[j].trim()} \nType:   OTP_TOTP\n`

										str += substr
									}

									const codes = {
										role: "export",
										encrypted: false,
										codes: Buffer.from(str).toString("base64"),
										date: new Date()
											.toISOString()
											.replace("T", "-")
											.replaceAll(":", "-")
											.substring(0, 19),
										version: 3,
									}

									const blob = new Blob([JSON.stringify(codes, null, "\t")], { type: "text/plain;charset=utf-8" })

									FileSaver.saveAs(blob, "import.authme")
								}, 500)
							}
						} else {
							// no qr code
							this.wrongAlert(element.name)
						}
					})
				}

				process_images()
			}
		},
		async download() {
			let names = JSON.parse(localStorage.getItem("name"))
			let password = localStorage.getItem("password")

			if (names === null) {
				const alert = await alertController.create({
					header: "Authme Web",
					message: `Not found saved codes!  <br><br> You can save your codes on the codes tab!`,
					backdropDismiss: false,
					buttons: [
						{
							text: "Close",
							role: "cancel",
							handler: () => {
								console.warn("Alert closed")
							},
						},
					],
				})
				alert.present()

				return console.warn(`Authme Web - No saved codes found `)
			}

			if (password === null) {
				this.exportNoPass()
			} else {
				this.exportPass()
			}
		},

		async exportNoPass() {
			const alert = await alertController.create({
				header: "Authme Web",
				message: `QR code(s) exported successfully! <br><br> A download window will open after you closed this! <br><br>You can import the exported codes in Authme and Authme Web!`,
				backdropDismiss: false,
				buttons: [
					{
						text: "Close",
						role: "cancel",
						handler: () => {
							const FileSaver = require("file-saver")

							let names = JSON.parse(localStorage.getItem("name"))
							let secrets = JSON.parse(localStorage.getItem("secret"))
							let issuers = JSON.parse(localStorage.getItem("issuer"))

							let str = ""

							for (let i = 0; i < names.length; i++) {
								let substr = `\nName:   ${names[i].trim()} \nSecret: ${secrets[i].trim()} \nIssuer: ${issuers[i].trim()} \nType:   OTP_TOTP\n`

								str += substr
							}

							const codes = {
								role: "export",
								encrypted: false,
								codes: Buffer.from(str).toString("base64"),
								date: new Date()
									.toISOString()
									.replace("T", "-")
									.replaceAll(":", "-")
									.substring(0, 19),
								version: 3,
							}

							const blob = new Blob([JSON.stringify(codes, null, "\t")], { type: "text/plain;charset=utf-8" })

							FileSaver.saveAs(blob, "export.authme")
						},
					},
				],
			})
			return alert.present()
		},

		async exportPass() {
			const alert = await alertController.create({
				header: "Authme Web",
				message: `Please type in your password!`,
				backdropDismiss: false,
				inputs: [
					{
						placeholder: "Password",
						type: "password",
					},
				],
				buttons: [
					{
						text: "Confirm",
						handler: async (alertData) => {
							const FileSaver = require("file-saver")
							const SimpleCrypto = require("simple-crypto-js").default

							let names = JSON.parse(localStorage.getItem("name"))
							let secrets = JSON.parse(localStorage.getItem("secret"))
							let issuers = JSON.parse(localStorage.getItem("issuer"))

							const simpleCrypto = new SimpleCrypto(alertData[0])

							try {
								names = simpleCrypto.decrypt(names)
								secrets = simpleCrypto.decrypt(secrets)
								issuers = simpleCrypto.decrypt(issuers)
							} catch (error) {
								const alert0 = await alertController.create({
									header: "Authme Web",
									message: `Wrong password!  <br><br> Please try again!`,
									backdropDismiss: false,
									buttons: [
										{
											text: "Close",
											role: "cancel",
											handler: () => {
												console.warn("Alert closed")
											},
										},
									],
								})
								alert0.present()

								return console.warn(`Authme Web - Wrong password - ${error}`)
							}

							const alert1 = await alertController.create({
								header: "Authme Web",
								message: `QR code(s) exported successfully! <br><br> A download window will open shortly! <br><br>You can import the exported codes in Authme and Authme Web!`,
								backdropDismiss: false,
								buttons: [
									{
										text: "Close",
										role: "cancel",
										handler: () => {
											console.warn("Alert closed")
										},
									},
								],
							})
							alert1.present()

							let str = ""

							for (let i = 0; i < names.length; i++) {
								let substr = `\nName:   ${names[i].trim()} \nSecret: ${secrets[i].trim()} \nIssuer: ${issuers[i].trim()} \nType:   OTP_TOTP\n`

								str += substr
							}

							const codes = {
								role: "export",
								encrypted: false,
								codes: Buffer.from(str).toString("base64"),
								date: new Date()
									.toISOString()
									.replace("T", "-")
									.replaceAll(":", "-")
									.substring(0, 19),
								version: 3,
							}

							const blob = new Blob([JSON.stringify(codes, null, "\t")], { type: "text/plain;charset=utf-8" })

							FileSaver.saveAs(blob, "export.authme")
						},
					},
					{
						text: "Close",
						role: "cancel",
						handler: () => {
							console.warn("Alert closed!")
						},
					},
				],
			})
			return alert.present()
		},

		async downloadAlert() {
			const alert = await alertController.create({
				header: "Authme Web",
				message: `QR code(s) processed successfully! <br><br> A download window will open shortly! <br><br>You can import your codes now on the codes tab!`,
				backdropDismiss: false,
				buttons: [
					{
						text: "Close",
						role: "cancel",
						handler: () => {
							console.warn("Alert closed")
						},
					},
				],
			})
			return alert.present()
		},

		async failedAlert(name) {
			const alert = await alertController.create({
				header: "Authme Web",
				message: `No QR code found on the picture: ${name} <br><br> Try to take a better picture and try again! <br><br> Please restart the process!`,
				backdropDismiss: false,
				buttons: [
					{
						text: "Close",
						role: "cancel",
						handler: () => {
							console.warn("Alert closed")
						},
					},
				],
			})
			return alert.present()
		},

		async wrongAlert(name) {
			const alert = await alertController.create({
				header: "Authme Web",
				message: `Wrong QR code found on the picture: ${name} <br><br> Make sure this is a correct QR code and try again! <br><br> Please restart the process!`,
				backdropDismiss: false,
				buttons: [
					{
						text: "Close",
						role: "cancel",
						handler: () => {
							console.warn("Alert closed")
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

.xl {
	margin-top: 30px;
	margin-bottom: 15px;
}

#select {
	background: #141414;
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

.download {
	width: 300px !important;
}

.tab {
	animation: fadeEffect 1s;
}

@keyframes fadeEffect {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
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

	.download {
		width: 200px !important;
	}
}
</style>
