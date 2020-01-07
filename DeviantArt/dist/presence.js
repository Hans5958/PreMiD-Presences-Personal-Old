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
    clientId: "662312595239469097",
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
    var currentPath = "", forceUpdate = false, path = [""], presenceDataPlaced = {};
    if (document.querySelector("table#overhead") === null)
        var websiteTheme = "eclipse";
    else
        var websiteTheme = "old";
    if (document.querySelector("#group"))
        var profileType = "group";
    else
        var profileType = "user";
    updateCallback.function = () => {
        path = document.location.pathname.slice(1).split("/");
        if (currentPath !== document.location.pathname || forceUpdate) {
            currentPath = document.location.pathname;
            try {
                if (path[0] === "") {
                    presenceData.details = "Viewing the home page";
                }
                else if (document.querySelector(".error-404") || document.querySelector("#error-404")) {
                    presenceData.details = "On a non-existent page";
                }
                else if (path[0] === "deviations") {
                    presenceData.details = "Viewing deviations";
                    presenceData.state = path.slice(1).concat((new URL(document.location)).searchParams.get("order")).join(" > ").replace(/-/g, ' ').toLowerCase().split(' ').map(w => w.replace(w[0], w[0].toUpperCase())).join(' ');
                }
                else if (path[0] === "daily-deviations") {
                    presenceData.details = "Viewing daily deviations";
                    if (websiteTheme === "eclipse")
                        presenceData.state = document.querySelector("#daily-deviation-picker").value;
                    else
                        presenceData.state = document.querySelector(".dailyDevCurDate").textContent.split(", ").slice(1).join(", ");
                }
                else if (path[0] === "journals") {
                    presenceData.details = "Viewing daily deviations";
                    if (path[1])
                        presenceData.state = path[1].replace(path[1], path[1].toUpperCase());
                    else
                        presenceData.state = "All";
                }
                else if (path[0] === "status-updates") {
                    presenceData.details = "Viewing status updates";
                }
                else if (path[0] === "polls") {
                    presenceData.details = "Viewing polls";
                }
                else if (path[0] === "commissions") {
                    presenceData.details = "Viewing commissions";
                }
                else if (path[0] === "tag") {
                    presenceData.details = "Viewing a tag";
                    presenceData.state = `#${path[1]}`;
                }
                else if (path[0] === "notifications") {
                    if (path[1] === "notes")
                        presenceData.details = "Reading notes";
                    if (path[1] === "watch")
                        presenceData.details = "Viewing the watch list";
                    else
                        presenceData.details = "Reading notifications";
                }
                else if (path[0] === "settings") {
                    presenceData.details = "Doing some settings";
                }
                else if (path[0] === "account") {
                    presenceData.details = "Viewing the account settings";
                }
                else if (path[0] === "core-membership") {
                    presenceData.details = "Viewing a page";
                    presenceData.state = "Core Membership";
                }
                else if (websiteTheme === "old" && document.querySelector(".newbrowse")) {
                    presenceData.details = "Viewing deviations";
                    var li = document.querySelectorAll(".browse-facet-category ul li");
                    if (path[3])
                        presenceData.state = `${li[1].textContent} > ${li[2].textContent} > ${document.querySelector(".search-stats").textContent.trim().slice(7)} > `;
                    else if (path[2])
                        presenceData.state = `${li[1].textContent} > ${document.querySelector(".search-stats").textContent.trim().slice(7)} > `;
                    else if (path[1])
                        presenceData.state = `${document.querySelector(".search-stats").textContent.trim().slice(7)} > `;
                    else if (path[0])
                        presenceData.state = '';
                    presenceData.state += document.querySelector(".browse-facet-order ul li .selected").textContent;
                }
                else if (path[1] === "art") {
                    if (websiteTheme === "eclipse") {
                        presenceData.details = document.querySelector("h1").textContent;
                    }
                    else {
                        presenceData.details = document.querySelector("h1 .title").textContent;
                    }
                    presenceData.state = getName();
                }
                else if (path[1] === "gallery" || path[1] === "favourites") {
                    if (path[1] === "gallery")
                        presenceData.details = `Viewing a ${profileType}'s gallery`;
                    else
                        presenceData.details = `Viewing a ${profileType}'s favourites`;
                    if (websiteTheme === "eclipse" && profileType === "user") {
                        presenceData.state = `${document.querySelector("h2.uUWfu").textContent} by ${getName()}`;
                    }
                    else {
                        if (profileType === "group" && !path[2]) {
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
                else if (path[1] === "print") {
                    presenceData.details = document.querySelector("h1 .title").textContent;
                    presenceData.state = getName(true);
                }
                else if (path[1] === "prints") {
                    presenceData.details = `Viewing a user's prints`;
                    presenceData.state = getName();
                }
                else if (path[1] === "posts") {
                    const details = {
                        "All": "Viewing a user's posts",
                        "Journals": "Viewing a user's journals",
                        "Status Updates": "Viewing a user's statuses",
                        "Polls": "Viewing a user's polls"
                    };
                    presenceData.details = details[document.querySelector("._3xmU1 div a").textContent];
                    presenceData.state = getName();
                }
                else if (path[1] === "journal") {
                    if (path[2]) {
                        if (websiteTheme === "eclipse") {
                            presenceData.details = document.querySelector("._2-k1X").textContent;
                        }
                        else {
                            if (path[2] === "poll")
                                document.querySelector("h2").textContent.substr(1, document.querySelector("h2").textContent.length - 2);
                            else
                                presenceData.details = document.querySelector("h1 .title").textContent;
                        }
                    }
                    else {
                        presenceData.details = `Viewing a user's journals`;
                    }
                    presenceData.state = getName();
                }
                else if (path[1] === "poll") {
                    if (websiteTheme === "eclipse") {
                        try {
                            presenceData.details = document.querySelector("._1ddsf").textContent;
                        }
                        catch (_a) {
                            presenceData.details = document.querySelector(".gfMBk").textContent;
                        }
                    }
                    else {
                        presenceData.details = document.querySelector("h2").textContent.substr(1, document.querySelector("h2").textContent.length - 2);
                    }
                    presenceData.state = getName();
                }
                else if (path[1] === "badges") {
                    if (path[2]) {
                        presenceData.details = "Viewing a badge";
                        presenceData.state = `${document.querySelector("h3").textContent} from ${getName()}`;
                    }
                    else {
                        presenceData.details = `Viewing a ${profileType}'s badges`;
                        presenceData.state = getName(true);
                    }
                }
                else if (path[1] === "aboutus") {
                    presenceData.details = "Viewing a group's about page";
                    presenceData.state = getName(true);
                }
                else if (path[1] === "blog") {
                    presenceData.details = "Viewing a group's blog";
                    presenceData.state = getName(true);
                }
                else if (path[0] && !path[1]) {
                    try {
                        presenceData.details = `Viewing a ${profileType}'s profile`;
                        presenceData.state = getName(true);
                    }
                    catch (_b) {
                        console.log("Whoops. Seems this page is not supported. Please contact Hans5958#0969 to request a support for this page.");
                    }
                }
                else {
                    console.log("Whoops. Seems this page is not supported. Please contact Hans5958#0969 to request a support for this page.");
                }
                presenceDataPlaced = presenceData;
                forceUpdate = false;
            }
            catch (error) {
                forceUpdate = true;
                console.log(error);
            }
        }
        else {
            presenceData = presenceDataPlaced;
        }
    };
    function getName(override = false) {
        if (websiteTheme === "eclipse" && !override) {
            return document.querySelector("._2Lxll").textContent;
        }
        else {
            try {
                return document.querySelector("h1 .author .u .u").textContent;
            }
            catch (_a) {
                return document.querySelector("h1 .u .u").textContent;
            }
        }
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
var test = {};
function cleanData() {
    Object.keys(presenceData).forEach(key => {
        if (presenceData[key] === null)
            delete presenceData[key];
    });
    if (test !== presenceData) {
        console.log(presenceData);
        test = presenceData;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2hCLENBQUMsQ0FBQTtBQUVGLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUNoRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxHQUFHO0lBQ2QsT0FBTyxFQUFXLGlCQUFpQjtJQUNuQyxLQUFLLEVBQVcsSUFBSTtJQUNwQixhQUFhLEVBQVcsSUFBSTtJQUM1QixjQUFjLEVBQVcsYUFBYTtJQUN0QyxZQUFZLEVBQVcsSUFBSTtDQUMzQixFQUNELGNBQWMsR0FBRztJQUNoQixTQUFTLEVBQUUsSUFBSTtJQUNmLElBQUksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtJQUMzQixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQTtJQUMvQixDQUFDO0NBQ0QsQ0FBQztBQUVILENBQUMsR0FBRyxFQUFFO0lBZ0JMLElBQUksV0FBVyxHQUFHLEVBQUUsRUFBRSxXQUFXLEdBQUcsS0FBSyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLGtCQUFrQixHQUFHLEVBQUUsQ0FBQTtJQUUvRSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxJQUFJO1FBQUUsSUFBSSxZQUFZ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