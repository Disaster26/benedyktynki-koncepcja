(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
// menu
var b=$('#burger'),m=$('#menu');
function zamknij(){m.classList.remove('otw');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Otwórz menu');document.body.style.overflow=''}
b.addEventListener('click',function(){var o=!m.classList.contains('otw');m.classList.toggle('otw',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');document.body.style.overflow=o?'hidden':''});
$$('a',m).forEach(function(a){a.addEventListener('click',zamknij)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij()});
// aktywna sekcja w menu
var linki=$$('a',m);
if('IntersectionObserver' in window){
 var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){linki.forEach(function(a){a.toggleAttribute('aria-current',a.getAttribute('href')==='#'+x.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
 ['godziny','intencje','wspolnota','oplatkarnia','kontakt'].forEach(function(id){var el=document.getElementById(id);if(el)io.observe(el)});
 // pasek mobilny po przewinięciu za pierwszy ekran
 var mob=$('#mob'),hero=$('#hero');
 new IntersectionObserver(function(en){mob.classList.toggle('widac',!en[0].isIntersecting)},{threshold:0}).observe(hero);
}
// dziś
var d=new Date(),dz=d.getDay(),nazwy=['niedziela','poniedziałek','wtorek','środa','czwartek','piątek','sobota'];
var msze=dz===0?'8:30 i 18:30':'7:10 i 18:30';
$('#dzis').innerHTML='Dziś, '+nazwy[dz]+': Msze święte <b>'+msze+'</b><br>ul. Rawicza 32, Siedlce';
$('#rok').textContent=d.getFullYear();
// karuzele
$$('[data-kar]').forEach(function(k){
 var tor=$('.kar-tor',k),fig=$$('figure',tor),lic=$('.licznik',k),op=$('.opis',k),i=0,staly=op.textContent;
 function pokaz(){var w=tor.clientWidth||1;i=Math.round(tor.scrollLeft/w);lic.textContent=(i+1)+' / '+fig.length;if(fig[i]&&fig[i].dataset.opis)op.textContent=fig[i].dataset.opis;else if(staly)op.textContent=staly}
 function idz(n){i=(n+fig.length)%fig.length;tor.scrollTo({left:i*tor.clientWidth,behavior:'smooth'})}
 $$('button',k).forEach(function(bt){bt.addEventListener('click',function(){idz(i+(+bt.dataset.p))})});
 var t;tor.addEventListener('scroll',function(){cancelAnimationFrame(t);t=requestAnimationFrame(pokaz)},{passive:true});
 tor.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();idz(i+1)}if(e.key==='ArrowLeft'){e.preventDefault();idz(i-1)}});
 // przeciąganie myszą
 var x0=0,s0=0,ciag=false;
 tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;ciag=true;x0=e.clientX;s0=tor.scrollLeft;tor.classList.add('ciag');tor.setPointerCapture(e.pointerId)});
 tor.addEventListener('pointermove',function(e){if(ciag)tor.scrollLeft=s0-(e.clientX-x0)});
 function stop(e){if(!ciag)return;ciag=false;tor.classList.remove('ciag');var w=tor.clientWidth,dx=e.clientX-x0,n=Math.round(s0/w)+(dx<-40?1:dx>40?-1:0);idz(Math.max(0,Math.min(fig.length-1,n)))}
 tor.addEventListener('pointerup',stop);tor.addEventListener('pointercancel',stop);
 requestAnimationFrame(pokaz);
});
// formularz pokazowy
$('#form').addEventListener('submit',function(e){e.preventDefault();$('#info-form').textContent='To podgląd strony: formularz nie wysyła jeszcze wiadomości.'});
// kopiowanie konta
$('#kopiuj').addEventListener('click',function(){var t=$('#konto').textContent.replace(/\s/g,''),bt=this;function ok(){bt.textContent='Skopiowano'}if(navigator.clipboard)navigator.clipboard.writeText(t).then(ok,ok);else ok()});
// mapa i zgody
function mapa(){var el=$('#mapa');if(el.dataset.ok)return;el.dataset.ok=1;el.innerHTML='<iframe title="Mapa dojazdu: ul. Rawicza 32, Siedlce" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Rawicza+32,+08-110+Siedlce&z=16&output=embed"></iframe>'}
$('#pokaz-mape').addEventListener('click',mapa);
var zg=null;try{zg=localStorage.getItem('bs-zgoda')}catch(e){}
if(zg==='1'&&'IntersectionObserver' in window){new IntersectionObserver(function(en,o){if(en[0].isIntersecting){mapa();o.disconnect()}},{rootMargin:'300px'}).observe($('#mapa'))}
$$('#cookies button').forEach(function(bt){bt.addEventListener('click',function(){try{localStorage.setItem('bs-zgoda',bt.dataset.c)}catch(e){}$('#cookies').hidden=true;document.documentElement.classList.remove('ck');if(bt.dataset.c==='1')mapa()})});
})();
