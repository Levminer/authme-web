<template>
	<div ion-fixed id="container">
		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h1 id="name">Authme</h1>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<div class="before">
					<h2 id="code">Import your Authme file</h2>
					<ion-button @click="input" class="import" color="dark" shape="round">Import</ion-button>
					<input type="file" class="file" id="file" @change="load" accept=".txt" />
				</div>
				<div class="after">
					<h2>Save config</h2>
					<ion-button @click="save" class="save" color="dark" shape="round">Save</ion-button>
				</div>
				<div class="search">
					<h2>Search</h2>
					<ion-chip class="searchbar">
						<ion-input id="search" @keydown="search" @keyup="search" placeholder="Search for names..."></ion-input>
					</ion-chip>
				</div>
			</ion-card-content>
		</ion-card>
		<div class="next"></div>
	</div>
</template>

<script>
/* eslint-disable */
export default {
	mounted() {
		const speakeasy = require("@levminer/speakeasy")
		const ClipboardJS = require("clipboard")

		try {
			const name = JSON.parse(localStorage.getItem("name"))
			const secret = JSON.parse(localStorage.getItem("secret"))
			const issuer = JSON.parse(localStorage.getItem("issuer"))
			const type = JSON.parse(localStorage.getItem("type"))

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

						const cp = new ClipboardJS(`#copy${i}`)

						cp.on("success", (e) => {
							const button = document.querySelector(`#copy${i}`)

							button.textContent = "Copied"

							setTimeout(() => {
								button.textContent = "Copy"
							}, 500)

							e.clearSelection()
						})

						// set div in html
						document.querySelector(".next").appendChild(element)

						// elements
						const name = document.querySelector(`#name${counter}`)
						const code = document.querySelector(`#code${counter}`)
						const time = document.querySelector(`#time${counter}`)
						const text = document.querySelector(`#text${counter}`)
						const copy = document.querySelector(`#copy${counter}`)

						// add to query
						const item = issuer[i].toLowerCase().trim()

						/* querry.push(item) */

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
								console.log(error)
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
					let margin = name.length * 325

					document.querySelector(".before").style.display = "none"
					document.querySelector(".after").style.display = "none"
					document.querySelector(".search").style.display = "block"

					container.style.marginBottom = `${margin}px`
				}

				generate()

				localStorage.setItem("querry", JSON.stringify(querry))
			}

			go()

			document.querySelector(".after").style.display = "none"
		} catch (error) {
			return console.warn(`Error loading save file: ${error}`)
		}
	},

	//? METHODS
	methods: {
		search(event) {
			const querry = JSON.parse(localStorage.getItem("querry"))

			let search = document.querySelector("#search")
			let input = search.value.toLowerCase()

			let i = 0

			for (let i = 0; i < querry.length; i++) {
				const div = document.querySelector(`#card${[i]}`)
				div.style.display = "block"
			}

			// search
			querry.forEach((e) => {
				if (e.startsWith(input)) {
					console.log("found")
				} else {
					const card = document.querySelector(`#card${[i]}`)
					card.style.display = "none"
				}
				i++
			})
		},

		save() {
			const name = JSON.parse(sessionStorage.getItem("name"))
			const secret = JSON.parse(sessionStorage.getItem("secret"))
			const issuer = JSON.parse(sessionStorage.getItem("issuer"))
			const type = JSON.parse(sessionStorage.getItem("type"))

			localStorage.setItem("name", JSON.stringify(name))
			localStorage.setItem("secret", JSON.stringify(secret))
			localStorage.setItem("issuer", JSON.stringify(issuer))
			localStorage.setItem("type", JSON.stringify(type))

			document.querySelector(".after").style.display = "none"
		},

		input() {
			//? open input window
			document.getElementById("file").click()
		},

		load(event) {
			const speakeasy = require("@levminer/speakeasy")
			const ClipboardJS = require("clipboard")

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
								<ion-button shape="round" color="dark" id="copy${i}" data-clipboard-target="#code${i}">Copy</ion-button>
							</ion-card-content>`

						const cp = new ClipboardJS(`#copy${i}`)

						cp.on("success", (e) => {
							const button = document.querySelector(`#copy${i}`)

							button.textContent = "Copied"

							setTimeout(() => {
								button.textContent = "Copy"
							}, 500)

							e.clearSelection()
						})

						// set div in html
						document.querySelector(".next").appendChild(element)

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
								console.log(error)
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
				let margin = name.length * 325

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

				console.log(name)
				console.log(secret)
				console.log(issuer)
				console.log(type)

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

				console.log("Data:")
				console.log(data.length)
				console.log(data)

				separation()
			}

			let loaded_file

			let file = event.target.files[0]
			console.log(file)

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

<style>
.searchbar {
	cursor: default;
	width: 300px;
	background: white;
	color: black;
	height: 40px;
	border-radius: 50px;
}

.after {
	display: none;
}

.search {
	display: none;
}

@media only screen and (max-width: 600px) {
	.searchbar {
		width: 250px !important;
	}
}

input {
	display: none;
}
</style>
