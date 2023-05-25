import{Controller as t}from"@hotwired/stimulus";class s extends t{initialize(){this.hide()}connect(){setTimeout(()=>{this.show()},this.showDelayValue),this.hasDismissAfterValue&&setTimeout(()=>{this.close()},this.dismissAfterValue)}close(){this.hide(),setTimeout(()=>{this.element.remove()},this.removeDelayValue)}show(){this.element.classList.add(...this.showClasses),this.element.classList.remove(...this.hideClasses)}hide(){this.element.classList.add(...this.hideClasses),this.element.classList.remove(...this.showClasses)}}s.values={dismissAfter:Number,showDelay:{type:Number,default:200},removeDelay:{type:Number,default:1100}},s.classes=["show","hide"];class e extends t{connect(){this.timeout=null,this.duration=this.data.get("duration")||1e3}save(){clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.statusTarget.textContent="Saving...",this.formTarget.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0}))},this.duration)}success(){this.setStatus("Saved!")}error(){this.setStatus("Unable to save!")}setStatus(t){this.statusTarget.textContent=t,this.timeout=setTimeout(()=>{this.statusTarget.textContent=""},2e3)}}e.targets=["form","status"];class i extends t{constructor(...t){super(...t),this._onMenuButtonKeydown=t=>{switch(t.keyCode){case 13:case 32:t.preventDefault(),this.toggle()}}}connect(){this.toggleClass=this.data.get("class")||"hidden",this.visibleClass=this.data.get("visibleClass")||null,this.invisibleClass=this.data.get("invisibleClass")||null,this.activeClass=this.data.get("activeClass")||null,this.enteringClass=this.data.get("enteringClass")||null,this.leavingClass=this.data.get("leavingClass")||null,this.hasButtonTarget&&(this.buttonTarget.addEventListener("keydown",this._onMenuButtonKeydown),this.buttonTarget.setAttribute("aria-haspopup","true"))}disconnect(){this.hasButtonTarget&&(this.buttonTarget.removeEventListener("keydown",this._onMenuButtonKeydown),this.buttonTarget.removeAttribute("aria-haspopup"))}toggle(){this.openValue=!this.openValue}openValueChanged(){this.openValue?this._show():this._hide()}_show(t){setTimeout((()=>{this.menuTarget.classList.remove(this.toggleClass),this.hasButtonTarget&&this.buttonTarget.setAttribute("aria-expanded","true"),this._enteringClassList[0].forEach((t=>{this.menuTarget.classList.add(t)}).bind(this)),this._activeClassList[0].forEach(t=>{this.activeTarget.classList.add(t)}),this._invisibleClassList[0].forEach(t=>this.menuTarget.classList.remove(t)),this._visibleClassList[0].forEach(t=>{this.menuTarget.classList.add(t)}),setTimeout((()=>{this._enteringClassList[0].forEach(t=>this.menuTarget.classList.remove(t))}).bind(this),this.enterTimeout[0]),"function"==typeof t&&t()}).bind(this))}_hide(t){setTimeout((()=>{this.hasButtonTarget&&this.buttonTarget.setAttribute("aria-expanded","false"),this._invisibleClassList[0].forEach(t=>this.menuTarget.classList.add(t)),this._visibleClassList[0].forEach(t=>this.menuTarget.classList.remove(t)),this._activeClassList[0].forEach(t=>this.activeTarget.classList.remove(t)),this._leavingClassList[0].forEach(t=>this.menuTarget.classList.add(t)),setTimeout((()=>{this._leavingClassList[0].forEach(t=>this.menuTarget.classList.remove(t)),"function"==typeof t&&t(),this.menuTarget.classList.add(this.toggleClass)}).bind(this),this.leaveTimeout[0])}).bind(this))}show(){this.openValue=!0}hide(t){!1===this.element.contains(t.target)&&this.openValue&&(this.openValue=!1)}get activeTarget(){return this.data.has("activeTarget")?document.querySelector(this.data.get("activeTarget")):this.element}get _activeClassList(){return this.activeClass?this.activeClass.split(",").map(t=>t.split(" ")):[[],[]]}get _visibleClassList(){return this.visibleClass?this.visibleClass.split(",").map(t=>t.split(" ")):[[],[]]}get _invisibleClassList(){return this.invisibleClass?this.invisibleClass.split(",").map(t=>t.split(" ")):[[],[]]}get _enteringClassList(){return this.enteringClass?this.enteringClass.split(",").map(t=>t.split(" ")):[[],[]]}get _leavingClassList(){return this.leavingClass?this.leavingClass.split(",").map(t=>t.split(" ")):[[],[]]}get enterTimeout(){return(this.data.get("enterTimeout")||"0,0").split(",").map(t=>parseInt(t))}get leaveTimeout(){return(this.data.get("leaveTimeout")||"0,0").split(",").map(t=>parseInt(t))}}i.targets=["menu","button"],i.values={open:Boolean};class a extends t{connect(){this.toggleClass=this.data.get("class")||"hidden",this.backgroundId=this.data.get("backgroundId")||"modal-background",this.backgroundHtml=this.data.get("backgroundHtml")||this._backgroundHTML(),this.allowBackgroundClose="true"===(this.data.get("allowBackgroundClose")||"true"),this.preventDefaultActionOpening="true"===(this.data.get("preventDefaultActionOpening")||"true"),this.preventDefaultActionClosing="true"===(this.data.get("preventDefaultActionClosing")||"true")}disconnect(){this.close()}open(t){this.preventDefaultActionOpening&&t.preventDefault(),t.target.blur&&t.target.blur(),this.lockScroll(),this.containerTarget.classList.remove(this.toggleClass),this.data.get("disable-backdrop")||(document.body.insertAdjacentHTML("beforeend",this.backgroundHtml),this.background=document.querySelector(`#${this.backgroundId}`))}close(t){t&&this.preventDefaultActionClosing&&t.preventDefault(),this.unlockScroll(),this.containerTarget.classList.add(this.toggleClass),this.background&&this.background.remove()}closeBackground(t){this.allowBackgroundClose&&t.target===this.containerTarget&&this.close(t)}closeWithKeyboard(t){27!==t.keyCode||this.containerTarget.classList.contains(this.toggleClass)||this.close(t)}_backgroundHTML(){return`<div id="${this.backgroundId}" class="fixed top-0 left-0 w-full h-full" style="background-color: ${this.backdropColorValue}; z-index: 9998;"></div>`}lockScroll(){const t=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=`${t}px`,document.body.classList.add("fixed","inset-x-0","overflow-hidden"),this.restoreScrollValue&&(this.saveScrollPosition(),document.body.style.top=`-${this.scrollPosition}px`)}unlockScroll(){document.body.style.paddingRight=null,document.body.classList.remove("fixed","inset-x-0","overflow-hidden"),this.restoreScrollValue&&(this.restoreScrollPosition(),document.body.style.top=null)}saveScrollPosition(){this.scrollPosition=window.pageYOffset||document.body.scrollTop}restoreScrollPosition(){void 0!==this.scrollPosition&&(document.documentElement.scrollTop=this.scrollPosition)}}a.targets=["container"],a.values={backdropColor:{type:String,default:"rgba(0, 0, 0, 0.8)"},restoreScroll:{type:Boolean,default:!0}};class l extends t{connect(){this.activeTabClasses=(this.data.get("activeTab")||"active").split(" "),this.inactiveTabClasses=(this.data.get("inactiveTab")||"inactive").split(" "),this.anchor&&(this.index=this.tabTargets.findIndex(t=>t.id===this.anchor)),this.showTab()}change(t){t.preventDefault(),this.index=t.currentTarget.dataset.index?t.currentTarget.dataset.index:t.currentTarget.dataset.id?this.tabTargets.findIndex(s=>s.id==t.currentTarget.dataset.id):this.tabTargets.indexOf(t.currentTarget),window.dispatchEvent(new CustomEvent("tsc:tab-change"))}showTab(){this.tabTargets.forEach((t,s)=>{const e=this.panelTargets[s];s===this.index?(e.classList.remove("hidden"),t.classList.remove(...this.inactiveTabClasses),t.classList.add(...this.activeTabClasses),t.id&&(location.hash=t.id)):(e.classList.add("hidden"),t.classList.remove(...this.activeTabClasses),t.classList.add(...this.inactiveTabClasses))})}get index(){return parseInt(this.data.get("index")||0)}set index(t){this.data.set("index",t>=0?t:0),this.showTab()}get anchor(){return document.URL.split("#").length>1?document.URL.split("#")[1]:null}}l.targets=["tab","panel"];class o extends t{connect(){this.toggleClass=this.data.get("class")||"hidden"}toggle(t){"checkbox"!=t.target.getAttribute("type")&&t.preventDefault(),this.openValue=!this.openValue}hide(t){t.preventDefault(),this.openValue=!1}show(t){t.preventDefault(),this.openValue=!0}openValueChanged(){this.toggleClass&&this.toggleableTargets.forEach(t=>{t.classList.toggle(this.toggleClass)})}}o.targets=["toggleable"],o.values={open:Boolean};class n extends t{mouseOver(){this.contentTarget.classList.remove("hidden")}mouseOut(){this.contentTarget.classList.add("hidden")}toggle(){this.contentTarget.classList.contains("hidden")?(this.contentTarget.classList.remove("hidden"),this.hasDismissAfterValue&&setTimeout(()=>{this.contentTarget.classList.add("hidden")},this.dismissAfterValue)):this.contentTarget.classList.add("hidden")}}n.values={dismissAfter:Number},n.targets=["content"];class r extends i{_show(){this.overlayTarget.classList.remove(this.toggleClass),super._show((()=>{this._activeClassList[1].forEach(t=>this.overlayTarget.classList.add(t)),this._invisibleClassList[1].forEach(t=>this.overlayTarget.classList.remove(t)),this._visibleClassList[1].forEach(t=>this.overlayTarget.classList.add(t)),setTimeout((()=>{this._enteringClassList[1].forEach(t=>this.overlayTarget.classList.remove(t))}).bind(this),this.enterTimeout[1])}).bind(this))}_hide(){this._leavingClassList[1].forEach(t=>this.overlayTarget.classList.add(t)),super._hide((()=>{setTimeout((()=>{this._visibleClassList[1].forEach(t=>this.overlayTarget.classList.remove(t)),this._invisibleClassList[1].forEach(t=>this.overlayTarget.classList.add(t)),this._activeClassList[1].forEach(t=>this.overlayTarget.classList.remove(t)),this._leavingClassList[1].forEach(t=>this.overlayTarget.classList.remove(t)),this.overlayTarget.classList.add(this.toggleClass)}).bind(this),this.leaveTimeout[1])}).bind(this))}}r.targets=["menu","overlay"];class h extends t{connect(){this.styleProperty=this.data.get("style")||"backgroundColor"}update(){this.preview=this.color}set preview(t){this.previewTarget.style[this.styleProperty]=t;const s=this._getContrastYIQ(t);"color"===this.styleProperty?this.previewTarget.style.backgroundColor=s:this.previewTarget.style.color=s}get color(){return this.colorTarget.value}_getContrastYIQ(t){return t=t.replace("#",""),(299*parseInt(t.substr(0,2),16)+587*parseInt(t.substr(2,2),16)+114*parseInt(t.substr(4,2),16))/1e3>=128?"#000":"#fff"}}h.targets=["preview","color"];export{s as Alert,e as Autosave,h as ColorPreview,i as Dropdown,a as Modal,n as Popover,r as Slideover,l as Tabs,o as Toggle};
//# sourceMappingURL=tailwindcss-stimulus-components.modern.js.map
