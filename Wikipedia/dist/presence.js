var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "609364070684033044",
    mediaKeys: false
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
    let title, sitename, actionResult = href.searchParams.get("action"), titleFromURL = () => {
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
    else if (actionResult == "history" && titleFromURL) {
        presenceData.details = "Viewing revision history";
        presenceData.state = title;
    }
    else if (actionResult == "edit" && titleFromURL) {
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
    presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
        resetData();
        updateCallback.function();
        presence.setActivity(presenceData);
    }));
}
else {
    presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
        presence.setActivity(presenceData);
    }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2hCLENBQUMsQ0FBQTtBQUVGLElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQy9DLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JELGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFDN0MsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQ3RDLFlBQVksR0FBRztJQUNkLE9BQU8sRUFBVyw2QkFBNkI7SUFDL0MsS0FBSyxFQUFXLFNBQVM7SUFDekIsYUFBYSxFQUFXLElBQUk7SUFDNUIsY0FBYyxFQUFXLGFBQWE7SUFDdEMsWUFBWSxFQUFXLFNBQVM7Q0FDaEMsRUFDRCxjQUFjLEdBQUc7SUFDaEIsU0FBUyxFQUFFLElBQUk7SUFDZixJQUFJLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLFNBQVM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7SUFDM0IsQ0FBQztJQUNELElBQUksT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUE7SUFDL0IsQ0FBQztDQUNELENBQUM7QUFFSCxDQUFDLEdBQUcsRUFBRTtJQUVMLElBQUksS0FBYSxFQUNoQixRQUFnQixF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