/* eslint-disable */
<template>
	<div id="container">
		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h1 id="name">Authme Web</h1>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<div class="before">
					<h3>
						Import your 2FA codes, or if you have an import file choose it.
					</h3>
					<br />
					<routerLink to="/tools">
						<button class="buttoni buttons" @click="advanced">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							Create file
						</button>
					</routerLink>
					<button @click="input" class="import buttoni buttons">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
						</svg>
						Choose file
					</button>
					<input type="file" class="file" id="file" @change="load" accept=".authme" />
					<br />
					<h3 class="m">
						Read the import guide or download a sample file to try out Authme Web.
					</h3>
					<button @click="guide" class="buttoni buttons">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
						Import guide
					</button>
					<button @click="sample" class="buttoni buttons">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						Help
					</button>
				</div>
				<div class="confirm">
					<h2>Confirm password</h2>
					<input class="input1 m" id="input0" type="password" placeholder="Password" />
					<h4 id="info">Press enter to confirm!</h4>
				</div>
				<div class="search">
					<input type="text" class="input1" id="search" @keydown="search" @keyup="search" placeholder="Search for names..." autocomplete="off" autofocus />
				</div>
			</ion-card-content>
		</ion-card>

		<ion-card class="after">
			<ion-card-title>
				<h2>Save code(s)</h2>
				<h3>Save your code(s) for future use.</h3>
			</ion-card-title>

			<ion-card-content>
				<button @click="save" class="buttoni">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
						<circle cx="12" cy="14" r="2"></circle>
						<polyline points="14 4 14 8 8 8 8 4"></polyline>
					</svg>
					Save
				</button>
			</ion-card-content>
		</ion-card>

		<ion-card class="set">
			<ion-card-title>
				<h2>Create password</h2>
			</ion-card-title>

			<ion-card-content>
				<div>
					<input class="input1 m" id="input1" type="password" placeholder="Password" />
					<input class="input1 m" id="input2" type="password" placeholder="Password" />
					<br />
					<button id="set_button" class="buttoni save m">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						Confirm
					</button>

					<h4 id="set_info">Press the button to confirm!</h4>
				</div>
			</ion-card-content>
		</ion-card>
		<div class="next container"></div>
	</div>
</template>

<script>
/* eslint-disable */
import { alertController } from "@ionic/vue"

