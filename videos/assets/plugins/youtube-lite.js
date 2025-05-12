// main author repo: https://github.com/justinribeiro/lite-youtube
// modified by: https://github.com/gethugothemes

class LiteYTEmbed extends HTMLElement {
  shadowRoot;
  domRefFrame;
  domRefImg;
  domRefPlayButton;
  static isPreconnected = false;
  isIframeLoaded = false;

  constructor() {
    super();
    this.setupDom();
  }

  static get observedAttributes() {
    return ["videoid", "playlistid", "videoplay", "videotitle"];
  }

  connectedCallback() {
    this.addEventListener(
      "pointerover",
      () => LiteYTEmbed.warmConnections(this),
      {
        once: true,
      },
    );

    this.addEventListener("click", () => this.addIframe());

    // Setup component on connection
    this.setupComponent();
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
    return this.getAttribute("videoplay") || "Play";
  }

  set videoPlay(name) {
    this.setAttribute("videoplay", name);
  }

  get videoStartAt() {
    return this.getAttribute("videoStartAt") || "0";
  }

  get autoLoad() {
    return this.hasAttribute("autoload");
  }

  get autoPause() {
    return this.hasAttribute("autopause");
  }

  get noCookie() {
    return this.hasAttribute("nocookie");
  }

  get posterQuality() {
    return this.getAttribute("posterquality") || "hqdefault";
  }

  set posterQuality(opts) {
    this.setAttribute("posterquality", opts);
  }

  get posterLoading() {
    return this.getAttribute("posterloading") || "lazy";
  }

  get params() {
    return `start=${this.videoStartAt}&${this.getAttribute("params")}`;
  }

  set params(opts) {
    this.setAttribute("params", opts);
  }

  get disableNoscript() {
    return this.hasAttribute("disablenoscript");
  }

  /**
   * Define our shadowDOM for the component
   */
  setupDom() {
    const shadowDom = this.attachShadow({ mode: "open" });
    let nonce = "";
    if (window.liteYouTubeNonce) {
      nonce = `nonce="${window.liteYouTubeNonce}"`;
    }
    shadowDom.innerHTML = `
      <style ${nonce}>
        :host {
          --aspect-ratio: var(--lite-youtube-aspect-ratio, 16 / 9);
          --aspect-ratio-short: var(--lite-youtube-aspect-ratio-short, 9 / 16);
          --frame-shadow-visible: var(--lite-youtube-frame-shadow-visible, yes);
          contain: content;
          display: block;
          position: relative;
          width: 100%;
          aspect-ratio: var(--aspect-ratio);
        }

        @media (max-width: 40em) {
          :host([short]) {
            aspect-ratio: var(--aspect-ratio-short);
          }
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

        #fallbackPlaceholder, slot[name=image]::slotted(*) {
          object-fit: cover;
          width: 100%;
        }

        @container style(--frame-shadow-visible: yes) {
          #frame::before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            background-image: linear-gradient(180deg, #111 -20%, transparent 90%);
            height: 60px;
            width: 100%;
            z-index: 1;
          }
        }

        #playButton {
          width: 68px;
          height: 48px;
          background-color: transparent;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/><path d="M45 24 27 14v20" fill="white"/></svg>');
          z-index: 1;
          border: 0;
          border-radius: inherit;
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
          cursor: inherit;
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
          <slot name="image">
            <source id="webpPlaceholder" type="image/webp">
            <source id="jpegPlaceholder" type="image/jpeg">
            <img id="fallbackPlaceholder" referrerpolicy="origin" loading="lazy">
          </slot>
        </picture>
        <button id="playButton" part="playButton"></button>
      </div>
    `;
    this.shadowRoot = shadowDom;
    this.domRefFrame = shadowDom.querySelector("#frame");
    this.domRefImg = {
      fallback: shadowDom.querySelector("#fallbackPlaceholder"),
      webp: shadowDom.querySelector("#webpPlaceholder"),
      jpeg: shadowDom.querySelector("#jpegPlaceholder"),
    };
    this.domRefPlayButton = shadowDom.querySelector("#playButton");
  }

