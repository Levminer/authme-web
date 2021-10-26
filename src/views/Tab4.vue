<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Advanced</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Advanced</ion-title>
				</ion-toolbar>
			</ion-header>

			<Advanced />
		</ion-content>
	</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue"
import Advanced from "@/components/Advanced.vue"

export default {
	name: "Tab4",
	components: { Advanced, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
}
</script>
