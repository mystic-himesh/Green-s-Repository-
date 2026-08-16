/* =====================================================
   SETTINGS
===================================================== */

// Change this to whatever secret she knows.
const SECRET_PASSWORD = "Green";


/* =====================================================
   ELEMENTS
===================================================== */

const lockScreen =
    document.getElementById("lockScreen");

const website =
    document.getElementById("website");

const passwordInput =
    document.getElementById("passwordInput");

const unlockButton =
    document.getElementById("unlockButton");

const errorMessage =
    document.getElementById("errorMessage");


/* =====================================================
   UNLOCK
===================================================== */

function unlockWebsite() {

    const enteredPassword =
        passwordInput.value.trim();

    if (enteredPassword === SECRET_PASSWORD) {

        lockScreen.style.transition =
            "opacity 0.8s ease";

        lockScreen.style.opacity = "0";


        setTimeout(() => {

            lockScreen.style.display = "none";

            website.classList.remove("hidden");

            document.body.style.overflowX = "hidden";

            startTyping();

        }, 800);

    }

    else {

        errorMessage.textContent =
            "That's not quite it... ♡";

        passwordInput.value = "";

        passwordInput.focus();

    }
}


unlockButton.addEventListener(
    "click",
    unlockWebsite
);


passwordInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            unlockWebsite();

        }

    }
);


/* =====================================================
   SCROLL
===================================================== */

function scrollToSection(id) {

    const section =
        document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   TYPING MESSAGE
===================================================== */

const typingElement =
    document.getElementById("typingText");


const typingMessage =
    "If I could go back, I would change a lot of things. Not because I want to change our story, but because I wish We had understood some things sooner.";


let typingStarted = false;


function startTyping() {

    if (typingStarted) return;

    typingStarted = true;

    let index = 0;

    function type() {

        if (index < typingMessage.length) {

            typingElement.textContent +=
                typingMessage[index];

            index++;

            setTimeout(type, 45);

        }

    }

    type();

}


/* =====================================================
   FLIP CARDS
===================================================== */

const flipCards =
    document.querySelectorAll(".flip-card");


flipCards.forEach(card => {

    card.addEventListener(
        "click",
        function () {

            this.classList.toggle("flipped");

        }
    );

});


/* =====================================================
   LETTER REVEAL
===================================================== */

const letterButton =
    document.getElementById("letterButton");

const letterPaper =
    document.querySelector(".letter-paper");


letterButton.addEventListener(
    "click",
    function () {

        letterPaper.classList.add("show");

        letterButton.textContent =
            "thank you for reading ♡";

        letterButton.disabled = true;

        letterButton.style.opacity = "0.6";


        setTimeout(() => {

            letterPaper.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 250);

    }
);


/* =====================================================
   RUNAWAY "LET ME THINK" BUTTON
===================================================== */

const buttonArea =
    document.getElementById("buttonArea");

const thinkButton =
    document.getElementById("thinkButton");

const forgiveButton =
    document.getElementById("forgiveButton");


let escapeCount = 0;


/*
    Desktop:
    When the cursor comes close to the
    "Let me think..." button, it moves.

    Mobile:
    When she taps the button, it moves.
*/


function moveThinkButton() {

    const areaWidth =
        buttonArea.clientWidth;

    const areaHeight =
        buttonArea.clientHeight;

    const buttonWidth =
        thinkButton.offsetWidth;

    const buttonHeight =
        thinkButton.offsetHeight;


    /*
        Keep the button safely inside
        the button area.
    */

    const padding = 10;


    const maxX =
        areaWidth -
        buttonWidth -
        padding;

    const maxY =
        areaHeight -
        buttonHeight -
        padding;


    let newX;
    let newY;


    /*
        Make sure the button doesn't
        repeatedly land in almost the
        exact same place.
    */

    do {

        newX =
            padding +
            Math.random() * Math.max(0, maxX - padding);

        newY =
            padding +
            Math.random() * Math.max(0, maxY - padding);

    }

    while (
        Math.abs(newX - parseFloat(thinkButton.style.left || 50)) < 60 &&
        Math.abs(newY - parseFloat(thinkButton.style.top || 45)) < 60
    );


    thinkButton.style.transform = "none";

    thinkButton.style.left =
        `${newX}px`;

    thinkButton.style.top =
        `${newY}px`;


    escapeCount++;


    /*
        After several attempts,
        make the button slightly playful.
    */

    if (escapeCount === 3) {

        thinkButton.textContent =
            "nope 😂";

    }

    if (escapeCount === 6) {

        thinkButton.textContent =
            "not yet!";

    }

    if (escapeCount === 9) {

        thinkButton.textContent =
            "catch me ♡";

    }

}


/* =====================================================
   DESKTOP PROXIMITY DETECTION
===================================================== */

buttonArea.addEventListener(
    "mousemove",
    function (event) {

        /*
            Don't run this too aggressively.
        */

        const buttonRect =
            thinkButton.getBoundingClientRect();


        const centerX =
            buttonRect.left +
            buttonRect.width / 2;

        const centerY =
            buttonRect.top +
            buttonRect.height / 2;


        const distanceX =
            event.clientX - centerX;

        const distanceY =
            event.clientY - centerY;


        const distance =
            Math.sqrt(
                distanceX ** 2 +
                distanceY ** 2
            );


        /*
            Escape when cursor gets
            approximately 90px close.
        */

        if (distance < 90) {

            moveThinkButton();

        }

    }
);


/* =====================================================
   MOBILE TOUCH
===================================================== */

thinkButton.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        moveThinkButton();

    },
    {
        passive: false
    }
);


