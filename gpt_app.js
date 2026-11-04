const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3200)}
function openModal(id){document.getElementById(id)?.classList.add('is-open');document.body.style.overflow='hidden'}
function closeModals(){document.querySelectorAll('.modal-backdrop').forEach(m=>m.classList.remove('is-open'));document.body.style.overflow=''}
document.querySelectorAll('[data-modal]').forEach(button=>button.addEventListener('click',()=>openModal(button.dataset.modal)));
document.querySelectorAll('.modal-close').forEach(button=>button.addEventListener('click',closeModals));
document.querySelectorAll('.modal-backdrop').forEach(backdrop=>backdrop.addEventListener('click',event=>{if(event.target===backdrop)closeModals()}));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeModals()});
document.querySelectorAll('[data-ritual]').forEach(button=>button.addEventListener('click',()=>{const id=button.dataset.ritual==='candle'?'candle-count':'flower-count';const count=document.getElementById(id);count.textContent=Number(count.textContent)+1;showToast(button.dataset.ritual==='candle'?'Votre bougie a été allumée.':'Votre fleur a été déposée.')}));
document.querySelectorAll('form').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();const type=form.dataset.form;closeModals();showToast(type==='message'?'Votre message a été envoyé à la famille pour validation.':'Un lien d’invitation sera envoyé à votre adresse email.');form.reset()}));
