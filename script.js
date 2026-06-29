/* ==========================================
   PORTFOLIO V2
   Part 1
========================================== */

/* ==========================
   SELECTORS
========================== */

const body = document.body;

const themeBtn = document.getElementById("theme-toggle");

const spotlight = document.getElementById("spotlight");

const progressBar = document.getElementById("progress-bar");

const header = document.querySelector("header");

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav ul a");


/* ==========================
   THEME
========================== */

const savedTheme = localStorage.getItem("theme");

if(savedTheme==="dark"){

    body.classList.add("dark");

    themeBtn.textContent="☀";

}else{

    themeBtn.textContent="☾";

}

themeBtn.addEventListener("click",()=>{

    body.classList.toggle("dark");

    if(body.classList.contains("dark")){

        themeBtn.textContent="☀";

        localStorage.setItem("theme","dark");

    }else{

        themeBtn.textContent="☾";

        localStorage.setItem("theme","light");

    }

});


/* ==========================
   HERO TYPING EFFECT
========================== */

const roles=[

"Mechanical Engineer",

"CAD Designer",

"Builder",

"Problem Solver",

"Engineering Leader"

];

const roleElement=document.getElementById("changing-role");

let roleIndex=0;

let charIndex=0;

let deleting=false;

function typeRole(){

    const current=roles[roleIndex];

    if(!deleting){

        roleElement.textContent=current.substring(0,charIndex+1)+"|";

        charIndex++;

        if(charIndex===current.length){

            deleting=true;

            setTimeout(typeRole,1200);

            return;

        }

    }else{

        roleElement.textContent=current.substring(0,charIndex-1)+"|";

        charIndex--;

        if(charIndex===0){

            deleting=false;

            roleIndex++;

            if(roleIndex>=roles.length){

                roleIndex=0;

            }

        }

    }

    setTimeout(typeRole,deleting?45:90);

}

typeRole();


/* ==========================
   SPOTLIGHT
========================== */

document.addEventListener("mousemove",(e)=>{

    spotlight.animate({

        left:e.clientX+"px",

        top:e.clientY+"px"

    },{

        duration:250,

        fill:"forwards"

    });

});


/* ==========================
   SCROLL PROGRESS
========================== */

window.addEventListener("scroll",()=>{

    const scrollTop=document.documentElement.scrollTop;

    const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

    const percent=(scrollTop/height)*100;

    progressBar.style.width=percent+"%";

});


/* ==========================
   GLASS NAVBAR
========================== */

window.addEventListener("scroll",()=>{

    if(window.scrollY>80){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});


/* ==========================
   SMOOTH SCROLL
========================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/* ==========================
   ACTIVE NAVIGATION
========================== */

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-180;

        if(window.scrollY>=top){

            current=section.id;

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


/* ==========================
   SCROLL REVEAL
========================== */

const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

sections.forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});


/* ==========================
   PAGE LOADED
========================== */

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});


console.log("%cPortfolio Loaded 🚀",
"color:#7C3AED;font-size:16px;font-weight:bold;");

/* ==========================================
   PART 2
   PREMIUM CARD INTERACTIONS
========================================== */

const cards = document.querySelectorAll(".project-card, .journey-card");

/* ==========================================
   3D TILT + GLOW
========================================== */

