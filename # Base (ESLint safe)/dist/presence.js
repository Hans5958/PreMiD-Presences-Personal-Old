var presence = new Presence({
    clientId: "662312595239469097"
});
var currentURL = new URL(document.location.href), currentPath = currentURL.pathname.slice(1).split("/"), browsingStamp = Math.floor(Date.now() / 1000), presenceData = {
    details: "Viewing an unsupported page",
    largeImageKey: "lg",
    startTimestamp: browsingStamp
}, updateCallback = {
    _function: null,
    get function() {
        return this._function;
    },
    set function(parameter) {
        this._function = parameter;
    },
    get present() {
        return this._function !== null;
    }
};
function resetData() {
    currentURL = new URL(document.location.href);
    currentPath = currentURL.pathname.slice(1).split("/");
    presenceData = {
        details: "Viewing an unsupported page",
        state: undefined,
        largeImageKey: "lg",
        startTimestamp: browsingStamp,
        endTimestamp: undefined
    };
}
var logHandler = {
    pageNotSupported(isCritical = false) {
        if (isCritical)
            console.error("Whoops. It seems that this page is not supported. \nPlease contact @Hans5958#0969 to request a support for this page.");
        else
            console.warn("It seems that this page is not fully supported. \nPlease contact @Hans5958#0969 to request a support for this page.");
        console.log(currentURL.href);
    },
    fatalError(error) {
        console.groupEnd();
        console.error("Fatal error! Terminating.\nPlease report this problem to @Hans5958#0969.");
        console.groupCollapsed("Error log");
        console.log(currentURL.href);
        console.error(error);
        console.groupEnd();
    }
};
function getURLParam(urlParam) {
    return currentURL.searchParams.get(urlParam);
}
(() => {
})();
if (updateCallback.present) {
    presence.on("UpdateData", async () => {
        resetData();
        updateCallback.function();
        presence.setActivity(presenceData);
    });
}
else {
    presence.on("UpdateData", async () => {
        presence.setActivity(presenceData);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQzlDLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JELGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFDN0MsWUFBWSxHQUFpQjtJQUMzQixPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDLGFBQWEsRUFBRSxJQUFJO0lBQ25CLGNBQWMsRUFBRSxhQUFhO0NBQzlCLEVBQ0QsY0FBYyxHQUFHO0lBQ2YsU0FBUyxFQUFFLElBQWdCO0lBQzNCLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQztJQUNqQyxDQUFDO0NBQ0YsQ0FBQztBQUtKLFNBQVMsU0FBUztJQUNoQixVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxXQUFXLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELFlBQVksR0FBRztRQUNiLE9BQU8sRUFBRSw2QkFBdUM7UUFDaEQsS0FBSyxFQUFFLFNBQW1CO1FBQzFCLGFBQWEsRUFBRSxJQUFjO1FBQzdCLGNBQWMsRUFBRSxhQUF1QjtRQUN2QyxZQUFZLEVBQUUsU0FBbUI7S0FDbEMsQ0FBQztBQUNKLENBQUM7QUFLRCxJQUFJLFVBQVUsR0FBRztJQUtmLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxLQUFLO1FBQ2pDLElBQUksVUFBVTtZQUNaLE9BQU8sQ0FBQyxLQUFLLENBQ1gsdUhBQXVILENBQ3hILENBQUM7O1lBRUYsT0FBTyxDQUFDLElBQUksQ0FDVixxSEFBcUgsQ0FDdEgsQ0FBQztRQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFLRCxVQUFVLENBQUMsS0FBYTtRQUN0QixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkIsT0FBTyxDQUFDLEtBQUssQ0FDWCwwRUFBMEUsQ0FDM0UsQ0FBQztRQUNGLE9BQU8sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckIsQ0FBQztDQUNGLENBQUM7QUFNRixTQUFTLFdBQVcsQ0FBQyxRQUFnQjtJQUNuQyxPQUFPLFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFFRCxDQUFDLEdBQVMsRUFBRTtBQUdaLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFTCxJQUFJLGNBQWMsQ0FBQyxPQUFPLEVBQUU7SUFDMUIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDbkMsU0FBUyxFQUFFLENBQUM7UUFDWixjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztDQUNKO0tBQU07SUFDTCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtRQUNuQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0NBQ0oifQ==