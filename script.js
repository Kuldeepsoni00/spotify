document.querySelector(".songItem").style.display = "none";
let cloneNodes = document.querySelector(".songItem");
let curIndex = 0;
let isplay = false;
let updateTimer;
let songinformation=document.querySelector(".songinfo");
console.log(songinformation.childNodes[2].data);
let playson = document.querySelector("#startSong");
let progreeBar = document.querySelector("#myProgresbar");
let gif = document.querySelector("#gif");
let songrp = document.querySelectorAll(".songItem span");
let songcontainer = document.querySelector(".songcontainer");
let curr_track = document.createElement('audio');
let backSong=document.querySelector('#back');
let nextSong=document.querySelector('#for');
// let audioelemnt = new Audio('songs/1.mp3');
let allsongs = [
    { name: "Oklahoma Wind (A Cappella Version)", filePath: 'songs/1.mp3', coverPath: "covers/1.jpg", duration: "03:30" },
    { name: "It's Sadness Calling", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "03:45" },
    { name: "Pieces of a Mended Heart", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "04:12" },
    { name: "Hustlers Original", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: "03:30" },
    { name: "Avalina's Theme (John Williams Orchestral Mix) ", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "03:12" },
    { name: "(That Was the Day) the World Stood Still", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", duration: "02:31" },
    { name: "I Can't Give You What You Want", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", duration: "03:55" },
    { name: "Winter Solistice (Instrumental)", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", duration: "03:21" },
    { name: "What Do You Think They Say", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", duration: "04:39" },
    { name: "Rose Colored Glasses", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", duration: "02:32" }
];
curr_track.src = allsongs[0].filePath;
for (let i = 0; i < allsongs.length; i++) {
    console.log(allsongs[i]);
    let getCloneSong = cloneNodes.cloneNode(true);

    console
    getCloneSong.style.display = "flex";
    console.log(getCloneSong);
    getCloneSong.children[0].setAttribute("src", allsongs[i].coverPath);
    console.log(getCloneSong.children[0]);
    getCloneSong.children[1].innerHTML = allsongs[i].name;

    getCloneSong.children[2].children[0].innerTextcontent = allsongs[i].duration;
    getCloneSong.children[2].children[0].children[0].setAttribute("id", i);


    getCloneSong.children[2].children[0].children[0].addEventListener('click', function (e) {
        let indexlate = e.target.getAttribute("id");
        loadSong(indexlate);
        //     let newsong=new Audio(e.target.getAttribute("id"));
        //     if(newsong.paused || newsong.currentTime<=0 || e.target.classList=="fa-play-circle"){

        //     newsong.play();
        //     e.target.classList.remove("fa-play-circle");
        //     e.target.classList.add("fa-pause-circle");
        //     gif.style.opacity = 1;
        //     }
        //     else{
        //         newsong.pause();
        //         e.target.classList.remove("fa-pause-circle");
        //         e.target.classList.add("fa-play-circle");
        //         gif.style.opacity = 0;
        //     }
    });
    songcontainer.appendChild(getCloneSong);
}
function loadSong(n) {
  
    if(curIndex!=n){
        if(isplay){
            document.getElementById(curIndex).classList.remove("fa-pause-circle");
            document.getElementById(curIndex).classList.add("fa-play-circle");
            isplay=false;
        }
        
        curIndex=n;
        curr_track.src = allsongs[n].filePath;
        songinformation.childNodes[2].data=allsongs[curIndex].name;
       
    }
   
    
    if (!isplay) {
     
        curr_track.play();
        isplay = true;
        document.getElementById(n).classList.remove("fa-play-circle");
        document.getElementById(n).classList.add("fa-pause-circle");
        playson.classList.remove("fa-play-circle");
        playson.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    }
    else {
        curr_track.pause();
        isplay = false;
        document.getElementById(n).classList.remove("fa-pause-circle");
        document.getElementById(n).classList.add("fa-play-circle");
        playson.classList.remove("fa-pause-circle");
        playson.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
}
playson.addEventListener('click', () => {
    console.log("aaya");
    if (isplay) {
        console.log("rok diya");
        document.getElementById(curIndex).classList.remove("fa-pause-circle");
            document.getElementById(curIndex).classList.add("fa-play-circle");
        curr_track.pause();
        playson.classList.remove("fa-pause-circle");
        playson.classList.add("fa-play-circle");
        gif.style.opacity = 0;
        isplay=false;
        
    }
    else {
        console.log("chala diya");
        document.getElementById(curIndex).classList.remove("fa-play-circle");
            document.getElementById(curIndex).classList.add("fa-pause-circle");
        curr_track.play();
        playson.classList.remove("fa-play-circle");
        playson.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
        isplay=true;
        
    }
});

curr_track.addEventListener('timeupdate', () => {
    gettiso = parseInt((curr_track.currentTime / curr_track.duration) * 100);
    progreeBar.value = gettiso;
});

progreeBar.addEventListener('change', () => {
    curr_track.currentTime = (progreeBar.value * curr_track.duration) / 100;
});

backSong.addEventListener('click',function(){
    console.log(curIndex);
    let x=curIndex;
    if(curIndex>0){
      x--;
    }
    else{
     x=allsongs.length-1;
    }

    
    loadSong(x);

});
nextSong.addEventListener('click',function(){
    console.log(curIndex);
    let x=curIndex;
    if(curIndex<allsongs.length-1){
        x++;
    }
    else{
        x=0;
    }
  
    loadSong(x);
});