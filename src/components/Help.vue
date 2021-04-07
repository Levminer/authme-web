<template>
	<div id="container">
		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h1>Authme Web</h1>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<h2>Help</h2>
			</ion-card-content>
		</ion-card>

		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h2>How to import</h2>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<details open class="details1">
					<summary class="summary1">I'm new to Authme</summary>

					<p>Download Authme on your desktop and follow the instructions.</p>
				</details>

				<details class="details1">
					<summary class="summary1">I'm already using Authme</summary>

					<p>
						Go to: Top menu > Advanced > Export. Click Export and than click Save file. After that just import the file you saved.
					</p>
				</details>
			</ion-card-content>
		</ion-card>

		<ion-card>
			<ion-card-title>
				<h2>More information</h2>
			</ion-card-title>

			<ion-card-content>
				<h3>For more information please read the documentation.</h3>

				<br />

				<ion-button class="clear" color="dark" shape="round">
					<a href="https://docs.authme.levminer.com" target="_blank">Documentation</a>
				</ion-button>
			</ion-card-content>
		</ion-card>

		<ion-card>
			<ion-card-title>
				<h2>Install it on your phone</h2>
			</ion-card-title>

			<ion-card-content>
				<h3>Authme Web is a PWA, so you can install it on your phone.</h3>

				<br />

				<ion-button class="clear" color="dark" shape="round">
					<a href="https://docs.authme.levminer.com/#/web-install" target="_blank">How to install</a>
				</ion-button>
			</ion-card-content>
		</ion-card>
	</div>
</template>

<script>
/* eslint-disable */

export default {
	created() {},
	name: "Help",
	props: {
		name: String,
	},
}
</script>

<style scoped>
#container {
	margin-bottom: 600px;
}

.details1 {
	width: 100%;
	background: #1e1e1e;
}

.summary1 {
	color: white;
	font-weight: bolder;
	text-decoration: underline;
	background: #1e1e1e;
}

ion-button {
	width: 250px !important;
}

p {
	font-size: 20px !important;
}

@media only screen and (max-width: 600px) {
	#container {
		margin-bottom: 1200px !important;
	}

	ion-button {
		width: 150px !important;
	}
}
</style>
