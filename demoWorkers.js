let hours = new Date().getHours();
hours = hours - 12
let minutes = new Date().getMinutes();
let seconds = new Date().getSeconds();
let abbrevation = "";

console.log(new Date());

setInterval(() => {
    seconds++
    if(seconds === 60){
        seconds = 0;
        minutes++;
    };
    if(minutes === 60){
        minutes = 0;
        hours++;
    }
    if(new Date().getHours() > 12)abbrevation = "PM";
    else abbrevation = "AM";
  
    postMessage([hours, minutes, seconds, abbrevation])

   
    
    
}, 1000);