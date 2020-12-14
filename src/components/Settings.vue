/* eslint-disable */
<template>
	<div id="container">
		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h1 id="name">Authme</h1>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<h2 id="code">Settings</h2>
			</ion-card-content>
		</ion-card>
		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h1 id="name">Version</h1>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<h2 id="code">0.4.0</h2>
			</ion-card-content>
		</ion-card>
		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h1 id="name">Status</h1>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<h2 id="state">All systems online</h2>
				<ion-button class="import" color="dark" shape="round"> <a href="https://status.levminer.com" target="_blank">Status</a></ion-button>
			</ion-card-content>
		</ion-card>
	</div>
</template>

<script>
/* eslint-disable */

export default {
	created() {
		const fetch = require("node-fetch")

		let api = async () => {
			try {
				await fetch("https://api.levminer.com/api/v1/status/all")
					.then((res) => res.json())
					.then((data) => {
						try {
							let state = document.querySelector("#state")

							if (data.state === "up") {
								state.style.color = "green"
							} else {
								state.textContent = "Some systems offline"
								state.style.color = "red"
							}
						} catch (error) {
							return console.log(error)
						}
					})
			} catch (error) {
				state.textContent = "Can't connect to API"
				state.style.color = "red"
			}
		}

		api()
	},
	name: "Settings",
	props: {
		name: String,
	},
}
</script>

<style scoped>
#state {
	color: green;
}

a {
	color: #000;
}

h1 {
	font-size: 3rem;
}

h2 {
	font-size: 2rem;
}

#container {
	text-align: center;
	position: relative;
	left: 25%;
	right: 0;
	top: 100px;
	width: 50%;
}

@media only screen and (max-width: 600px) {
	#container {
		text-align: center;
		position: relative;
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
</style>
