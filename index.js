import{a as $,S as B,i as m}from"./assets/vendor-CPRf1AQD.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();async function h(e,o=1){const r="https://pixabay.com/api/",s="51439331-da55d8a3a0e541a7ddbda82f1",t=new URLSearchParams({key:s,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15});return(await $(`${r}?${t}`)).data}const p=document.querySelector(".gallery"),y=document.querySelector(".loader"),g=document.querySelector(".load-more-wrapper"),M=new B(".gallery a",{captionsData:"alt",captionDelay:250});function L(e){const o=e.map(r=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${r.largeImageURL}">
            <img class="gallery-image" src="${r.webformatURL}" alt="${r.tags}" />
          </a>
          <div class="info">
            <div class="info-item">
              <span class="info-item-title">Likes</span>
              <span class="info-item-value">${r.likes}</span>
            </div>
            <div class="info-item">
              <span class="info-item-title">Views</span>
              <span class="info-item-value">${r.views}</span>
            </div>
            <div class="info-item">
              <span class="info-item-title">Comments</span>
              <span class="info-item-value">${r.comments}</span>
            </div>
            <div class="info-item">
              <span class="info-item-title">Downloads</span>
              <span class="info-item-value">${r.downloads}</span>
            </div>
          </div>
        </li>
      `).join("");p.insertAdjacentHTML("beforeend",o),M.refresh()}function R(){p.innerHTML=""}function b(){y.classList.remove("hidden")}function v(){y.classList.add("hidden")}function w(){g.classList.remove("hidden")}function S(){g.classList.add("hidden")}const c=document.querySelector(".form"),d=document.querySelector(".load-more-btn");let i=1,q="",n=0;c.addEventListener("submit",C);d.addEventListener("click",E);async function C(e){e.preventDefault();const o=c.elements["search-text"].value.trim(),r=c.querySelector(".btn");if(!o){P("Please enter search query");return}i=1,n=0,q=o,r.disabled=!0,R(),S(),b();try{const s=await h(o,i);if(!s.hits||s.hits.length===0){f("Sorry, there are no images matching <br>your search query. Please try again!");return}L(s.hits),n+=s.hits.length,n<s.totalHits?w():u()}catch{f("Failed to fetch data from API. <br>Please try again later.")}finally{r.disabled=!1,v()}}async function E(){i+=1,S(),b(),d.disabled=!0;try{const e=await h(q,i);e.hits.length>0?(L(e.hits),O(),n+=e.hits.length,n<e.totalHits?w():u()):u()}catch{f("Failed to fetch more images. <br>Please try again later.")}finally{v(),d.disabled=!1}}function u(){P("We're sorry, but you've reached the end of search results.")}function f(e){m.error({message:e,backgroundColor:"#ef4040",messageColor:"#fff",position:"topRight"})}function P(e){m.warning({message:e,backgroundColor:"#ffa000",messageColor:"#fff",position:"topRight"})}function O(){const o=document.querySelector(".gallery").querySelector(".gallery-item");if(o){const r=o.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
