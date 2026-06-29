/* =========================================
   THEME TOGGLE
========================================= */

const body = document.body;
const themeBtn = document.getElementById("theme-toggle");

if(localStorage.getItem("theme") === "dark"){
    body.classList.add("dark");
    themeBtn.innerHTML = "☀";
}

themeBtn.addEventListener("click",()=>{

    body.classList.toggle("dark");

    if(body.classList.contains("dark")){
        themeBtn.innerHTML="☀";
        localStorage.setItem("theme","dark");
    }else{
        themeBtn.innerHTML="☾";
        localStorage.setItem("theme","light");
    }

});


/* =========================================
   HERO TEXT ANIMATION
========================================= */

const words=[

"Designer",
"Builder",
"Problem Solver",
"CAD Enthusiast",
"Community Leader"

];

let wordIndex=0;

const changing=document.getElementById("changing-text");

setInterval(()=>{

changing.style.opacity=0;

setTimeout(()=>{

wordIndex++;

if(wordIndex>=words.length){

wordIndex=0;

}

changing.textContent=words[wordIndex];

changing.style.opacity=1;

},250);

},2500);


/* =========================================
   SCROLL PROGRESS BAR
========================================= */

window.addEventListener("scroll",()=>{

const scrollTop=document.documentElement.scrollTop;

const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

const progress=(scrollTop/height)*100;

document.getElementById("progress-bar").style.width=progress+"%";

});


/* =========================================
   SECTION FADE ANIMATION
========================================= */

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.2
});

document.querySelectorAll("section").forEach(section=>{

section.classList.add("hidden");

observer.observe(section);

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-120;

if(scrollY>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});


/* =========================================
   BUTTON RIPPLE
========================================= */

document.querySelectorAll(".hero-buttons a").forEach(btn=>{

btn.addEventListener("click",function(e){

const circle=document.createElement("span");

const x=e.clientX-this.offsetLeft;

const y=e.clientY-this.offsetTop;

circle.style.left=x+"px";
circle.style.top=y+"px";

circle.classList.add("ripple");

this.appendChild(circle);

setTimeout(()=>{

circle.remove();

},600);

});

});


/* =========================================
   CARD HOVER
========================================= */

document.querySelectorAll(".current-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.background=

`radial-gradient(circle at ${x}px ${y}px,
rgba(124,58,237,.18),
var(--surface) 70%)`;

});

card.addEventListener("mouseleave",()=>{

card.style.background="var(--surface)";

});

});


/* =========================================
   HERO GLOW FOLLOW
========================================= */

const glow=document.querySelector(".hero-glow");

document.addEventListener("mousemove",(e)=>{

const x=e.clientX/25;

const y=e.clientY/25;

glow.style.transform=`translate(${x}px,${y}px)`;

});


/* =========================================
   TIMELINE HOVER
========================================= */

document.querySelectorAll(".timeline-item").forEach(item=>{

item.addEventListener("mouseenter",()=>{

item.style.transform="translateX(18px) scale(1.02)";

});

item.addEventListener("mouseleave",()=>{

item.style.transform="translateX(0px) scale(1)";

});

});


/* =========================================
   SMOOTH NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

target.scrollIntoView({

behavior:"smooth"

});

});

});


/* =========================================
   LOADING ANIMATION
========================================= */

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});


/* =========================================
   KEYBOARD SHORTCUTS
========================================= */

document.addEventListener("keydown",(e)=>{

if(e.key==="d"){

body.classList.add("dark");

localStorage.setItem("theme","dark");

themeBtn.innerHTML="☀";

}

if(e.key==="l"){

body.classList.remove("dark");

localStorage.setItem("theme","light");

themeBtn.innerHTML="☾";

}

});


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
"%cDesigned & Developed by Gayathri J. Pisharady",
"color:#7C3AED;font-size:18px;font-weight:bold;"
);
