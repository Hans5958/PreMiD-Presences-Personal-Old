var presence = new Presence({
    clientId: "662312595239469097",
});
var currentURL = new URL(document.location.href), currentPath = currentURL.pathname.slice(1).split("/"), browsingStamp = Math.floor(Date.now() / 1000), presenceData = {
    details: "Viewing an unsupported page",
    state: undefined,
    largeImageKey: "lg",
    startTimestamp: browsingStamp,
    endTimestamp: undefined
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
function resetData() {
    currentURL = new URL(document.location.href),
        currentPath = currentURL.pathname.slice(1).split("/"),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQTtBQUVGLElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQy9DLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JELGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFDN0MsWUFBWSxHQUFpQjtJQUM1QixPQUFPLEVBQVcsNkJBQTZCO0lBQy9DLEtBQUssRUFBVyxTQUFTO0lBQ3pCLGFBQWEsRUFBVyxJQUFJO0lBQzVCLGNBQWMsRUFBVyxhQUFhO0lBQ3RDLFlBQVksRUFBVyxTQUFTO0NBQ2hDLEVBQ0QsY0FBYyxHQUFHO0lBQ2hCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsSUFBSSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxTQUFTO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO0lBQzNCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFBO0lBQy9CLENBQUM7Q0FDRCxDQUFDO0FBRUgsQ0FBQyxHQUFHLEVBQUU7QUFTTixDQUFDLENBQUMsRUFBRSxDQUFDO0FBRUwsSUFBSSxjQUFjLENBQUMsT0FBTyxFQUFFO0lBQzNCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3BDLFNBQVMsRUFBRSxDQUFBO1FBQ1gsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBRXpCLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDbkMsQ0FBQyxDQUFDLENBQUE7Q0FDRjtLQUFNO0lBQ04sUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFFcEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNuQyxDQUFDLENBQUMsQ0FBQTtDQUNGO0FBS0QsU0FBUyxTQUFTO0lBQ2pCLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUM1QyxXQUFXLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNyRCxZQUFZLEdBQUc7WUFDZCxPQUFPLEVBQVcsNkJBQTZCO1lBQy9DLEtBQUssRUFBVyxTQUFTO1lBQ3pCLGFBQWEsRUFBVyxJQUFJO1lBQzVCLGNBQWMsRUFBVyxhQUFhO1lBQ3RDLFlBQVksRUFBVyxTQUFTO1NBQ2hDLENBQUE7QUFDRixDQUFDO0FBS0QsSUFBSSxVQUFVLEdBQUc7SUFLaEIsZ0JBQWdCLENBQUMsYUFBc0IsS0FBSztRQUMzQyxJQUFJLFVBQVU7WUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLHVIQUF1SCxDQUFDLENBQUE7O1lBQ2pKLE9BQU8sQ0FBQyxJQUFJLENBQUMscUhBQXFILENBQUMsQ0FBQTtRQUN4SSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM3QixDQUFDO0lBS0QsVUFBVSxDQUFDLEtBQWE7UUFDdkIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsMEVBQTBFLENBQUMsQ0FBQTtRQUN6RixPQUFPLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQ25CLENBQUM7Q0FDRCxDQUFBO0FBTUQsU0FBUyxXQUFXLENBQUMsUUFBZ0I7SUFDcEMsT0FBTyxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUM3QyxDQUFDIn0=