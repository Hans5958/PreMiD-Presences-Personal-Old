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
    clientId: "655247212728811530",
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
    var raceStamp = null;
    if (currentURL.hostname === "play.typeracer.com") {
        updateCallback.function = () => {
            if (document.querySelector(".gameView")) {
                presenceData.details = "Playing a race";
                var gameStatusLabel = document.querySelector(".gameStatusLabel").textContent;
                if (gameStatusLabel === "Waiting for more people...") {
                    presenceData.state = "Waiting for more people...";
                    if (raceStamp === null)
                        raceStamp = Math.floor(Date.now() / 1000);
                    presenceData.startTimestamp = raceStamp;
                }
                else if (gameStatusLabel === "The race is about to start!") {
                    var timeString = document.querySelector(".countdownPopup .time").textContent;
                    presenceData.state = "Counting down...";
                    presenceData.endTimestamp = Math.floor(Date.now() / 1000) + Number(document.querySelector(".countdownPopup .time").textContent.slice(1));
                    raceStamp = null;
                }
                else if (gameStatusLabel === "The race is on! Type the text below:" || gameStatusLabel === "Go!") {
                    var textBox = document.querySelector("table.gameView > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > div > div");
                    var lettersTotal = textBox.textContent.length;
                    var lettersTyped = 0;
                    for (var i in textBox.children) {
                        if (typeof textBox.children[i] !== "number" && typeof textBox.children[i] !== "function") {
                            if (getComputedStyle(textBox.children[i]).color === "rgb(153, 204, 0)") {
                                lettersTyped += textBox.children[i].textContent.length;
                            }
                        }
                    }
                    var percentage = Math.round((lettersTyped / lettersTotal) * 10000) / 100;
                    var wpm = document.querySelector(".rankPanelWpm-self").textContent.toUpperCase();
                    presenceData.state = `${percentage}%, ${wpm}`;
                    if (raceStamp === null)
                        raceStamp = Math.floor(Date.now() / 1000);
                    presenceData.startTimestamp = raceStamp;
                }
                else if (gameStatusLabel === "The race has ended." || gameStatusLabel.startsWith("You finished")) {
                    presenceData.details = "Just finished with a race";
                    var wpm = document.querySelector(".rankPanelWpm-self").textContent.toUpperCase();
                    var accuracy = document.querySelector(".tblOwnStats > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(2)").textContent;
                    var time = document.querySelector(".tblOwnStats > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2)").textContent;
                    presenceData.state = `${wpm}, ${accuracy} acc., ${time}`;
                    presenceData.startTimestamp = browsingStamp;
                }
            }
            else {
                presenceData.details = "Viewing the home page";
            }
        };
    }
    else if (currentURL.hostname === "data.typeracer.com") {
        if (currentPath[0] === "pit") {
            if (currentPath[1] === "profile") {
                presenceData.details = "Viewing a racer profile";
                presenceData.state = document.querySelector("#profileUsername").textContent || null;
            }
            else if (currentPath[1] === "text_info") {
                presenceData.details = "Viewing a text";
                presenceData.state = currentURL.searchParams.get("id");
            }
            else if (currentPath[1] === "result") {
                presenceData.details = "Viewing a race result";
                presenceData.state = `Race ${currentURL.searchParams.get("id").split("|")[2]} of ${currentURL.searchParams.get("id").split("|")[1].slice(3)}`;
            }
            else if (currentPath[1] === "race_history") {
                presenceData.details = "Viewing someone's race history";
                presenceData.state = currentURL.searchParams.get("user") || null;
            }
            else if (currentPath[1] === "home") {
                presenceData.details = "Viewing the pit stop";
            }
            else if (currentPath[1] === "competitions") {
                presenceData.details = "Viewing the competition result";
                var option = document.querySelector("option[selected]").textContent.trim();
                var strong = document.querySelector("div.themeContent > div:nth-child(5) > strong").textContent.trim().slice(0, -1).split(" ");
                if (option === "day")
                    presenceData.state = strong.join(" ");
                else if (option === "week")
                    presenceData.state = `${strong[1]} ${strong[2]}, ${strong[4]}`;
                else if (option === "month")
                    presenceData.state = `${strong[3]} ${strong[4]}`;
                else if (option === "year")
                    presenceData.state = strong[2];
            }
            else if (currentPath[1] === "login") {
                presenceData.details = "Logging in";
            }
            else {
                var pageNames = {
                    "upgrade_account": "Upgrade your account",
                    "tos": "Terms of Service",
                    "privacy_poicy": "Privacy Policy"
                };
                presenceData.details = "Viewing a page";
                presenceData.state = pageNames[currentPath[1]];
            }
        }
        else if (currentPath[0] === "misc") {
            if (currentPath[1] === "about") {
                presenceData.details = "Viewing a page";
                presenceData.state = "About";
            }
        }
        else if (currentPath[0] === "admin") {
            presenceData.details = "Viewing school admin pages";
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2hCLENBQUMsQ0FBQTtBQUVGLElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQy9DLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JELGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFDN0MsWUFBWSxHQUFpQjtJQUM1QixPQUFPLEVBQVcsNkJBQTZCO0lBQy9DLEtBQUssRUFBVyxTQUFTO0lBQ3pCLGFBQWEsRUFBVyxJQUFJO0lBQzVCLGNBQWMsRUFBVyxhQUFhO0lBQ3RDLFlBQVksRUFBVyxTQUFTO0NBQ2hDLEVBQ0QsY0FBYyxHQUFHO0lBQ2hCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsSUFBSSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxTQUFTO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO0lBQzNCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFBO0lBQy9CLENBQUM7Q0FDRCxDQUFDO0FBRUgsQ0FBQyxHQUFHLEVBQUU7SUFFTCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFFckIsSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLG9CQUFvQixFQUFFO1FBU2pELGNBQWMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBRTlCLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFFeEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQTtnQkFDdkMsSUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQTtnQkFFNUUsSUFBSSxlQUFlLEtBQUssNEJBQTRCLEVBQUU7b0JBQ3JELFlBQVksQ0FBQyxLQUFLLEdBQUcsNEJBQTRCLENBQUE7b0JBQ2pELElBQUksU0FBUyxLQUFLLElBQUk7d0JBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFBO29CQUMvRCxZQUFZLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQTtpQkFFdkM7cUJBQU0sSUFBSSxlQUFlLEtBQUssNkJBQTZCLEVBQUU7b0JBQzdELElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxXQUFXLENBQUE7b0JBQzVFLFlBQVksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUE7b0JBQ3ZDLFlBQVksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ3RJLFNBQVMsR0FBRyxJQUFJLENBQUE7aUJBRWhCO3FCQUFNLElBQUksZUFBZSxLQUFLLHNDQUFzQyxJQUFJLGVBQWUsS0FBSyxLQUFLLEVBQUU7b0JBQ25HLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMseUlBQXlJLENBQUMsQ0FBQTtvQkFDL0ssSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUE7b0JBQzdDLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQTtvQkFDcEIsS0FBSyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO3dCQUMvQixJQUFJLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTs0QkFDekYsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLGtCQUFrQixFQUFFO2dDQUN2RSxZQUFZLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFBOzZCQUN0RDt5QkFDRDtxQkFDRDtvQkFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxHQUFDLFlBQVksQ0FBQyxHQUFDLEtBQUssQ0FBQyxHQUFDLEdBQUcsQ0FBQTtvQkFDbEUsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtvQkFDaEYsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLFVBQVUsTUFBTSxHQUFHLEVBQUUsQ0FBQTtvQkFDN0MsSUFBSSxTQUFTLEtBQUssSUFBSTt3QkFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUE7b0JBQy9ELFlBQVksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFBO2lCQUV2QztxQkFBTSxJQUFJLGVBQWUsS0FBSyxxQkFBcUIsSUFBSSxlQUFlLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUFFO29CQUNuRyxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFBO29CQUNsRCxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFBO29CQUNoRixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHVFQUF1RSxDQUFDLENBQUMsV0FBVyxDQUFBO29CQUMxSCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHVFQUF1RSxDQUFDLENBQUMsV0FBVyxDQUFBO29CQUN0SCxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLFFBQVEsVUFBVSxJQUFJLEVBQUUsQ0FBQTtvQkFDeEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7aUJBQzNDO2FBRUQ7aUJBQU07Z0JBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQTthQUM5QztRQUVGLENBQUMsQ0FBQTtLQUVEO1NBQU0sSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLG9CQUFvQixFQUFFO1FBU3hELElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUU3QixJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQ2pDLFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUE7Z0JBQ2hELFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUE7YUFDbkY7aUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO2dCQUMxQyxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFBO2dCQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQ3REO2lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDdkMsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQTtnQkFDOUMsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7YUFDN0k7aUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssY0FBYyxFQUFFO2dCQUM3QyxZQUFZLENBQUMsT0FBTyxHQUFHLGdDQUFnQyxDQUFBO2dCQUN2RCxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQTthQUNoRTtpQkFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLEVBQUU7Z0JBQ3JDLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUE7YUFDN0M7aUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssY0FBYyxFQUFFO2dCQUM3QyxZQUFZLENBQUMsT0FBTyxHQUFHLGdDQUFnQyxDQUFBO2dCQUN2RCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUMxRSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDhDQUE4QyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQzlILElBQUksTUFBTSxLQUFLLEtBQUs7b0JBQUUsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO3FCQUN0RCxJQUFJLE1BQU0sS0FBSyxNQUFNO29CQUFFLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO3FCQUNyRixJQUFJLE1BQU0sS0FBSyxPQUFPO29CQUFFLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7cUJBQ3hFLElBQUksTUFBTSxLQUFLLE1BQU07b0JBQUUsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDMUQ7aUJBQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxFQUFFO2dCQUN0QyxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQTthQUNuQztpQkFBTTtnQkFDTixJQUFJLFNBQVMsR0FBRztvQkFDZixpQkFBaUIsRUFBRSxzQkFBc0I7b0JBQ3pDLEtBQUssRUFBRSxrQkFBa0I7b0JBQ3pCLGVBQWUsRUFBRSxnQkFBZ0I7aUJBQ2pDLENBQUE7Z0JBQ0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQTtnQkFDdkMsWUFBWSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDOUM7U0FFRDthQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRTtZQUNyQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLEVBQUU7Z0JBQy9CLFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUE7Z0JBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFBO2FBQzVCO1NBQ0Q7YUFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLEVBQUU7WUFDdEMsWUFBWSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQTtTQUNuRDtLQUVEO0FBRUYsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtBQUVKLElBQUksY0FBYyxDQUFDLE9BQU8sRUFBRTtJQUMzQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7UUFDcEMsU0FBUyxFQUFFLENBQUE7UUFDWCxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDekIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNuQyxDQUFDLENBQUEsQ0FBQyxDQUFBO0NBQ0Y7S0FBTTtJQUNOLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtRQUNwQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ25DLENBQUMsQ0FBQSxDQUFDLENBQUE7Q0FDRjtBQUtELFNBQVMsU0FBUztJQUNqQixVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDNUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDckQsWUFBWSxHQUFHO1lBQ2QsT0FBTyxFQUFXLDZCQUE2QjtZQUMvQyxLQUFLLEVBQVcsU0FBUztZQUN6QixhQUFhLEVBQVcsSUFBSTtZQUM1QixjQUFjLEVBQVcsYUFBYTtZQUN0QyxZQUFZLEVBQVcsU0FBUztTQUNoQyxDQUFDO0FBQ0gsQ0FBQyJ9