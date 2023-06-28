<template>
	<ion-page>
		<ion-header>
			<div class="alert">
				<p>Authme Web is deprecated, please export your codes until July 1.</p>
			</div>
			<ion-toolbar>
				<ion-title>Codes</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Codes</ion-title>
				</ion-toolbar>
			</ion-header>

			<Codes />
		</ion-content>
	</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue"

import Codes from "@/components/Codes.vue"

export default {
	name: "Tab1",
	components: {
		Codes,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonPage,
	},
}
</script>

<style>
.alert {
	font-size: 2em;
	background-color: red;
	font-weight: bold;
	text-align: center;
	padding: 5px;
}
</style>
