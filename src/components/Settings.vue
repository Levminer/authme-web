/* eslint-disable */
<template>
	<div id="container">
		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h1>Authme Web</h1>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<h2>Settings</h2>
			</ion-card-content>
		</ion-card>
		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h2 id="name">Clear data</h2>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<h3>Clear all app data including settings and saved files.</h3>
				<br />
				<ion-button @click="clear" class="clear" color="dark" shape="round">Clear data</ion-button>
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
				<ion-button class="clear" color="dark" shape="round"
					><a target="_blank" href="https://authme.levminer.com/licenses.html">View licenses</a></ion-button
				>
			</ion-card-content>
		</ion-card>

		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h2 id="name">About</h2>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<h3>Created by: Levminer</h3>
				<br />
				<ion-button class="clear" color="dark" shape="round"><a target="_blank" href="mailto:contact@levminer.com">Contact</a></ion-button>
			</ion-card-content>
		</ion-card>

		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h2 id="name">Version</h2>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<h3>1.2.0 (2021. September 7.)</h3>
				<br />
				<ion-button class="clear" color="dark" shape="round"
					><a target="_blank" href="https://github.com/levminer/authme-web/releases">Release notes</a></ion-button
				>
			</ion-card-content>
		</ion-card>
	</div>
</template>

<script>
/* eslint-disable */
import { alertController } from "@ionic/vue"

export default {
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
	},

	name: "Settings",
	props: {
		name: String,
	},
}
</script>

<style scoped>
#container {
	margin-bottom: 900px !important;
}

.clear {
	width: 200px !important;
}

@media only screen and (max-width: 600px) {
	#container {
		margin-bottom: 1100px !important;
	}

	.clear {
		width: 150px !important;
	}
}
</style>
