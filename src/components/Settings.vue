/* eslint-disable */
<template>
	<div id="container">
		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<h1 id="name">Settings</h1>
				</ion-card-title>
				<ion-card-subtitle>
					<h2 id="time">Version</h2>
				</ion-card-subtitle>
			</ion-card-header>
			<ion-card-content>
				<h2 id="code">0.2.0</h2>
			</ion-card-content>
		</ion-card>
	</div>
</template>

<script>
export default {
	name: "Settings",
	props: {
		name: String,
	},
}
</script>

<style scoped>
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
	top: 300px;
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
