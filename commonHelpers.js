import{a as E,i as m,S}from"./assets/vendor-c493984e.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const g=async(e,a)=>{const s="https://pixabay.com/api/";try{return(await E.get(s,{params:{key:"44070082-fd53ee46a47d37a3fc9d7b56d",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:"15",page:a}})).data}catch(l){throw new Error(l.message)}},u=e=>e.map(({webformatURL:a,largeImageURL:s,tags:l,likes:t,views:r,comments:i,downloads:L})=>`<li class="gallery-item">
          <a class="gallery-link" href="${s}">
            <img
              class="gallery-image"
              src="${a}"
              alt="${l}"
              width = "360"
              height = "200"
            />
            <ul class="image-info">
              <li class="item-info">Likes <span>${t}</span></li>
              <li class="item-info">Views <span>${r}</span></li>
              <li class="item-info">Comments <span>${i}</span></li>
              <li class="item-info">Downloads <span>${L}</span></li>
            </ul>
          </a>
        </li>
    `).join(""),o={galleryEl:document.querySelector(".gallery-list"),galleryItem:document.querySelector(".gallery-item"),searchForm:document.querySelector(".form"),searchBtn:document.querySelector(".search-btn"),loader:document.querySelector(".loader"),loadBtn:document.querySelector(".load-more-btn")};let n=1,c=0,h;o.searchForm.addEventListener("submit",w);o.loadBtn.addEventListener("click",v);async function w(e){e.preventDefault(),f(),o.galleryEl.innerHTML="";const a=e.target.elements.search.value.trim();if(h=a,!a){o.galleryEl.innerHTML="",e.target.reset();return}try{const s=await g(a,n=1);if(s.hits.length)o.galleryEl.innerHTML=u(s.hits),y.refresh(),c=Math.ceil(s.totalHits/15),n<c?b():(d(),m.error({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#EF4040",theme:"dark",maxWidth:354,messageSize:"16"}));else throw d(),new Error("Sorry, there are no images matching your search query. Please try again!")}catch(s){m.error({message:s.message,position:"topRight",backgroundColor:"#EF4040",theme:"dark",maxWidth:354,messageSize:"16"})}finally{p(),e.target.reset()}}async function v(){n+=1,d(),f();try{const e=await g(h,n);e.hits.length&&(o.galleryEl.insertAdjacentHTML("beforeend",u(e.hits)),y.refresh(),o.galleryEl?q():console.error("Element 'galleryItem' is not found."),c=Math.ceil(e.totalHits/15),n<c&&b())}catch{d(),m.error({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#EF4040",theme:"dark",maxWidth:354,messageSize:"16"})}finally{p()}}const y=new S(".gallery-link",{captionsData:"alt",captionDelay:250,className:"modal-image"});function f(){o.loader.style.display="inline-block"}function p(){o.loader.style.display="none"}function b(){o.loadBtn.classList.remove("hidden")}function d(){o.loadBtn.classList.add("hidden")}function H(){return o.galleryEl.firstChild.getBoundingClientRect().height}function q(){const e=H();window.scrollBy({left:0,top:e*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
