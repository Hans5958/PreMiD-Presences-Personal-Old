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
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title;
var actionURL = new URL(document.location.href);
var title2URL = new URL(document.location.href);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        details: "In construction",
        state: "-",
        largeImageKey: "lg"
    };
    let title = document.querySelector('h1#firstHeading');
    var actionResult = actionURL.searchParams.get("action");
    var title2Result = title2URL.searchParams.get("title");
    if (document.location.pathname == "/wiki/Main_Page") {
        presenceData.state = "Main Page | Home";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.details;
    }
    else if (title && document.location.pathname.includes("/wiki/")) {
        presenceData.details = "Reading about";
        presenceData.state = title.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (actionResult == "history" && title2Result && document.location.pathname.includes("/w/")) {
        presenceData.details = "Viewing revision history";
        if (title2Result.includes("_")) {
            presenceData.state = title2Result.replace(/_/g, " ");
        }
        else {
            presenceData.state = title2Result;
        }
        presenceData.startTimestamp = browsingStamp;
    }
    else if (actionResult == "edit" && title2Result && document.location.pathname.includes("/w/")) {
        presenceData.details = "Editing a page";
        if (title2Result.includes("_")) {
            presenceData.state = title2Result.replace(/_/g, " ");
        }
        else {
            presenceData.state = title2Result;
        }
        presenceData.startTimestamp = browsingStamp;
    }
    presence.setActivity(presenceData);
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2hCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxLQUFhLENBQUM7QUFFbEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoRCxJQUFJLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRWhELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUVwQyxJQUFJLFlBQVksR0FBaUI7UUFDaEMsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixLQUFLLEVBQUUsR0FBRztRQUNWLGFBQWEsRUFBRSxJQUFJO0tBQ25CLENBQUM7SUFFRixJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFFdEQsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEQsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFdkQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxpQkFBaUIsRUFBRTtRQUNwRCxZQUFZLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDO1FBQ3hDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQztLQUM1QjtTQUFNLElBQUksS0FBSyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNsRSxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQTtRQUN0QyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDckMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FDNUM7U0FBTSxJQUFJLFlBQVksSUFBSSxTQUFTLElBQUksWUFBWSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuRyxZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFBO1FBQ2pELElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMvQixZQUFZLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3JEO2FBQU07WUFDTixZQUFZLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztTQUNsQztRQUNELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBQzVDO1NBQU0sSUFBSSxZQUFZLElBQUksTUFBTSxJQUFJLFlBQVksSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDaEcsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQTtRQUN2QyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNyRDthQUFNO1lBQ04sWUFBWSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7U0FDbEM7UUFDRCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUM1QztJQUNELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQU9ILFNBQVMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsYUFBcUI7SUFDOUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2hELENBQUMifQ==