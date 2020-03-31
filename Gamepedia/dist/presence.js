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
    clientId: "652880245371699222",
    mediaKeys: false
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
    if (currentURL.hostname === "www.gamepedia.com") {
        if (currentPath[0] === "") {
            presenceData.state = "Index";
            presenceData.startTimestamp = browsingStamp;
            delete presenceData.details;
        }
        else if (currentPath[0] === "twitch-login") {
            presenceData.details = "Signing in";
            presenceData.startTimestamp = browsingStamp;
            delete presenceData.state;
        }
        else if (currentPath[0] === "twitch-signup") {
            presenceData.details = "Registering an account";
            presenceData.startTimestamp = browsingStamp;
            delete presenceData.details;
        }
        else if (currentPath[0] === "news") {
            presenceData.details = "Reading an news article";
            presenceData.state = document.querySelector(".p-article-title").textContent;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (currentPath[0] === "blog") {
            presenceData.details = "Reading a blog article";
            presenceData.state = document.querySelector(".p-article-title").textContent;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (currentPath[0] === "members") {
            presenceData.details = "Reading a blog article";
            presenceData.state = document.querySelector(".username").textContent;
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            presenceData.details = "Viewing a page";
            if (currentPath[0] === "PRO")
                presenceData.state = "Gamepedia PRO";
            else
                presenceData.state = document.title.split(" - ")[0];
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else {
        var title, sitename, actionResult = currentURL.searchParams.get("action"), titleFromURL = () => {
            var raw;
            if (currentURL.pathname.startsWith("/index.php"))
                raw = currentURL.searchParams.get("title");
            else
                raw = currentURL.pathname.slice(1);
            if (raw.includes("_"))
                return raw.replace(/_/g, " ");
            else
                return raw;
        };
        try {
            title = document.querySelector("meta[property='og:title']").content;
        }
        catch (e) {
            title = titleFromURL();
        }
        try {
            sitename = document.querySelector("meta[property='og:site_name']").content;
        }
        catch (e) {
            sitename = null;
        }
        var namespaceDetails = {
            "Media": "Viewing a media",
            "Special": "Viewing a special page",
            "Talk": "Viewing a talk page",
            "User": "Viewing a user page",
            "User talk": "Viewing a user talk page",
            [sitename]: "Viewing a project page",
            [sitename + " talk"]: "Viewing a project talk page",
            "File": "Viewing a file",
            "File talk": "Viewing a file talk page",
            "MediaWiki": "Viewing a MediaWiki page",
            "MediaWiki talk": "Viewing a MediaWiki talk page",
            "Template": "Viewing a template",
            "Template talk": "Viewing a template talk",
            "Help": "Viewing a help page",
            "Help talk": "Viewing a help talk page",
            "Category": "Viewing a category",
            "Category talk": "Viewing a category talk page"
        };
        if (title === sitename) {
            presenceData.state = "Home";
            delete presenceData.details;
        }
        else if (actionResult == "history") {
            presenceData.details = "Viewing revision history";
            presenceData.state = title;
        }
        else if (actionResult == "edit") {
            presenceData.details = "Editing a wiki page";
            presenceData.state = title;
        }
        else if (title.startsWith("UserProfile:")) {
            presenceData.details = "Viewing a user profile";
            presenceData.state = document.querySelector(".mw-headline").textContent;
        }
        else {
            if (namespaceDetails[title.split(":")[0]])
                presenceData.details = namespaceDetails[title.split(":")[0]];
            else
                presenceData.details = "Reading a wiki page";
            presenceData.state = title;
        }
        presenceData.startTimestamp = browsingStamp;
        presenceData.state += " | " + sitename;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2hCLENBQUMsQ0FBQTtBQUVGLElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQy9DLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JELGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFDN0MsWUFBWSxHQUFpQjtJQUM1QixPQUFPLEVBQVcsNkJBQTZCO0lBQy9DLEtBQUssRUFBVyxTQUFTO0lBQ3pCLGFBQWEsRUFBVyxJQUFJO0lBQzVCLGNBQWMsRUFBVyxhQUFhO0lBQ3RDLFlBQVksRUFBVyxTQUFTO0NBQ2hDLEVBQ0QsY0FBYyxHQUFHO0lBQ2hCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsSUFBSSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxTQUFTO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO0lBQzNCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFBO0lBQy9CLENBQUM7Q0FDRCxDQUFDO0FBRUgsQ0FBQyxHQUFHLEVBQUU7SUFFTCxJQUFJLFVBQVUsQ0FBQyxRQUFRLEtBQUssbUJBQW1CLEVBQUU7UUFTaEQsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFF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