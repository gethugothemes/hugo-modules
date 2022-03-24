// main author repo: https://github.com/justinribeiro/youtube-lite
// modified by: https://github.com/gethugothemes

class LiteYTEmbed extends HTMLElement {
  constructor() {
    super();
    this.isIframeLoaded = false;
    this.setupDom();
  }
  static get observedAttributes() {
    return ["videoid", "playlistid"];
  }
  connectedCallback() {
    this.addEventListener("pointerover", LiteYTEmbed.warmConnections, {
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
  get playlistId() {
    return encodeURIComponent(this.getAttribute("playlistid") || "");
  }
  set playlistId(id) {
    this.setAttribute("playlistid", id);
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
    return Number(this.getAttribute("videoStartAt") || "0");
  }
  set videoStartAt(time) {
    this.setAttribute("videoStartAt", String(time));
  }
  get autoLoad() {
    return this.hasAttribute("autoload");
  }
  get noCookie() {
    return this.hasAttribute("nocookie");
  }
  get posterQuality() {
    return this.getAttribute("posterquality") || "hqdefault";
  }
  get posterLoading() {
    return this.getAttribute("posterloading") || "lazy";
  }
  get params() {
    return `start=${this.videoStartAt}&${this.getAttribute("params")}`;
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
        --lyt-animation: all 0.2s cubic-bezier(0, 0, 0.2, 1);
        --lyt-play-btn-default: #212121;
        --lyt-play-btn-hover: #f00;
      }

      #frame, #fallbackPlaceholder, iframe {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top:0;
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
        background-image: linear-gradient(180deg, #111 -20%, transparent 90%);
        height: 60px;
        width: 100%;
        transition: var(--lyt-animation);
        z-index: 1;
      }

      #playButton {
        width: 70px;
        height: 46px;
        background-color: var(--lyt-play-btn-hover);
        z-index: 1;
        opacity: 0.8;
        border-radius: 14%;
        transition: var(--lyt-animation);
        border: 0;
        cursor:pointer;
      }

      #frame:hover > #playButton {
        background-color: var(--lyt-play-btn-hover);
        opacity: 1;
      }

      #playButton:before {
        content: '';
        border-style: solid;
        border-width: 11px 0 11px 19px;
        border-color: transparent transparent transparent #fff;
      }

      #playButton,
      #playButton:before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
      }

      /* Post-click styles */
      .activated {
        cursor: unset;
      }

      #frame.activated::before,
      #frame.activated > #playButton {
        display: none;
      }
    </style>
    <div id="frame">
      <picture>
        <source id="webpPlaceholder" type="image/webp">
        <source id="jpegPlaceholder" type="image/jpeg">
        <img id="fallbackPlaceholder" referrerpolicy="origin">
      </picture>
      <button id="playButton"></button>
    </div>
  `;
    this.domRefFrame = shadowDom.querySelector("#frame");
    this.domRefImg = {
      fallback: shadowDom.querySelector("#fallbackPlaceholder"),
      webp: shadowDom.querySelector("#webpPlaceholder"),
      jpeg: shadowDom.querySelector("#jpegPlaceholder"),
    };
    this.domRefPlayButton = shadowDom.querySelector("#playButton");
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
      case "videoid":
      case "playlistid": {
        if (oldVal !== newVal) {
          this.setupComponent();
          if (this.domRefFrame.classList.contains("activated")) {
            this.domRefFrame.classList.remove("activated");
            this.shadowRoot.querySelector("iframe").remove();
            this.isIframeLoaded = false;
          }
        }
        break;
      }
      default:
        break;
    }
  }
  addIframe(isIntersectionObserver = false) {
    if (!this.isIframeLoaded) {
      const autoplay = isIntersectionObserver ? 0 : 1;
      const wantsNoCookie = this.noCookie ? "-nocookie" : "";
      let embedTarget;
      if (this.playlistId) {
        embedTarget = `?listType=playlist&list=${this.playlistId}&`;
      } else {
        embedTarget = `${this.videoId}?`;
      }
      const iframeHTML = `
      <iframe frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
      src="https://www.youtube${wantsNoCookie}.com/embed/${embedTarget}autoplay=${autoplay}&${this.params}"
      ></iframe>`;
      this.domRefFrame.insertAdjacentHTML("beforeend", iframeHTML);
      this.domRefFrame.classList.add("activated");
      this.isIframeLoaded = true;
      this.dispatchEvent(
        new CustomEvent("liteYoutubeIframeLoaded", {
          detail: {
            videoId: this.videoId,
          },
          bubbles: true,
          cancelable: true,
        })
      );
    }
  }
  initImagePlaceholder() {
    LiteYTEmbed.addPrefetch("preconnect", "https://i.ytimg.com/");
    const posterUrlWebp = `https://i.ytimg.com/vi_webp/${this.videoId}/${this.posterQuality}.webp`;
    const posterUrlJpeg = `https://i.ytimg.com/vi/${this.videoId}/${this.posterQuality}.jpg`;
    this.domRefImg.fallback.loading = this.posterLoading;
    this.domRefImg.webp.srcset = posterUrlWebp;
    this.domRefImg.jpeg.srcset = posterUrlJpeg;
    this.domRefImg.fallback.src = posterUrlJpeg;
    this.domRefImg.fallback.setAttribute(
      "aria-label",
      `${this.videoPlay}: ${this.videoTitle}`
    );
    this.domRefImg?.fallback?.setAttribute(
      "alt",
      `${this.videoPlay}: ${this.videoTitle}`
    );
  }
  initIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isIframeLoaded) {
          LiteYTEmbed.warmConnections();
          this.addIframe(true);
          observer.unobserve(this);
        }
      });
    }, options);
    observer.observe(this);
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
    if (LiteYTEmbed.isPreconnected) return;
    LiteYTEmbed.addPrefetch("preconnect", "https://s.ytimg.com");
    LiteYTEmbed.addPrefetch("preconnect", "https://www.youtube.com");
    LiteYTEmbed.addPrefetch("preconnect", "https://www.google.com");
    LiteYTEmbed.addPrefetch(
      "preconnect",
      "https://googleads.g.doubleclick.net"
    );
    LiteYTEmbed.addPrefetch("preconnect", "https://static.doubleclick.net");
    LiteYTEmbed.isPreconnected = true;
  }
}
LiteYTEmbed.isPreconnected = false;
customElements.define("youtube-lite", LiteYTEmbed);
