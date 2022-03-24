// original author repo https://github.com/slightlyoff/lite-vimeo
// modified by https://github.com/gethugothemes

class LiteVimeoEmbed extends HTMLElement {
  constructor() {
    super();
    this.iframeLoaded = false;
    this.setupDom();
  }
  static get observedAttributes() {
    return ["videoid"];
  }
  connectedCallback() {
    this.addEventListener("pointerover", LiteVimeoEmbed.warmConnections, {
      once: true,
    });
    this.addEventListener("click", () => this.addIframe());
  }
  get videoId() {
    return encodeURIComponent(this.getAttribute("videoid") || "");
  }
  set videoId(id) {
    this.setAttribute("videoid", id);
  }
  get videoTitle() {
    return this.getAttribute("videotitle") || "Video";
  }
  set videoTitle(title) {
    this.setAttribute("videotitle", title);
  }
  get videoPlay() {
    return this.getAttribute("videoPlay") || "Play";
  }
  set videoPlay(name) {
    this.setAttribute("videoPlay", name);
  }
  get videoStartAt() {
    return this.getAttribute("start") || "0s";
  }
  set videoStartAt(time) {
    this.setAttribute("start", time);
  }
  get autoLoad() {
    return this.hasAttribute("autoload");
  }
  set autoLoad(value) {
    if (value) {
      this.setAttribute("autoload", "");
    } else {
      this.removeAttribute("autoload");
    }
  }
  get autoPlay() {
    return this.hasAttribute("autoplay");
  }
  set autoPlay(value) {
    if (value) {
      this.setAttribute("autoplay", "autoplay");
    } else {
      this.removeAttribute("autoplay");
    }
  }
  setupDom() {
    const shadowDom = this.attachShadow({ mode: "open" });
    shadowDom.innerHTML = `
      <style>
        :host {
          contain: content;
          display: block;
          position: relative;
          width: 100%;
          padding-bottom: calc(100% / (16 / 9));
        }

        #frame, #fallbackPlaceholder, iframe {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
        }

        #frame {
          cursor: pointer;
        }

        #fallbackPlaceholder {
          object-fit: cover;
        }

        #frame::before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);
          background-position: top;
          background-repeat: repeat-x;
          height: 60px;
          padding-bottom: 50px;
          width: 100%;
          transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
          z-index: 1;
        }
        /* play button */
        .lvo-playbtn {
          width: 70px;
          height: 46px;
          background-color: #212121;
          z-index: 1;
          opacity: 0.8;
          border-radius: 10%;
          transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
          border: 0;
          cursor: pointer;
        }
        #frame:hover .lvo-playbtn {
          background-color: rgb(98, 175, 237);
          opacity: 1;
        }
        /* play button triangle */
        .lvo-playbtn:before {
          content: '';
          border-style: solid;
          border-width: 11px 0 11px 19px;
          border-color: transparent transparent transparent #fff;
        }
        .lvo-playbtn,
        .lvo-playbtn:before {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
        }

        /* Post-click styles */
        .lvo-activated {
          cursor: unset;
        }

        #frame.lvo-activated::before,
        .lvo-activated .lvo-playbtn {
          display: none;
        }
      </style>
      <div id="frame">
        <picture>
          <source id="webpPlaceholder" type="image/webp">
          <source id="jpegPlaceholder" type="image/jpeg">
          <img id="fallbackPlaceholder" referrerpolicy="origin">
        </picture>
        <button class="lvo-playbtn"></button>
      </div>
    `;
    this.domRefFrame = this.shadowRoot.querySelector("#frame");
    this.domRefImg = {
      fallback: this.shadowRoot.querySelector("#fallbackPlaceholder"),
      webp: this.shadowRoot.querySelector("#webpPlaceholder"),
      jpeg: this.shadowRoot.querySelector("#jpegPlaceholder"),
    };
    this.domRefPlayButton = this.shadowRoot.querySelector(".lvo-playbtn");
  }
  setupComponent() {
    this.initImagePlaceholder();
    this.domRefPlayButton.setAttribute(
      "aria-label",
      `${this.videoPlay}: ${this.videoTitle}`
    );
    this.setAttribute("title", `${this.videoPlay}: ${this.videoTitle}`);
    if (this.autoLoad) {
      this.initIntersectionObserver();
    }
  }
  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case "videoid": {
        if (oldVal !== newVal) {
          this.setupComponent();
          if (this.domRefFrame.classList.contains("lvo-activated")) {
            this.domRefFrame.classList.remove("lvo-activated");
            this.shadowRoot.querySelector("iframe").remove();
          }
        }
        break;
      }
      default:
        break;
    }
  }
  addIframe() {
    if (!this.iframeLoaded) {
      let apValue =
        (this.autoLoad && this.autoPlay) || !this.autoLoad ? "autoplay=1" : "";
      let srcUrl = new URL(
        `/video/${this.videoId}?${apValue}&#t=${this.videoStartAt}&dnt=1`,
        "https://player.vimeo.com/"
      );
      const iframeHTML = `
        <iframe frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen src="${srcUrl}"></iframe>`;
      this.domRefFrame.insertAdjacentHTML("beforeend", iframeHTML);
      this.domRefFrame.classList.add("lvo-activated");
      this.iframeLoaded = true;
    }
  }
  async initImagePlaceholder() {
    LiteVimeoEmbed.addPrefetch("preconnect", "https://i.vimeocdn.com/");
    let api_url = `https://vimeo.com/api/v2/video/${this.videoId}.json`;
    let api_response = (await (await fetch(api_url)).json())[0];
    let tn_large = api_response.thumbnail_large;
    let imgId = tn_large.substr(tn_large.lastIndexOf("/") + 1).split("_")[0];
    const posterUrlWebp = `https://i.vimeocdn.com/video/${imgId}.webp?mw=1100&mh=619&q=70`;
    const posterUrlJpeg = `https://i.vimeocdn.com/video/${imgId}.jpg?mw=1100&mh=619&q=70`;
    this.domRefImg.webp.srcset = posterUrlWebp;
    this.domRefImg.jpeg.srcset = posterUrlJpeg;
    this.domRefImg.fallback.src = posterUrlJpeg;
    this.domRefImg.fallback.setAttribute(
      "aria-label",
      `${this.videoPlay}: ${this.videoTitle}`
    );
    this.domRefImg.fallback.setAttribute(
      "alt",
      `${this.videoPlay}: ${this.videoTitle}`
    );
  }
  initIntersectionObserver() {
    if (
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window
    ) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      };
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.iframeLoaded) {
            LiteVimeoEmbed.warmConnections();
            this.addIframe();
            observer.unobserve(this);
          }
        });
      }, options);
      observer.observe(this);
    }
  }
  static addPrefetch(kind, url, as) {
    const linkElem = document.createElement("link");
    linkElem.rel = kind;
    linkElem.href = url;
    if (as) {
      linkElem.as = as;
    }
    linkElem.crossOrigin = "true";
    document.head.append(linkElem);
  }
  static warmConnections() {
    if (LiteVimeoEmbed.preconnected) return;
    LiteVimeoEmbed.addPrefetch("preconnect", "https://f.vimeocdn.com");
    LiteVimeoEmbed.addPrefetch("preconnect", "https://player.vimeo.com");
    LiteVimeoEmbed.addPrefetch("preconnect", "https://i.vimeocdn.com");
    LiteVimeoEmbed.preconnected = true;
  }
}
LiteVimeoEmbed.preconnected = false;
customElements.define("vimeo-lite", LiteVimeoEmbed);
