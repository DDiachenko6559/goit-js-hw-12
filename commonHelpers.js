import{S as u,i as a}from"./assets/vendor-8c59ed88.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m=s=>{const r="44070082-fd53ee46a47d37a3fc9d7b56d",o="https://pixabay.com/api/",i=new URLSearchParams({key:r,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}),e=`${o}?${i}`;return fetch(e).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()})},f=s=>s.map(({webformatURL:r,largeImageURL:o,tags:i,likes:e,views:t,comments:n,downloads:c})=>`<li class="gallery-item">
          <a class="gallery-link" href="${o}">
            <img
              class="gallery-image"
              src="${r}"
              alt="${i}"
              width = "360"
              height = "200"
            />
            <ul class="image-info">
              <li class="item-info">Likes <span>${e}</span></li>
              <li class="item-info">Views <span>${t}</span></li>
              <li class="item-info">Comments <span>${n}</span></li>
              <li class="item-info">Downloads <span>${c}</span></li>
            </ul>
          </a>
        </li>
    `).join(""),l={galleryEl:document.querySelector(".gallery-list"),loader:document.querySelector(".loader"),searchForm:document.querySelector(".form")},p=new u(".gallery-link",{captionsData:"alt",captionDelay:250});l.searchForm.addEventListener("submit",s=>{s.preventDefault(),l.loader.style.display="inline-block";const r=s.target.elements.search.value.trim();if(r===""){l.galleryEl.innerHTML="",s.target.reset(),a.warning({title:"Warning",message:"Search field cannot be empty!",position:"topRight"});return}l.galleryEl.innerHTML="",m(r).then(o=>{o.total||a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),l.galleryEl.innerHTML=f(o.hits),p.refresh()}).catch(o=>console.log(o)).finally(()=>{l.loader.style.display="none",s.target.reset()})});
//# sourceMappingURL=commonHelpers.js.map
