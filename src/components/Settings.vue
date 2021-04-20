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
					<h2 id="name">Version</h2>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<h3>1.1.0.dev.4 (2021. April 20.)</h3>
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

	name: "Settings",
	props: {
		name: String,
	},
}
</script>

<style scoped>
#container {
	margin-bottom: 400px !important;
}

@media only screen and (max-width: 600px) {
	#container {
		margin-bottom: 650px !important;
	}
}
</style>
