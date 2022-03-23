/**
 *
 * The shadowDom / Intersection Observer version of Paul's concept:
 * https://github.com/paulirish/lite-youtube-embed
 *
 * A lightweight YouTube embed. Still should feel the same to the user, just
 * MUCH faster to initialize and paint.
 *
 * Thx to these as the inspiration
 *   https://storage.googleapis.com/amp-vs-non-amp/youtube-lazy.html
 *   https://autoplay-youtube-player.glitch.me/
 *
 * Once built it, I also found these (👍👍):
 *   https://github.com/ampproject/amphtml/blob/master/extensions/amp-youtube
 *   https://github.com/Daugilas/lazyYT https://github.com/vb/lazyframe
 */

// modified by @gethugothemes

let LiteVimeoEmbed = /** @class */ (() => {
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
    /**
     * Define our shadowDOM for the component
     */
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
    /**
     * Parse our attributes and fire up some placeholders
     */
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
    /**
     * Lifecycle method that we use to listen for attribute changes to period
     * @param {*} name
     * @param {*} oldVal
     * @param {*} newVal
     */
    attributeChangedCallback(name, oldVal, newVal) {
      switch (name) {
        case "videoid": {
          if (oldVal !== newVal) {
            this.setupComponent();
            // if we have a previous iframe, remove it and the activated class
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
    /**
     * Inject the iframe into the component body
     */
    addIframe() {
      if (!this.iframeLoaded) {
        /**
         * Vimeo example embed markup:
         *
         *  <iframe src="https://player.vimeo.com/video/364402896#t=1m3s"
         *    width="640" height="360"
         *    frameborder="0"
         *    allow="autoplay; fullscreen" allowfullscreen>
         *  </iframe>
         */
        // FIXME: add a setting for autoplay
        let apValue =
          (this.autoLoad && this.autoPlay) || !this.autoLoad
            ? "autoplay=1"
            : "";
        let srcUrl = new URL(
          `/video/${this.videoId}?${apValue}&#t=${this.videoStartAt}&dnt=1`,
          "https://player.vimeo.com/"
        );
        // TODO: construct src value w/ URL constructor
        const iframeHTML = `
        <iframe frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen src="${srcUrl}"></iframe>`;
        this.domRefFrame.insertAdjacentHTML("beforeend", iframeHTML);
        this.domRefFrame.classList.add("lvo-activated");
        this.iframeLoaded = true;
      }
    }
    /**
     * Setup the placeholder image for the component
     */
    async initImagePlaceholder() {
      // TODO(slightlyoff): TODO: cache API responses
      // we don't know which image type to preload, so warm the connection
      LiteVimeoEmbed.addPrefetch("preconnect", "https://i.vimeocdn.com/");
      // API is the video-id based
      // http://vimeo.com/api/v2/video/364402896.json
      let api_url = `https://vimeo.com/api/v2/video/${this.videoId}.json`;
      // Now fetch the JSON that locates our placeholder from vimeo's JSON API
      let api_response = (await (await fetch(api_url)).json())[0];
      // Extract the image id, e.g. 819916979, from a URL like:
      // thumbnail_large: "https://i.vimeocdn.com/video/819916979_640.jpg"
      let tn_large = api_response.thumbnail_large;
      let imgId = tn_large.substr(tn_large.lastIndexOf("/") + 1).split("_")[0];
      // const posterUrlWebp = `https://i.ytimg.com/vi_webp/${this.videoId}/hqdefault.webp`;
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
    /**
     * Setup the Intersection Observer to load the iframe when scrolled into view
     */
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
    /**
     * Add a <link rel={preload | preconnect} ...> to the head
     * @param {*} kind
     * @param {*} url
     * @param {*} as
     */
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
    /**
     * Begin preconnecting to warm up the iframe load Since the embed's netwok
     * requests load within its iframe, preload/prefetch'ing them outside the
     * iframe will only cause double-downloads. So, the best we can do is warm up
     * a few connections to origins that are in the critical path.
     *
     * Maybe `<link rel=preload as=document>` would work, but it's unsupported:
     * http://crbug.com/593267 But TBH, I don't think it'll happen soon with Site
     * Isolation and split caches adding serious complexity.
     */
    static warmConnections() {
      if (LiteVimeoEmbed.preconnected) return;
      // Host that Vimeo uses to serve JS needed by player
      LiteVimeoEmbed.addPrefetch("preconnect", "https://f.vimeocdn.com");
      // The iframe document comes from player.vimeo.com
      LiteVimeoEmbed.addPrefetch("preconnect", "https://player.vimeo.com");
      // Image for placeholder comes from i.vimeocdn.com
      LiteVimeoEmbed.addPrefetch("preconnect", "https://i.vimeocdn.com");
      LiteVimeoEmbed.preconnected = true;
    }
  }
  LiteVimeoEmbed.preconnected = false;
  return LiteVimeoEmbed;
})();
// Register custom element
customElements.define("lite-vimeo", LiteVimeoEmbed);
//# sourceMappingURL=lite-vimeo.js.map
