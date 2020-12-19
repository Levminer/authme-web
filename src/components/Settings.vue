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
					<h2 id="name">Clear data</h2>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<h3 id="code">Clear all app data including settings and saved files</h3>
				<ion-button @click="clear" class="clear" color="dark" shape="round">Clear data</ion-button>
			</ion-card-content>
		</ion-card>
		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h2 id="name">Version</h2>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<h3 id="code">0.6.0</h3>
			</ion-card-content>
		</ion-card>
		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h2 id="name">Status</h2>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<h3 id="state">All systems online</h3>
				<ion-button class="import" color="dark" shape="round"> <a href="https://status.levminer.com" target="_blank">Status</a></ion-button>
			</ion-card-content>
		</ion-card>
	</div>
</template>

<script>
/* eslint-disable */

export default {
	methods: {
		clear() {
			let button = document.querySelector(".clear")
			let button_text = document.querySelector(".clear").textContent

			if (button_text === "Clear data") {
				button.textContent = "Confirm"
			} else {
				button.textContent = "Reloading"

				localStorage.clear()
				sessionStorage.clear()

				location.replace("/")
			}
		},
	},

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
#container{
	margin-bottom: 550px;
}
</style>
