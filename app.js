//Get UI
const getaudioscreen = document.getElementById('audioscreen');
const playbtn = document.getElementById('play'),
      prevbtn = document.getElementById('prev'),
      nextbtn = document.getElementById('next'),
      stopbtn = document.getElementById('stop');
const getprogress = document.getElementById('progress'),
      getprogressbar = document.getElementById('progress-bar');
const getvolprogress = document.getElementById('volumeprogress');
const getdisplaytime = document.getElementById('displaytime');

const audios = ['track1','track2','track3'];

let curridx = 0;

function loadaudio(audios){
    getaudioscreen.src = `./audiofolder/${audios}.mp3`;
}

// loadaudio(audios[curridx]);
// console.log((audios[curridx])); // track1

function playaudio(){

    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');

    getaudioscreen.play(); // Default Function
}

function pauseaudio(){

    playbtn.querySelector('i.fas').classList.add('fa-play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');

    getaudioscreen.pause(); // Default Function
}

function playandpauseaudio(){
    // paused// default key word for audio/videos from HTML5
    if(getaudioscreen.paused){
        // playbtn.querySelector('i.fas').classList.add('fa-play');
        // playbtn.querySelector('i.fas').classList.remove('fa-pause');
        getaudioscreen.play();
    }else{
        // playbtn.querySelector('i.fas').classList.remove('fa-play');
        // playbtn.querySelector('i.fas').classList.add('fa-pause');
        getaudioscreen.pause();
    }
}

function nextaudio(){
    curridx++;
    if(curridx > audios.length-1){
            curridx = 0; 
    }
    // console.log(curridx);// 0 1 2 0 1 2 0 1 2....
    loadaudio(audios[curridx]);
    playaudio();
}

function previousaudio(){
    curridx--;
    if(curridx < 0){
            curridx = audios.length-1; 
    }
    // console.log(curridx);// 2 1 0 2 1 0 2 1 0....
    loadaudio(audios[curridx]);
    playaudio();
}

function updateprogress(e){
    // console.log(e.target);
    // console.log(e.target.duration);
    // console.log(e.target.currentTime);

    // let getduration = e.target.duration;
    // let getcurrenttime = e.target.currentTime;
    // console.log(getduration,getcurrenttime);

    //ES6 Feature
    // const {duration,currentTime} = e.target;
    const {duration} = e.target;
    const {currentTime} = e.target;
    // console.log(duration,currentTime);

    if(currentTime === 0){
        getprogressbar.style.width = "0%";
    }else{
                             // 0 to 100
        const progresspercent = (currentTime/duration)*100;
        // console.log(progresspercent);
        getprogressbar.style.width = `${progresspercent}%`;
    }

    
    // forward

    // const mins = Math.floor(currentTime/60);
    // const secs = Math.floor(currentTime%60);
    // const minutevalue = mins.toString().padStart(2,"0");
    // const secondvalue = secs.toString().padStart(2,"0");
    // // console.log(secondvalue);
    // getdisplaytime.innerHTML = `${minutevalue}:${secondvalue}`;

    //backward

    const mins = Math.floor((duration-currentTime)/60);
    const secs = Math.floor((duration-currentTime)%60);

                                         //decimal replace
    const minutevalue = mins.toString().padStart(2,"0"); // if you use padStart() concat num must be string type , toFixed() for add at the end
    const secondvalue = secs.toString().padStart(2,"0"); // if you use padStart() concat num must be string type , toFixed() for add at the end
    // console.log(secondvalue);
    getdisplaytime.innerHTML = `${minutevalue}:${secondvalue}`;

}

function stopaudio(){
    getaudioscreen.currentTime = 0;
    getprogressbar.style.width = `${getaudioscreen.currentTime}%`;
    pauseaudio();
}

function volumecontrol(){
    // console.log(getvolprogress.value);
    // console.log(getaudioscreen.volume); // 1 default 
    // 1 is default(100%)
    // 0.5 half(50%)
    // 0 mute (0%)

    // volume Default KEY for audio/videos HTML5
    getaudioscreen.volume = getvolprogress.value/100; 
}

function progressaudioclick(e){
    // console.log(e.target.offset);
    // console.log(this);
    const width = this.clientWidth;
    console.log(width);

    const clickx = e.offsetX;
    console.log(clickx);

    const getduration = getaudioscreen.duration;
    console.log(getduration);

    getaudioscreen.currentTime = (clickx/width)*getduration ;
    console.log(getaudioscreen.currentTime);
}

getaudioscreen.addEventListener('timeupdate',updateprogress);
getaudioscreen.addEventListener('play',playaudio);
getaudioscreen.addEventListener('pause',pauseaudio);

playbtn.addEventListener('click',playandpauseaudio);
nextbtn.addEventListener('click',nextaudio); // 0 1 2 0 1 2 0 1 2....
prevbtn.addEventListener('click',previousaudio);// 2 1 0 2 1 0 2 1 0....
stopbtn.addEventListener('click',stopaudio);
getvolprogress.addEventListener('change',volumecontrol);
getprogress.addEventListener('click',progressaudioclick);

