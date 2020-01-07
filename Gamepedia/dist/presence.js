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
var browsingStamp = Math.floor(Date.now() / 1000), href = new URL(document.location.href), presenceData = {
    details: 'In construction',
    state: null,
    largeImageKey: "lg",
    startTimestamp: browsingStamp,
    endTimestamp: null
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
    if (href.hostname === "www.gamepedia.com") {
        if (href.pathname === "/") {
            presenceData.state = "Index";
            presenceData.startTimestamp = browsingStamp;
            delete presenceData.details;
        }
        else if (href.pathname.includes("/twitch-login")) {
            presenceData.details = "Signing in";
            presenceData.startTimestamp = browsingStamp;
            delete presenceData.state;
        }
        else if (href.pathname.includes("/twitch-signup")) {
            presenceData.details = "Registering an account";
            presenceData.startTimestamp = browsingStamp;
            delete presenceData.details;
        }
        else if (href.pathname.includes("/news/")) {
            presenceData.details = "Reading an news article";
            presenceData.state = document.querySelector(".p-article-title").textContent;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (href.pathname.includes("/blog/")) {
            presenceData.details = "Reading a blog article";
            presenceData.state = document.querySelector(".p-article-title").textContent;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (href.pathname.includes("/members/")) {
            presenceData.details = "Reading a blog article";
            presenceData.state = document.querySelector(".username").textContent;
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            presenceData.details = "Viewing a page";
            if (href.pathname.includes("/PRO"))
                presenceData.state = "Gamepedia PRO";
            else
                presenceData.state = document.title.split(" - ")[0];
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else {
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
        let namespaceDetails = {
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
        else if (actionResult == "history" && titleFromURL) {
            presenceData.details = "Viewing revision history";
            presenceData.state = title;
        }
        else if (actionResult == "edit" && titleFromURL) {
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
        cleanData();
        presence.setActivity(presenceData);
    }));
}
else {
    cleanData();
    presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
        presence.setActivity(presenceData);
    }));
}
function resetData() {
    presenceData = {
        details: 'In construction',
        state: null,
        largeImageKey: "lg",
        startTimestamp: browsingStamp,
        endTimestamp: null
    };
}
function cleanData() {
    Object.keys(presenceData).forEach(key => {
        if (presenceData[key] === null)
            delete presenceData[key];
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2hCLENBQUMsQ0FBQTtBQUVGLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUNoRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxHQUFHO0lBQ2QsT0FBTyxFQUFXLGlCQUFpQjtJQUNuQyxLQUFLLEVBQVcsSUFBSTtJQUNwQixhQUFhLEVBQVcsSUFBSTtJQUM1QixjQUFjLEVBQVcsYUFBYTtJQUN0QyxZQUFZLEVBQVcsSUFBSTtDQUMzQixFQUNELGNBQWMsR0FBRztJQUNoQixTQUFTLEVBQUUsSUFBSTtJQUNmLElBQUksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtJQUMzQixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQTtJQUMvQixDQUFDO0NBQ0QsQ0FBQztBQUVILENBQUMsR0FBRyxFQUFFO0lBRUwsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLG1CQUFtQixFQUFFO1FBUzFDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxHQUFHLEVBQUU7WUFDMUIsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUE7WUFDNUIsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7WUFDM0MsT0FBTyxZQUFZ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