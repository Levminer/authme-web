<template>
	<ion-page>
		<ion-header>
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
