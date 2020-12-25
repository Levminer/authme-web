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
				<details class="details1">
					<summary class="summary1">I'm new to Authme</summary>

					<p>Download Authme on your desktop and follow the instructions.</p>

					<br />

					<ion-button class="clear" color="dark" shape="round">
						<a href="https://github.com/Levminer/authme/releases/latest" target="_blank">Download</a>
					</ion-button>
				</details>

				<details class="details1">
					<summary class="summary1">I'm already using Authme</summary>

					<p>
						Go to: Top menu > Export. Click Export and than click Save file. After that just import the file you saved.
					</p>
				</details>
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

p {
	font-size: 20px !important;
}

@media only screen and (max-width: 600px) {
	#container {
		margin-bottom: 350px;
	}
}
</style>
