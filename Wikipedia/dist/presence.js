var presence = new Presence({
    clientId: "609364070684033044",
});
var currentURL = new URL(document.location.href), currentPath = currentURL.pathname.slice(1).split("/"), browsingStamp = Math.floor(Date.now() / 1000), href = new URL(document.location.href), presenceData = {
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
    let title, actionResult = href.searchParams.get("action"), titleFromURL = () => {
        let raw;
        if (href.pathname.startsWith("/index.php"))
            raw = href.searchParams.get("title");
        else
            raw = href.pathname.slice(1);
        if (raw.includes("_"))
            return raw.replace(/_/g, " ");
        else
            return raw;
    };
    try {
        title = document.querySelector("h1#firstHeading").textContent;
    }
    catch (e) {
        title = titleFromURL();
    }
    if (document.querySelector("title").textContent.split(" - ").length === 1) {
        presenceData.state = "Main Page | Home";
        delete presenceData.details;
    }
    else if (actionResult == "history") {
        presenceData.details = "Viewing revision history";
        presenceData.state = title;
    }
    else if (actionResult == "edit") {
        presenceData.details = "Editing a page";
        presenceData.state = title;
    }
    else {
        presenceData.details = "Reading a page";
        presenceData.state = title;
    }
    presenceData.startTimestamp = browsingStamp;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQTtBQUVGLElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQy9DLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JELGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFDN0MsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQ3RDLFlBQVksR0FBRztJQUNkLE9BQU8sRUFBVyw2QkFBNkI7SUFDL0MsS0FBSyxFQUFXLFNBQVM7SUFDekIsYUFBYSxFQUFXLElBQUk7SUFDNUIsY0FBYyxFQUFXLGFBQWE7SUFDdEMsWUFBWSxFQUFXLFNBQVM7Q0FDaEMsRUFDRCxjQUFjLEdBQUc7SUFDaEIsU0FBUyxFQUFFLElBQUk7SUFDZixJQUFJLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLFNBQVM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7SUFDM0IsQ0FBQztJQUNELElBQUksT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUE7SUFDL0IsQ0FBQztDQUNELENBQUM7QUFFSCxDQUFDLEdBQUcsRUFBRTtJQUVMLElBQUksS0FBYSxFQUNoQixZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENB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