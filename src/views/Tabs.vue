<template>
	<ion-page>
		<ion-tabs>
			<ion-tab-bar slot="bottom">
				<ion-tab-button tab="tab1" href="/tabs/tab1">
					<ion-icon :icon="key" />
					<ion-label>Codes</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="tab3" href="/tabs/tab3">
					<ion-icon :icon="helpCircle" />
					<ion-label>Help</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="tab2" href="/tabs/tab2">
					<ion-icon :icon="settings" />
					<ion-label>Settings</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	</ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from "@ionic/vue"
import { settings, key, helpCircle } from "ionicons/icons"

export default {
	name: "Tabs",
	components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
	setup() {
		return {
			settings,
			key,
			helpCircle,
		}
	},
}
</script>

<style>
ion-title {
	text-align: center;
}
</style>
