let currentSong = new Audio();
let index = null;
let hmbg = document.getElementById("hambg")

function hambgMenu() {
    document.getElementsByClassName("bLeft")[0].style.left = `0`
    document.getElementById("crossBt").style.display = `block`;
}
hmbg.addEventListener("click", hambgMenu)

function setSongInfo(songSrc = currentSong.src) {
    let sName = songSrc.split("Project/")[1].split("(")[0].replaceAll("%20", " ").split(".")[0];
    document.getElementById("songInf").innerHTML = `<div class="songName" style="color: rgb(255, 255, 255);">${sName}</div>
    <div class="artist">Aamod Jain</div>`
}

document.getElementById("crossBt").addEventListener("click", () => {
    document.getElementsByClassName("bLeft")[0].style.left = `-100vw`
    document.getElementById("crossBt").style.display = `none`;
})

function setDur() {
    let time = currentSong.duration;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    document.getElementById("totalT").innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function addSC(url, title, desp, scbID, song) {
    let sc = document.createElement("div")
    sc.className = "sc"
    sc.innerHTML = `<div class="scPic"><button class="play"><audio src="${song}"></audio><svg height = 28px width = 28px  data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 bneLcE"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg></button><img src="${url}" alt=""></div>
    <div class="scTitle font16">${title}</div>
    <div class="scDesp font14">${desp}</div>`
    document.getElementById(`${scbID}`).append(sc);
}

function addBC(title, id) {
    let bc = document.createElement("div")
    bc.className = "bigCard"
    bc.id = `bc_${id}`
    bc.innerHTML = `<div class="heading">
    <div class="title">${title}</div>
    <div class="showAllBt font14"><a href="">Show all</a></div>
</div>
<div id="scb_${id}" class="scBox">
    
</div>`;
    document.getElementById("bcb").append(bc);
}

addSC("https://i.scdn.co/image/ab67706f000000028998614b3281e12596844039", "Night Rain", "Sleep with sounds of pouring rain and occasional rolling thunder.", "scb_c1", "")

addBC(`<a href="">Spotify Playlists</a> `, "c2")

addSC("https://i.scdn.co/image/ab67706f000000027e858e4098c8a256ca51d770", "lofi sleep", "Instrumental beats for a restful night's sleep.", "scb_c1", "")

addSC("	https://i.scdn.co/image/ab67706f000000027da11e4e02c0da2f543ea20f", "Deep Sleep", "Soothing, minimalist ambient for deep sleep.", "scb_c1", "")

addSC("		https://i.scdn.co/image/ab67706f00000002e3c324443862abeb46220f00", "White Noise 10 Hours", "Ten hours long continuous white noise to help you relax and let go. ", "scb_c1", "")

addSC("	https://i.scdn.co/image/ab67616d00001e025f3ede47954a93aa03efe5f9", `<a href="">ANIMAL</a>`, `<a draggable="false" dir="auto" href="/artist/3pQ4aA7dkolyjUAMrVScgh">Manan Bhardwaj</a>, <a draggable="false" dir="auto" href="/artist/5wJ1H6ud777odtZl5gG507">Vishal Mishra</a>, <a draggable="false" dir="auto" href="/artist/5gZhfbckaWo89OzDSk3gdT">Jaani</a>`, "scb_c2", "http://127.0.0.1:3000/songs_spotifyProject/Shikayat(PaglaSongs).mp3")

addSC("https://i.scdn.co/image/ab67616d00001e020d3449f333a83a25feb423f8", "Husn", "Anuv Jain", "scb_c2", "http://127.0.0.1:3000/songs_spotifyProject/Husn(PagalWorld.com.pe).mp3")


async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs_spotifyProject/")
    at = await a.text();
    let div = document.createElement("div");
    div.innerHTML = at;
    let s = div.getElementsByTagName("a")
    let songs = []
    for (const item of s) {
        if (item.href.endsWith(".mp3")) {
            songs.push(item.href)
        }
    }
    return songs;
}

async function playSongLib() {
    let songs = await getSongs();
    let ul = document.createElement("ul");

    for (const song of songs) {
        let sName = song.split("Project/")[1].split("(")[0].replaceAll("%20", " ");
        ul.innerHTML += `<li><audio src="${song}"></audio>${sName}</li>`;
    }
    let div = document.createElement("div");
    div.className = "sec";
    div.innerHTML = ul.outerHTML;
    document.getElementById("songLibrary").prepend(div)
}

