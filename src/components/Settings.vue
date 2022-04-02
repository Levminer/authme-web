/* eslint-disable */
<template>
	<div id="container">
		<div class="container">
			<ion-card>
				<ion-card-header>
					<ion-card-title>
						<h2 id="name">Clear data</h2>
					</ion-card-title>
				</ion-card-header>
				<ion-card-content>
					<h3>Clear all app data including settings and saved files.</h3>
					<br />
					<button @click="clear" class="buttoni">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
						Clear data
					</button>
				</ion-card-content>
			</ion-card>

			<ion-card>
				<ion-card-header>
					<ion-card-title>
						<h2 id="name">Licenses</h2>
					</ion-card-title>
				</ion-card-header>
				<ion-card-content>
					<h3>View all used open source licenses.</h3>
					<br />

					<button @click="licenses" class="buttoni">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						Licenses
					</button>
				</ion-card-content>
			</ion-card>

			<ion-card>
				<ion-card-header>
					<ion-card-title>
						<h2 id="name">Version</h2>
					</ion-card-title>
				</ion-card-header>
				<ion-card-content>
					<h3 id="version">-</h3>
					<br />
					<button class="buttoni" @click="about">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						Version
					</button>
				</ion-card-content>
			</ion-card>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import { alertController } from "@ionic/vue"
import { version as appVersion } from "../../package.json"
import { date as appDate } from "../../package.json"

export default {
	mounted() {
		const version = document.querySelector("#version")

		const text = `${appVersion} (${appDate})`

		version.textContent = text
	},

	methods: {
		async clear() {
			const alert = await alertController.create({
				header: "Authme Web",
				message: `Are you sure you want to clear all data? <br><br> This can not be undone!`,
				backdropDismiss: false,
				buttons: [
					{
						text: "Yes",
						handler: async () => {
							const alert = await alertController.create({
								header: "Authme Web",
								message: `Are you absolutely sure? <br><br> There is no way back!`,
								backdropDismiss: false,
								buttons: [
									{
										text: "Yes",
										handler: () => {
											localStorage.clear()
											sessionStorage.clear()

											location.replace("/")
										},
									},
									{
										text: "No",
										role: "cancel",
									},
								],
							})
							return alert.present()
						},
					},
					{
						text: "No",
						role: "cancel",
					},
				],
			})
			return alert.present()
		},

		licenses() {
			window.open("https://authme.levminer.com/licenses.html", "_blank")
		},

		async about() {
			const text = `Authme Web version: ${appVersion} (${appDate}) \n\nBrowser User agent: ${navigator.userAgent}`

			const alert = await alertController.create({
				header: "Authme Web",
				message: `Authme Web version: ${appVersion} (${appDate}) <br><br> Browser User agent: ${navigator.userAgent}`,
				backdropDismiss: false,
				buttons: [
					{
						text: "Copy",
						handler: async () => {
							navigator.clipboard.writeText(text)
						},
					},
					{
						text: "Close",
						role: "cancel",
					},
				],
			})
			return alert.present()
		},
	},

	name: "Settings",
	props: {
		name: String,
	},
}
</script>
