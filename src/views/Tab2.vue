<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Settings</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Settings</ion-title>
				</ion-toolbar>
			</ion-header>

			<Settings />
		</ion-content>
	</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue"
import Settings from "@/components/Settings.vue"

export default {
	name: "Tab2",
	components: { Settings, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
}
</script>
