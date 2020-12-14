module.exports = {
	pwa: {
		workboxPluginMode: "GenerateSW",
		workboxOptions: {
			navigateFallback: "/index.html",
			runtimeCaching: [],
		},
	},
}