  /**
   * Parse our attributes and fire up some placeholders
   */
  setupComponent() {
    // If the named slot is not empty, then we save the network requests and
    // don't fire up the selector; we use assignedNodes() since we're using
    // default slot elements for the picture
    const hasImgSlot = this.shadowRoot.querySelector("slot[name=image]");
    if (hasImgSlot && hasImgSlot.assignedNodes().length === 0) {
      this.initImagePlaceholder();
    }

    this.domRefPlayButton.setAttribute(
      "aria-label",
      `${this.videoPlay}: ${this.videoTitle}`,
    );
    this.setAttribute("title", `${this.videoPlay}: ${this.videoTitle}`);

    if (this.autoLoad || this.isYouTubeShort() || this.autoPause) {
      this.initIntersectionObserver();
    }

    if (!this.disableNoscript) {
      this.injectSearchNoScript();
    }
  }

  /**
   * Lifecycle method that we use to listen for attribute changes to period
   * @param {*} name
   * @param {*} oldVal
   * @param {*} newVal
   */
  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      this.setupComponent();

      // if we have a previous iframe, remove it and the activated class
      if (this.domRefFrame.classList.contains("activated")) {
        this.domRefFrame.classList.remove("activated");
        const iframe = this.shadowRoot.querySelector("iframe");
        if (iframe) {
          iframe.remove();
        }
        this.isIframeLoaded = false;
      }
    }
  }

  injectSearchNoScript() {
    const eleNoScript = document.createElement("noscript");
    this.prepend(eleNoScript);
    eleNoScript.innerHTML = this.generateIframe();
  }

  generateIframe(isIntersectionObserver = false) {
    let autoplay = isIntersectionObserver ? 0 : 1;
    const wantsNoCookie = this.noCookie ? "-nocookie" : "";
    let embedTarget;
    if (this.playlistId) {
      embedTarget = `?listType=playlist&list=${this.playlistId}&`;
    } else {
      embedTarget = `${this.videoId}?`;
    }

    // autopause needs the postMessage() in the iframe, so you have to enable
    // the jsapi
    if (this.autoPause) {
      this.params = `enablejsapi=1`;
    }

    // Oh wait, you're a YouTube short, so let's try to make you more workable
    if (this.isYouTubeShort()) {
      this.params = `loop=1&mute=1&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&playlist=${this.videoId}`;
      autoplay = 1;
    }

    return `
<iframe credentialless frameborder="0" title="${this.videoTitle}"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
  src="https://www.youtube${wantsNoCookie}.com/embed/${embedTarget}autoplay=${autoplay}&${this.params}"
></iframe>`;
  }

  /**
   * Inject the iframe into the component body
   * @param {boolean} isIntersectionObserver
   */
  addIframe(isIntersectionObserver = false) {
    if (!this.isIframeLoaded) {
      // Don't autoplay the intersection observer injection, it's weird
      const iframeHTML = this.generateIframe(isIntersectionObserver);

      this.domRefFrame.insertAdjacentHTML("beforeend", iframeHTML);
      this.domRefFrame.classList.add("activated");
      this.isIframeLoaded = true;
      this.attemptShortAutoPlay();
      this.dispatchEvent(
        new CustomEvent("liteYoutubeIframeLoaded", {
          detail: {
            videoId: this.videoId,
          },
          bubbles: true,
          cancelable: true,
        }),
      );
    }
  }

  /**
   * Setup the placeholder image for the component
   */
  initImagePlaceholder() {
    this.testPosterImage();

    if (this.domRefImg && this.domRefImg.fallback) {
      this.domRefImg.fallback.setAttribute(
        "aria-label",
        `${this.videoPlay}: ${this.videoTitle}`,
      );
      this.domRefImg.fallback.setAttribute(
        "alt",
        `${this.videoPlay}: ${this.videoTitle}`,
      );
    }
  }

  async testPosterImage() {
    setTimeout(() => {
      const webpUrl = `https://i.ytimg.com/vi_webp/${this.videoId}/${this.posterQuality}.webp`;
      const img = new Image();
      img.fetchPriority = "low";
      img.referrerPolicy = "origin";
      img.src = webpUrl;
      img.onload = async (e) => {
        const target = e.target;
        const noPoster =
          target?.naturalHeight == 90 && target?.naturalWidth == 120;

        if (noPoster) {
          this.posterQuality = "hqdefault";
        }

        const posterUrlWebp = `https://i.ytimg.com/vi_webp/${this.videoId}/${this.posterQuality}.webp`;
        if (this.domRefImg && this.domRefImg.webp) {
          this.domRefImg.webp.srcset = posterUrlWebp;
        }

        const posterUrlJpeg = `https://i.ytimg.com/vi/${this.videoId}/${this.posterQuality}.jpg`;
        if (this.domRefImg && this.domRefImg.fallback) {
          this.domRefImg.fallback.loading = this.posterLoading;
        }

        if (this.domRefImg && this.domRefImg.jpeg) {
          this.domRefImg.jpeg.srcset = posterUrlJpeg;
        }
        if (this.domRefImg && this.domRefImg.fallback) {
          this.domRefImg.fallback.src = posterUrlJpeg;
          this.domRefImg.fallback.loading = this.posterLoading;
        }
      };
    }, 100);
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
          LiteYTEmbed.warmConnections(this);
          this.addIframe(true);
          observer.unobserve(this);
        }
      });
    }, options);

    observer.observe(this);

    if (this.autoPause) {
      const windowPause = new IntersectionObserver(
        (e, o) => {
          e.forEach((entry) => {
            if (entry.intersectionRatio !== 1) {
              const iframe = this.shadowRoot.querySelector("iframe");
              if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage(
                  '{"event":"command","func":"pauseVideo","args":""}',
                  "*",
                );
              }
            }
          });
        },
        { threshold: 1 },
      );
      windowPause.observe(this);
    }
  }

  attemptShortAutoPlay() {
    if (this.isYouTubeShort()) {
      setTimeout(() => {
        const iframe = this.shadowRoot.querySelector("iframe");
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"' + "playVideo" + '","args":""}',
            "*",
          );
        }
        // for youtube video recording demo
      }, 2000);
    }
  }

  isYouTubeShort() {
    return (
      this.getAttribute("short") === "" &&
      window.matchMedia("(max-width: 40em)").matches
    );
  }

  static addPrefetch(kind, url) {
    const linkElem = document.createElement("link");
    linkElem.rel = kind;
    linkElem.href = url;
    linkElem.crossOrigin = "true";
    document.head.append(linkElem);
  }

  static warmConnections(context) {
    if (LiteYTEmbed.isPreconnected || window.liteYouTubeIsPreconnected) return;

    // we don't know which image type to preload, so warm the connection
    LiteYTEmbed.addPrefetch("preconnect", "https://i.ytimg.com/");

    // Host that YT uses to serve JS needed by player, per amp-youtube
    LiteYTEmbed.addPrefetch("preconnect", "https://s.ytimg.com");

    if (!context.noCookie) {
      // The iframe document and most of its subresources come right off
      // youtube.com
      LiteYTEmbed.addPrefetch("preconnect", "https://www.youtube.com");

      // The botguard script is fetched off from google.com
      LiteYTEmbed.addPrefetch("preconnect", "https://www.google.com");

      // TODO: Not certain if these ad related domains are in the critical path.
      // Could verify with domain-specific throttling.
      LiteYTEmbed.addPrefetch(
        "preconnect",
        "https://googleads.g.doubleclick.net",
      );
      LiteYTEmbed.addPrefetch("preconnect", "https://static.doubleclick.net");
    } else {
      LiteYTEmbed.addPrefetch("preconnect", "https://www.youtube-nocookie.com");
    }

    LiteYTEmbed.isPreconnected = true;

    // multiple embeds in the same page don't check for each other
    window.liteYouTubeIsPreconnected = true;
  }
}
// Register custom element
customElements.define("lite-youtube", LiteYTEmbed);

