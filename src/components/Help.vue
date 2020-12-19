<template>
	<div id="container">
		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h1 id="name">Authme</h1>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<h2 id="code">Help</h2>
			</ion-card-content>
		</ion-card>

		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h2 id="name">How to import</h2>
				</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<h3 id="code">
					Download Authme on your desktop and follow the instructions. If you are already an Authme user just go to: Top menu > Export.
					After that just click Export and than click Save file. Transfer the file to your phone and then just import it.
				</h3>
				<ion-button class="clear" color="dark" shape="round"
					><a href="https://github.com/Levminer/authme" target="_blank">Download</a></ion-button
				>
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
	margin-bottom: 200px;
}

@media only screen and (max-width: 600px) {
	#container {
		margin-bottom: 300px;
	}
}
</style>
