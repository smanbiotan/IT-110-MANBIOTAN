const likeBtn = document.getElementById("likeBtn");
const resetBtn = document.getElementById("resetBtn");
const likeCount = document.getElementById("likeCount");
const darkMode = document.getElementById("darkMode");

const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");
const brand = document.querySelector(".brand");

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

let likes = 0;

function updateLikeCount() {
    likeCount.textContent = likes;
}

likeBtn.addEventListener("click", function () {
    likes++;
    updateLikeCount();
});

resetBtn.addEventListener("click", function () {
    likes = 0;
    updateLikeCount();
});

function showPage(pageId) {
    const selectedPage = document.getElementById(pageId);

    if (!selectedPage || !selectedPage.classList.contains("page")) {
        return;
    }

    pages.forEach(function (page) {
        page.hidden = page.id !== pageId;
    });

    navLinks.forEach(function (link) {
        const active = link.getAttribute("href") === "#" + pageId;

        link.classList.toggle("active", active);

        if (active) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const pageId = link.getAttribute("href").substring(1);

        showPage(pageId);

        if (location.hash !== "#" + pageId) {
            history.pushState(null, "", "#" + pageId);
        }
    });
});

brand.addEventListener("click", function (event) {
    event.preventDefault();

    showPage("home");

    if (location.hash !== "#home") {
        history.pushState(null, "", "#home");
    }
});

function loadPageFromHash() {
    const pageId = location.hash.substring(1);
    const selectedPage = document.getElementById(pageId);

    if (selectedPage && selectedPage.classList.contains("page")) {
        showPage(pageId);
    } else {
        showPage("home");
    }
}

window.addEventListener("popstate", loadPageFromHash);
window.addEventListener("hashchange", loadPageFromHash);

darkMode.addEventListener("change", function () {
    document.body.classList.toggle("dark", darkMode.checked);
});

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !message) {
        formStatus.textContent = "Please complete all fields.";
        return;
    }

    formStatus.textContent =
        "Thank you, " + name + "! Your sample message was submitted.";

    contactForm.reset();
});

updateLikeCount();
loadPageFromHash();
