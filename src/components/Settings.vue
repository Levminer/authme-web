/* eslint-disable */
<template>
	<div id="container">
		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h1>Authme</h1>
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
				<h3>0.9.0</h3>
			</ion-card-content>
		</ion-card>
	</div>
</template>

<script>
/* eslint-disable */

export default {
	methods: {
		clear() {
			let dialog = confirm("Are you sure? This can not be undone!")
			if (dialog == true) {
				localStorage.clear()
				sessionStorage.clear()

				location.replace("/")
			}
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
	margin-bottom: 600px;
}
</style>
