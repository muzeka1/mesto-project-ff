(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-23",headers:{authorization:"364ca4dc-eb54-4d9d-8c6a-9a3b62c6df46","Content-Type":"application/json"}},t=[fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Не удалось получить данные пользователя: ".concat(e.status))})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Не удалось загрузить карточки: ".concat(e.status))}))];function n(e,t,n,r,o,c){var a=e.querySelector(".card").cloneNode(!0),u=a.querySelector(".card__image"),i=a.querySelector(".card__delete-button"),s=a.querySelector(".card__like-button"),l=a.querySelector(".card__like-number");return u.src=t.link,u.alt=t.name,a.querySelector(".card__title").textContent=t.name,c._id!==t.owner._id?i.style.display="none":i.addEventListener("click",(function(e){n(t._id,e.target.closest(".places__item"))})),u.addEventListener("click",(function(){return r(t)})),t.likes.some((function(e){return e._id===c._id}))&&s.classList.add("card__like-button_is-active"),l.textContent=t.likes.length,s.addEventListener("click",(function(){o(s,l,t,c)})),a}function r(t,n,r,o){var c;t.classList.contains("card__like-button_is-active")?function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Не удалось убрать лайк: ".concat(e.status))}))}(r._id).then((function(e){n.textContent=e.likes.length,t.classList.remove("card__like-button_is-active")})):(c=r._id,fetch("".concat(e.baseUrl,"/cards/likes/").concat(c),{method:"PUT",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Не удалось поставить лайк: ".concat(e.status))}))).then((function(e){n.textContent=e.likes.length,t.classList.add("card__like-button_is-active")}))}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a)}function a(e){var t=document.querySelector(".popup_is-opened");"Escape"===e.key&&c(t)}var u={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function i(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(u.inputErrorClass),n.textContent=""}function s(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(u.inactiveButtonClass):t.classList.add(u.inactiveButtonClass)}function l(e){var t=Array.from(e.querySelectorAll(u.inputSelector));s(t,e.querySelector(u.submitButtonSelector)),t.forEach((function(t){i(e,t)}))}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p,f=document.querySelector("#card-template").content,m=document.querySelector(".places__list"),_=document.querySelector(".profile__add-button"),y=document.querySelectorAll(".popup__close"),v=document.querySelector(".profile__edit-button"),h=document.querySelector(".popup_type_edit"),S=document.querySelector(".popup_type_new-card"),b=document.querySelectorAll(".popup"),k=document.forms["edit-profile"],q=k.elements.name,E=k.elements.description,g=document.querySelector(".profile__title"),L=document.querySelector(".profile__description"),C=document.forms["new-place"],j=document.querySelector(".popup_type_image"),A=document.querySelector(".popup__image"),x=document.querySelector(".popup__caption"),P=document.querySelector(".profile__image"),T=document.querySelector(".popup_type_logo-url"),U=document.forms["edit-profile-logo"],w=U.elements["logo-link"],D=document.querySelector(".popup_type_error-message"),O=document.querySelector(".popup_type_card-delete"),B=document.forms["delete-card"],I="";function N(t){t.preventDefault();var n,r,o=t.target.querySelector(".popup__button");V(!0,o),(n=q.value,r=E.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return e.ok?e:Promise.reject("Не удалось обновить данные пользователя: ".concat(e.status))}))).then((function(){g.textContent=q.value,L.textContent=E.value,c(h)})).catch((function(e){z(e)})).finally((function(){V(!1,o)}))}function J(e){A.src=e.link,A.alt=e.name,x.textContent=e.name,o(j)}function M(e,t){I=e,p=t,o(O)}function H(t){t.preventDefault();var n,r=t.target.querySelector(".popup__button");V(!0,r),(n=w.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Не удалось обновить аватар пользователя: ".concat(e.status))}))).then((function(e){P.style.backgroundImage="url(".concat(e.avatar,")"),c(T)})).catch((function(e){z(e)})).finally((function(){V(!1,r)}))}function V(e,t){t.textContent=e?t.dataset.requestText:t.dataset.defaultText}function z(e){D.textContent=e,D.classList.add("popup_type_error-message-active"),setTimeout((function(){D.classList.remove("popup_type_error-message-active")}),2500)}P.addEventListener("click",(function(){Array.from(T.querySelectorAll(".popup__input")).forEach((function(e){e.value=""})),l(U),o(T)})),_.addEventListener("click",(function(){Array.from(S.querySelectorAll(".popup__input")).forEach((function(e){e.value=""})),l(C),o(S)})),b.forEach((function(e){e.addEventListener("click",(function(t){!function(e,t){t.target===e&&c(t.target)}(e,t)}))})),y.forEach((function(e){e.addEventListener("click",(function(e){c(e.target.closest(".popup"))}))})),v.addEventListener("click",(function(){q.value=g.textContent,E.value=L.textContent,l(k),o(h)})),Array.from(document.querySelectorAll(u.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(u.inputSelector)),n=e.querySelector(u.submitButtonSelector);s(t,n),t.forEach((function(r){r.addEventListener("input",(function(){!function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.typeError):t.setCustomValidity(""),t.validity.valid?i(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(u.inputErrorClass),r.textContent=n}(e,t,t.validationMessage)}(e,r),s(t,n)}))}))}(e)})),Promise.all(t).then((function(e){return[e[0],e[1]]})).catch((function(e){return Promise.reject(e)})).then((function(t){var o,a,u,i=(u=2,function(e){if(Array.isArray(e))return e}(a=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return u}}(a,u)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(a,u)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),s=i[0],l=i[1];o=s,g.textContent=o.name,L.textContent=o.about,P.style.backgroundImage="url(".concat(o.avatar,")"),k.addEventListener("submit",N),U.addEventListener("submit",H),l.forEach((function(e){m.append(n(f,e,M,J,r,s))})),C.addEventListener("submit",(function(t){!function(t,o){t.preventDefault();var a,u,i=t.target.querySelector(".popup__button");V(!0,i),(a=C.elements["place-name"].value,u=C.elements.link.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:a,link:u})}).then((function(e){return e.ok?e.json():Promise.reject("Не удалось добавить карточку: ".concat(e.status))}))).then((function(e){m.prepend(n(f,e,M,J,r,o)),c(S)})).catch((function(e){z(e)})).finally((function(){V(!1,i)})),C.reset()}(t,s)})),B.addEventListener("submit",(function(t){!function(t,n,r){t.preventDefault();var o,a=t.target.querySelector(".popup__button");V(!0,a),(o=n,fetch("".concat(e.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Не удалось удалить карточку: ".concat(e.status))}))).then((function(){r.remove(),c(O)})).catch((function(e){z(e)})).finally((function(){V(!1,a)}))}(t,I,p)}))})).catch((function(e){z(e)}))})();