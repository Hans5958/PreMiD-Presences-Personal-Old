const presence = new Presence({
	clientId: "733216937336766486"
})

let currentURL = new URL(document.location.href), 
	currentPath = currentURL.pathname.replace(/^\/|\/$/g, "").split("/")
const browsingStamp = Math.floor(Date.now() / 1000)
let presenceData: PresenceData = {
		details: "Viewing an unsupported page",
		largeImageKey: "lg",
		startTimestamp: browsingStamp
	}
const updateCallback = {
		_function: null as Function,
		get function(): Function {
			return this._function
		},
		set function(parameter) {
			this._function = parameter
		},
		get present(): boolean {
			return this._function !== null
		}
	}

/**
 * Initialize/reset presenceData.
 */
const resetData = (defaultData: PresenceData = {
	details: "Viewing an unsupported page",
	largeImageKey: "lg",
	startTimestamp: browsingStamp
}): void => {
	currentURL = new URL(document.location.href)
	currentPath = currentURL.pathname.replace(/^\/|\/$/g, "").split("/")
	presenceData = {...defaultData}
}

/**
 * Search for URL parameters.
 * @param urlParam The parameter that you want to know about the value.
 */
const getURLParam = (urlParam: string): string => {
	return currentURL.searchParams.get(urlParam)
}

((): void => {

	if (currentURL.hostname === "www.wikipedia.org") {
		presenceData.details = "On the home page"

	} else {

		let title: string
		const actionResult = getURLParam("action"), lang = currentURL.hostname.split(".")[0]

		const titleFromURL = (): string => {
			const raw = currentPath[1] === "index.php" ? getURLParam("title") : currentPath.slice(1).join("/")
			return decodeURI(raw.replace(/_/g, " "))
		}

		try {
			title = document.querySelector("h1").textContent
		} catch (e) {
			title = titleFromURL()
		}

		/**
		 * Returns details based on the namespace.
		 * @link https://...
		 */
		const namespaceDetails = (): string => {
			const details = {
				"-2": "Viewing a media",
				"-1": "Viewing a special page",
				0: "Reading an article",
				1: "Viewing a talk page",
				2: "Viewing a user page",
				3: "Viewing a user talk page",
				4: "Viewing a project page",
				5: "Viewing a project talk page",
				6: "Viewing a file",
				7: "Viewing a file talk page",
				8: "Viewing an interface page",
				9: "Viewing an interface talk page",
				10: "Viewing a template",
				11: "Viewing a template talk page",
				12: "Viewing a help page",
				13: "Viewing a help talk page",
				14: "Viewing a category",
				15: "Viewing a category talk page",
				100: "Viewing a portal",
				101: "Viewing a portal talk page"
			}
			return details[[...document.querySelector("body").classList].filter(v => /ns--?\d/.test(v))[0].slice(3)] || "Viewing a page"
		}
		
		//
		// Important note:
		//
		// When checking for the current location, avoid using the URL.
		// The URL is going to be different in other languages.
		// Use the elements on the page instead.
		//

		if (((document.querySelector("#n-mainpage a") || document.querySelector("#p-navigation a")) as HTMLAnchorElement).href === currentURL.href) {
			presenceData.details = "On the main page"
		} else if (actionResult == "history") {
			presenceData.details = "Viewing revision history"
			presenceData.state = title
		} else if (actionResult == "edit") {
			presenceData.details = "Editing a page"
			presenceData.state = title
		} else if (document.querySelector("#wpLoginAttempt")) {
			presenceData.details = "Logging in"
		} else if (document.querySelector("#wpCreateaccount")) {
			presenceData.details = "Creating an account"
		} else if (document.querySelector(".searchresults")) {
			presenceData.details = "Searching for a page"
			presenceData.state = (document.querySelector("input[type=search]") as HTMLInputElement).value
		} else {
			presenceData.details = namespaceDetails()
			presenceData.state = `${(title.toLowerCase() === titleFromURL().toLowerCase() ? `${title}` : `${title} (${titleFromURL()})`)}`
		}

		if (lang !== "en") {
			if (presenceData.state) presenceData.state += ` (${lang})`
			else presenceData.details += ` (${lang})`
		}

	}

})()

if (updateCallback.present) {
	const defaultData = {...presenceData}
	presence.on("UpdateData", async () => {
		resetData(defaultData)
		updateCallback.function()
		presence.setActivity(presenceData)
	})
} else {
	presence.on("UpdateData", async () => {
		presence.setActivity(presenceData)
	})
}

