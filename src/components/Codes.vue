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
					<h2>Please import your Authme file!</h2>
					<p>More information: <a href="https://docs.authme.levminer.com/#/web" target="_blank">Docs</a></p>
					<p>
						For testing:
						<a href="https://github.com/Levminer/authme/blob/main/sample/authme_import_sample.zip?raw=true" target="_blank"
							>Sample import file</a
						>
					</p>
					<br />
					<ion-button @click="input" class="import" color="dark" shape="round">Import</ion-button>
					<input type="file" class="file" id="file" @change="load" accept=".txt" />
				</div>
				<div class="confirm">
					<h2>Confirm password</h2>
					<ion-chip class="input">
						<ion-input id="input0" type="password" placeholder="Password"></ion-input>
					</ion-chip>
					<h4 id="info">Press enter to confirm!</h4>
				</div>
				<div class="search">
					<input
						type="text"
						class="input1"
						id="search"
						@keydown="search"
						@keyup="search"
						placeholder="Search for names..."
						autocomplete="off"
						autofocus
					/>
				</div>
			</ion-card-content>
		</ion-card>

		<ion-card class="after">
			<ion-card-title>
				<h2>Save config</h2>
			</ion-card-title>

			<ion-card-content>
				<ion-button @click="save" class="save" color="dark" shape="round">Save</ion-button>
			</ion-card-content>
		</ion-card>

		<ion-card class="set">
			<ion-card-title>
				<h2>Set password</h2>
			</ion-card-title>

			<ion-card-content>
				<div>
					<ion-chip class="input">
						<ion-input id="input1" type="password" placeholder="Password"></ion-input>
					</ion-chip>
					<ion-chip class="input">
						<ion-input id="input2" type="password" placeholder="Password"></ion-input>
					</ion-chip>
					<br />
					<ion-button id="set_button" class="save" color="dark" shape="round">Confirm</ion-button>

					<h4 id="set_info">Press the button to confirm!</h4>
				</div>
			</ion-card-content>
		</ion-card>
		<div class="next"></div>
	</div>
</template>

<script>
/* eslint-disable */
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

						element.innerHTML = `
							<ion-card-header>
								<ion-card-title>
									<h1 id="name${i}">Name</h1>
								</ion-card-title>
								<ion-card-subtitle>
									<h2 id="time${i}">Time</h2>
								</ion-card-subtitle>
							</ion-card-header>
							<ion-card-content>
								<ion-chip>
									<ion-input value="custom" id="code${i}" readonly></ion-input>
								</ion-chip>
								<br />
								<ion-button shape="round" color="dark" id="copy${i}" data-clipboard-target="#code${i}">Copy</ion-button>
							</ion-card-content>`

						// set div in html
						document.querySelector(".next").appendChild(element)

						// copy
						let copybtn = document.querySelector(`#copy${i}`)

						copybtn.addEventListener("click", () => {
							let codeinp = document.querySelector(`#code${i}`).value

							clipboard.writeText(codeinp)
							copybtn.textContent = "Copied"

							setTimeout(() => {
								copybtn.textContent = "Copy"
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

					let container = document.querySelector("#container")
					let margin = name.length * 330

					document.querySelector(".before").style.display = "none"
					document.querySelector(".after").style.display = "none"
					document.querySelector(".search").style.display = "block"

					container.style.marginBottom = `${margin}px`

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

		save() {
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

				alert("Code(s) saved!")
			}

			let dialog = confirm(
				"Do you want to create a password to protect the code(s)? Every time you load the page, it's going to ask for a password. You're code(s) can't be accesible outside the browser anyway."
			)

			if (dialog == true) {
				let after = document.querySelector(".after")
				let set = document.querySelector(".set")
				set.style.display = "block"
				after.style.display = "none"

				document.querySelector("#set_button").addEventListener("click", () => {
					let input1 = document.querySelector("#input1").value
					let input2 = document.querySelector("#input2").value
					let set_info = document.querySelector("#set_info")

					if (input1 === input2) {
						set_info.textContent = "Passwords match! Please wait..."

						setTimeout(() => {
							go()

							set.style.display = "none"
						}, 500)
					} else {
						set_info.textContent = "Passwords don't match!"
					}
				})
			} else {
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
					alert("Code(s) saved!")
				}, 100)
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
									<h2 id="time${i}">Time</h2>
								</ion-card-subtitle>
							</ion-card-header>
							<ion-card-content>
								<ion-chip>
									<ion-input value="custom" id="code${i}" readonly></ion-input>
								</ion-chip>
								<br />
								<ion-button shape="round" color="dark" id="copy${i}">Copy</ion-button>
							</ion-card-content>`

						// set div in html
						document.querySelector(".next").appendChild(element)

						// copy
						let copybtn = document.querySelector(`#copy${i}`)

						copybtn.addEventListener("click", () => {
							let codeinp = document.querySelector(`#code${i}`).value

							clipboard.writeText(codeinp)
							copybtn.textContent = "Copied"

							setTimeout(() => {
								copybtn.textContent = "Copy"
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

				let container = document.querySelector("#container")
				let margin = name.length * 330

				container.style.marginBottom = `${margin}px`

				generate()

				localStorage.setItem("querry", JSON.stringify(querry))
			}

			// ? read file from settings folder
			const name = []
			const secret = []
			const issuer = []
			const type = []
			const querry = []

			// ? separete value
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
				// remove double qoutes
				const pre_data1 = text.replace(/"/g, "")

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

.input1 {
	border: 1px solid white;
	width: 300px;
	background: white;
	color: black;
	height: 40px;
	border-radius: 50px;
	margin-top: 30px;
	transition: 0.2s ease-in;
	font-size: 1.5rem;
}

.input1::placeholder {
	color: black;
	transition: 0.2s ease-in;
}

.input:hover {
	color: black;
	transition: 0.2s ease-in;
}

.input1:focus::placeholder {
	color: transparent;
	transition: 0.2s ease-in;
}
.input1:hover::placeholder {
	color: transparent;
	transition: 0.2s ease-in;
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

@media only screen and (max-width: 600px) {
	.input {
		width: 200px !important;
	}
}

input[type="file"] {
	display: none;
}

a {
	color: gray !important;
	text-decoration: underline !important;
}
</style>
