document.addEventListener("DOMContentLoaded",function(){
    var sections=document.querySelectorAll(".reveal");
    var isMobile=window.innerWidth<=900;

    function handleScroll(){
        sections.forEach(function(section){
            var rect=section.getBoundingClientRect();
            var windowHeight=window.innerHeight;
            var progress=1-(rect.top/windowHeight);
            if(progress<0)progress=0;
            if(progress>1)progress=1;
            var image=section.querySelector(".image");
            var text=section.querySelector(".text");
            if(!image||!text)return;
            if(isMobile){
                var dist=80;
                image.style.transform="translateY("+(1-progress)*dist+"px)";
                text.style.transform="translateY("+(1-progress)*dist+"px)";
            }else{
                if(section.classList.contains("type-left")){
                    image.style.transform="translateX("+(1-progress)*-200+"px)";
                    text.style.transform="translateX("+(1-progress)*200+"px)";
                }
                if(section.classList.contains("type-right")){
                    image.style.transform="translateX("+(1-progress)*200+"px)";
                    text.style.transform="translateX("+(1-progress)*-200+"px)";
                }
                if(section.classList.contains("type-up")){
                    image.style.transform="translateY("+(1-progress)*200+"px)";
                    text.style.transform="translateY("+(1-progress)*-200+"px)";
                }
                if(section.classList.contains("type-down")){
                    image.style.transform="translateY("+(1-progress)*-200+"px)";
                    text.style.transform="translateY("+(1-progress)*200+"px)";
                }
            }
            image.style.opacity=progress;
            text.style.opacity=progress;
        });
    }

    window.addEventListener("scroll",handleScroll);
    handleScroll();

    var resizeTimer;
    window.addEventListener("resize",function(){
        clearTimeout(resizeTimer);
        resizeTimer=setTimeout(function(){
            isMobile=window.innerWidth<=900;
        },200);
    });

    var gallery=document.querySelector(".gallery");
    var images=document.querySelectorAll(".gallery .grid img");

    if(gallery&&images.length>0){
        var observer=new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    images.forEach(function(img,index){
                        setTimeout(function(){
                            img.classList.add("show");
                        },index*300);
                    });
                    observer.unobserve(entry.target);
                }
            });
        },{threshold:0.2});
        observer.observe(gallery);
    }

    var footer=document.querySelector(".footer");
    var socialGroups=document.querySelectorAll(".social-group");

    if(footer&&socialGroups.length>0){
        var footerObserver=new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    socialGroups.forEach(function(group,index){
                        setTimeout(function(){
                            group.classList.add("show");
                        },index*400);
                    });
                    footerObserver.unobserve(entry.target);
                }
            });
        },{threshold:0.2});
        footerObserver.observe(footer);
    }
    document.addEventListener("contextmenu",function(e){
        e.preventDefault();
    });
});

if(window.twttr&&window.twttr.ready){
       window.twttr.ready(function(twttr){
           twttr.events.bind("rendered",function(event){
               var container=event.target.closest(".tweet-container");
               if(container){
                   var loader=container.querySelector(".tweet-loader");
                   var content=container.querySelector(".tweet-content");
                   if(loader)loader.style.display="none";
                   if(content)content.style.opacity="1";
               }
           });
       });
   }
