import View from "./view.js";
import images1 from '../../images/operation-1.webp';
import images2 from '../../images/operation-2.webp';
import images3 from '../../images/operation-3.webp';

class PageNavigation extends View{
  _images = [images1, images2, images3];

  addHandlerToggle(){
    this._operationHeader.addEventListener('click', this._toggleOperationEvent.bind(this));
    document.addEventListener('click', this._removeDropdown.bind(this));
    this._dropdownCm.addEventListener('click', this._dropdown.bind(this));
    this._dropdownpd.addEventListener('click', this._dropdown.bind(this));
    this._toggleMenu.addEventListener('click', this.toggleMenu);
    this._revealSectionOnScroll();
  }
  
  _toggleOperationEvent(e){
    const operation = e.target.closest('.operation');
    if(operation.classList.contains('operation')){
        const operationId = operation.dataset.id;
        this._operations.forEach(operation => operation.classList.remove('operation-active'));
        this._operationContents.forEach(content => content.classList.add('hidden'));
        operation.classList.add('operation-active');
        document.querySelector(`.operation-content-${operationId}`).classList.remove('hidden');
        document.querySelector('.operation-img').src = this._images[+operationId - 1];
    }
        
    }
  
    _showDropdown(className){
      document.querySelector(className).querySelector('.dropdown-container').classList.remove('hidden');
    }

    _hideDropdown(className){
      document.querySelector(className).querySelector('.dropdown-container').classList.add('hidden');
    }

    toggleMenu(){
      document.querySelector('#toggle-menu')
      .classList.toggle('hide-left-navbar');

      if(document.querySelector('#toggle-menu').classList.contains('hide-left-navbar')){
        this._toggleMenu.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
      }else{
        this._toggleMenu.innerHTML = `<i class="fa-solid fa-bars"></i>`; 
      }
      
    }

    _dropdown(e){
      if(e.target.closest('.cm-dropdown')){
        this._showDropdown('.cm-dropdown');
      }
      if(e.target.closest('.pd-dropdown')){
        this._showDropdown('.pd-dropdown');
      }
    }
    
    _removeDropdown(e){
     if(!e.target.closest('.cm-dropdown')){
      this._hideDropdown('.cm-dropdown');
      }
      if(!e.target.closest('.pd-dropdown')){
        this._hideDropdown('.pd-dropdown');
        }
    }

    _revealSectionOnScroll(){
      //revealing section on scroll
  const sectionObserver = new IntersectionObserver(this._revealSection, {
    root: null,
    threshold: 0.15,
  });

  this._allSections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section-hidden');
  })
    }

    _revealSection(enteries, observer){
      const [entry] = enteries;
      if(!entry.isIntersecting) return;
      entry.target.classList.remove('section-hidden');
      observer.unobserve(entry.target);
    }
}
export default new PageNavigation();