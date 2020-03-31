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
    clientId: "654906151523057664",
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
    var loadedPath = [], presenceDataPlaced = {};
    updateCallback.function = () => {
        if (loadedPath !== currentPath) {
            loadedPath = currentPath;
            if (currentPath[0] === "") {
                presenceData.details = "Viewing the home page";
            }
            else if (currentPath[0] === "game") {
                presenceData.details = document.querySelector(".game-status[data-qa=map-name] .game-status__body").textContent;
                if (document.querySelector(".result")) {
                    presenceData.state = (Number(document.querySelector(".game-status[data-qa=round-number] .game-status__body").textContent.split(" / ")[0]) + 1) + " of 5, " + document.querySelector(".game-status[data-qa=score] .game-status__body").textContent + " points";
                    if (document.querySelector(".game-status[data-qa=round-number] .game-status__body").textContent.split(" / ")[0] === "5") {
                        presenceData.state = "Finished, " + document.querySelector(".game-status[data-qa=score] .game-status__body").textContent + " points";
                    }
                }
                else {
                    presenceData.state = document.querySelector(".game-status[data-qa=round-number] .game-status__body").textContent.split(" / ")[0] + " of 5, " + document.querySelector(".game-status[data-qa=score] .game-status__body").textContent + " points";
                }
            }
            else if (currentPath[0] === "maps" && !currentPath[1]) {
                presenceData.details = "Looking for a map";
            }
            else if (currentPath[0] === "maps") {
                if (document.querySelector(".map-block__title")) {
                    presenceData.details = "Viewing a map";
                    presenceData.state = document.querySelector(".map-block__title").textContent;
                }
                else {
                    presenceData.details = "Looking for a map";
                }
            }
            else if (currentPath[0] === "user") {
                presenceData.details = "Viewing a user profile";
                presenceData.state = document.querySelector(".profile-summary__nick").textContent;
            }
            else if (currentPath[0] === "daily-challenges") {
                presenceData.details = "Viewing a page";
                presenceData.state = "Daily Challenges";
            }
            else if (currentPath[0] === "pro") {
                presenceData.details = "Viewing a page";
                presenceData.state = "PRO Membership";
            }
            else if (currentPath[0] === "static") {
                var pageNames = {
                    "faq.html": "FAQ",
                    "terms.html": "Terms of Service",
                    "privacy.html": "Privacy Policy"
                };
                presenceData.details = "Viewing a page";
                presenceData.state = pageNames[currentURL.pathname.split("/")[2]];
            }
            else if (currentPath[0] === "me") {
                if (currentPath[2] === undefined) {
                    presenceData.details = "Viewing their own profile";
                }
                else {
                    var pageNames = {
                        "settings": "Settings",
                        "leagues": "Leagues",
                        "activities": "Activities",
                        "current": "Ongoing games",
                        "likes": "Favorite maps",
                        "badges": "Badges",
                        "maps": "My maps",
                        "map-maker": "Map Maker"
                    };
                    presenceData.details = "Viewing a personal page";
                    presenceData.state = pageNames[currentURL.pathname.split("/")[2]];
                }
            }
            else if (currentPath[0] === "signin") {
                presenceData.details = "Signing in";
            }
            else if (currentPath[0] === "signup") {
                presenceData.details = "Registering an account";
            }
            else if (currentPath[0] === "free") {
                presenceData.details = "Viewing a page";
                presenceData.state = "GeoGuessr Free";
            }
            presenceDataPlaced = presenceData;
        }
        else {
            presenceData = presenceDataPlaced;
        }
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2hCLENBQUMsQ0FBQTtBQUVGLElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQy9DLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JELGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFDN0MsWUFBWSxHQUFpQjtJQUM1QixPQUFPLEVBQVcsNkJBQTZCO0lBQy9DLEtBQUssRUFBVyxTQUFTO0lBQ3pCLGFBQWEsRUFBVyxJQUFJO0lBQzVCLGNBQWMsRUFBVyxhQUFhO0lBQ3RDLFlBQVksRUFBVyxTQUFTO0NBQ2hDLEVBQ0QsY0FBYyxHQUFHO0lBQ2hCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsSUFBSSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxTQUFTO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO0lBQzNCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFBO0lBQy9CLENBQUM7Q0FDRCxDQUFDO0FBRUgsQ0FBQyxHQUFHLEVBQUU7SUFFTCxJQUFJLFVBQVUsR0FBRyxFQUFFLEVBQUUsa0JBQWtCLEdBQWlCLEVBQUUsQ0FBQTtJQUUxRCxjQUFjLENBQUMsUUFBUSxHQUFHLEdBQUcsRUFB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