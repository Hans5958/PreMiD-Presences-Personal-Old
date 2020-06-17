const presence = new Presence({
    clientId: "721986767322087464"
});
let currentURL = new URL(document.location.href), currentPath = currentURL.pathname.slice(1).split("/");
const browsingStamp = Math.floor(Date.now() / 1000);
let presenceData = {
    details: "Viewing an unsupported page",
    largeImageKey: "lg",
    startTimestamp: browsingStamp
};
const updateCallback = {
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
const resetData = () => {
    currentURL = new URL(document.location.href);
    currentPath = currentURL.pathname.slice(1).split("/");
    presenceData = {
        details: "Viewing an unsupported page",
        largeImageKey: "lg",
        startTimestamp: browsingStamp
    };
};
const getURLParam = (urlParam) => {
    return currentURL.searchParams.get(urlParam);
};
(() => {
    if (currentURL.hostname === "tm-exchange.com" || currentURL.hostname === "www.tm-exchange.com") {
        presenceData.details = "On the home page";
    }
    else if (currentURL.hostname === "blog.tm-exchange.com") {
        if (currentPath[0] === "post") {
            presenceData.details = "Reading a blog post";
            presenceData.state = document.querySelector(".WindowHeader1").textContent;
        }
        else if (currentPath[0] === "archive.aspx") {
            presenceData.details = "Viewing the blog archive";
        }
        else {
            presenceData.details = "Viewing the blog";
        }
    }
    else {
        let pageType, idPrefix = "ctl03";
        if (getURLParam("action") !== null && getURLParam("action") !== "auto#auto") {
            pageType = getURLParam("action");
        }
        else if (document.querySelector(".BookmarkCell a") !== null) {
            currentURL = new URL(document.querySelector(".BookmarkCell a").textContent);
            pageType = getURLParam("action");
        }
        else {
            const locationType = {
                "Home": "home",
                "Login": "login",
                "Registration": "register",
                "Lost Login": "forget",
                "Track Info": "trackshow",
                "Search Tracks": "tracksearch",
                "Nadeo Tracks": "tracksearch",
                "Your AOI": "tracksearch",
                "Track Signs": "tracksigns",
                "Track Upload": "trackuploadtrack",
                "Submit Replays": "recordmassupload",
                "Leaderboards": "userrecords",
                "Your Tracks": "tracksearch",
                "Your Replays": "tracksearch",
                "Your Downloads": "tracksearch",
                "PlayPal": "playpal",
                "PlayPal On-Line": "playpalonline",
                "TrackBeta": "trackbeta",
                "Find Users": "usersearch",
                "User Info": "usershow",
                "User Packs": "userpacks",
                "Your Account": "usershow",
                "Send Private Message": "postupdate"
            };
            try {
                pageType = locationType[document.querySelector(".NavigatorCell b").textContent];
            }
            catch (e) {
                pageType = null;
            }
        }
        if (document.querySelector(".NavigatorCell b").textContent === "Login")
            pageType = "login";
        switch (currentURL.host) {
            case "united.tm-exchange.com":
                presenceData.smallImageKey = "united";
                presenceData.smallImageText = "United";
                idPrefix = "_ctl3";
                break;
            case "tmnforever.tm-exchange.com":
                presenceData.smallImageKey = "nforever";
                presenceData.smallImageText = "Nations Forever";
                break;
            case "nations.tm-exchange.com":
                presenceData.smallImageKey = "nations";
                presenceData.smallImageText = "Nations";
                break;
            case "sunrise.tm-exchange.com":
                presenceData.smallImageKey = "sunrise";
                presenceData.smallImageText = "Sunrise";
                break;
            case "original.tm-exchange.com":
                presenceData.smallImageKey = "original";
                presenceData.smallImageText = "Original";
                break;
        }
        if (pageType === "home") {
            presenceData.details = "On the home page";
        }
        else if (pageType === "login") {
            presenceData.details = "Signing in";
        }
        else if (pageType === "register") {
            presenceData.details = "Registering an account";
        }
        else if (pageType === "forget") {
            presenceData.details = "Figuring out his password";
        }
        else if (pageType === "trackshow") {
            presenceData.details = document.querySelector(`#${idPrefix}_ShowTrackName`).textContent;
            presenceData.state = document.querySelector("tr.WindowTableCell1:nth-child(3) > td:nth-child(2) > a:nth-child(3)").textContent;
        }
        else if (pageType === "tracksearch") {
            let searchSummary;
            if (document.querySelector(`#${idPrefix}_ShowSummary > b:nth-child(1)`).textContent === "tracks")
                searchSummary = document.querySelector(`#${idPrefix}_ShowSummary`).textContent.slice(15, this.length - 4);
            else
                searchSummary = document.querySelector(`#${idPrefix}_ShowSummary`).textContent.slice(8, this.length - 4);
            presenceData.details = "Searching for a track";
            if (document.querySelector(".TextFilter"))
                presenceData.state = `${document.querySelector(".TextFilter").textContent.slice(9, this.length - 1)}, ${searchSummary}`;
            else
                presenceData.state = searchSummary[0].toUpperCase() + searchSummary.slice(1);
        }
        else if (pageType === "tracksigns") {
            presenceData.details = "Viewing track signs";
        }
        else if (pageType === "trackuploadtrack") {
            presenceData.details = "Uploading a track";
        }
        else if (pageType === "recordmassupload") {
            presenceData.details = "Submitting replays";
        }
        else if (pageType === "userrecords") {
            const searchSummary = document.querySelector(`#${idPrefix}_ShowSummary`).textContent.slice(27, this.length - 4);
            presenceData.details = "Viewing the leaderboards";
            if (document.querySelector(`#${idPrefix}_GetUser`).value)
                presenceData.state = `${document.querySelector(`#${idPrefix}_GetUser`).value}, ${searchSummary}`;
            else
                presenceData.state = searchSummary[0].toUpperCase() + searchSummary.slice(1);
        }
        else if (pageType === "forumshow" || pageType === "forumsshow") {
            presenceData.details = "Viewing the forums";
            if (pageType === "forumshow")
                presenceData.state = document.querySelector(".WindowTitle").textContent.trim();
        }
        else if (pageType === "threadshow") {
            presenceData.details = "Viewing a topic";
            presenceData.state = document.querySelector(`#${idPrefix}_ShowSubject`).textContent;
        }
        else if (pageType === "playpal") {
            presenceData.details = "Viewing PlayPal";
        }
        else if (pageType === "playpalonline") {
            presenceData.details = "Viewing PlayPal Online";
        }
        else if (pageType === "trackbeta") {
            presenceData.details = "Viewing TrackBeta";
        }
        else if (pageType === "usersearch") {
            const searchSummary = document.querySelector(`#${idPrefix}_ShowSummary`).textContent.slice(15, this.length - 4);
            presenceData.details = "Searching for a user";
            if (document.querySelector(`#${idPrefix}_ShowName`))
                presenceData.state = `${document.querySelector(`#${idPrefix}_ShowName`).textContent}, ${searchSummary}`;
            else
                presenceData.state = searchSummary[0].toUpperCase() + searchSummary.slice(1);
        }
        else if (pageType === "usershow") {
            presenceData.details = "Viewing a user's info";
            presenceData.state = document.querySelector(`#${idPrefix}_ShowLoginId`).textContent;
        }
        else if (pageType === "userpacks") {
            const searchSummary = document.querySelector(`#${idPrefix}_ShowSummary`).textContent.slice(20, this.length - 4);
            presenceData.details = "Searching for a user pack";
            if (document.querySelector(`#${idPrefix}_ShowName`))
                presenceData.state = `${document.querySelector(`#${idPrefix}_ShowName`).textContent}, ${searchSummary}`;
            else
                presenceData.state = searchSummary[0].toUpperCase() + searchSummary.slice(1);
        }
        else if (pageType === "postupdate") {
            presenceData.details = "Sending a private message";
        }
        else if (pageType === "trackpackshow") {
            presenceData.details = "Viewing a track pack";
            presenceData.state = `${document.querySelector(`#${idPrefix}_ShowPackName`).textContent} by ${document.querySelector("#Table7 > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > a:nth-child(3)").textContent}`;
        }
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQTtBQUVGLElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQy9DLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDdEQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFDbkQsSUFBSSxZQUFZLEdBQWlCO0lBQy9CLE9BQU8sRUFBRSw2QkFBNkI7SUFDdEMsYUFBYSxFQUFFLElBQUk7SUFDbkIsY0FBYyxFQUFFLGFBQWE7Q0FDN0IsQ0FBQTtBQUNGLE1BQU0sY0FBYyxHQUFHO0lBQ3JCLFNBQVMsRUFBRSxJQUFnQjtJQUMzQixJQUFJLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUE7SUFDdEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLFNBQVM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7SUFDM0IsQ0FBQztJQUNELElBQUksT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUE7SUFDL0IsQ0FBQztDQUNELENBQUE7QUFLRixNQUFNLFNBQVMsR0FBRyxHQUFTLEVBQUU7SUFDNUIsVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDNUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMs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