export default {
	async mounted() {
		const speakeasy = require("@levminer/speakeasy")
		const clipboard = require("clipboard-polyfill")
		const bcrypt = require("bcryptjs")
		const SimpleCrypto = require("simple-crypto-js").default

		// ? try to load save
		try {
			const go = () => {
				const generate = () => {
					// counter
					let counter = 0

					for (let i = 0; i < name.length; i++) {
						// create div
						const element = document.createElement("ion-card")

						element.setAttribute("id", `card${i}`)
						element.setAttribute("class", `card`)

						element.innerHTML = `
							<ion-card-header>
								<ion-card-title>
									<h1 id="name${i}">Name</h1>
								</ion-card-title>
								<ion-card-subtitle>
									<h2 class="time" id="time${i}">Time</h2>
								</ion-card-subtitle>
							</ion-card-header>
							<ion-card-content>
									<input class="input1 code" value="custom" id="code${i}" readonly></input>
								<br />
								<button class="buttoni sm" id="copy${i}">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
								</svg>
								Copy
								</button>
							</ion-card-content>`

						// set div in html
						document.querySelector(".next").appendChild(element)

						// copy
						let copybtn = document.querySelector(`#copy${i}`)

						copybtn.addEventListener("click", () => {
							let codeinp = document.querySelector(`#code${i}`).value

							window.navigator.vibrate(15)

							clipboard.writeText(codeinp)
							copybtn.innerHTML = `
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
							</svg>
							Copied
							`

							setTimeout(() => {
								copybtn.innerHTML = `
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
								</svg>
								Copy
								`
							}, 1000)
						})

						// elements
						const name = document.querySelector(`#name${counter}`)
						const code = document.querySelector(`#code${counter}`)
						const time = document.querySelector(`#time${counter}`)
						const text = document.querySelector(`#text${counter}`)

						// interval0
						const int0 = setInterval(() => {
							// generate token
							const token = speakeasy.totp({
								secret: secret[i],
								encoding: "base32",
							})

							// time
							const remaining = 30 - Math.floor((new Date().getTime() / 1000.0) % 30)

							// settting elements
							try {
								text.textContent = names[i]
							} catch (error) {
								console.warn(error)
							}

							name.textContent = issuer[i]
							code.value = token
							time.textContent = remaining
						}, 100)

						// interval1
						const int1 = setInterval(() => {
							// generate token
							const token = speakeasy.totp({
								secret: secret[i],
								encoding: "base32",
							})

							// time
							const remaining = 30 - Math.floor((new Date().getTime() / 1000.0) % 30)

							// settting elements
							name.textContent = issuer[i]
							code.value = token
							time.textContent = remaining

							clearInterval(int0)
						}, 500)

						/* 						if (name_state) {
							const grid = document.querySelector(`#grid${i}`)
							grid.style.height = "310px"
						}  */

						// add one to counter
						counter++
					}

					document.querySelector(".before").style.display = "none"
					document.querySelector(".after").style.display = "none"
					document.querySelector(".search").style.display = "block"

					document.querySelector("#search").focus()
				}

				generate()
			}

			let name = JSON.parse(localStorage.getItem("name"))
			let secret = JSON.parse(localStorage.getItem("secret"))
			let issuer = JSON.parse(localStorage.getItem("issuer"))
			let type = JSON.parse(localStorage.getItem("type"))

			let password = localStorage.getItem("password")

			if (password !== null) {
				document.querySelector(".before").style.display = "none"
				document.querySelector(".confirm").style.display = "block"

				document.querySelector("#input0").addEventListener("keyup", async (e) => {
					if (e.key === "Enter") {
						let input = document.querySelector("#input0").value
						let info = document.querySelector("#info")

						const compare = await bcrypt.compare(input, password)

						if (compare === true) {
							const simpleCrypto = new SimpleCrypto(input)

							name = simpleCrypto.decrypt(name)
							secret = simpleCrypto.decrypt(secret)
							issuer = simpleCrypto.decrypt(issuer)
							type = simpleCrypto.decrypt(type)

							document.querySelector(".confirm").style.display = "none"

							go()
						} else {
							info.textContent = "Wrong password!"
						}
					}
				})
			} else {
				go()

				document.querySelector(".before").style.display = "none"
			}
		} catch (error) {
			return console.warn(`Error loading save file: ${error}`)
		}
	},

	//? METHODS
	methods: {
		guide() {
			window.open("https://docs.authme.levminer.com/#/web-import", "_blank")
		},

		sample() {
			window.open("https://github.com/Levminer/authme/raw/dev/samples/authme/authme_import_sample.zip", "_blank")
		},

		search(event) {
			// ? search
			const querry = JSON.parse(localStorage.getItem("querry"))

			let search = document.querySelector("#search")
			let input = search.value.toLowerCase()

			let i = 0

			// get all elements
			for (let i = 0; i < querry.length; i++) {
				const div = document.querySelector(`#card${[i]}`)
				div.style.display = "block"
			}

			// search
			querry.forEach((e) => {
				if (e.startsWith(input)) {
				} else {
					const card = document.querySelector(`#card${[i]}`)
					card.style.display = "none"
				}
				i++
			})
		},

		async save() {
			// ? save
			const bcrypt = require("bcryptjs")
			const SimpleCrypto = require("simple-crypto-js").default

			let go = async () => {
				const password_salt = await bcrypt.genSalt(10)

				let input_value = document.querySelector("#input1").value

				const password = await bcrypt.hash(input_value, password_salt)

				let name = JSON.parse(sessionStorage.getItem("name"))
				let secret = JSON.parse(sessionStorage.getItem("secret"))
				let issuer = JSON.parse(sessionStorage.getItem("issuer"))
				let type = JSON.parse(sessionStorage.getItem("type"))

				const simpleCrypto = new SimpleCrypto(input_value)

				name = simpleCrypto.encrypt(name)
				secret = simpleCrypto.encrypt(secret)
				issuer = simpleCrypto.encrypt(issuer)
				type = simpleCrypto.encrypt(type)

				localStorage.setItem("name", JSON.stringify(name))
				localStorage.setItem("secret", JSON.stringify(secret))
				localStorage.setItem("issuer", JSON.stringify(issuer))
				localStorage.setItem("type", JSON.stringify(type))

				localStorage.setItem("password", password)

				document.querySelector(".after").style.display = "none"

				sessionStorage.clear()

				setTimeout(() => {
					codes_saved()
				}, 100)
			}

			const dialog = await alertController.create({
				header: "Authme Web",
				message: `Do you want to create a password to protect the code(s)? <br><br> You're code(s) can't be accessed outside the browser anyway.`,
				backdropDismiss: false,
				buttons: [
					{
						text: "Yes",
						handler: () => {
							let after = document.querySelector(".after")
							let set = document.querySelector(".set")
							set.style.display = "block"
							after.style.display = "none"

							document.querySelector("#set_button").addEventListener("click", () => {
								let input1 = document.querySelector("#input1").value
								let input2 = document.querySelector("#input2").value
								let set_info = document.querySelector("#set_info")

								if (input1.length < 8) {
									set_info.textContent = "Minimum password length is 8 characters!"
								} else if (input1.length > 64) {
									set_info.textContent = "Maximum password length is 64 characters!"
								} else {
									if (input1 === input2) {
										set_info.textContent = "Passwords match! Please wait..."

										setTimeout(() => {
											go()

											set.style.display = "none"
										}, 500)
									} else {
										set_info.textContent = "Passwords don't match!"
									}
								}
							})
						},
					},
					{
						text: "No",
						role: "cancel",
						handler: () => {
							const name = JSON.parse(sessionStorage.getItem("name"))
							const secret = JSON.parse(sessionStorage.getItem("secret"))
							const issuer = JSON.parse(sessionStorage.getItem("issuer"))
							const type = JSON.parse(sessionStorage.getItem("type"))

							localStorage.setItem("name", JSON.stringify(name))
							localStorage.setItem("secret", JSON.stringify(secret))
							localStorage.setItem("issuer", JSON.stringify(issuer))
							localStorage.setItem("type", JSON.stringify(type))

							document.querySelector(".after").style.display = "none"

							setTimeout(() => {
								codes_saved()
							}, 100)
						},
					},
				],
			})

			dialog.present()

			const codes_saved = async () => {
				const alert = await alertController.create({
					header: "Authme Web",
					message: `Code(s) saved!`,
					backdropDismiss: false,
					buttons: [
						{
							text: "Close",
							role: "cancel",
							handler: () => {
								console.log("Code(s) saved!")
							},
						},
					],
				})
				return alert.present()
			}
		},

		input() {
			//? open input window
			document.getElementById("file").click()
		},

		load(event) {
			const speakeasy = require("@levminer/speakeasy")
			const clipboard = require("clipboard-polyfill")

			let data = []

			const go = () => {
				const generate = () => {
					// counter
					let counter = 0

					for (let i = 0; i < name.length; i++) {
						// create div
						const element = document.createElement("ion-card")

						element.setAttribute("id", `card${i}`)

						element.innerHTML = `
							<ion-card-header>
								<ion-card-title>
									<h1 id="name${i}">Name</h1>
								</ion-card-title>
								<ion-card-subtitle>
									<h2 class="time" id="time${i}">Time</h2>
								</ion-card-subtitle>
							</ion-card-header>
							<ion-card-content>
									<input class="input1 code" value="custom" id="code${i}" readonly></input>
								<br />
								<button class="buttoni sm" id="copy${i}">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
								</svg>
								Copy
								</button>
							</ion-card-content>`

						// set div in html
						document.querySelector(".next").appendChild(element)

						// copy
						let copybtn = document.querySelector(`#copy${i}`)

						copybtn.addEventListener("click", () => {
							let codeinp = document.querySelector(`#code${i}`).value

							window.navigator.vibrate(15)

							clipboard.writeText(codeinp)
							copybtn.innerHTML = `
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
							</svg>
							Copied
							`

							setTimeout(() => {
								copybtn.innerHTML = `
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
								</svg>
								Copy
								`
							}, 1000)
						})

						// elements
						const name = document.querySelector(`#name${counter}`)
						const code = document.querySelector(`#code${counter}`)
						const time = document.querySelector(`#time${counter}`)
						const text = document.querySelector(`#text${counter}`)
						const copy = document.querySelector(`#copy${counter}`)

						// add to query
						const item = issuer[i].toLowerCase().trim()

						querry.push(item)

						// interval0
						const int0 = setInterval(() => {
							// generate token
							const token = speakeasy.totp({
								secret: secret[i],
								encoding: "base32",
							})

							// time
							const remaining = 30 - Math.floor((new Date().getTime() / 1000.0) % 30)

							// settting elements
							try {
								text.textContent = names[i]
							} catch (error) {
								console.warn(error)
							}

							name.textContent = issuer[i]
							code.value = token
							time.textContent = remaining
						}, 100)

						// interval1
						const int1 = setInterval(() => {
							// generate token
							const token = speakeasy.totp({
								secret: secret[i],
								encoding: "base32",
							})

							// time
							const remaining = 30 - Math.floor((new Date().getTime() / 1000.0) % 30)

							// settting elements
							name.textContent = issuer[i]
							code.value = token
							time.textContent = remaining

							clearInterval(int0)
						}, 500)

						/* 						if (name_state) {
							const grid = document.querySelector(`#grid${i}`)
							grid.style.height = "310px"
						}  */

						// add one to counter
						counter++
					}
				}

				document.querySelector(".search").style.display = "block"

				generate()

				localStorage.setItem("querry", JSON.stringify(querry))
			}

			// ? read file from settings folder
			const name = []
			const secret = []
			const issuer = []
			const type = []
			const querry = []

			// ? separate value
			const separation = () => {
				let c0 = 0
				let c1 = 1
				let c2 = 2
				let c3 = 3

				for (let i = 0; i < data.length; i++) {
					if (i == c0) {
						const name_before = data[i]
						const name_after = name_before.slice(8)
						name.push(name_after)
						c0 = c0 + 4
					}

					if (i == c1) {
						const secret_before = data[i]
						const secret_after = secret_before.slice(8)
						secret.push(secret_after)
						c1 = c1 + 4
					}

					if (i == c2) {
						const issuer_before = data[i]
						const issuer_after = issuer_before.slice(8)
						issuer.push(issuer_after)
						c2 = c2 + 4
					}

					if (i == c3) {
						type.push(data[i])
						c3 = c3 + 4
					}
				}

				sessionStorage.setItem("name", JSON.stringify(name))
				sessionStorage.setItem("secret", JSON.stringify(secret))
				sessionStorage.setItem("issuer", JSON.stringify(issuer))
				sessionStorage.setItem("type", JSON.stringify(type))

				go()
			}

			const processdata = (text) => {
				const json = JSON.parse(text)

				const codes = Buffer.from(json.codes, "base64").toString()

				// remove double quotes
				const pre_data1 = codes.replace(/"/g, "")

				// new line
				const pre_data2 = pre_data1.replace(/,/g, "\n")

				// make the array
				const pre_data3 = pre_data2.split(/\n/)
				while (pre_data3.length) {
					data.push(pre_data3.shift())
				}

				// remove first blank
				data.splice(0, 1)

				data = data.filter((_, i) => {
					return (i + 1) % 5
				})

				separation()
			}

			let loaded_file

			let file = event.target.files[0]

			let reader = new FileReader()

			reader.readAsText(file)

			reader.onload = (e) => {
				loaded_file = e.target.result

				document.querySelector(".before").style.display = "none"
				document.querySelector(".after").style.display = "block"

				processdata(loaded_file)
			}
		},
	},

	name: "ExploreContainer",
	props: {
		name: String,
	},
}
</script>

<style scoped>
.confirm {
	display: none;
}

#search {
	width: 50%;
	margin-bottom: 30px;
}

@media only screen and (max-width: 600px) {
	#search {
		width: 95% !important;
	}

	#container {
		margin-bottom: 450px !important;
	}
}

.set {
	display: none;
}

.after {
	display: none;
}

.search {
	display: none;
}

input[type="file"] {
	display: none;
}

a {
	color: white !important;
	text-decoration: underline !important;
}

p {
	color: white !important;
}

.before_info {
	padding-top: 20px;
}

.import {
	margin: 1rem;
}

.m {
	margin: 1rem;
}

.buttons {
	margin: 0.5rem;
}

h4 {
	color: white !important;
}
</style>
