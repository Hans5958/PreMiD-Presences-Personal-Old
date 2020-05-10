var presence = new Presence({
    clientId: "664057766809436161"
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
        largeImageKey: "lg",
        startTimestamp: browsingStamp
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
    if (currentURL.hostname === "www.deviantart.com") {
        let loadedPath, forceUpdate = false, presenceDataPlaced = {}, retries = 0, profileType, websiteTheme;
        if (document.querySelector("table#overhead") === null)
            websiteTheme = "eclipse";
        else
            websiteTheme = "old";
        if (document.querySelector("#group"))
            profileType = "group";
        else
            profileType = "user";
        const lastItem = (array) => {
            return array[array.length - 1];
        };
        const getName = (override = false) => {
            try {
                if (websiteTheme === "eclipse" && !override) {
                    try {
                        return document.querySelector("#content-container > div > div > div > div > div > a.user-link").textContent;
                    }
                    catch {
                        return document.querySelector("#root > main > div > div > div > div > div > div > div > div > span > a.user-link").textContent;
                    }
                }
                else {
                    try {
                        return lastItem(document.querySelectorAll("h1 .author .u .u")).textContent;
                    }
                    catch {
                        return document.querySelector("h1 .u .u").textContent;
                    }
                }
            }
            catch {
                if (currentPath[0].toLowerCase() === document.querySelector("title").textContent.split(" ")[0].toLowerCase())
                    return document.querySelector("title").textContent.split(" ")[0];
                else if (currentPath[0].toLowerCase() === document.querySelector("title").textContent.split(" by ")[1].split(" ")[0].toLowerCase())
                    return (presenceData.state = document.querySelector("title").textContent.split(" by ")[1].split(" ")[0]);
            }
        };
        updateCallback.function = () => {
            if (loadedPath !== currentPath || forceUpdate) {
                loadedPath = currentPath;
                try {
                    if (currentPath[0] === "") {
                        presenceData.details = "Viewing the home page";
                    }
                    else if (document.querySelector(".error-400") || document.querySelector(".error-401") || document.querySelector(".error-403") || document.querySelector(".error-404") || document.querySelector(".error-405") || document.querySelector(".error-500") || document.querySelector(".error-503") || document.querySelector(".error-banned") || document.querySelector(".error-beta") || document.querySelector(".error-blocked") || document.querySelector(".error-blockedbyuser") || document.querySelector(".error-contentblockedbyuser") || document.querySelector(".error-deactivated") || document.querySelector(".error-noreferrer") || document.querySelector(".error-pageflooder") || document.querySelector(".error-suspended") || document.querySelector(".error-threadflooder") || document.querySelector("#error-400") || document.querySelector("#error-401") || document.querySelector("#error-403") || document.querySelector("#error-404") || document.querySelector("#error-405") || document.querySelector("#error-500") || document.querySelector("#error-503") || document.querySelector("#error-banned") || document.querySelector("#error-beta") || document.querySelector("#error-blocked") || document.querySelector("#error-blockedbyuser") || document.querySelector("#error-contentblockedbyuser") || document.querySelector("#error-deactivated") || document.querySelector("#error-noreferrer") || document.querySelector("#error-pageflooder") || document.querySelector("#error-suspended") || document.querySelector("#error-threadflooder")) {
                        presenceData.details = "On a non-existent page";
                    }
                    else if (currentPath[0] === "deviations") {
                        presenceData.details = "Viewing deviations";
                        presenceData.state = currentPath.slice(1).concat(getURLParam("order") ? getURLParam("order") : []).join(" > ").trim().replace(/-/g, " ").toLowerCase().split(" ").map(w => w.replace(w[0], w[0].toUpperCase())).join(" ");
                    }
                    else if (currentPath[0] === "daily-deviations") {
                        presenceData.details = "Viewing daily deviations";
                        if (websiteTheme === "eclipse")
                            presenceData.state = document.querySelector("#daily-deviation-picker").value;
                        else
                            presenceData.state = document.querySelector(".dailyDevCurDate").textContent.split(", ").slice(1).join(", ");
                    }
                    else if (currentPath[0] === "journals") {
                        presenceData.details = "Viewing daily deviations";
                        if (currentPath[1])
                            presenceData.state = currentPath[1].replace(currentPath[1], currentPath[1].toUpperCase());
                        else
                            presenceData.state = "All";
                    }
                    else if (currentPath[0] === "status-updates") {
                        presenceData.details = "Viewing status updates";
                    }
                    else if (currentPath[0] === "polls") {
                        presenceData.details = "Viewing polls";
                    }
                    else if (currentPath[0] === "commissions") {
                        presenceData.details = "Viewing commissions";
                    }
                    else if (currentPath[0] === "tag") {
                        presenceData.details = "Viewing a tag";
                        presenceData.state = `#${currentPath[1]}`;
                    }
                    else if (currentPath[0] === "search") {
                        presenceData.details = "Searching something";
                        presenceData.state = getURLParam("q");
                    }
                    else if (currentPath[0] === "notifications") {
                        if (currentPath[1] === "notes")
                            presenceData.details = "Reading notes";
                        if (currentPath[1] === "watch")
                            presenceData.details = "Viewing the watch list";
                        else
                            presenceData.details = "Reading notifications";
                    }
                    else if (currentPath[0] === "settings") {
                        presenceData.details = "Doing some settings";
                    }
                    else if (currentPath[0] === "account") {
                        presenceData.details = "Viewing the account pages";
                    }
                    else if (currentPath[0] === "checkout") {
                        presenceData.details = "On the checkout";
                    }
                    else if (currentPath[0] === "wishlist") {
                        presenceData.details = "Viewing their wishlist";
                    }
                    else if (currentPath[0] === "core-membership") {
                        presenceData.details = "Viewing a page";
                        presenceData.state = "Core Membership";
                    }
                    else if (currentPath[0] === "timeline") {
                        presenceData.details = "Viewing a page";
                        presenceData.state = "Timeline";
                    }
                    else if (currentPath[0] === "makeagroup") {
                        presenceData.details = "Making a group";
                    }
                    else if (websiteTheme === "old" && document.querySelector(".newbrowse") && !Object.keys({ presenceDataPlaced }).length) {
                        if (getURLParam("q")) {
                            presenceData.details = "Searching something";
                            presenceData.state = getURLParam("q");
                        }
                        else {
                            presenceData.details = "Viewing deviations";
                            const li = document.querySelectorAll(".browse-facet-category ul li");
                            if (currentPath[3])
                                presenceData.state = `${li[1].textContent} > ${li[2].textContent} > ${document.querySelector(".search-stats").textContent.trim().slice(7)} > `;
                            else if (currentPath[2])
                                presenceData.state = `${li[1].textContent} > ${document.querySelector(".search-stats").textContent.trim().slice(7)} > `;
                            else if (currentPath[1])
                                presenceData.state = `${document.querySelector(".search-stats").textContent.trim().slice(7)} > `;
                            else if (currentPath[0])
                                presenceData.state = "";
                            presenceData.state += document.querySelector(".browse-facet-order ul li .selected").textContent;
                        }
                    }
                    else if (currentPath[0] === "watch") {
                        presenceData.details = "Viewing the watch list";
                    }
                    else if (currentPath[0] === "critiques") {
                        presenceData.details = "Viewing critiques";
                    }
                    else if (currentPath[1] === "art") {
                        presenceData.details = document.querySelector("title").textContent.split(" by ").slice(0, -1).join(" - ");
                        presenceData.state = document.querySelector("title").textContent.split(" by ").pop().split(" ")[0];
                        if (presenceData.details === presenceDataPlaced.details && presenceData.state === presenceDataPlaced.state)
                            throw new Error("Current status is the same as the previous.");
                        if (presenceData.details === "")
                            throw new Error("No art title detected and user is from the homepage.");
                    }
                    else if (currentPath[1] === "gallery" || currentPath[1] === "favourites") {
                        if (currentPath[1] === "gallery")
                            presenceData.details = `Viewing a ${profileType}'s gallery`;
                        else
                            presenceData.details = `Viewing a ${profileType}'s favourites`;
                        if (websiteTheme === "eclipse" && profileType === "user") {
                            presenceData.state = `${document.querySelector("h2.uUWfu").textContent} by ${getName()}`;
                        }
                        else {
                            if (profileType === "group" && !currentPath[2]) {
                                presenceData.state = getName(true);
                            }
                            else {
                                if (!document.querySelector(".gallery .active"))
                                    presenceData.state = `${document.querySelector(".folder-title").textContent} by ${getName(true)}`;
                                else if (document.querySelector(".gallery .active").textContent.slice(1) === "Featured")
                                    presenceData.state = `Featured by ${getName(true)}`;
                                else if (document.querySelector(".gallery .active").textContent.slice(1) === "All")
                                    presenceData.state = `All by ${getName(true)}`;
                            }
                        }
                    }
                    else if (currentPath[1] === "print") {
                        presenceData.details = document.querySelector("h1 .title").textContent;
                        presenceData.state = getName(true);
                    }
                    else if (currentPath[1] === "prints") {
                        presenceData.details = `Viewing a user's prints`;
                        presenceData.state = getName();
                    }
                    else if (currentPath[1] === "posts") {
                        const details = {
                            All: "Viewing a user's posts",
                            Journals: "Viewing a user's journals",
                            "Status Updates": "Viewing a user's statuses",
                            Polls: "Viewing a user's polls"
                        };
                        presenceData.details = details[document.querySelector("._3xmU1 div a").textContent];
                        presenceData.state = getName();
                    }
                    else if (currentPath[1] === "journal") {
                        if (currentPath[2]) {
                            if (websiteTheme === "eclipse") {
                                presenceData.details = document.querySelector("._2-k1X").textContent;
                            }
                            else {
                                if (currentPath[2] === "poll")
                                    document.querySelector("h2").textContent.substr(1, document.querySelector("h2").textContent.length - 2);
                                else
                                    presenceData.details = document.querySelector("h1 .title").textContent;
                            }
                            presenceData.state = `${getName()} (journal)`;
                        }
                        else {
                            presenceData.details = `Viewing a user's journals`;
                            presenceData.state = getName();
                        }
                    }
                    else if (currentPath[1] === "poll") {
                        if (websiteTheme === "eclipse") {
                            try {
                                presenceData.details = document.querySelector("._1ddsf").textContent;
                            }
                            catch {
                                presenceData.details = document.querySelector(".gfMBk").textContent;
                            }
                        }
                        else {
                            presenceData.details = document.querySelector("h2").textContent.substr(1, document.querySelector("h2").textContent.length - 2);
                        }
                        presenceData.state = getName();
                    }
                    else if (currentPath[1] === "critique") {
                        if (currentPath[2]) {
                            presenceData.details = "Viewing a critique";
                            presenceData.state = `from ${getName()}, ${document.querySelector("h2").textContent.trim()} ${document.querySelector("h4").textContent.trim()}`;
                        }
                        else {
                            presenceData.details = "Viewing a user's critiques";
                            presenceData.state = getName();
                        }
                    }
                    else if (currentPath[1] === "wishlist") {
                        presenceData.details = "Viewing a user's wishlist";
                        presenceData.state = getName();
                    }
                    else if (currentPath[1] === "dds") {
                        presenceData.details = "Viewing a user's daily deviations";
                        presenceData.state = getName();
                    }
                    else if (currentPath[1] === "badges") {
                        if (currentPath[2]) {
                            presenceData.details = "Viewing a badge";
                            presenceData.state = `${document.querySelector("h3").textContent} from ${getName()}`;
                        }
                        else {
                            presenceData.details = `Viewing a ${profileType}'s badges`;
                            presenceData.state = getName(true);
                        }
                    }
                    else if (currentPath[1] === "aboutus") {
                        presenceData.details = "Viewing a group's about page";
                        presenceData.state = getName(true);
                    }
                    else if (currentPath[1] === "blog") {
                        presenceData.details = "Viewing a group's blog";
                        presenceData.state = getName(true);
                    }
                    else if (currentPath[0] && !currentPath[1] && getName()) {
                        presenceData.details = `Viewing a ${profileType}'s profile`;
                        if (profileType === "group")
                            presenceData.state = getName(true);
                        else
                            presenceData.state = getName();
                    }
                    else {
                        logHandler.pageNotSupported(true);
                    }
                    console.groupEnd();
                    presenceDataPlaced = presenceData;
                    forceUpdate = false;
                    retries = 0;
                }
                catch (error) {
                    forceUpdate = true;
                    retries++;
                    resetData();
                    presenceData.details = "Loading...";
                    if (retries === 1) {
                        console.groupCollapsed("Loading or retrying...");
                    }
                    console.log(`${retries}/30`);
                    if (retries === 30) {
                        updateCallback.function = () => undefined;
                        logHandler.fatalError(error);
                    }
                }
            }
            else {
                presenceData = presenceDataPlaced;
            }
        };
    }
    else if (currentURL.hostname === "about.deviantart.com") {
        presenceData.details = "Viewing the about pages";
        switch (currentPath[0]) {
            case "":
                presenceData.state = "About";
                break;
            case "policy":
                if (currentPath[1] === "etiquette")
                    presenceData.state = "Etiquette Policy";
                break;
            default:
                logHandler.pageNotSupported(false);
        }
    }
    else if (currentURL.hostname === "chat.deviantart.com") {
        switch (currentPath[0]) {
            case "":
                presenceData.details = "Viewing the chat room list";
                break;
            case "chat":
                presenceData.details = "On a chat room";
                break;
            default:
                logHandler.pageNotSupported(false);
        }
    }
    else if (currentURL.hostname === "forum.deviantart.com") {
        if (currentPath[1]) {
            if (currentPath[2]) {
                presenceData.details = "Viewing a topic";
                presenceData.state = document.querySelector("h1").textContent;
            }
            else {
                presenceData.details = "Viewing a topic category";
                presenceData.state = document.querySelector("h1").textContent;
            }
        }
        else {
            presenceData.details = "Viewing the forums";
        }
    }
    else if (currentURL.hostname === "groups.deviantart.com") {
        presenceData.details = "Looking for a group";
    }
    else if (currentURL.hostname === "portfolio.deviantart.com") {
        presenceData.details = "Creating a portfolio";
    }
    else if (currentURL.hostname === "shop.deviantart.com") {
        if (getURLParam("q")) {
            presenceData.details = "Searching something on the shop";
            presenceData.state = getURLParam("q");
        }
        else {
            presenceData.details = "Viewing deviations on the shop";
            const li = document.querySelectorAll(".browse-facet-product ul li .selected");
            li.forEach(v => {
                if (presenceData.state === undefined)
                    presenceData.state = v.textContent;
                else
                    presenceData.state += ` > ${v.textContent}`;
            });
        }
    }
    else if (currentURL.hostname === "www.deviantartsupport.com") {
        let currentTitle = "", presenceDataPlaced = {};
        updateCallback.function = () => {
            if (currentTitle !== document.title.split(" - ")[0]) {
                currentTitle = document.title.split(" - ")[0];
                presenceData.details = "Viewing the help center/KB";
                presenceData.state = currentTitle;
                presenceDataPlaced = presenceData;
            }
            else {
                presenceData = presenceDataPlaced;
            }
        };
    }
    else if (currentURL.hostname === "www.eclipsefeedback.com") {
        presenceData.details = "Giving feedback about Eclipse";
    }
    else if (currentURL.hostname === "deviantartads.com") {
        presenceData.details = "Viewing the media kit";
    }
    else if (currentURL.hostname === "sta.sh") {
        let loadedPath, forceUpdate = false, presenceDataPlaced = {}, retries = 0;
        updateCallback.function = () => {
            if (loadedPath !== currentPath || forceUpdate) {
                loadedPath = currentPath;
                try {
                    switch (currentPath[0]) {
                        case "":
                            presenceData.details = "On Sta.sh";
                            presenceData.state = "Index";
                            break;
                        case "my":
                            if (currentPath[1] === "settings") {
                                presenceData.details = "On Sta.sh";
                                presenceData.state = "Settings";
                            }
                            else {
                                logHandler.pageNotSupported(true);
                            }
                            break;
                        case "writer":
                            presenceData.details = "On Sta.sh";
                            presenceData.state = "Sta.sh Writer";
                            break;
                        case "muro":
                            presenceData.details = "On Sta.sh";
                            presenceData.state = "DeviantArt muro";
                            break;
                        default:
                            presenceData.details = document.querySelector("title").textContent.split(" - ").slice(0, -1).join(" - ");
                            presenceData.state = `${document.querySelector("title").textContent.split(" - ").pop().split("'s")[0]} (sta.sh)`;
                            if (presenceData.details === "") {
                                throw new Error("No title found on Sta.sh");
                            }
                    }
                    console.groupEnd();
                    presenceDataPlaced = presenceData;
                    forceUpdate = false;
                    retries = 0;
                }
                catch (error) {
                    forceUpdate = true;
                    retries++;
                    resetData();
                    presenceData.details = "Loading...";
                    if (retries === 1) {
                        console.groupCollapsed("Loading or retrying...");
                    }
                    console.log(`${retries}/30`);
                    if (retries === 30) {
                        updateCallback.function = () => undefined;
                        logHandler.fatalError(error);
                    }
                }
            }
            else {
                presenceData = presenceDataPlaced;
            }
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQTtBQUVGLElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQy9DLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JELGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFDN0MsWUFBWSxHQUFpQjtJQUM1QixPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDLGFBQWEsRUFBRSxJQUFJO0lBQ25CLGNBQWMsRUFBRSxhQUFhO0NBQzdCLEVBQ0QsY0FBYyxHQUFHO0lBQ2hCLFNBQVMsRUFBRSxJQUFnQjtJQUMzQixJQUFJLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUE7SUFDdEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLFNBQVM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7SUFDM0IsQ0FBQztJQUNELElBQUksT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUE7SUFDL0IsQ0FBQztDQUNELENBQUE7QUFLRixTQUFTLFNBQVM7SUFDakIsVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDNUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNyRCxZQUFZLEdBQUc7UUFDZCxPQUFPLEVBQUUsNkJBQTZCO1FBQ3RDLGFBQWEsRUFBRSxJQUFJO1FBQ25CLGNBQWMsRUFBRSxhQUFhO0tBQzdCLENBQUE7QUFDRixDQUFDO0FBS0QsSUFBSSxVQUFVLEdBQUc7SUFLaEIsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLEtBQUs7UUFDbEMsSUFBSSxVQUFVO1lBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyx1SEFBdUgsQ0FBQyxDQUFBOztZQUNqSixPQUFPLENBQUMsSUFBSSxDQUFDLHFIQUFxSCxDQUFDLENBQUE7UUFDeEksT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUtELFVBQVUsQ0FBQyxLQUFhO1FBQ3ZCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLDBFQUEwRSxDQUFDLENBQUE7UUFDekYsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM1QixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNuQixDQUFDO0NBQ0QsQ0FBQTtBQU1ELFNBQVMsV0FBVyxDQUFDLFFBQWdCO0lBQ3BDLE9BQU8sVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDN0MsQ0FBQztBQUVELENBQUMsR0FBUyxFQUFFO0lBd0JYLElBQUksVUFBVSxDQUFDLFFBQVEsS0FBSyxvQkFBb0IsRUFBRTtRQUVqRCxJQUFJLFVBQXlCLEVBQzVCLFdBQVcsR0FBRyxLQUFLLEVBQ25CLGtCQUFrQixHQUFpQixFQUFFLEVBQ3JDLE9BQU8sR0FBRyxDQUFDLEVBQ1gsV0FBbUIsRUFDbkIsWUFBb0IsQ0FBQTtRQUdyQixJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxJQUFJO1lBQUUsWUFBWSxHQUFHLFNBQVMsQ0FBQTs7WUFDMUUsWUFBWSxHQUFHLEtBQUssQ0FBQTtRQUd6QixJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1lBQUUsV0FBVyxHQUFHLE9BQU8sQ0FBQTs7WUFDdEQsV0FBVyxHQUFHLE1BQU0sQ0FBQTtRQUV6QixNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQTRCLEVBQU8sRUFBRTtZQUN0RCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQy9CLENBQUMsQ0FBQTtRQUVELE1BQU0sT0FBTyxHQUFHLENBQUMsUUFBUSxHQUFHLEtBQUssRUFBVSxFQUFFO1lBQzVDLElBQUk7Z0JBQ0gsSUFBSSxZQUFZLEtBQUssU0FBUyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUM1QyxJQUFJO3dCQUNILE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDLFdBQVcsQ0FBQTtxQkFDM0c7b0JBQUMsTUFBTTt3QkFDUCxPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUZBQW1GLENBQUMsQ0FBQyxXQUFXLENBQUE7cUJBQzlIO2lCQUNEO3FCQUFNO29CQUNOLElBQUk7d0JBQ0gsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUE7cUJBQzFFO29CQUFDLE1BQU07d0JBQ1AsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQTtxQkFDckQ7aUJBQ0Q7YUFDRDtZQUFDLE1BQU07Z0JBQ1AsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRTtvQkFBRSxPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtxQkFDekssSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUU7b0JBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQzVPO1FBQ0YsQ0FBQyxDQUFBO1FBRUQsY0FBYyxDQUFDLFFBQVEsR0FBRyxHQUFTLEVBQUU7WUFDcEMsSUFBSSxVQUFVLEtBQUssV0FBVyxJQUFJLFdBQVcsRUFBRTtnQkFDOUMsVUFBVSxHQUFHLFdBQVcsQ0FBQTtnQkFFeEIsSUFBSTtvQkFTSCxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQzFCLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUE7cUJBSTlDO3lCQUFNLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLDZCQUE2QixDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsNkJBQTZCLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO3dCQUM1K0MsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQTtxQkFJL0M7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssWUFBWSxFQUFFO3dCQUMzQyxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFBO3dCQUMzQyxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7cUJBRXpOO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLGtCQUFrQixFQUFFO3dCQUNqRCxZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFBO3dCQUNqRCxJQUFJLFlBQVksS0FBSyxTQUFTOzRCQUFFLFlBQVksQ0FBQyxLQUFLLEdBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBdUIsQ0FBQyxLQUFLLENBQUE7OzRCQUM5SCxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7cUJBRWhIO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTt3QkFDekMsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQTt3QkFDakQsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDOzRCQUFFLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7OzRCQUN4RyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtxQkFFL0I7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7d0JBQy9DLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUE7cUJBRS9DO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTt3QkFDdEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUE7cUJBRXRDO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLGFBQWEsRUFBRTt3QkFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQTtxQkFJNUM7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFO3dCQUNwQyxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQTt3QkFDdEMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO3FCQUV6Qzt5QkFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7d0JBQ3ZDLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUE7d0JBQzVDLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO3FCQUVyQzt5QkFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxlQUFlLEVBQUU7d0JBRTlDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU87NEJBQUUsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUE7d0JBQ3RFLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU87NEJBQUUsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQTs7NEJBQzFFLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUE7cUJBRW5EO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTt3QkFFekMsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQTtxQkFFNUM7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUV4QyxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFBO3FCQUVsRDt5QkFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLEVBQUU7d0JBRXpDLFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUE7cUJBRXhDO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTt3QkFDekMsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQTtxQkFFL0M7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssaUJBQWlCLEVBQUU7d0JBQ2hELFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUE7d0JBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUE7cUJBRXRDO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTt3QkFDekMsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQTt3QkFDdkMsWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUE7cUJBRS9CO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksRUFBRTt3QkFDM0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQTtxQkFJdkM7eUJBQU0sSUFBSSxZQUFZLEtBQUssS0FBSyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRTt3QkFDekgsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQ3JCLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUE7NEJBQzVDLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO3lCQUNyQzs2QkFBTTs0QkFDTixZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFBOzRCQUMzQyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsOEJBQThCLENBQUMsQ0FBQTs0QkFDcEUsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO2dDQUFFLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLE1BQU0sUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7aUNBQzdKLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztnQ0FBRSxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsTUFBTSxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtpQ0FDM0ksSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO2dDQUFFLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtpQ0FDcEgsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO2dDQUFFLFlBQVksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBOzRCQUNoRCxZQUFZLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMscUNBQXFDLENBQUMsQ0FBQyxXQUFXLENBQUE7eUJBQy9GO3FCQUVEO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTt3QkFDdEMsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQTtxQkFFL0M7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO3dCQUMxQyxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFBO3FCQVcxQzt5QkFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7d0JBQ3BDLFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7d0JBQ3pHLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTt3QkFFbEcsSUFBSSxZQUFZLENBQUMsT0FBTyxLQUFLLGtCQUFrQixDQUFDLE9BQU8sSUFBSSxZQUFZLENBQUMsS0FBSyxLQUFLLGtCQUFrQixDQUFDLEtBQUs7NEJBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFBO3dCQUMxSyxJQUFJLFlBQVksQ0FBQyxPQUFPLEtBQUssRUFBRTs0QkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUE7cUJBSXhHO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssWUFBWSxFQUFFO3dCQUMzRSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTOzRCQUFFLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxXQUFXLFlBQVksQ0FBQTs7NEJBQ3hGLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxXQUFXLGVBQWUsQ0FBQTt3QkFDbkUsSUFBSSxZQUFZLEtBQUssU0FBUyxJQUFJLFdBQVcsS0FBSyxNQUFNLEVBQUU7NEJBQ3pELFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsT0FBTyxPQUFPLEVBQUUsRUFBRSxDQUFBO3lCQUN4Rjs2QkFBTTs0QkFDTixJQUFJLFdBQVcsS0FBSyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQy9DLFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBOzZCQUNsQztpQ0FBTTtnQ0FDTixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztvQ0FBRSxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxXQUFXLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUE7cUNBQzdJLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVTtvQ0FBRSxZQUFZLENBQUMsS0FBSyxHQUFHLGVBQWUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUE7cUNBQ3ZJLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSztvQ0FBRSxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUE7NkJBQ2xJO3lCQUNEO3FCQUlEO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTt3QkFDdEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQTt3QkFDdEUsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7cUJBRWxDO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTt3QkFDdkMsWUFBWSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQTt3QkFDaEQsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLEVBQUUsQ0FBQTtxQkFFOUI7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxFQUFFO3dCQUN0QyxNQUFNLE9BQU8sR0FBRzs0QkFDZixHQUFHLEVBQUUsd0JBQXdCOzRCQUM3QixRQUFRLEVBQUUsMkJBQTJCOzRCQUNyQyxnQkFBZ0IsRUFBRSwyQkFBMkI7NEJBQzdDLEtBQUssRUFBRSx3QkFBd0I7eUJBQy9CLENBQUE7d0JBQ0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQTt3QkFDbkYsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLEVBQUUsQ0FBQTtxQkFFOUI7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUN4QyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFDbkIsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFO2dDQUMvQixZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFBOzZCQUNwRTtpQ0FBTTtnQ0FDTixJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNO29DQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBOztvQ0FDakksWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQTs2QkFDM0U7NEJBQ0QsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLE9BQU8sRUFBRSxZQUFZLENBQUE7eUJBQzdDOzZCQUFNOzRCQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUE7NEJBQ2xELFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxFQUFFLENBQUE7eUJBQzlCO3FCQUVEO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRTt3QkFDckMsSUFBSSxZQUFZLEtBQUssU0FBUyxFQUFFOzRCQUMvQixJQUFJO2dDQUNILFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUE7NkJBQ3BFOzRCQUFDLE1BQU07Z0NBQ1AsWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQTs2QkFDbkU7eUJBQ0Q7NkJBQU07NEJBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTt5QkFDOUg7d0JBQ0QsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLEVBQUUsQ0FBQTtxQkFFOUI7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxFQUFFO3dCQUN6QyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFDbkIsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQTs0QkFDM0MsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLE9BQU8sRUFBRSxLQUFLLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUE7eUJBQy9JOzZCQUFNOzRCQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsNEJBQTRCLENBQUE7NEJBQ25ELFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxFQUFFLENBQUE7eUJBQzlCO3FCQUVEO3lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTt3QkFDekMsWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQTt3QkFDbEQsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLEVBQUUsQ0FBQTtxQkFFOUI7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFO3dCQUNwQyxZQUFZLENBQUMsT0FBTyxHQUFHLG1DQUFtQyxDQUFBO3dCQUMxRCxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sRUFBRSxDQUFBO3FCQUU5Qjt5QkFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7d0JBRXZDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFOzRCQUNuQixZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFBOzRCQUN4QyxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLFNBQVMsT0FBTyxFQUFFLEVBQUUsQ0FBQTt5QkFDcEY7NkJBQU07NEJBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLFdBQVcsV0FBVyxDQUFBOzRCQUMxRCxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTt5QkFDbEM7cUJBSUQ7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUN4QyxZQUFZLENBQUMsT0FBTyxHQUFHLDhCQUE4QixDQUFBO3dCQUNyRCxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtxQkFFbEM7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO3dCQUNyQyxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFBO3dCQUMvQyxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtxQkFJbEM7eUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxFQUFFLEVBQUU7d0JBQzFELFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxXQUFXLFlBQVksQ0FBQTt3QkFDM0QsSUFBSSxXQUFXLEtBQUssT0FBTzs0QkFBRSxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTs7NEJBQzFELFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxFQUFFLENBQUE7cUJBSW5DO3lCQUFNO3dCQUNOLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtxQkFDakM7b0JBRUQsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFBO29CQUdsQixrQkFBa0IsR0FBRyxZQUFZLENBQUE7b0JBQ2pDLFdBQVcsR0FBRyxLQUFLLENBQUE7b0JBQ25CLE9BQU8sR0FBRyxDQUFDLENBQUE7aUJBRVg7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBRWYsV0FBVyxHQUFHLElBQUksQ0FBQTtvQkFDbEIsT0FBTyxFQUFFLENBQUE7b0JBQ1QsU0FBUyxFQUFFLENBQUE7b0JBQ1gsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUE7b0JBQ25DLElBQUksT0FBTyxLQUFLLENBQUMsRUFBRTt3QkFDbEIsT0FBTyxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO3FCQUNoRDtvQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxLQUFLLENBQUMsQ0FBQTtvQkFFNUIsSUFBSSxPQUFPLEtBQUssRUFBRSxFQUFFO3dCQUNuQixjQUFjLENBQUMsUUFBUSxHQUFHLEdBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQTt3QkFDL0MsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtxQkFDNUI7aUJBRUQ7YUFFRDtpQkFBTTtnQkFDTixZQUFZLEdBQUcsa0JBQWtCLENBQUE7YUFDakM7UUFFRixDQUFDLENBQUE7S0FFRDtTQUFNLElBQUksVUFBVSxDQUFDLFFBQVEsS0FBSyxzQkFBc0IsRUFBRTtRQUUxRCxZQUFZLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFBO1FBRWhELFFBQVEsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3ZCLEtBQUssRUFBRTtnQkFDTixZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQTtnQkFDNUIsTUFBSztZQUNOLEtBQUssUUFBUTtnQkFDWixJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXO29CQUFFLFlBQVksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUE7Z0JBQzNFLE1BQUs7WUFDTjtnQkFDQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDbkM7S0FFRDtTQUFNLElBQUksVUFBVSxDQUFDLFFBQVEsS0FBSyxxQkFBcUIsRUFBRTtRQUV6RCxRQUFRLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUV2QixLQUFLLEVBQUU7Z0JBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQTtnQkFDbkQsTUFBSztZQUVOLEtBQUssTUFBTTtnQkFDVixZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFBO2dCQXlDdkMsTUFBSztZQUVOO2dCQUNDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNuQztLQUVEO1NBQU0sSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLHNCQUFzQixFQUFFO1FBRTFELElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ25CLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNuQixZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFBO2dCQUN4QyxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFBO2FBQzdEO2lCQUFNO2dCQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUE7Z0JBQ2pELFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUE7YUFDN0Q7U0FDRDthQUFNO1lBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQTtTQUMzQztLQUVEO1NBQU0sSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLHVCQUF1QixFQUFFO1FBRTNELFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUE7S0FHNUM7U0FBTSxJQUFJLFVBQVUsQ0FBQyxRQUFRLEtBQUssMEJBQTBCLEVBQUU7UUFDOUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQTtLQUk3QztTQUFNLElBQUksVUFBVSxDQUFDLFFBQVEsS0FBSyxxQkFBcUIsRUFBRTtRQUV6RCxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyQixZQUFZLENBQUMsT0FBTyxHQUFHLGlDQUFpQyxDQUFBO1lBQ3hELFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ3JDO2FBQU07WUFDTixZQUFZLENBQUMsT0FBTyxHQUFHLGdDQUFnQyxDQUFBO1lBQ3ZELE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO1lBQzdFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2QsSUFBSSxZQUFZLENBQUMsS0FBSyxLQUFLLFNBQVM7b0JBQUUsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFBOztvQkFDbkUsWUFBWSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUNqRCxDQUFDLENBQUMsQ0FBQTtTQUNGO0tBRUQ7U0FBTSxJQUFJLFVBQVUsQ0FBQyxRQUFRLEtBQUssMkJBQTJCLEVBQUU7UUFFL0QsSUFBSSxZQUFZLEdBQUcsRUFBRSxFQUNwQixrQkFBa0IsR0FBaUIsRUFBRSxDQUFBO1FBRXRDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsR0FBUyxFQUFFO1lBQ3BDLElBQUksWUFBWSxLQUFLLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNwRCxZQUFZLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzdDLFlBQVksQ0FBQyxPQUFPLEdBQUcsNEJBQTRCLENBQUE7Z0JBQ25ELFlBQVksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFBO2dCQUNqQyxrQkFBa0IsR0FBRyxZQUFZLENBQUE7YUFDakM7aUJBQU07Z0JBQ04sWUFBWSxHQUFHLGtCQUFrQixDQUFBO2FBQ2pDO1FBQ0YsQ0FBQyxDQUFBO0tBRUQ7U0FBTSxJQUFJLFVBQVUsQ0FBQyxRQUFRLEtBQUsseUJBQXlCLEVBQUU7UUFFN0QsWUFBWSxDQUFDLE9BQU8sR0FBRywrQkFBK0IsQ0FBQTtLQUV0RDtTQUFNLElBQUksVUFBVSxDQUFDLFFBQVEsS0FBSyxtQkFBbUIsRUFBRTtRQUV2RCxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFBO0tBRTlDO1NBQU0sSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUU1QyxJQUFJLFVBQXlCLEVBQzVCLFdBQVcsR0FBRyxLQUFLLEVBQ25CLGtCQUFrQixHQUFpQixFQUFFLEVBQ3JDLE9BQU8sR0FBRyxDQUFDLENBQUE7UUFFWixjQUFjLENBQUMsUUFBUSxHQUFHLEdBQVMsRUFBRTtZQUVwQyxJQUFJLFVBQVUsS0FBSyxXQUFXLElBQUksV0FBVyxFQUFFO2dCQUU5QyxVQUFVLEdBQUcsV0FBVyxDQUFBO2dCQUV4QixJQUFJO29CQUNILFFBQVEsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUN2QixLQUFLLEVBQUU7NEJBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUE7NEJBQ2xDLFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFBOzRCQUM1QixNQUFLO3dCQUVOLEtBQUssSUFBSTs0QkFDUixJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLEVBQUU7Z0NBQ2xDLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFBO2dDQUNsQyxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQTs2QkFDL0I7aUNBQU07Z0NBQ04sVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFBOzZCQUNqQzs0QkFDRCxNQUFLO3dCQUVOLEtBQUssUUFBUTs0QkFDWixZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQTs0QkFDbEMsWUFBWSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUE7NEJBQ3BDLE1BQUs7d0JBRU4sS0FBSyxNQUFNOzRCQUNWLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFBOzRCQUNsQyxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFBOzRCQUN0QyxNQUFLO3dCQUVOOzRCQUNDLFlBQVksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7NEJBQ3hHLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUE7NEJBQ2hILElBQUksWUFBWSxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7Z0NBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQTs2QkFDM0M7cUJBRUY7b0JBRUQsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFBO29CQUNsQixrQkFBa0IsR0FBRyxZQUFZLENBQUE7b0JBQ2pDLFdBQVcsR0FBRyxLQUFLLENBQUE7b0JBQ25CLE9BQU8sR0FBRyxDQUFDLENBQUE7aUJBRVg7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBRWYsV0FBVyxHQUFHLElBQUksQ0FBQTtvQkFDbEIsT0FBTyxFQUFFLENBQUE7b0JBQ1QsU0FBUyxFQUFFLENBQUE7b0JBQ1gsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUE7b0JBQ25DLElBQUksT0FBTyxLQUFLLENBQUMsRUFBRTt3QkFDbEIsT0FBTyxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO3FCQUNoRDtvQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxLQUFLLENBQUMsQ0FBQTtvQkFFNUIsSUFBSSxPQUFPLEtBQUssRUFBRSxFQUFFO3dCQUNuQixjQUFjLENBQUMsUUFBUSxHQUFHLEdBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQTt3QkFDL0MsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtxQkFDNUI7aUJBRUQ7YUFFRDtpQkFBTTtnQkFDTixZQUFZLEdBQUcsa0JBQWtCLENBQUE7YUFDakM7UUFFRixDQUFDLENBQUE7S0FFRDtBQUVGLENBQUMsQ0FBQyxFQUFFLENBQUE7QUFFSixJQUFJLGNBQWMsQ0FBQyxPQUFPLEVBQUU7SUFDM0IsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDcEMsU0FBUyxFQUFFLENBQUE7UUFDWCxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDekIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNuQyxDQUFDLENBQUMsQ0FBQTtDQUNGO0tBQU07SUFDTixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtRQUNwQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ25DLENBQUMsQ0FBQyxDQUFBO0NBQ0YifQ==