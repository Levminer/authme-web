<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Help</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Tab 3</ion-title>
				</ion-toolbar>
			</ion-header>

			<Help name="Tab 3 page" />
		</ion-content>
	</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue"
import Help from "@/components/Help.vue"

export default {
	name: "Tab3",
	components: { Help, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
}
</script>
