/* =========================================================
DEPARTMENT LIBRARY CHATBOT
LEARNING VIDEOS SYSTEM
========================================================= */

const learningVideos = [

{
    id: 1,
    title: "Java Programming Basics",
    description: "Learn the basic concepts of Java programming in an easy way.",
    category: "programming",
    categoryName: "Programming",
    videoId: "eIrMbAQSU34"
},

{
    id: 2,
    title: "Python Programming for Beginners",
    description: "Understand Python programming fundamentals step by step.",
    category: "programming",
    categoryName: "Programming",
    videoId: "rfscVS0vtbw"
},

{
    id: 3,
    title: "HTML & CSS Web Development",
    description: "Learn how websites are created using HTML and CSS.",
    category: "web",
    categoryName: "Web Development",
    videoId: "G3e-cpL7ofc"
},

{
    id: 4,
    title: "SQL Database Basics",
    description: "Learn SQL commands, tables and database fundamentals.",
    category: "database",
    categoryName: "Database",
    videoId: "HXV3zeQKqGY"
},

{
    id: 5,
    title: "Computer Networks Basics",
    description: "Understand networking concepts and important network terms.",
    category: "network",
    categoryName: "Computer Network",
    videoId: "qiQR5rTSshw"
},

{
    id: 6,
    title: "Information Security Basics",
    description: "Learn basic concepts of cyber and information security.",
    category: "security",
    categoryName: "Information Security",
    videoId: "inWWhr5tnEA"
},

{
    id: 7,
    title: "Artificial Intelligence Basics",
    description: "Understand what Artificial Intelligence is and how it works.",
    category: "ai",
    categoryName: "AI & ML",
    videoId: "ad79nYk2keg"
},

{
    id: 8,
    title: "Machine Learning Introduction",
    description: "Learn the basic idea behind Machine Learning.",
    category: "ai",
    categoryName: "AI & ML",
    videoId: "ukzFI9rgwfU"
},

{
    id: 9,
    title: "C Programming Basics",
    description: "Start learning C programming from the fundamentals.",
    category: "programming",
    categoryName: "Programming",
    videoId: "KJgsSFOSQv0"
}

];

/* =========================================================
DOM ELEMENTS
========================================================= */

const videoGrid = document.getElementById("videoGrid");
const videoSearch = document.getElementById("videoSearch");
const videoCategory = document.getElementById("videoCategory");
const videoResultCount = document.getElementById("videoResultCount");
const noVideosFound = document.getElementById("noVideosFound");

const videoModal = document.getElementById("videoModal");
const videoPlayer = document.getElementById("videoPlayer");
const closeVideoModal = document.getElementById("closeVideoModal");

const modalVideoTitle = document.getElementById("modalVideoTitle");
const modalVideoDescription =
document.getElementById("modalVideoDescription");

const modalVideoCategory =
document.getElementById("modalVideoCategory");

/* =========================================================
CREATE THUMBNAIL
========================================================= */

function getThumbnail(videoId) {

return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

}

/* =========================================================
RENDER VIDEOS
========================================================= */

function renderVideos(videos) {

if (!videoGrid) {
    return;
}

videoGrid.innerHTML = "";

if (videos.length === 0) {

    noVideosFound.style.display = "block";

    videoResultCount.textContent = "0 videos found";

    return;
}

noVideosFound.style.display = "none";

videoResultCount.textContent =
    `${videos.length} video${videos.length > 1 ? "s" : ""} available`;


videos.forEach(video => {

    const card = document.createElement("article");

    card.className = "video-card";

    card.innerHTML = `

        <div class="video-thumbnail">

            <img
                src="${getThumbnail(video.videoId)}"
                alt="${video.title}"
                loading="lazy"
            >

            <span class="video-card-category">
                ${video.categoryName}
            </span>

            <button
                class="video-play-button"
                type="button"
                onclick="openVideo(${video.id})"
                aria-label="Play ${video.title}"
            >
                <i class="fas fa-play"></i>
            </button>

        </div>


        <div class="video-card-body">

            <h3 class="video-card-title">
                ${video.title}
            </h3>

            <p class="video-card-description">
                ${video.description}
            </p>

            <button
                class="watch-video-btn"
                type="button"
                onclick="openVideo(${video.id})"
            >
                <i class="fas fa-play-circle"></i>
                Watch Video
            </button>

        </div>

    `;

    videoGrid.appendChild(card);

});

}

/* =========================================================
SEARCH + FILTER
========================================================= */

function filterVideos() {

const searchText =
    videoSearch.value.trim().toLowerCase();

const selectedCategory =
    videoCategory.value;


const filteredVideos =
    learningVideos.filter(video => {

        const matchesSearch =
            video.title.toLowerCase().includes(searchText) ||
            video.description.toLowerCase().includes(searchText) ||
            video.categoryName.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            video.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });


renderVideos(filteredVideos);

}

/* =========================================================
OPEN VIDEO
========================================================= */

function openVideo(videoId) {

const video =
    learningVideos.find(item => item.id === videoId);

if (!video) {
    return;
}


modalVideoTitle.textContent =
    video.title;

modalVideoDescription.textContent =
    video.description;

modalVideoCategory.textContent =
    video.categoryName;


videoPlayer.src =
    `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`;


videoModal.classList.add("active");

document.body.style.overflow = "hidden";

}

/* =========================================================
CLOSE VIDEO
========================================================= */

function closeVideo() {

videoModal.classList.remove("active");

videoPlayer.src = "";

document.body.style.overflow = "";

}

/* =========================================================
SEARCH EVENT
========================================================= */

if (videoSearch) {

videoSearch.addEventListener(
    "input",
    filterVideos
);

}

/* =========================================================
CATEGORY EVENT
========================================================= */

if (videoCategory) {

videoCategory.addEventListener(
    "change",
    filterVideos
);

}

/* =========================================================
CLOSE BUTTON
========================================================= */

if (closeVideoModal) {

closeVideoModal.addEventListener(
    "click",
    closeVideo
);

}

/* =========================================================
CLOSE WHEN CLICK OUTSIDE
========================================================= */

if (videoModal) {

videoModal.addEventListener(
    "click",
    function(event) {

        if (event.target === videoModal) {
            closeVideo();
        }

    }
);

}

/* =========================================================
ESC KEY
========================================================= */

document.addEventListener(
"keydown",
function(event) {

    if (event.key === "Escape") {
        closeVideo();
    }

}

);

/* =========================================================
INITIAL LOAD
========================================================= */

document.addEventListener(
"DOMContentLoaded",
function() {

    renderVideos(learningVideos);

}

);

/* =========================================================
END LEARNING VIDEOS
========================================================= */
