<template>
	<ion-page>
		<ion-tabs>
			<ion-tab-bar slot="bottom">
				<ion-tab-button tab="tab1" href="/codes">
					<ion-icon :icon="key" />
					<ion-label>Codes</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="tab4" href="/tools">
					<ion-icon :icon="apps" />
					<ion-label>Tools</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="tab2" href="/settings">
					<ion-icon :icon="settings" />
					<ion-label>Settings</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	</ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from "@ionic/vue"
import { settings, key, helpCircle, apps } from "ionicons/icons"

export default {
	name: "Tabs",
	components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
	setup() {
		return {
			settings,
			key,
			helpCircle,
			apps,
		}
	},
}
</script>

<style>
ion-title {
	text-align: center;
}

ion-tab-bar > * {
	z-index: 99999;
}
</style>