cards.forEach(card => {

    const title = card.querySelector("h3");
    const text = card.querySelector("p");
    const button = card.querySelector("button");

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 12;
        const rotateY = (x - centerX) / 12;

        card.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.04)
        `;

        card.style.setProperty("--x", x + "px");
        card.style.setProperty("--y", y + "px");

        if(title){

            title.style.transform =
            "translateZ(50px)";

        }

        if(text){

            text.style.transform =
            "translateZ(30px)";

        }

        if(button){

            button.style.transform =
            "translateZ(60px) translateX(10px)";

        }

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = `
        perspective(1200px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
        `;

        if(title){

            title.style.transform = "";

        }

        if(text){

            text.style.transform = "";

        }

        if(button){

            button.style.transform = "";

        }

    });

});


/* ==========================================
   FLOAT ANIMATION
========================================== */

cards.forEach(card => {

    let direction = 1;

    setInterval(() => {

        if(card.matches(":hover")) return;

        direction *= -1;

        card.animate([

            {
                transform:`translateY(${direction*3}px)`
            },

            {
                transform:`translateY(${direction*-3}px)`
            }

        ],{

            duration:4000,

            fill:"forwards"

        });

    },4000);

});


/* ==========================================
   MAGNETIC BUTTONS
========================================== */

const buttons = document.querySelectorAll(

".hero-buttons a,.contact-links a"

);

buttons.forEach(button => {

    button.addEventListener("mousemove", e => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const moveX = (x - rect.width/2)/6;
        const moveY = (y - rect.height/2)/6;

        button.style.transform =

        `translate(${moveX}px,${moveY}px)`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});


/* ==========================================
   RIPPLE EFFECT
========================================== */

buttons.forEach(button => {

    button.addEventListener("click", function(e){

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const rect = this.getBoundingClientRect();

        ripple.style.left =
        e.clientX - rect.left + "px";

        ripple.style.top =
        e.clientY - rect.top + "px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },700);

    });

});


/* ==========================================
   CHIP INTERACTION
========================================== */

const chips=document.querySelectorAll(".chip");

chips.forEach(chip=>{

    chip.addEventListener("mousemove",e=>{

        const rect=chip.getBoundingClientRect();

        chip.style.setProperty(

        "--x",

        (e.clientX-rect.left)+"px"

        );

        chip.style.setProperty(

        "--y",

        (e.clientY-rect.top)+"px"

        );

    });

});


/* ==========================================
   PROJECT CARD GLOW
========================================== */

const projects=document.querySelectorAll(".project-card");

projects.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.animate([

            {

                boxShadow:

                "0 0 0 rgba(124,58,237,0)"

            },

            {

                boxShadow:

                "0 25px 60px rgba(124,58,237,.25)"

            }

        ],{

            duration:350,

            fill:"forwards"

        });

    });

});


/* ==========================================
   CARD PARALLAX
========================================== */

document.addEventListener("mousemove",e=>{

    const moveX=(window.innerWidth/2-e.clientX)/120;

    const moveY=(window.innerHeight/2-e.clientY)/120;

    cards.forEach(card=>{

        if(card.matches(":hover")) return;

        card.style.transform=

        `translate(${moveX}px,${moveY}px)`;

    });

});


/* ==========================================
   BUTTON HOVER SOUND (OPTIONAL)
========================================== */

// const audio = new Audio("hover.mp3");

// buttons.forEach(btn=>{

// btn.addEventListener("mouseenter",()=>{

// audio.currentTime=0;

// audio.play();

// });

// });


console.log("%cPremium Interactions Loaded",
"color:#A855F7;font-size:15px;font-weight:bold;");
/* ==========================================
   PART 3
   DRAWER + MODALS
========================================== */

const overlay = document.querySelector(".overlay");

const modals = document.querySelectorAll(".modal");

const journeyCards = document.querySelectorAll(".journey-card");

const projectCards = document.querySelectorAll(".project-card");

const allCards = [...journeyCards,...projectCards];


/* ==========================================
   OPEN DRAWER
========================================== */

allCards.forEach(card=>{

    card.addEventListener("click",()=>{

        const target = card.dataset.modal;

        const modal = document.getElementById(target);

        if(!modal) return;

        overlay.classList.add("active");

        modal.classList.add("active");

        body.classList.add("modal-open");

        card.classList.add("selected");

    });

});


/* ==========================================
   CLOSE DRAWER
========================================== */

function closeModal(){

    overlay.classList.remove("active");

    modals.forEach(modal=>{

        modal.classList.remove("active");

    });

    body.classList.remove("modal-open");

    allCards.forEach(card=>{

        card.classList.remove("selected");

    });

}


/* ==========================================
   CLOSE BUTTON
========================================== */

document.querySelectorAll(".close").forEach(btn=>{

    btn.addEventListener("click",closeModal);

});


/* ==========================================
   CLICK OUTSIDE
========================================== */

overlay.addEventListener("click",closeModal);


/* ==========================================
   ESC KEY
========================================== */

document.addEventListener("keydown",e=>{

    if(e.key==="Escape"){

        closeModal();

    }

});


/* ==========================================
   PREVENT PROPAGATION
========================================== */

modals.forEach(modal=>{

    modal.addEventListener("click",e=>{

        e.stopPropagation();

    });

});


/* ==========================================
   DRAWER ANIMATION
========================================== */

modals.forEach(modal=>{

    modal.addEventListener("transitionend",()=>{

        modal.style.willChange="auto";

    });

});


/* ==========================================
   STICKY ACTIVE CARD
========================================== */

allCards.forEach(card=>{

    card.addEventListener("click",()=>{

        allCards.forEach(c=>{

            c.classList.remove("selected");

        });

        card.classList.add("selected");

    });

});


/* ==========================================
   SCROLL INSIDE MODAL
========================================== */

modals.forEach(modal=>{

    modal.addEventListener("wheel",e=>{

        e.stopPropagation();

    });

});


/* ==========================================
   PRELOAD IMAGES
========================================== */

const images=document.querySelectorAll("img");

images.forEach(img=>{

    const preload=new Image();

    preload.src=img.src;

});


/* ==========================================
   NAVBAR SHADOW
========================================== */

window.addEventListener("scroll",()=>{

    if(window.scrollY>250){

        header.style.boxShadow=

        "0 10px 35px rgba(0,0,0,.08)";

    }

    else{

        header.style.boxShadow="none";

    }

});


/* ==========================================
   HERO FADE
========================================== */

window.addEventListener("scroll",()=>{

    const hero=document.querySelector("#hero");

    const offset=window.scrollY;

    hero.style.opacity=

    1-offset/900;

});


/* ==========================================
   RANDOM CHIP ANIMATION
========================================== */

const chips=document.querySelectorAll(".chip");

setInterval(()=>{

    const random=

    chips[Math.floor(Math.random()*chips.length)];

    random.animate([

        {

            transform:"translateY(0px)"

        },

        {

            transform:"translateY(-8px)"

        },

        {

            transform:"translateY(0px)"

        }

    ],{

        duration:700

    });

},1800);


/* ==========================================
   LOGO HOVER
========================================== */

const logo=document.querySelector(".logo");

logo.addEventListener("mouseenter",()=>{

    logo.animate([

        {

            letterSpacing:"0px"

        },

        {

            letterSpacing:"1px"

        }

    ],{

        duration:300,

        fill:"forwards"

    });

});


/* ==========================================
   SCROLL TO TOP
========================================== */

window.addEventListener("keydown",e=>{

    if(e.key==="Home"){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

});


/* ==========================================
   PERFORMANCE
========================================== */

window.addEventListener("blur",()=>{

    document.body.style.pointerEvents="none";

});

window.addEventListener("focus",()=>{

    document.body.style.pointerEvents="auto";

});


/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log(
"%cDesigned & Developed by Gayathri J. Pisharady",
"font-size:18px;color:#7C3AED;font-weight:bold;"
);

console.log(
"%cPortfolio Version 2",
"font-size:14px;color:#A78BFA;"
);
