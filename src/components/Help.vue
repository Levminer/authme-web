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
					<summary class="summary1">From Authme </summary>

					<p>Download Authme on your desktop and follow the instructions.</p>
					<br />
					<p>
						After you done go to: Top menu > Advanced > Export. Click Export and than click Save as .txt file. After that just import the
						file you saved.
					</p>
				</details>

				<details class="details1">
					<summary class="summary1">In Authme Web</summary>
					<p>Go to the Advanced tab: Upload your QR code(s), then a download window will appear.</p>
					<br />
					<p>After that go back to the Codes tab: Upload the file you downloaded.</p>
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
	margin-bottom: 850px !important;
}

.details1 {
	width: 100%;
	background: #141414;
}

.summary1 {
	color: white;
	font-weight: bolder;
	text-decoration: underline;
	background: #141414;
}

/* summary */
.summary1 {
	color: white;
	font-weight: bolder;
	text-decoration: underline;
	background: #141414;
	display: list-item;
	color: var(--df_primary_color);
	padding: 10px;
	margin: -10px -10px 0;
	cursor: pointer;
	outline: none;
	transition: 0.2s ease-in;
	font-size: 1.5rem;

	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	-o-user-select: none;
	user-select: none;
}

.summary1:hover {
	color: var(--df_secondary_color);
}

/* details */
.details1 {
	color: white !important;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 10px 10px 0;
	border-radius: 15px;
	overflow: hidden;
	float: left;
	margin-right: auto;
	margin-right: 90vw;
}

.details1[open] {
	margin-bottom: 30px;
	margin-right: 90vw;
}

.details1 > :last-child {
	margin-bottom: 0;
}

.details1[open] summary {
	margin-bottom: 10px;
}

.details1 > :not(summary) {
	margin-top: 0;
}

ion-button {
	width: 250px !important;
}

p {
	color: white !important;
	font-size: 20px !important;
}

@media only screen and (max-width: 600px) {
	#container {
		margin-bottom: 1500px !important;
	}

	ion-button {
		width: 150px !important;
	}
}
</style>