async function addSidePlayCard() {
    const songs = await getSongs();
    for (const song of songs) {
        let sName = song.split("Project/")[1].split("(")[0].replaceAll("%20", " ").replace(".mp3", "");
        let div = document.createElement("div");
        div.className = "sec";
        div.innerHTML = `<div class="sidePlayCard">
            <div class="details">
                <div class="pic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36"
                        height="36" color="rgb(255, 255, 255)" fill="none">
                        <path
                            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                            stroke="currentColor" stroke-width="1.5" />
                        <path
                            d="M10 15.5C10 16.3284 9.32843 17 8.5 17C7.67157 17 7 16.3284 7 15.5C7 14.6716 7.67157 14 8.5 14C9.32843 14 10 14.6716 10 15.5ZM10 15.5V11C10 10.1062 10 9.65932 10.2262 9.38299C10.4524 9.10667 10.9638 9.00361 11.9865 8.7975C13.8531 8.42135 15.3586 7.59867 16 7V13.5M16 13.75C16 14.4404 15.4404 15 14.75 15C14.0596 15 13.5 14.4404 13.5 13.75C13.5 13.0596 14.0596 12.5 14.75 12.5C15.4404 12.5 16 13.0596 16 13.75Z"
                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg></div>
                <div class="sText">
                    <div class="songName" style="color: rgb(255, 255, 255);">${sName}</div>
                    <div class="artist">Aamod Jain</div>
                </div>
            </div>
            <div class="control">
                <button class="sidebarPlayBt"><audio src="${song}"></audio><svg height=20px width=20px data-encore-id="icon"
                        role="img" aria-hidden="true" viewBox="0 0 24 24"
                        class="Svg-sc-ytk21e-0 bneLcE">
                        <path
                            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                        </path>
                    </svg></button>
            </div>
        </div>`
        document.getElementById("songLibrary").prepend(div)
    }
}
Array.from(document.getElementsByClassName("play")).forEach(e => {
    e.addEventListener("click", () => {
        console.log(6969);
        playSong(e)
        if (currentSong.paused) {
            e.classList.remove("hover-effect")
            e.getElementsByTagName("svg")[0].innerHTML = `<path
            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
        </path>`
        }
        else {
            e.classList.add("hover-effect")
            e.getElementsByTagName("svg")[0].innerHTML = `<path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>`
        }
    })
})
function playSong(e) {

    if (currentSong.src) {
        if (currentSong.src == e.getElementsByTagName("audio")[0].src) {
            if (currentSong.paused) {
                document.getElementById("playPauseS").innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>`;
                currentSong.play();

            }
            else {
                document.getElementById("playPauseS").innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>`;
                currentSong.pause();
            }
        }
        else {
            currentSong.src = e.getElementsByTagName("audio")[0].src;
            document.getElementById("playPauseS").innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>`;
            currentSong.play()
        }

    }
    else {
        currentSong.src = e.getElementsByTagName("audio")[0].src;
        document.getElementById("playPauseS").innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>`;
        currentSong.play()
    }
    // console.log(1);
    console.log(e);
    setSongInfo();
    setDur();
}
async function main() {
    console.log('here');
    await addSidePlayCard();
    let songsArray = Array.from(document.querySelectorAll(".sidebarPlayBt"));
    songsArray.forEach(e => {
        e.addEventListener("click", () => {
            index = songsArray.indexOf(e);
            console.log(index);
            playSong(e)
        })
    })
}
main()

function ppSong(e = "http://127.0.0.1:3000/songs_spotifyProject/Sunn%20Raha%20Hai%20(Male).mp3") {
    if (currentSong.src) {
        if (currentSong.paused) {
            document.getElementById("playPauseS").innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>`;
            // setDur();
            currentSong.play();
        }
        else {
            document.getElementById("playPauseS").innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>`;
            // setDur();
            currentSong.pause();
        }
    }
    else {
        currentSong.src = e;
        index = 0;
        document.getElementById("playPauseS").innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>`;
        // setDur();
        currentSong.play()
    }
    setSongInfo();
    setDur();
}

function nSong() {
    if (!currentSong.src) {
        ppSong();
    }
    else {
        // await addSidePlayCard();
        let songsArray = Array.from(document.querySelectorAll(".sidebarPlayBt"));
        index++;
        if (index > songsArray.length - 1) { index = (index % (songsArray.length - 1)) - 1; } // songArray.length - 1 : kyoki ek sidecard faltu hai  (doesn't contain any song)
        document.getElementById("playPauseS").innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>`;
        playSong(songsArray[index])
        // setDur()
    }

}
function pSong() {
    if (!currentSong.src) {
        ppSong();
    }
    else {
        if (currentSong.currentTime >= 3) {
            currentSong.currentTime = 0;
        }
        else {
            let songsArray = Array.from(document.querySelectorAll(".sidebarPlayBt"));
            if (index == 0) {
                index = songsArray.length;
            }
            index--;
            document.getElementById("playPauseS").innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>`;
            playSong(songsArray[index])
        }
    }

}

function playPauseSongControl() {
    document.getElementById("playPauseS").addEventListener("click", () => {
        ppSong()
    })
}
playPauseSongControl()

function nextSongControl() {
    document.getElementById("nextS").addEventListener("click", nSong)
}
nextSongControl()

function prevSongControl() {
    document.getElementById("prevS").addEventListener("click", pSong)
}
prevSongControl()


currentSong.addEventListener("timeupdate", () => {
    document.getElementById("curPos").style.width = `${(currentSong.currentTime / currentSong.duration) * 100}%`
    let time = currentSong.currentTime;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    document.getElementById("curT").innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    setDur()
})


document.getElementsByClassName("seekbar")[0].addEventListener("click", e => {
    let seekbarWidth = e.target.getBoundingClientRect().width;
    let clickPosition = e.offsetX;
    let frac = (clickPosition / seekbarWidth) * 100;
    frac = Math.max(0, Math.min(100, frac));

    document.getElementById("curPos").style.width = frac + `%`;
    currentSong.currentTime = currentSong.duration * (frac / 100);
});

document.getElementsByClassName("volume")[0].addEventListener("click", e => {
    let seekbarWidth = e.target.getBoundingClientRect().width;
    let clickPosition = e.offsetX;
    let frac = (clickPosition / seekbarWidth) * 100;
    frac = Math.max(0, Math.min(100, frac));

    document.getElementById("volPos").style.width = frac + `%`;
    currentSong.volume = frac / 100;
});