/*
    Also make it move when clicked.
    This handles phones and unusual browsers.
*/

thinkButton.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        moveThinkButton();

    }
);


/* =====================================================
   FORGIVE BUTTON
===================================================== */

const forgiveMessage =
    document.getElementById("forgiveMessage");


forgiveButton.addEventListener(
    "click",
    function () {

        forgiveMessage.innerHTML =
            "Thank you. ♡<br>" +
            "<small>I promise I'll appreciate this second chance.</small>";


        forgiveButton.textContent =
            "thank you ♡";


        forgiveButton.style.background =
            "#a96f79";


        createPetals();

    }
);


/* =====================================================
   SOFT PETAL ANIMATION
===================================================== */

function createPetals() {

    const symbols = [
        "♡",
        "♡",
        "✿",
        "❀",
        "·"
    ];

    for (let i = 0; i < 35; i++) {

        const petal =
            document.createElement("span");

        petal.textContent =
            symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
            ];

        petal.style.position = "fixed";

        petal.style.left =
            Math.random() * 100 + "vw";

        petal.style.top =
            "-30px";

        petal.style.color =
            Math.random() > 0.5
                ? "#dca5ad"
                : "#c9939c";

        petal.style.fontSize =
            Math.random() * 14 + 10 + "px";

        petal.style.zIndex = "9999";

        petal.style.pointerEvents = "none";


        document.body.appendChild(petal);


        const duration =
            Math.random() * 2500 + 3000;


        const drift =
            (Math.random() - 0.5) * 180;


        petal.animate(

            [
                {
                    transform:
                        "translate(0, 0) rotate(0deg) scale(0.6)",

                    opacity: 0
                },

                {
                    transform:
                        `translate(${drift * 0.4}px, 35vh)
                         rotate(120deg)
                         scale(1)`,

                    opacity: 0.7
                },

                {
                    transform:
                        `translate(${drift}px, 75vh)
                         rotate(260deg)
                         scale(0.9)`,

                    opacity: 0.5
                },

                {
                    transform:
                        `translate(${drift * 1.3}px, 115vh)
                         rotate(420deg)
                         scale(0.7)`,

                    opacity: 0
                }
            ],

            {
                duration: duration,

                easing: "ease-in-out",

                fill: "forwards"
            }

        );


        setTimeout(() => {

            petal.remove();

        }, duration + 100);

    }
}

