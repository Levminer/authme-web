<template>
	<div id="container">
		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h1 id="name">Authme</h1>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<h2 id="code">Import your Authme file</h2>
				<ion-button @click="input" class="import" color="dark" shape="round">Import</ion-button>
				<input type="file" class="file" id="file" @change="load" accept=".txt" />
				<ion-input></ion-input>
			</ion-card-content>
		</ion-card>
		<div class="next"></div>
	</div>
</template>

<script>
export default {
	/* eslint-disable */

	methods: {
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

					document.querySelector("#container").style.top = `200px`

					for (let i = 0; i < name.length; i++) {
						// create div
						const element = document.createElement("ion-card")

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
				}

				generate()
			}

			// ? read file from settings folder
			const name = []
			const secret = []
			const issuer = []
			const type = []

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
h1 {
	font-size: 3rem;
}

h2 {
	font-size: 2rem;
}

ion-input {
	background-color: white;
}

ion-chip {
	cursor: default;
}

ion-card {
	border-radius: 25px;
	margin-bottom: 2rem;
}

ion-card:last-child {
	margin-bottom: 15rem;
}

#container {
	text-align: center;
	position: relative;
	left: 25%;
	right: 0;
	top: 300px;
	width: 50%;
}

@media only screen and (max-width: 600px) {
	#container {
		text-align: center;
		position: absolute;
		left: 5%;
		right: 5%;
		top: 50%;
		transform: translateY(-50%);
		width: 90%;
	}
}

#container strong {
	font-size: 20px;
	line-height: 26px;
}

#container p {
	font-size: 16px;
	line-height: 22px;
	color: #8c8c8c;
	margin: 0;
}

#container a {
	text-decoration: none;
}

input {
	display: none;
}
</style>
