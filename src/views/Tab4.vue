<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Tools</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<Tools />
		</ion-content>
	</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue"
import Tools from "@/components/Tools.vue"

export default {
	name: "Tab4",
	components: { Tools, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
}
</script>
