let dayNight=document.getElementById('theme-toggle');
let main=document.querySelector('.main');
console.log(dayNight,main);

dayNight.addEventListener('click',()=>
{
    main.classList.toggle("night");
    // alert("fh")
});
let typedElement=new Typed('#text',
    {
         strings: [' an enthusiastic coder.', 'an experienced frontend developer.', ' a open source contributor.', ' a react and javascript developer.', 'a bird lover.', ' a solo traveller.', 'a bike rider.','on the way to learn full stack.'],
            loop:true,
            typeSpeed: 100,
            backSpeed:50,
            backDelay:100,
            smartBackspace: true

    }
);
