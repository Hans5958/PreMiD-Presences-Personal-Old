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
    clientId: "644400074008297512",
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
    if (currentURL.host === "www.fandom.com") {
        if (currentPath[0] === "/") {
            presenceData.state = "Index";
            delete presenceData.details;
        }
        else if (currentPath[0] === "signin") {
            presenceData.details = "Signing in";
        }
        else if (currentPath[0] === "register") {
            presenceData.details = "Registering an account";
            delete presenceData.details;
        }
        else if (currentPath[0] === "articles") {
            presenceData.details = "Reading an article";
            presenceData.state = document.querySelector(".article-header__title").textContent;
        }
        else if (currentPath[0] === "topics") {
            presenceData.details = "Viewing a topic";
            presenceData.state = document.querySelector(".topic-header__title").firstElementChild.innerHTML;
        }
        else if (currentPath[0] === "video") {
            updateCallback.function = () => {
                presenceData.details = "Watching a video";
                presenceData.state = document.querySelector(".video-page-featured-player__title").textContent;
                try {
                    if (document.querySelector(".jw-icon-playback").getAttribute("aria-label") === "Pause") {
                        var video = document.querySelector(".jw-video");
                        var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
                        presenceData.startTimestamp = timestamps[0];
                        presenceData.endTimestamp = timestamps[1];
                    }
                    else {
                        delete presenceData.startTimestamp;
                        delete presenceData.endTimestamp;
                    }
                }
                catch (e) {
                    delete presenceData.startTimestamp;
                    delete presenceData.endTimestamp;
                }
            };
        }
        else if (currentPath[0] === "curated") {
            presenceData.details = "Viewing a curation";
            presenceData.state = document.querySelector(".card__title").textContent;
        }
        else if (currentPath[0] === "u") {
            presenceData.details = "Viewing a profile page";
            presenceData.state = `${document.querySelector(".profile-info-card__name").textContent} (${document.querySelector(".profile-info-card__username").textContent})`;
        }
        else {
            presenceData.details = "Viewing a page";
            if (currentPath[0] === "explore")
                presenceData.state = "Explore";
            else if (currentPath[0] === "about")
                presenceData.state = "About";
            else if (currentPath[0] === "carriers")
                presenceData.state = "Carriers";
            else if (currentPath[0] === "terms-of-use")
                presenceData.state = "Terms of Use";
            else if (currentPath[0] === "privacy-policy")
                presenceData.state = "Privacy Policy";
            else if (currentPath[0] === "mediakit")
                presenceData.state = "Media Kit";
            else if (currentPath[0] === "local-sitemap")
                presenceData.state = "Local Sitemap";
        }
    }
    else if (currentPath.includes("wiki")) {
        var title, sitename, actionResult = getURLParam("action") || getURLParam("veaction"), titleFromURL = () => {
            var raw, lang;
            if (currentPath[0] === "wiki") {
                raw = currentURL.pathname.slice(6);
            }
            else {
                lang = currentPath[0];
                raw = currentPath[2];
            }
            if (raw.includes("_"))
                return raw.replace(/_/g, " ");
            else
                return raw;
        };
        try {
            title = document.querySelector('.page-header__title').innerHTML;
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
            "Category talk": "Viewing a category talk page",
            "Blog": "Viewing a blog",
            "Message Wall": "Viewing a message wall",
            "Thread": "Viewing a forum thread",
            "Board": "Viewing a forum board",
            "Topic": "Viewing a forum topic",
        };
        if (title === "Home") {
            sitename = document.querySelector("meta[property='og:title']").content;
            presenceData.state = "Home";
            delete presenceData.details;
        }
        else if (actionResult == "history") {
            presenceData.details = "Viewing revision history";
            presenceData.state = titleFromURL();
        }
        else if (actionResult == "edit") {
            if (currentURL.searchParams.has("action"))
                title = document.querySelector("#EditPageHeader").children[2].textContent;
            presenceData.details = "Editing a wiki page";
            presenceData.state = titleFromURL();
        }
        else if (currentURL.pathname.includes("User_blog:")) {
            if (title) {
                presenceData.details = "Reading a user blog post";
                presenceData.state = title + " by " + document.querySelector(".page-header__blog-post-details").firstElementChild.textContent;
            }
            else {
                presenceData.details = "Viewing a user blog";
                presenceData.state = titleFromURL();
            }
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
    else if (currentPath[0] === "f") {
        var sitename = document.querySelector("meta[property='og:title']").content.substring(25).replace(" | Fandom", "");
        updateCallback.function = () => {
            if (!currentPath[1]) {
                presenceData.details = "Viewing the discussion page";
                presenceData.state = sitename;
            }
            else if (currentPath[1] === "p") {
                presenceData.details = "Reading an discussion post";
                presenceData.state = `${document.querySelector(".post__title").textContent} | ${sitename}`;
            }
            else if (currentPath[1] === "u") {
                presenceData.details = "Viewing a discussion user page";
                presenceData.state = `${document.querySelector(".user-overview__username").textContent} | ${sitename}`;
            }
        };
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
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
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
function getURLParam(urlParam) {
    return currentURL.searchParams.get(urlParam);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2hCLENBQUMsQ0FBQTtBQUVGLElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQy9DLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JELGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFDN0MsWUFBWSxHQUFpQjtJQUM1QixPQUFPLEVBQVcsNkJBQTZCO0lBQy9DLEtBQUssRUFBVyxTQUFTO0lBQ3pCLGFBQWEsRUFBVyxJQUFJO0lBQzVCLGNBQWMsRUFBVyxhQUFhO0lBQ3RDLFlBQVksRUFBVyxTQUFTO0NBQ2hDLEVBQ0QsY0FBYyxHQUFHO0lBQ2hCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsSUFBSSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxTQUFTO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO0lBQzNCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFBO0lBQy9CLENBQUM7Q0FDRCxDQUFDO0FBRUgsQ0FBQyxHQUFHLEVBQUU7SUFFTCxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssZ0JBQWdCLEVBQUU7UUFTekMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1lBQzNCLFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFBO1lBQzVCLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQTtTQUMzQjthQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUN2QyxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQTtTQUNuQzthQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTtZQUN6QyxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFBO1lBQy9DLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQTtTQUMzQjthQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTtZQUN6QyxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFBO1lBQzNDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQTtTQUNqRjthQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUN2QyxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFBO1lBQ3hDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQTtTQUMvRjthQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTtZQUN0QyxjQUFjLENBQUMsUUFBUSxHQUFHLEdBQUcsRUFBRTtnQkFDOUIsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQTtnQkFDekMsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG9DQUFvQyxDQUFDLENBQUMsV0FBVyxDQUFBO2dCQUM3RixJQUFJO29CQUNILElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxPQUFPLEVBQUU7d0JBQ3ZGLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUE7d0JBQy9DLElBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO3dCQUN6RixZQUFZLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTt3QkFDM0MsWUFBWSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7cUJBQ3pDO3lCQUFNO3dCQUNOLE9BQU8sWUFBWSxDQUFDLGNBQWMsQ0FBQTt3QkFDbEMsT0FBTyxZQUFZLENBQUMsWUFBWSxDQUFBO3FCQUNoQztpQkFDRDtnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFDWCxPQUFPLFlBQVksQ0FBQyxjQUFjLENBQUE7b0JBQ2xDLE9BQU8sWUFBWSxDQUFDLFlBQVksQ0FBQTtpQkFDaEM7WUFDRixDQUFDLENBQUE7U0FDRDthQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUN4QyxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFBO1lBQzNDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENBQUE7U0FDdkU7YUFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDbEMsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQTtZQUMvQyxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLFdBQVcsS0FBSyxRQUFRLENBQUMsYUFBYSxDQUFDLDhCQUE4QixDQUFDLENBQUMsV0FBVyxHQUFHLENBQUE7U0FDaEs7YUFBTTtZQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUE7WUFDdkMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUztnQkFBRSxZQUFZLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQTtpQkFDM0QsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTztnQkFBRSxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQTtpQkFDNUQsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVTtnQkFBRSxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQTtpQkFDbEUsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssY0FBYztnQkFBRSxZQUFZLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQTtpQkFDMUUsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssZ0JBQWdCO2dCQUFFLFlBQVksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUE7aUJBQzlFLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVU7Z0JBQUUsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUE7aUJBQ25FLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLGVBQWU7Z0JBQUUsWUFBWSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUE7U0FDakY7S0FFRDtTQUFNLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQVF4QyxJQUFJLEtBQWEsRUFDaEIsUUFBZ0IsRUFDaEIsWUFBWSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQy9ELFlBQVksR0FBRyxHQUFHLEVBQUU7WUFDcEIsSUFBSSxHQUFXLEVBQUUsSUFBWSxDQUFBO1lBQzdCLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRTtnQkFDOUIsR0FBRyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ2xDO2lCQUFNO2dCQUNOLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ3JCLEdBQUcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDcEI7WUFDRCxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7O2dCQUMvQyxPQUFPLEdBQUcsQ0FBQTtRQUNoQixDQUFDLENBQUE7UUFFRCxJQUFJO1lBQ0gsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQyxTQUFTLENBQUE7U0FDL0Q7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNYLEtBQUssR0FBRyxZQUFZLEVBQUUsQ0FBQTtTQUN0QjtRQUVELElBQUk7WUFDSCxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtTQUMxRTtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1gsUUFBUSxHQUFHLElBQUksQ0FBQTtTQUNmO1FBRUQsSUFBSSxnQkFBZ0IsR0FBRztZQUN0QixPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFNBQVMsRUFBRSx3QkFBd0I7WUFDbkMsTUFBTSxFQUFFLHFCQUFxQjtZQUM3QixNQUFNLEVBQUUscUJBQXFCO1lBQzdCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsQ0FBQyxRQUFRLENBQUMsRUFBRSx3QkFBd0I7WUFDcEMsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEVBQUUsNkJBQTZCO1lBQ25ELE1BQU0sRUFBRSxnQkFBZ0I7WUFDeEIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLGdCQUFnQixFQUFFLCtCQUErQjtZQUNqRCxVQUFVLEVBQUUsb0JBQW9CO1lBQ2hDLGVBQWUsRUFBRSx5QkFBeUI7WUFDMUMsTUFBTSxFQUFFLHFCQUFxQjtZQUM3QixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFVBQVUsRUFBRSxvQkFBb0I7WUFDaEMsZUFBZSxFQUFFLDhCQUE4QjtZQUMvQyxNQUFNLEVBQUUsZ0JBQWdCO1lBQ3hCLGNBQWMsRUFBRSx3QkFBd0I7WUFDeEMsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLE9BQU8sRUFBRSx1QkFBdUI7U0FDaEMsQ0FBQTtRQUVELElBQUksS0FBSyxLQUFLLE1BQU0sRUFBRTtZQUNyQixRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtZQUN0RSxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQTtZQUMzQixPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUE7U0FDM0I7YUFBTSxJQUFJLFlBQVksSUFBSSxTQUFTLEVBQUU7WUFDckMsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQTtZQUNqRCxZQUFZLENBQUMsS0FBSyxHQUFHLFlBQVksRUFBRSxDQUFBO1NBQ25DO2FBQU0sSUFBSSxZQUFZLElBQUksTUFBTSxFQUFFO1lBQ2xDLElBQUksVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO2dCQUFFLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQTtZQUNwSCxZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFBO1lBQzVDLFlBQVksQ0FBQyxLQUFLLEdBQUcsWUFBWSxFQUFFLENBQUE7U0FDbkM7YUFBTSxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3RELElBQUksS0FBSyxFQUFFO2dCQUNWLFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUE7Z0JBQ2pELFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlDQUFpQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFBO2FBQzdIO2lCQUFNO2dCQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUE7Z0JBQzVDLFlBQVksQ0FBQyxLQUFLLEdBQUcsWUFBWSxFQUFFLENBQUE7YUFDbkM7U0FDRDthQUFNO1lBQ04sSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFFLFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBOztnQkFDbEcsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQTtZQUNqRCxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtTQUMxQjtRQUVELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBQzNDLFlBQVksQ0FBQyxLQUFLLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQTtLQUV0QztTQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtRQVNsQyxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBRWpILGNBQWMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BCLFlBQVksQ0FBQyxPQUFPLEdBQUcsNkJBQTZCLENBQUE7Z0JBQ3BELFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFBO2FBQzdCO2lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtnQkFDbEMsWUFBWSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQTtnQkFDbkQsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxNQUFNLFFBQVEsRUFBRSxDQUFBO2FBQzFGO2lCQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtnQkFDbEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQ0FBZ0MsQ0FBQTtnQkFDdkQsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxXQUFXLE1BQU0sUUFBUSxFQUFFLENBQUE7YUFDdEc7UUFDRixDQUFDLENBQUE7S0FFRDtBQUVGLENBQUMsQ0FBQyxFQUFFLENBQUE7QUFFSixJQUFJLGNBQWMsQ0FBQyxPQUFPLEVBQUU7SUFDM0IsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO1FBQ3BDLFNBQVMsRUFBRSxDQUFBO1FBQ1gsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ3pCLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDbkMsQ0FBQyxDQUFBLENBQUMsQ0FBQTtDQUNGO0tBQU07SUFDTixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7UUFDcEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNuQyxDQUFDLENBQUEsQ0FBQyxDQUFBO0NBQ0Y7QUFPRCxTQUFTLGFBQWEsQ0FBQyxTQUFpQixFQUFFLGFBQXFCO0lBQzlELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUMxQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFBO0lBQ3RFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUMvQyxDQUFDO0FBS0QsU0FBUyxTQUFTO0lBQ2pCLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUM1QyxXQUFXLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNyRCxZQUFZLEdBQUc7WUFDZCxPQUFPLEVBQVcsNkJBQTZCO1lBQy9DLEtBQUssRUFBVyxTQUFTO1lBQ3pCLGFBQWEsRUFBVyxJQUFJO1lBQzVCLGNBQWMsRUFBVyxhQUFhO1lBQ3RDLFlBQVksRUFBVyxTQUFTO1NBQ2hDLENBQUM7QUFDSCxDQUFDO0FBTUQsU0FBUyxXQUFXLENBQUMsUUFBZ0I7SUFDcEMsT0FBTyxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUM3QyxDQUFDIn0=