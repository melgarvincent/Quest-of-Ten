/**
 * QUEST OF TEN — 2D FIGHTING GAME ENGINE (VS CODE STANDALONE EDITION)
 * Pure Vanilla JavaScript (ES6)
 * Supports: Visual Studio Code, Live Server, and Direct Browser Execution
 */

(function () {
  "use strict";

  // ==========================================
  // 1. GAME DATA: HEROES, ARENAS & CHAPTERS
  // ==========================================
  const HEROES = [
    {
      id: "aeron",
      name: "Aeron",
      title: "The Flame Striker",
      element: "Fire",
      role: "Vanguard",
      rarity: "Legendary",
      color: "#f1724b",
      quote: "Let the darkness learn to fear the light.",
      hp: 3200,
      power: 380,
      speed: 220,
      skills: ["Flame Slash", "Burning Arc", "Inferno Break"],
      skillIcons: [
        "images/skills/btn_flame_slash.png",
        "images/skills/btn_burning_arc.png",
        "images/skills/btn_inferno_break.png"
      ],
      skillVfx: [
        "images/skills/aeron_flame_slash.png",
        "images/skills/aeron_burning_arc.png",
        "images/skills/aeron_inferno_break.png"
      ]
    },
    {
      id: "lyra",
      name: "Lyra",
      title: "The Frost Guardian",
      element: "Ice",
      role: "Guardian",
      rarity: "Epic",
      color: "#85d8f4",
      quote: "Even winter has a heart.",
      hp: 2850,
      power: 410,
      speed: 245,
      skills: ["Ice Lance", "Frost Bloom", "Winter's End"]
    },
    {
      id: "kael",
      name: "Kael",
      title: "The Shadow Assassin",
      element: "Shadow",
      role: "Assassin",
      rarity: "Legendary",
      color: "#9d83f7",
      quote: "You cannot outrun your shadow.",
      hp: 2900,
      power: 440,
      speed: 290,
      skills: ["Night Cut", "Umbral Step", "Eclipse Fang"]
    },
    {
      id: "riven",
      name: "Riven",
      title: "The Radiant Knight",
      element: "Light",
      role: "Guardian",
      rarity: "Epic",
      color: "#f2d695",
      quote: "As long as I stand, hope remains.",
      hp: 3650,
      power: 325,
      speed: 180,
      skills: ["Radiant Edge", "Sunward Guard", "Judgment Ray"]
    },
    {
      id: "selene",
      name: "Selene",
      title: "The Shadow Mage",
      element: "Shadow",
      role: "Mage",
      rarity: "Legendary",
      color: "#d59af2",
      quote: "Fate is only a door. Open it.",
      hp: 2700,
      power: 470,
      speed: 235,
      skills: ["Void Whisper", "Astral Hex", "Event Horizon"]
    },
    {
      id: "draven",
      name: "Draven",
      title: "The Dark Warrior",
      element: "Dark",
      role: "Warrior",
      rarity: "Epic",
      color: "#ac82d8",
      quote: "The hunt ends when I say it does.",
      hp: 2950,
      power: 400,
      speed: 275,
      skills: ["Shade Shot", "Phantom Volley", "Duskfall"]
    },
    {
      id: "mira",
      name: "Mira",
      title: "The Nature Ranger",
      element: "Nature",
      role: "Ranger",
      rarity: "Epic",
      color: "#7dd8ac",
      quote: "Life always finds a way through.",
      hp: 3100,
      power: 350,
      speed: 240,
      skills: ["Thorn Lash", "Wildheart", "Verdant Storm"]
    },
    {
      id: "orion",
      name: "Orion",
      title: "The Tide Warrior",
      element: "Water",
      role: "Warrior",
      rarity: "Legendary",
      color: "#72b9fc",
      quote: "Hear that? The storm is on our side.",
      hp: 2800,
      power: 455,
      speed: 260,
      skills: ["Sparkblade", "Thunder Chain", "Storm Impact"]
    },
    {
      id: "brutus",
      name: "Brutus",
      title: "The Earth Berserker",
      element: "Earth",
      role: "Berserker",
      rarity: "Epic",
      color: "#d5a872",
      quote: "The mountain does not move.",
      hp: 3900,
      power: 340,
      speed: 160,
      skills: ["Stone Crush", "Earthshaker", "Titan's Wrath"]
    },
    {
      id: "elysia",
      name: "Elysia",
      title: "The Arcane Mage",
      element: "Arcane",
      role: "Mage",
      rarity: "Legendary",
      color: "#ed9de2",
      quote: "The stars have not given up on us.",
      hp: 2750,
      power: 485,
      speed: 250,
      skills: ["Starfall", "Cosmic Bloom", "Nova Requiem"]
    }
  ];

  const ARENA_STAGES = [
    {
      id: "moonlit",
      name: "Moonlit Sanctuary",
      subtitle: "The Celestial Falls",
      image: "images/arena-moonlit-sanctuary.jpg",
      accent: "#90baff"
    },
    {
      id: "citadel",
      name: "Sky Citadel",
      subtitle: "Castle Above the Clouds",
      image: "images/arena-sky-citadel.jpg",
      accent: "#80c5f4"
    },
    {
      id: "inferno",
      name: "Inferno Crucible",
      subtitle: "The Burning Throne",
      image: "images/arena-inferno-crucible.jpg",
      accent: "#ff875e"
    },
    {
      id: "eclipse",
      name: "Violet Eclipse",
      subtitle: "The Umbral Divide",
      image: "images/arena-violet-eclipse.jpg",
      accent: "#d4a0ff"
    }
  ];

  const CHAPTERS = [
    { number: 1, name: "The Ashen Gate", realm: "Emberfall Ruins", element: "Fire", mobs: ["Cinder Scout", "Ashbound Archer", "Ember Warden", "Gate Reaver"], boss: "The Ashen Wyrm", arena: "moonlit" },
    { number: 2, name: "Whispers of the Wild", realm: "Eternal Greenwood", element: "Nature", mobs: ["Briar Stalker", "Mossbound Guard", "Wildwood Spirit", "Thornfang"], boss: "The Hollow Stag", arena: "moonlit" },
    { number: 3, name: "The Frozen Crown", realm: "Frostbound Peaks", element: "Ice", mobs: ["Rime Scout", "Glacier Wolf", "Frost Revenant", "Icebound Knight"], boss: "Queen of Winter", arena: "citadel" },
    { number: 4, name: "Beneath the Tides", realm: "Sunken Sanctum", element: "Storm", mobs: ["Tide Wraith", "Coral Sentinel", "Drowned Seer", "Abyssal Guard"], boss: "Leviathan's Eye", arena: "citadel" },
    { number: 5, name: "The Scarlet Wastes", realm: "Crimson Expanse", element: "Fire", mobs: ["Sand Marauder", "Scorch Serpent", "Bloodstone Golem", "Dune Revenant"], boss: "The Crimson King", arena: "inferno" },
    { number: 6, name: "Stormspire", realm: "Skybreak Citadel", element: "Storm", mobs: ["Cloud Stalker", "Volt Harrier", "Thunder Warden", "Tempest Knight"], boss: "The Sky Tyrant", arena: "citadel" },
    { number: 7, name: "The Veiled Hollow", realm: "Umbral Hollow", element: "Shadow", mobs: ["Gloom Whisper", "Shade Walker", "Dusk Revenant", "Veil Keeper"], boss: "The Hollow Queen", arena: "eclipse" },
    { number: 8, name: "Shattered Heavens", realm: "Celestial Divide", element: "Light", mobs: ["Fallen Acolyte", "Starforged Guard", "Radiant Wraith", "Seraph Knight"], boss: "The Fallen Seraph", arena: "moonlit" },
    { number: 9, name: "The Obsidian Throne", realm: "Blackstone Keep", element: "Earth", mobs: ["Obsidian Hound", "Iron Revenant", "Crown Sentinel", "Throne Guardian"], boss: "The Undying Regent", arena: "inferno" },
    { number: 10, name: "The Last Eclipse", realm: "The End of Dawn", element: "Arcane", mobs: ["Eclipse Echo", "Fatebreaker", "Void Herald", "Endless Knight"], boss: "The Eclipse Sovereign", arena: "eclipse" }
  ];

  const ACHIEVEMENTS = [
    { id: "first_blood", name: "The First Step", desc: "Win your first battle in Eldoria", icon: "⚔️", target: 1 },
    { id: "allies", name: "Gathering Allies", desc: "Unlock 5 different heroes", icon: "👥", target: 5 },
    { id: "gatekeeper", name: "Gatekeeper", desc: "Clear Chapter 1: The Ashen Gate", icon: "🛡️", target: 5 },
    { id: "arena_veteran", name: "Arena Challenger", desc: "Win 10 battles across any mode", icon: "🏆", target: 10 },
    { id: "chosen_ten", name: "The Chosen Ten", desc: "Unlock all 10 heroes in your roster", icon: "👑", target: 10 },
    { id: "last_eclipse", name: "The Last Eclipse", desc: "Clear all 50 campaign stages", icon: "✨", target: 50 }
  ];

  // ==========================================
  // 2. STATE & LOCALSTORAGE PERSISTENCE
  // ==========================================
  const STORAGE_KEY = "quest_of_ten_saved_progress";
  const AUDIO_SETTINGS_KEY = "quest_of_ten_audio_settings";
  const DEFAULT_PROGRESS = {
    username: "Guest Hero",
    coins: 3000,
    gems: 200,
    energy: 50,
    potions: 15,
    xp: 0,
    level: 1,
    highestLevel: 1,
    selectedHero: "aeron",
    unlockedHeroes: ["aeron", "lyra", "kael"],
    wins: 0,
    losses: 0,
    arenaRating: 1000,
    selectedArena: "moonlit",
    soundOn: true,
    lastDailyClaim: null
  };

  let playerState = { ...DEFAULT_PROGRESS };
  let openAuth = () => {};
  let profileHeroAnimator = null;
  let summonHeroAnimator = null;

  const ACCOUNTS_KEY = "quest_of_ten_accounts";
  const SESSION_KEY = "quest_of_ten_session";
  const MAX_ENERGY = 50;
  let currentEmail = null;

  function hashPw(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    return String(h >>> 0) + ":" + str.length;
  }
  function getAccounts() {
    try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || {}; } catch (e) { return {}; }
  }
  function setAccounts(a) {
    try { localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(a)); } catch (e) { console.warn("Could not save accounts", e); }
  }
  function getSession() {
    try { return localStorage.getItem(SESSION_KEY); } catch (e) { return null; }
  }

  // Loads the saved account (if a session exists). Returns true when logged in.
  function loadState() {
    const email = getSession();
    const acc = email ? getAccounts()[email] : null;
    if (acc) {
      currentEmail = email;
      playerState = { ...DEFAULT_PROGRESS, ...acc.progress, username: acc.progress?.username || acc.username };
      return true;
    }
    currentEmail = null;
    playerState = { ...DEFAULT_PROGRESS };
    return false;
  }

  function saveState() {
    if (currentEmail) {
      const accounts = getAccounts();
      if (accounts[currentEmail]) {
        accounts[currentEmail].progress = { ...playerState };
        accounts[currentEmail].username = playerState.username;
        setAccounts(accounts);
      }
    }
    updateAllHud();
  }

  // ==========================================
  // 3. CENTRAL AUDIO MANAGER & SOUND SYNTHESIZER
  // ==========================================
  const audioManager = (() => {
    const defaults = {
      musicVolume: 0.55,
      voiceVolume: 0.8,
      sfxVolume: 0.65,
      musicEnabled: true,
      voiceEnabled: true,
      sfxEnabled: true,
      muted: false
    };
    let settings = { ...defaults };
    let currentTrack = null;
    let currentKey = null;
    let fadeTimer = 0;
    let autoplayBlocked = false;
    const warnedFiles = new Set();
    const bgmPaths = {
      menu: "assets/audio/menu-bgm.mp3",
      battle: "assets/audio/battle-bgm.mp3"
    };

    try {
      const saved = JSON.parse(localStorage.getItem(AUDIO_SETTINGS_KEY) || "null");
      if (saved && typeof saved === "object") settings = { ...defaults, ...saved };
    } catch (error) {
      console.warn("Audio settings could not be loaded.", error);
    }

    function save() {
      try { localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(settings)); }
      catch (error) { console.warn("Audio settings could not be saved.", error); }
      syncControls();
    }

    function warnMissing(path) {
      if (warnedFiles.has(path)) return;
      warnedFiles.add(path);
      console.warn(`Optional audio file is unavailable: ${path}`);
    }

    function fade(audio, target, duration, done) {
      clearInterval(fadeTimer);
      const start = audio.volume;
      const started = performance.now();
      fadeTimer = window.setInterval(() => {
        const progress = Math.min(1, (performance.now() - started) / duration);
        audio.volume = Math.max(0, Math.min(1, start + (target - start) * progress));
        if (progress >= 1) {
          clearInterval(fadeTimer);
          fadeTimer = 0;
          if (done) done();
        }
      }, 35);
    }

    function desiredMusicVolume() {
      return settings.musicEnabled && !settings.muted ? settings.musicVolume : 0;
    }

    function setBgm(key) {
      const path = bgmPaths[key];
      if (!path || !settings.musicEnabled || settings.muted) {
        if (currentTrack) fade(currentTrack, 0, 360, () => currentTrack?.pause());
        if (!path) currentKey = null;
        return;
      }
      if (currentKey === key && currentTrack) {
        currentTrack.volume = desiredMusicVolume();
        currentTrack.play().then(() => {
          autoplayBlocked = false;
          syncControls();
        }).catch((error) => {
          autoplayBlocked = error?.name === "NotAllowedError";
          if (!autoplayBlocked) warnMissing(path);
          syncControls();
        });
        return;
      }
      const previous = currentTrack;
      const next = new Audio(path);
      next.loop = true;
      next.preload = "auto";
      next.volume = 0;
      next.addEventListener("error", () => warnMissing(path), { once: true });
      currentTrack = next;
      currentKey = key;
      if (previous) fade(previous, 0, 360, () => previous.pause());
      next.play().then(() => {
        autoplayBlocked = false;
        fade(next, desiredMusicVolume(), 500);
        syncControls();
      }).catch((error) => {
        autoplayBlocked = error?.name === "NotAllowedError";
        if (!autoplayBlocked) warnMissing(path);
        syncControls();
      });
    }

    function syncView(viewName) {
      if (viewName === "battle" && battleActive) setBgm("battle");
      else if (viewName === "result") setBgm(null);
      else setBgm("menu");
    }

    function playCurrent() {
      settings.musicEnabled = true;
      settings.muted = false;
      save();
      syncView(currentView);
    }

    function pauseCurrent() {
      if (currentTrack) fade(currentTrack, 0, 220, () => currentTrack?.pause());
      syncControls();
    }

    function playVoice(heroId, cue) {
      if (!settings.voiceEnabled || settings.muted || !heroId) return;
      const path = `assets/audio/heroes/${heroId}/${cue}.mp3`;
      const voice = new Audio(path);
      voice.volume = settings.voiceVolume;
      voice.addEventListener("error", () => warnMissing(path), { once: true });
      voice.play().catch((error) => {
        if (error?.name !== "NotAllowedError") warnMissing(path);
      });
    }

    function setVolume(kind, value) {
      const key = `${kind}Volume`;
      settings[key] = Math.max(0, Math.min(1, Number(value)));
      if (kind === "music" && currentTrack) currentTrack.volume = desiredMusicVolume();
      save();
    }

    function setEnabled(kind, enabled) {
      settings[`${kind}Enabled`] = Boolean(enabled);
      if (kind === "music") syncView(currentView);
      save();
    }

    function toggleMute() {
      settings.muted = !settings.muted;
      if (settings.muted) pauseCurrent();
      else playCurrent();
      save();
    }

    function changeMusicVolume(delta) {
      setVolume("music", settings.musicVolume + delta);
    }

    function syncControls() {
      const soundIcon = autoplayBlocked ? "▶" : settings.muted ? "🔇" : "🔊";
      setText("btnSoundToggle", soundIcon);
      setText("btnAudioMute", settings.muted ? "🔇" : "🔊");
      for (const kind of ["music", "voice", "sfx"]) {
        const slider = document.getElementById(`${kind}Volume`);
        if (slider) slider.value = String(Math.round(settings[`${kind}Volume`] * 100));
        document.getElementById(`${kind}EnabledBtn`)?.classList.toggle("active", settings[`${kind}Enabled`]);
      }
      const legacy = document.getElementById("setSoundBtn");
      legacy?.classList.toggle("active", settings.sfxEnabled);
      playerState.soundOn = settings.sfxEnabled;
    }

    return {
      get settings() { return settings; },
      syncView, playCurrent, pauseCurrent, playVoice, setVolume, setEnabled,
      toggleMute, changeMusicVolume, syncControls
    };
  })();

  let audioCtx = null;
  function playSound(type) {
    if (!audioManager.settings.sfxEnabled || audioManager.settings.muted) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.value = audioManager.settings.sfxVolume;

      if (type === "click") {
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === "attack") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === "special") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(950, now + 0.25);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === "victory") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.12);
        osc.frequency.setValueAtTime(783.99, now + 0.24);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // ==========================================
  // 4. ANIMATED SPRITE ENGINE (4x4 GRID)
  // ==========================================
  const SPRITE_ROWS = { idle: 0, walk: 1, attack: 2, special: 3 };
  const SPRITE_CACHE = {};

  function getHeroSpriteSheet(heroId) {
    // Never substitute a different hero's sheet. The lowercase path is only
    // another filename for this SAME hero, for case-sensitive file systems.
    const id = String(heroId || "").toLowerCase();
    if (SPRITE_CACHE[id]) return SPRITE_CACHE[id];

    const img = new Image();
    const paths = [
      `assets/characters/${id.toUpperCase()}/spritesheet.png`,
      `assets/characters/${id}/spritesheet.png`
    ];
    let next = 0;
    const tryNextPath = () => {
      if (next < paths.length) {
        img.src = paths[next++];
        return;
      }
      img.dataset.assetStatus = "missing";
      if (currentView === "battle" && playerBattleAnimator?.sheet === img) {
        updateBattleHud();
        setText("hudStatusEvent", `Missing assets/characters/${id.toUpperCase()}/spritesheet.png`);
      }
    };
    img.onload = () => {
      if (img.naturalWidth < 4 || img.naturalHeight < 4 || img.naturalWidth % 4 !== 0 || img.naturalHeight % 4 !== 0) {
        tryNextPath();
        return;
      }
      img.dataset.assetStatus = "ready";
    };
    img.onerror = tryNextPath;
    SPRITE_CACHE[id] = img;
    tryNextPath();
    return img;
  }

  class CanvasSpriteAnimator {
    constructor(canvas, heroId, facing = "right", defaultAnim = "idle") {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.heroId = heroId;
      this.facing = facing;
      this.anim = defaultAnim;
      this.frameIndex = 0;
      this.lastTime = 0;
      this.onComplete = null;
      this.onFrame = null;
      this.actionLocked = false;
      this.running = false;
      this.rafId = 0;
      this.sheet = getHeroSpriteSheet(heroId);
    }

    setHero(heroId) {
      if (this.heroId === heroId) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.heroId = heroId;
      this.sheet = getHeroSpriteSheet(heroId);
      this.actionLocked = false;
      this.onComplete = null;
      this.onFrame = null;
      this.anim = "idle";
      this.frameIndex = 0;
      this.lastTime = performance.now();
      this.render();
    }

    // All ten heroes use their own 4×4 sheet: idle/walk loop; attack/special
    // play the four frames ONCE. The onFrame hook is used for frame-accurate hits.
    play(anim, onComplete = null, onFrame = null) {
      if (!Object.prototype.hasOwnProperty.call(SPRITE_ROWS, anim)) return false;
      if (this.actionLocked) return false;
      this.anim = anim;
      this.frameIndex = 0;
      this.lastTime = performance.now();
      this.actionLocked = anim === "attack" || anim === "special";
      this.onComplete = this.actionLocked ? onComplete : null;
      this.onFrame = this.actionLocked ? onFrame : null;
      this.render();
      return true;
    }

    get frameDuration() {
      const hero = HEROES.find(h => h.id === this.heroId);
      const tempo = Math.max(0.85, Math.min(1.16, 230 / (hero?.speed || 230)));
      return Math.round(({ idle: 205, walk: 120, attack: 145, special: 180 })[this.anim] * tempo);
    }

    start() {
      if (this.running) return;
      this.running = true;
      this.lastTime = performance.now();
      const loop = (time) => {
        if (!this.running) return;
        this.update(time);
        this.render();
        this.rafId = requestAnimationFrame(loop);
      };
      this.rafId = requestAnimationFrame(loop);
    }

    stop() {
      this.running = false;
      cancelAnimationFrame(this.rafId);
      this.actionLocked = false;
      this.onComplete = null;
      this.onFrame = null;
    }

    update(time) {
      if (time - this.lastTime < this.frameDuration) return;
      // Deliberately show every frame even after a background-tab pause.
      this.lastTime = time;
      if (this.frameIndex < 3) {
        this.frameIndex += 1;
        if (this.onFrame) this.onFrame(this.frameIndex);
      } else if (this.actionLocked) {
        const callback = this.onComplete;
        this.actionLocked = false;
        this.onFrame = null;
        this.onComplete = null;
        this.anim = "idle";
        this.frameIndex = 0;
        this.canvas.dataset.animation = "idle";
        if (callback) callback();
      } else {
        this.frameIndex = 0;
      }
    }

    render() {
      const canvas = this.canvas;
      canvas.dataset.hero = this.heroId;
      canvas.dataset.animation = this.anim;
      canvas.dataset.frame = String(this.frameIndex);
      const ctx = this.ctx;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!this.sheet.complete || this.sheet.dataset.assetStatus !== "ready") return;

      const frameWidth = this.sheet.naturalWidth / 4;
      const frameHeight = this.sheet.naturalHeight / 4;
      const row = SPRITE_ROWS[this.anim];
      ctx.save();
      if (this.facing === "left") {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(
        this.sheet,
        this.frameIndex * frameWidth, row * frameHeight, frameWidth, frameHeight,
        0, 0, canvas.width, canvas.height
      );
      ctx.restore();

    }
  }

  // ==========================================
  // 5. TOAST NOTIFICATIONS
  // ==========================================
  let toastTimer = null;
  function showToast(msg, icon = "✦") {
    const toast = document.getElementById("toastNotification");
    const msgEl = document.getElementById("toastMessage");
    const iconEl = document.getElementById("toastIcon");
    if (!toast || !msgEl) return;

    msgEl.textContent = msg;
    if (iconEl) iconEl.textContent = icon;
    toast.classList.remove("hidden");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add("hidden");
    }, 3500);
  }

  // ==========================================
  // 6. UI HUD UPDATES
  // ==========================================
  function syncProfileHero() {
    const canvas = document.getElementById("profileHeroCanvas");
    if (!canvas) return;
    const hero = HEROES.find(h => h.id === playerState.selectedHero) || HEROES[0];
    if (!profileHeroAnimator) {
      profileHeroAnimator = new CanvasSpriteAnimator(canvas, hero.id, "right", "idle");
      profileHeroAnimator.start();
    } else if (profileHeroAnimator.heroId !== hero.id) {
      profileHeroAnimator.setHero(hero.id);
      profileHeroAnimator.play("idle");
    }
  }

  function updateAllHud() {
    const hero = HEROES.find(h => h.id === playerState.selectedHero) || HEROES[0];

    // Menu text & resources
    setText("menuUsername", playerState.username.toUpperCase());
    setText("menuActiveHeroName", hero.name.toUpperCase());
    setText("menuActiveHeroTitle", hero.title);
    setText("menuCoins", playerState.coins.toLocaleString());
    setText("menuGems", playerState.gems.toLocaleString());
    setText("menuEnergy", `${playerState.energy}/${MAX_ENERGY}`);
    setText("menuPotions", playerState.potions);

    // Topbar
    setText("topbarCoins", playerState.coins.toLocaleString());
    setText("topbarGems", playerState.gems.toLocaleString());
    setText("topbarEnergy", `${playerState.energy}/${MAX_ENERGY}`);
    setText("topbarPotions", playerState.potions);

    // Profile
    setText("profileNameDisplay", playerState.username);
    setText("profileRankDisplay", `Level ${playerState.level} · ${getRankTitle(playerState.arenaRating)}`);
    setText("profileWins", playerState.wins);
    setText("profileLosses", playerState.losses);
    setText("profileStagesCleared", `${Math.min(50, playerState.highestLevel - 1)} / 50`);
    setText("profileHeroesUnlocked", `${playerState.unlockedHeroes.length} / 10`);

    const xpCurrent = playerState.xp % 300;
    setText("profileXpText", `${xpCurrent} / 300 XP`);
    const xpFill = document.getElementById("profileXpFill");
    if (xpFill) xpFill.style.width = `${(xpCurrent / 300) * 100}%`;

    // Bot Arena
    setText("arenaRankText", `${getRankTitle(playerState.arenaRating).toUpperCase()} · ${playerState.arenaRating} RP`);

    // Adventure
    setText("adventureClearedCount", `${Math.min(50, playerState.highestLevel - 1)} / 50`);
    setText("rosterUnlockedCount", `${playerState.unlockedHeroes.length} / 10`);
    setText("summonGoldCount", `🪙 ${playerState.coins.toLocaleString()}`);
    setText("invPotionCount", `In Bag: ${playerState.potions} Potions`);
    setText("invEnergyStatus", `Current: ${playerState.energy} / ${MAX_ENERGY}`);

    const dailyDone = playerState.lastDailyClaim === new Date().toISOString().slice(0, 10);
    setText("invDailyStatus", dailyDone ? "Status: Claimed Today" : "Status: Available");
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function getRankTitle(rp) {
    if (rp >= 1800) return "Mythic";
    if (rp >= 1500) return "Diamond";
    if (rp >= 1250) return "Gold";
    if (rp >= 1050) return "Silver";
    return "Bronze";
  }

  // ==========================================
  // 7. VIEW ROUTING & NAVIGATION
  // ==========================================
  let currentView = "menu";

  function switchView(viewName, title = "") {
    currentView = viewName;
    playSound("click");
    audioManager.syncView(viewName);

    const mainMenu = document.getElementById("mainMenu");
    const subContainer = document.getElementById("subViewContainer");
    const battleView = document.getElementById("battleView");

    // Hide all view panels first
    document.querySelectorAll(".view-panel").forEach(p => p.classList.add("hidden"));

    if (viewName === "menu") {
      mainMenu.classList.remove("hidden");
      subContainer.classList.add("hidden");
      battleView.classList.add("hidden");
      stopBattle();
      return;
    }

    if (viewName === "battle") {
      mainMenu.classList.add("hidden");
      subContainer.classList.add("hidden");
      battleView.classList.remove("hidden");
      return;
    }

    // Sub-views
    mainMenu.classList.add("hidden");
    battleView.classList.add("hidden");
    subContainer.classList.remove("hidden");

    setText("topbarViewTitle", (title || viewName).toUpperCase());

    const targetPanel = document.getElementById(viewName + "View");
    if (targetPanel) {
      targetPanel.classList.remove("hidden");
      window.scrollTo(0, 0);
    }

    // Specific panel refresh
    if (viewName === "characters") refreshCharactersRoster();
    if (viewName === "profile") syncProfileHero();
    if (viewName === "adventure") renderAdventureChapters();
    if (viewName === "arenaLobby") renderArenaLobby();
    if (viewName === "achievements") renderAchievements();
    if (viewName === "leaderboard") renderLeaderboard();
  }

  // ==========================================
  // 8. CHARACTERS & ANIMATION SHOWCASE
  // ==========================================
  let rosterFilter = "all";
  let previewHeroId = "aeron";
  let hdAnimator = null;

  function refreshCharactersRoster() {
    const grid = document.getElementById("rosterCardsGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const visible = HEROES.filter(h => {
      const isUnlocked = playerState.unlockedHeroes.includes(h.id);
      if (rosterFilter === "unlocked") return isUnlocked;
      if (rosterFilter === "locked") return !isUnlocked;
      return true;
    });

    visible.forEach(h => {
      const isUnlocked = playerState.unlockedHeroes.includes(h.id);
      const isSelected = h.id === previewHeroId;

      const card = document.createElement("div");
      card.className = `hero-roster-card ${isSelected ? "active" : ""} ${!isUnlocked ? "locked" : ""}`;
      card.innerHTML = `
        <div class="hero-card-img" style="background-image: url('images/heroes/${h.id}.jpg')">
          ${!isUnlocked ? '<span class="lock-icon">🔒</span>' : ''}
        </div>
        <div class="hero-card-meta">
          <strong>${h.name}</strong>
          <small>${h.element.toUpperCase()} · ${h.role}</small>
        </div>
      `;

      card.onclick = () => {
        previewHeroId = h.id;
        refreshCharactersRoster();
        updateHeroDetailCard(h);
      };

      grid.appendChild(card);
    });

    const activeH = HEROES.find(h => h.id === previewHeroId) || HEROES[0];
    updateHeroDetailCard(activeH);
  }

  function updateHeroDetailCard(hero) {
    const isUnlocked = playerState.unlockedHeroes.includes(hero.id);
    const isActive = playerState.selectedHero === hero.id;

    setText("hdHeroRarity", `${hero.rarity.toUpperCase()} · ${hero.element.toUpperCase()}`);
    setText("hdHeroName", hero.name);
    setText("hdHeroTitle", hero.title);
    setText("hdHeroQuote", `"${hero.quote}"`);
    setText("hdStatHp", hero.hp.toLocaleString());
    setText("hdStatPower", hero.power);
    setText("hdStatSpeed", hero.speed);

    // Abilities list
    const skillsList = document.getElementById("hdSkillsList");
    if (skillsList) {
      skillsList.innerHTML = "";
      hero.skills.forEach((s, idx) => {
        const row = document.createElement("div");
        row.className = "hd-skill-row";
        const customIcon = hero.skillIcons ? hero.skillIcons[idx] : null;
        row.innerHTML = `
          <span class="hd-skill-key">${["Q", "W", "E"][idx]}</span>
          ${customIcon ? `<img src="${customIcon}" alt="${s}" class="hd-skill-thumb">` : ""}
          <span class="hd-skill-name">${s}</span>
        `;
        skillsList.appendChild(row);
      });
    }

    // Aeron volcanic VFX showcase
    const showcase = document.getElementById("hdAeronShowcase");
    if (showcase) {
      if (hero.id === "aeron") showcase.classList.remove("hidden");
      else showcase.classList.add("hidden");
    }

    // Active button
    const btnSelect = document.getElementById("btnSelectActiveHero");
    if (btnSelect) {
      if (!isUnlocked) {
        btnSelect.textContent = "SUMMON TO UNLOCK";
        btnSelect.disabled = false;
        btnSelect.onclick = () => switchView("summon", "Summon Portal");
      } else if (isActive) {
        btnSelect.textContent = "CURRENT ACTIVE FIGHTER";
        btnSelect.disabled = true;
      } else {
        btnSelect.textContent = "CHOOSE THIS FIGHTER";
        btnSelect.disabled = false;
        btnSelect.onclick = () => {
          playerState.selectedHero = hero.id;
          saveState();
          playSound("click");
          showToast(`${hero.name} is now your active champion!`);
          updateHeroDetailCard(hero);
        };
      }
    }

    // Canvas Animator
    const canvas = document.getElementById("hdPreviewCanvas");
    if (canvas) {
      if (!hdAnimator) {
        hdAnimator = new CanvasSpriteAnimator(canvas, hero.id, "right", "idle");
        hdAnimator.start();
      } else {
        hdAnimator.setHero(hero.id);
        hdAnimator.play("idle");
      }
    }
  }

  // ==========================================
  // 9. ADVENTURE MODE (10 CHAPTERS, 50 STAGES)
  // ==========================================
  let selectedChapterNum = 1;

  function renderAdventureChapters() {
    const list = document.getElementById("chapterList");
    if (!list) return;
    list.innerHTML = "";

    CHAPTERS.forEach(ch => {
      const isUnlocked = (ch.number - 1) * 5 + 1 <= playerState.highestLevel;
      const isCleared = playerState.highestLevel > ch.number * 5;

      const btn = document.createElement("button");
      btn.className = `chapter-tab-btn ${ch.number === selectedChapterNum ? "active" : ""}`;
      btn.innerHTML = `
        <span class="chapter-tab-num">${String(ch.number).padStart(2, "0")}</span>
        <div class="chapter-tab-info">
          <strong>${ch.name}</strong>
          <small>${ch.realm} · ${isCleared ? "CLEARED" : isUnlocked ? "AVAILABLE" : "LOCKED"}</small>
        </div>
      `;
      btn.onclick = () => {
        selectedChapterNum = ch.number;
        renderAdventureChapters();
        updateChapterDetails(ch);
      };
      list.appendChild(btn);
    });

    const activeCh = CHAPTERS.find(c => c.number === selectedChapterNum) || CHAPTERS[0];
    updateChapterDetails(activeCh);
  }

  function updateChapterDetails(chapter) {
    setText("chElementBadge", `${chapter.element.toUpperCase()} REALM`);
    setText("chNameTitle", `Chapter ${String(chapter.number).padStart(2, "0")}: ${chapter.name}`);
    setText("chRealmLocation", `📍 ${chapter.realm}`);

    const header = document.getElementById("chapterHeaderCard");
    const arenaObj = ARENA_STAGES.find(a => a.id === chapter.arena) || ARENA_STAGES[0];
    if (header) {
      header.style.backgroundImage = `linear-gradient(90deg, rgba(7,21,38,0.95), rgba(7,21,38,0.4)), url('${arenaObj.image}')`;
    }

    const levelsList = document.getElementById("levelsList");
    if (!levelsList) return;
    levelsList.innerHTML = "";

    for (let step = 1; step <= 5; step++) {
      const globalLevel = (chapter.number - 1) * 5 + step;
      const isBoss = step === 5;
      const enemyName = isBoss ? chapter.boss : chapter.mobs[step - 1];
      const isUnlocked = globalLevel <= playerState.highestLevel;
      const isCleared = globalLevel < playerState.highestLevel;

      const card = document.createElement("div");
      card.className = `level-row-card ${isBoss ? "boss" : ""} ${!isUnlocked ? "locked" : ""}`;
      card.innerHTML = `
        <div class="level-info">
          <div class="level-icon-box">${isBoss ? "👑" : "⚔️"}</div>
          <div class="level-text">
            <strong>Level ${String(step).padStart(2, "0")}: ${enemyName}</strong>
            <small>${isBoss ? "CHAPTER REALM BOSS" : "MOB ENCOUNTER"} · Reward: +${120 + chapter.number * 30} Gold</small>
          </div>
        </div>
        <div>
          ${isUnlocked
            ? `<button class="btn-start-level" data-stage="${globalLevel}">BATTLE ➔</button>`
            : `<small>🔒 LOCKED</small>`}
        </div>
      `;

      if (isUnlocked) {
        const b = card.querySelector(".btn-start-level");
        b.onclick = () => beginStorySelection(globalLevel, enemyName, isBoss, chapter.arena, chapter.number, step);
      }
      levelsList.appendChild(card);
    }
  }

  // Adventure battles use the same ten-character database for both sides.
  // The chapter encounter is retained for progression and rewards only.
  const battleState = {
    playerHero: null,
    opponentHero: null,
    chapter: 1,
    battle: 1,
    globalLevel: 1,
    encounterName: "",
    isBoss: false,
    arenaId: "moonlit"
  };
  let storyPlayerPreviewAnimator = null;
  let storyOpponentPreviewAnimator = null;

  function beginStorySelection(globalLevel, encounterName, isBoss, arenaId, chapter, battle) {
    battleState.playerHero = null;
    battleState.opponentHero = null;
    battleState.globalLevel = globalLevel;
    battleState.encounterName = encounterName;
    battleState.isBoss = isBoss;
    battleState.arenaId = arenaId;
    battleState.chapter = chapter;
    battleState.battle = battle;
    battleState.totalGold = 0;
    battleState.totalXp = 0;
    battleState.totalRating = 0;
    renderBattleSelection("hero");
    switchView("heroSelect", "Select Your Hero");
  }

  function selectionCard(hero, selected, disabled = false) {
    const card = document.createElement("button");
    card.className = `battle-select-card ${selected ? "active" : ""} ${disabled ? "disabled" : ""}`;
    card.disabled = disabled;
    card.innerHTML = `
      <div class="battle-select-portrait" style="background-image:url('images/heroes/${hero.id}.jpg')"></div>
      <div class="hero-card-meta"><strong>${hero.name}</strong><small>${hero.element.toUpperCase()} · ${hero.role}</small></div>
    `;
    return card;
  }

  function renderSelectionDetail(targetId, hero, label) {
    const detail = document.getElementById(targetId);
    if (!detail) return;
    if (!hero) {
      detail.innerHTML = `<div class="selection-empty"><span class="eyebrow">${label}</span><strong>Choose a champion</strong></div>`;
      return;
    }
    detail.innerHTML = `
      <span class="eyebrow">${label}</span>
      <div class="selection-detail-portrait" style="background-image:url('images/heroes/${hero.id}.jpg')"></div>
      <span class="hd-rarity">${hero.rarity.toUpperCase()} · ${hero.element.toUpperCase()}</span>
      <h3>${hero.name}</h3><p class="hd-title">${hero.title}</p>
      <div class="hd-stats-grid"><div><span>HP</span><b>${hero.hp.toLocaleString()}</b></div><div><span>POWER</span><b>${hero.power}</b></div><div><span>SPEED</span><b>${hero.speed}</b></div></div>
      <div class="selection-skills">${hero.skills.map(skill => `<span>✦ ${skill}</span>`).join("")}</div>
    `;
  }

  function renderBattleSelection(type) {
    const choosingHero = type === "hero";
    const grid = document.getElementById(choosingHero ? "heroSelectGrid" : "opponentSelectGrid");
    const selectedId = choosingHero ? battleState.playerHero : battleState.opponentHero;
    if (!grid) return;
    grid.innerHTML = "";
    HEROES.forEach(hero => {
      const disabled = !choosingHero && hero.id === battleState.playerHero;
      const card = selectionCard(hero, hero.id === selectedId, disabled);
      card.onclick = () => {
        if (choosingHero) battleState.playerHero = hero.id;
        else battleState.opponentHero = hero.id;
        renderBattleSelection(type);
      };
      grid.appendChild(card);
    });
    const selected = HEROES.find(hero => hero.id === selectedId) || null;
    renderSelectionDetail(choosingHero ? "heroSelectDetail" : "opponentSelectDetail", selected,
      choosingHero ? "YOUR FIGHTER" : "AI OPPONENT");
    const confirm = document.getElementById(choosingHero ? "btnConfirmHero" : "btnConfirmOpponent");
    if (confirm) confirm.disabled = !selected;
  }

  function renderStoryMatchup() {
    const hero = HEROES.find(item => item.id === battleState.playerHero);
    const opponent = HEROES.find(item => item.id === battleState.opponentHero);
    if (!hero || !opponent) return;
    const stage = ARENA_STAGES.find(item => item.id === battleState.arenaId) || ARENA_STAGES[0];
    setText("storyMatchupPlayerName", hero.name.toUpperCase());
    setText("storyMatchupOpponentName", `${opponent.name.toUpperCase()} (BOT)`);
    setText("storyMatchupContext", `Chapter ${String(battleState.chapter).padStart(2, "0")} · Battle ${battleState.battle} · ${battleState.encounterName}`);
    const bg = document.getElementById("storyMatchupBg");
    if (bg) bg.style.backgroundImage = `url('${stage.image}')`;
    const playerCanvas = document.getElementById("storyMatchupPlayerCanvas");
    const opponentCanvas = document.getElementById("storyMatchupOpponentCanvas");
    storyPlayerPreviewAnimator?.stop();
    storyOpponentPreviewAnimator?.stop();
    if (playerCanvas) {
      storyPlayerPreviewAnimator = new CanvasSpriteAnimator(playerCanvas, hero.id, "right", "idle");
      storyPlayerPreviewAnimator.start();
    }
    if (opponentCanvas) {
      storyOpponentPreviewAnimator = new CanvasSpriteAnimator(opponentCanvas, opponent.id, "left", "idle");
      storyOpponentPreviewAnimator.start();
    }
  }

  function activeBattleHero() {
    return HEROES.find(hero => hero.id === battleState.playerHero)
      || HEROES.find(hero => hero.id === playerState.selectedHero)
      || HEROES[0];
  }

  // ==========================================
  // 10. BOT ARENA LOBBY & STAGE SELECTION
  // ==========================================
  let arenaRivalId = "kael";
  let matchupPlayerAnimator = null;
  let matchupEnemyAnimator = null;

  function renderArenaLobby() {
    // 4 Stages
    const stageGrid = document.getElementById("arenaStageSelectorGrid");
    if (stageGrid) {
      stageGrid.innerHTML = "";
      ARENA_STAGES.forEach(st => {
        const isSelected = playerState.selectedArena === st.id;
        const card = document.createElement("button");
        card.className = `arena-stage-card ${isSelected ? "active" : ""}`;
        card.style.backgroundImage = `url('${st.image}')`;
        card.innerHTML = `
          <span class="stage-card-name">${st.name}</span>
          <span class="stage-card-sub">${st.subtitle}</span>
        `;
        card.onclick = () => {
          playerState.selectedArena = st.id;
          saveState();
          renderArenaLobby();
        };
        stageGrid.appendChild(card);
      });
    }

    // Matchup background & stage label
    const chosenStage = ARENA_STAGES.find(a => a.id === playerState.selectedArena) || ARENA_STAGES[0];
    const matchupBg = document.getElementById("matchupBg");
    if (matchupBg) matchupBg.style.backgroundImage = `url('${chosenStage.image}')`;
    setText("matchupStageLabel", chosenStage.name.toUpperCase());

    // Fighters preview
    const playerHero = HEROES.find(h => h.id === playerState.selectedHero) || HEROES[0];
    const enemyHero = HEROES.find(h => h.id === arenaRivalId) || HEROES[2];

    setText("matchupPlayerName", `${playerHero.name.toUpperCase()} (YOU)`);
    setText("matchupEnemyName", `${enemyHero.name.toUpperCase()} (BOT)`);

    const pCanvas = document.getElementById("matchupPlayerCanvas");
    if (pCanvas) {
      if (!matchupPlayerAnimator) {
        matchupPlayerAnimator = new CanvasSpriteAnimator(pCanvas, playerHero.id, "right", "idle");
        matchupPlayerAnimator.start();
      } else {
        matchupPlayerAnimator.setHero(playerHero.id);
        matchupPlayerAnimator.play("idle");
      }
    }

    const eCanvas = document.getElementById("matchupEnemyCanvas");
    if (eCanvas) {
      if (!matchupEnemyAnimator) {
        matchupEnemyAnimator = new CanvasSpriteAnimator(eCanvas, enemyHero.id, "left", "idle");
        matchupEnemyAnimator.start();
      } else {
        matchupEnemyAnimator.setHero(enemyHero.id);
        matchupEnemyAnimator.play("idle");
      }
    }
  }

  // ==========================================
  // 11. BATTLE ENGINE (PLAYER VS BOT / BOSS)
  // ==========================================
  let battleActive = false;
  let battleMode = "arena"; // "arena" or "story"
  let battleLevel = 1;
  let battleEnemyName = "";
  let battleIsBoss = false;
  let playerBattleAnimator = null;
  let enemyBattleAnimator = null;

  let playerHp = 3200;
  // ---- Battle tuning (change these two numbers to adjust difficulty) ----
  const PLAYER_HP_MULT = 3.5;   // bigger = your life lasts longer
  const ENEMY_DAMAGE_MULT = 2;  // bigger = enemy hits harder
  let playerMaxHp = 3200;
  let enemyHp = 2800;
  let enemyMaxHp = 2800;
  let playerMana = 100;
  let battleTurn = 1;
  let isActionBusy = false;
  let isAutoBattle = false;
  const SKILL_COSTS = [22, 42, 65];
  const SKILL_COOLDOWN_MS = [2500, 4500, 7000]; // real-time cooldowns (milliseconds)
  const ENEMY_HP_MULT = 4;          // real-time fights last longer, so the opponent has more life
  const ENEMY_RANGE = 215;          // how close the opponent must be for a normal attack
  const ENEMY_SPECIAL_RANGE = 275;  // and for its special skill
  const ENEMY_SPEED = 0.2;          // opponent walk speed (player is 0.29)
  let skillCooldownUntil = [0, 0, 0];
  let battleOutcome = null;         // null | "win" | "lose"
  let enemyActing = false;
  let enemyAttackReadyAt = 0;
  let enemySpecialReadyAt = 0;
  let enemyRetreatUntil = 0;
  let battleTickTimer = 0;
  let lastTickAt = 0;
  let manaAcc = 0;
  let playerRecoverUntil = 0;
  const heldKeys = new Set();
  let skillCooldowns = [0, 0, 0];
  let battleSequence = 0;
  const battleTimers = new Set();
  let vfxTimer = 0;
  let playerPosition = 0;
  let enemyPosition = 0;
  let enemyMoveTimer = 0;
  let enemyMoveRaf = 0;

  function setEnemyPosition(position) {
    const geometry = getFighterGeometry();
    let minimum = -360;
    let maximum = 95;
    if (geometry) {
      const edgePadding = Math.max(12, geometry.arenaRect.width * 0.015);
      const minimumCenterGap = Math.max(150, Math.min(205, geometry.enemyRect.width * 0.72));
      maximum = enemyPosition + geometry.arenaRect.right - edgePadding - geometry.enemyRect.right;
      minimum = enemyPosition - (geometry.centerDistance - minimumCenterGap);
    }
    enemyPosition = Math.max(minimum, Math.min(maximum, position));
    const actor = document.getElementById("fighterStageRight");
    if (actor) actor.style.setProperty("--fighter-x", `${enemyPosition.toFixed(1)}px`);
  }

  function stopEnemyMovement() {
    clearTimeout(enemyMoveTimer);
    cancelAnimationFrame(enemyMoveRaf);
    enemyMoveTimer = 0;
    enemyMoveRaf = 0;
  }

  // The opponent hero moves forward and backward on its own during battle.
  function scheduleEnemyMovement() {
    stopEnemyMovement();
    const sequence = battleSequence;
    enemyMoveTimer = setTimeout(() => {
      if (!battleActive || battleSequence !== sequence) return;
      const actor = document.getElementById("fighterStageRight");
      const busy = actor?.classList.contains("is-attacking") || actor?.classList.contains("is-special") || actor?.classList.contains("is-hit");
      if (busy || currentView !== "battle") { scheduleEnemyMovement(); return; }
      const distance = getCombatDistance();
      const forwardBias = distance > 330 ? 0.75 : distance < 230 ? 0.3 : 0.55;
      const direction = Math.random() < forwardBias ? -1 : 1;
      const start = enemyPosition;
      const target = start + direction * (60 + Math.random() * 70);
      const startAt = performance.now();
      enemyBattleAnimator?.play("walk");
      const step = (now) => {
        if (!battleActive || battleSequence !== sequence) return;
        const progress = Math.min(1, (now - startAt) / 560);
        setEnemyPosition(start + (target - start) * (1 - (1 - progress) ** 2));
        if (progress < 1) enemyMoveRaf = requestAnimationFrame(step);
        else {
          enemyMoveRaf = 0;
          if (enemyBattleAnimator?.anim === "walk") enemyBattleAnimator.play("idle");
          scheduleEnemyMovement();
        }
      };
      enemyMoveRaf = requestAnimationFrame(step);
    }, 1100 + Math.random() * 1400);
  }
  let battlePlayerHeroId = "aeron";
  let battleEnemyHeroId = "lyra";
  const movementKeys = new Set();
  let movementRaf = 0;
  let buttonWalkRaf = 0;
  let lastMovementTime = 0;

  function scheduleBattle(callback, delay) {
    const sequence = battleSequence;
    const timer = setTimeout(() => {
      battleTimers.delete(timer);
      if (battleSequence === sequence && battleActive && currentView === "battle") callback();
    }, delay);
    battleTimers.add(timer);
    return timer;
  }

  function clearBattleTimers() {
    clearInterval(battleTickTimer);
    battleTickTimer = 0;
    stopEnemyMovement();
    battleTimers.forEach(clearTimeout);
    battleTimers.clear();
    if (vfxTimer) clearTimeout(vfxTimer);
    vfxTimer = 0;
  }

  function getFighterGeometry() {
    const arena = document.getElementById("battleArenaBg");
    const player = document.getElementById("fighterStageLeft");
    const enemy = document.getElementById("fighterStageRight");
    if (!arena || !player || !enemy) return null;
    const arenaRect = arena.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();
    return {
      arenaRect, playerRect, enemyRect,
      centerDistance: (enemyRect.left + enemyRect.width / 2) - (playerRect.left + playerRect.width / 2)
    };
  }

  function getCombatDistance() {
    return Math.max(0, getFighterGeometry()?.centerDistance || 0);
  }

  function setPlayerPosition(position) {
    const geometry = getFighterGeometry();
    let minimum = -95;
    let maximum = 360;
    if (geometry) {
      const edgePadding = Math.max(12, geometry.arenaRect.width * 0.015);
      const minimumCenterGap = Math.max(150, Math.min(205, geometry.playerRect.width * 0.72));
      minimum = playerPosition + geometry.arenaRect.left + edgePadding - geometry.playerRect.left;
      maximum = playerPosition + geometry.centerDistance - minimumCenterGap;
    }
    playerPosition = Math.max(minimum, Math.min(maximum, position));
    const actor = document.getElementById("fighterStageLeft");
    if (actor) actor.style.setProperty("--fighter-x", `${playerPosition.toFixed(1)}px`);
  }

  function stopPlayerMovement() {
    movementKeys.clear();
    cancelAnimationFrame(movementRaf);
    cancelAnimationFrame(buttonWalkRaf);
    movementRaf = 0;
    buttonWalkRaf = 0;
    lastMovementTime = 0;
    if (playerBattleAnimator?.anim === "walk") playerBattleAnimator.play("idle");
  }

  function animateHeldMovement(time) {
    movementRaf = 0;
    if (!battleActive || currentView !== "battle" || isActionBusy || !movementKeys.size) {
      stopPlayerMovement();
      return;
    }
    const direction = Number(movementKeys.has("d") || movementKeys.has("arrowright"))
      - Number(movementKeys.has("a") || movementKeys.has("arrowleft"));
    if (direction) {
      const delta = lastMovementTime ? Math.min(45, time - lastMovementTime) : 16;
      setPlayerPosition(playerPosition + direction * delta * 0.29);
      if (playerBattleAnimator?.anim !== "walk") playerBattleAnimator?.play("walk");
    } else if (playerBattleAnimator?.anim === "walk") {
      playerBattleAnimator.play("idle");
    }
    lastMovementTime = time;
    movementRaf = requestAnimationFrame(animateHeldMovement);
  }

  function walkOneStride(direction = 1, distance = 115, onComplete = null) {
    if (!battleActive || isActionBusy) return;
    stopPlayerMovement();
    isActionBusy = true;
    updateBattleHud();
    playerBattleAnimator?.play("walk");
    const startPosition = playerPosition;
    const target = playerPosition + direction * distance;
    const startAt = performance.now();
    const sequence = battleSequence;
    const step = (now) => {
      if (!battleActive || battleSequence !== sequence) return;
      const progress = Math.min(1, (now - startAt) / 590);
      setPlayerPosition(startPosition + (target - startPosition) * (1 - (1 - progress) ** 2));
      if (progress < 1) buttonWalkRaf = requestAnimationFrame(step);
      else {
        buttonWalkRaf = 0;
        playerBattleAnimator?.play("idle");
        isActionBusy = false;
        addBattleLog(`${activeBattleHero().name} moved ${direction > 0 ? "forward" : "backward"}.`);
        updateBattleHud();
        if (onComplete) onComplete();
      }
    };
    buttonWalkRaf = requestAnimationFrame(step);
  }

  function startArenaBattle() {
    if (playerState.energy < 2) {
      showToast("You need 2 Energy to enter the Arena!", "⚡");
      return;
    }
    playerState.energy -= 2;
    saveState();

    const hero = HEROES.find(h => h.id === playerState.selectedHero) || HEROES[0];
    const rival = HEROES.find(h => h.id === arenaRivalId) || HEROES[2];
    const stage = ARENA_STAGES.find(a => a.id === playerState.selectedArena) || ARENA_STAGES[0];

    battleMode = "arena";
    battleLevel = playerState.level;
    battleEnemyName = rival.name;
    battleIsBoss = false;

    initBattle(hero, rival, stage.image, stage.name, false);
  }

  function startStoryBattle(isContinuation = false) {
    if (!isContinuation && playerState.energy < 3) {
      showToast("You need 3 Energy for Chapter battles!", "⚡");
      return;
    }
    if (!isContinuation) playerState.energy -= 3;
    saveState();

    const hero = HEROES.find(h => h.id === battleState.playerHero) || HEROES[0];
    const rival = HEROES.find(h => h.id === battleState.opponentHero) || HEROES[1];
    const stage = ARENA_STAGES.find(a => a.id === battleState.arenaId) || ARENA_STAGES[0];

    battleMode = "story";
    battleLevel = battleState.globalLevel;
    battleEnemyName = rival.name;
    battleIsBoss = battleState.isBoss;

    storyPlayerPreviewAnimator?.stop();
    storyOpponentPreviewAnimator?.stop();
    initBattle(hero, rival, stage.image, stage.name, true);
  }

  function initBattle(hero, rivalHero, bgImage, arenaName, isStory) {
    battleSequence++;
    clearBattleTimers();
    stopPlayerMovement();
    playerBattleAnimator?.stop();
    enemyBattleAnimator?.stop();
    playerBattleAnimator = null;
    enemyBattleAnimator = null;
    skillCooldowns = [0, 0, 0];
    skillCooldownUntil = [0, 0, 0];
    battleOutcome = null;
    enemyActing = false;
    enemyRetreatUntil = 0;
    manaAcc = 0;
    playerRecoverUntil = 0;
    playerPosition = 0;
    enemyPosition = 0;
    stopEnemyMovement();
    const enemyActor = document.getElementById("fighterStageRight");
    if (enemyActor) enemyActor.style.setProperty("--fighter-x", "0px");
    battlePlayerHeroId = hero.id;
    battleEnemyHeroId = rivalHero.id;
    battleActive = true;
    switchView("battle");
    setPlayerPosition(0);
    for (const id of ["fighterStageLeft", "fighterStageRight"]) {
      document.getElementById(id)?.classList.remove("is-attacking", "is-special", "is-hit");
    }
    document.getElementById("battleVfxLayer")?.classList.add("hidden");

    // Background setup
    const bg = document.getElementById("battleArenaBg");
    if (bg) bg.style.backgroundImage = `url('${bgImage}')`;
    setText("battleLocationText", `⚔️ ${arenaName.toUpperCase()} · ${isStory ? "STORY MODE" : "ARENA DUEL"}`);
    setText("arenaBadgeText", arenaName.toUpperCase());

    // Stats calculation
    playerMaxHp = Math.round((hero.hp + playerState.level * 80) * PLAYER_HP_MULT);
    playerHp = playerMaxHp;

    if (isStory) {
      enemyMaxHp = Math.round((rivalHero.hp + battleLevel * 75 + (battleIsBoss ? 350 : 0)) * ENEMY_HP_MULT);
    } else {
      enemyMaxHp = Math.round(((rivalHero ? rivalHero.hp : 2800) + playerState.level * 75) * ENEMY_HP_MULT);
    }
    enemyHp = enemyMaxHp;

    playerMana = 100;
    battleTurn = 1;
    isActionBusy = false;
    isAutoBattle = false;

    // HUD Names & Icons
    setText("hudPlayerName", `${hero.name.toUpperCase()}`);
    setText("hudPlayerLv", `Lv. ${playerState.level}`);
    setText("hudEnemyName", `${battleEnemyName.toUpperCase()}`);
    setText("hudEnemyLv", isStory ? `${battleIsBoss ? "BOSS · " : ""}BOT Lv. ${battleLevel}` : "BOT");

    setText("hudStatusMatchup", `⚔ ${hero.name} VS ${battleEnemyName}`);
    setText("hudStatusLocation", `📍 ${arenaName}`);
    setText("hudStatusEvent", "Waiting for battle...");

    const pAv = document.getElementById("hudPlayerAvatar");
    if (pAv) pAv.style.backgroundImage = `url('images/heroes/${hero.id}.jpg')`;

    const eAv = document.getElementById("hudEnemyAvatar");
    if (eAv) {
      eAv.style.backgroundImage = `url('images/heroes/${rivalHero.id}.jpg')`;
    }

    // Skill button labels & custom Aeron icons
    updateSkillButtons(hero);

    // One running animator per visible fighter. They never share a sheet or state.
    const pCanvas = document.getElementById("playerBattleCanvas");
    if (pCanvas) {
      playerBattleAnimator = new CanvasSpriteAnimator(pCanvas, hero.id, "right", "idle");
      playerBattleAnimator.start();
      const sheet = playerBattleAnimator.sheet;
      if (sheet.dataset.assetStatus !== "ready") {
        sheet.addEventListener("load", () => {
          if (battleActive && playerBattleAnimator?.sheet === sheet) updateBattleHud();
        }, { once: true });
      }
    }

    const eCanvas = document.getElementById("enemyBattleCanvas");
    const eMonster = document.getElementById("enemyMonsterImage");
    if (rivalHero && eCanvas) {
      eMonster?.classList.add("hidden");
      eCanvas.classList.remove("hidden");
      enemyBattleAnimator = new CanvasSpriteAnimator(eCanvas, rivalHero.id, "left", "idle");
      enemyBattleAnimator.start();
    }

    // Reset log
    const logBox = document.getElementById("battleLogEntries");
    if (logBox) logBox.innerHTML = `<p class="battle-log-p latest">✦ Battle commenced! ${hero.name} faces ${battleEnemyName}.</p>`;

    updateBattleHud();
    startBattleLoop();
    window.setTimeout(() => audioManager.playVoice(battlePlayerHeroId, "intro"), 260);
    window.setTimeout(() => audioManager.playVoice(battleEnemyHeroId, "intro"), 820);
  }

  function updateSkillButtons(hero) {
    const icons = ["skillBasicIcon", "skill1IconImg", "skill2IconImg", "skill3IconImg"]
      .map(id => document.getElementById(id));
    for (let index = 0; index < 3; index++) {
      const button = document.getElementById(`btnActionSkill${index + 1}`);
      if (button) button.setAttribute("aria-label", `${hero.skills[index]}, ${SKILL_COSTS[index]} mana`);
    }

    if (hero.id === "aeron" && hero.skillIcons) {
      [hero.skillIcons[0], ...hero.skillIcons].forEach((path, index) => {
        if (icons[index]) icons[index].src = path;
      });
      return;
    }

    // For the other nine heroes, preview THEIR OWN attack/special frames.
    const sheet = getHeroSpriteSheet(hero.id);
    const paintIcons = () => {
      if (activeBattleHero().id !== hero.id || sheet.dataset.assetStatus !== "ready") return;
      const frameWidth = sheet.naturalWidth / 4;
      const frameHeight = sheet.naturalHeight / 4;
      [[2, 2], [3, 0], [3, 1], [3, 2]].forEach(([row, col], index) => {
        if (!icons[index]) return;
        const tile = document.createElement("canvas");
        tile.width = 80;
        tile.height = 80;
        tile.getContext("2d").drawImage(sheet, col * frameWidth, row * frameHeight,
          frameWidth, frameHeight, 0, 0, 80, 80);
        icons[index].src = tile.toDataURL("image/png");
      });
    };
    if (sheet.complete && sheet.dataset.assetStatus === "ready") paintIcons();
    else {
      icons.forEach(icon => { if (icon) icon.src = `images/heroes/${hero.id}.jpg`; });
      sheet.addEventListener("load", paintIcons, { once: true });
    }
  }

  function updateBattleHud() {
    const heroSheetStatus = playerBattleAnimator?.sheet.dataset.assetStatus;
    setText("hudTurnText", !battleActive ? "MATCH OVER" : heroSheetStatus === "missing"
      ? "SPRITE MISSING" : heroSheetStatus !== "ready" ? "LOADING HERO…"
        : isActionBusy ? "ATTACKING..." : battleOutcome ? "MATCH OVER" : "FIGHT!");
    setText("hudPlayerHpText", `${Math.max(0, playerHp).toLocaleString()} / ${playerMaxHp.toLocaleString()}`);
    setText("hudPlayerMpText", `${playerMana} / 100`);
    setText("hudEnemyHpText", `${Math.max(0, enemyHp).toLocaleString()} / ${enemyMaxHp.toLocaleString()}`);
    setText("battlePotionCount", `×${playerState.potions}`);

    const pFill = document.getElementById("hudPlayerHpFill");
    if (pFill) pFill.style.width = `${Math.max(0, (playerHp / playerMaxHp) * 100)}%`;
    const pMpFill = document.getElementById("hudPlayerMpFill");
    if (pMpFill) pMpFill.style.width = `${playerMana}%`;
    const eFill = document.getElementById("hudEnemyHpFill");
    if (eFill) eFill.style.width = `${Math.max(0, (enemyHp / enemyMaxHp) * 100)}%`;
    refreshBattleButtons();
  }

  function refreshBattleButtons() {
    const ready = playerBattleAnimator?.sheet.dataset.assetStatus === "ready";
    for (const id of ["btnActionAttack", "btnMainAttackAction", "btnActionWalk"]) {
      const button = document.getElementById(id);
      if (button) button.disabled = !battleActive || isActionBusy || !ready;
    }
    for (let index = 0; index < SKILL_COSTS.length; index++) {
      const button = document.getElementById(`btnActionSkill${index + 1}`);
      const badge = document.getElementById(`skillCooldown${index + 1}`);
      const remaining = skillCooldowns[index];
      if (button) {
        button.disabled = !battleActive || isActionBusy || !ready || remaining > 0 || playerMana < SKILL_COSTS[index];
        button.dataset.cooldown = String(remaining);
        button.title = remaining > 0 ? `Ready in ${remaining}s`
          : `${activeBattleHero().skills[index]} — ${SKILL_COSTS[index]} MP`;
      }
      if (badge) {
        badge.hidden = remaining === 0;
        badge.textContent = remaining ? String(remaining) : "";
      }
    }
    const potion = document.getElementById("btnBattlePotion");
    if (potion) potion.disabled = !battleActive || isActionBusy || playerState.potions === 0 || playerHp >= playerMaxHp;
  }

  function addBattleLog(msg) {
    setText("hudStatusEvent", msg);
    const box = document.getElementById("battleLogEntries");
    if (!box) return;
    const p = document.createElement("p");
    p.className = "battle-log-p latest";
    p.textContent = `✦ ${msg}`;

    // Remove latest from siblings
    box.querySelectorAll(".latest").forEach(el => el.classList.remove("latest"));
    box.insertBefore(p, box.firstChild);

    // Limit log size
    while (box.children.length > 5) {
      box.removeChild(box.lastChild);
    }
  }

  // Animation-driven combat. HP only changes when the actual sprite reaches
  // frame 3 of ATTACK/SPECIAL; frame 4 then finishes before the turn advances.
  function showBattleHit(side, amount, label = null) {
    const actor = document.getElementById(side === "enemy" ? "fighterStageRight" : "fighterStageLeft");
    if (!actor) return;
    if (!label) actor.classList.add("is-hit");
    actor.querySelector(".battle-damage-pop")?.remove();
    const pop = document.createElement("span");
    pop.className = "battle-damage-pop";
    pop.textContent = label || `−${amount.toLocaleString()}`;
    actor.appendChild(pop);
    scheduleBattle(() => {
      pop.remove();
      actor.classList.remove("is-hit");
    }, 570);
  }

  function executePlayerAction(type) {
    if (!battleActive || isActionBusy || battleOutcome) return;
    if (type === "walk") {
      walkOneStride(1);
      return;
    }

    const hero = activeBattleHero();
    const skillIndex = ["skill1", "skill2", "skill3"].indexOf(type);
    if (type !== "normal" && skillIndex < 0) return;
    const now = performance.now();
    if (now < playerRecoverUntil) return;
    const cost = skillIndex < 0 ? 0 : SKILL_COSTS[skillIndex];
    if (skillIndex >= 0 && skillCooldownUntil[skillIndex] > now) {
      showToast(`${hero.skills[skillIndex]} recharges in ${Math.ceil((skillCooldownUntil[skillIndex] - now) / 1000)}s.`, "⌛");
      return;
    }
    if (playerMana < cost) {
      showToast(`Need ${cost} Mana!`, "⚡");
      return;
    }
    if (!playerBattleAnimator || playerBattleAnimator.sheet.dataset.assetStatus !== "ready") {
      showToast(`Waiting for ${hero.name}'s own sprite sheet to load.`, "⚔️");
      return;
    }

    // Real-time: you must be close enough when the blow lands, or it misses.
    const actionRange = skillIndex < 0 ? 210 : 270;
    const multipliers = [1.6, 2.15, 2.9];
    const randomBonuses = [100, 120, 160];
    const damage = skillIndex < 0
      ? Math.floor(hero.power * 1.05 + Math.random() * 80)
      : Math.floor(hero.power * multipliers[skillIndex] + Math.random() * randomBonuses[skillIndex]);
    const animType = skillIndex < 0 ? "attack" : "special";
    const actionLabel = skillIndex < 0 ? "a swift strike" : hero.skills[skillIndex];
    const vfxPath = hero.id === "aeron" && skillIndex >= 0 ? hero.skillVfx[skillIndex] : null;
    stopPlayerMovement();
    audioManager.playVoice(battlePlayerHeroId, skillIndex < 0 ? "attack" : "skill");
    const actor = document.getElementById("fighterStageLeft");
    let landed = false;

    const onImpact = (frame) => {
      if (frame !== 2 || landed || !battleActive) return;
      landed = true;
      if (battleOutcome) return;
      if (getCombatDistance() > actionRange + 20) {
        showBattleHit("enemy", 0, "MISS");
        addBattleLog(`${hero.name}'s ${actionLabel} missed — too far! Move closer.`);
        return;
      }
      enemyHp = Math.max(0, enemyHp - damage);
      showBattleHit("enemy", damage);
      triggerVfx(vfxPath, hero.color, "enemy");
      playSound(animType === "special" ? "special" : "attack");
      audioManager.playVoice(battleEnemyHeroId, "hurt");
      addBattleLog(`${hero.name} used ${actionLabel} for ${damage} damage!`);
      updateBattleHud();
      if (enemyHp <= 0) {
        battleOutcome = "win";
        scheduleBattle(() => endBattle(true), 450);
      }
    };
    const onFinish = () => {
      actor?.classList.remove("is-attacking", "is-special");
      if (!battleActive) return;
      if (!landed) onImpact(2);
      isActionBusy = false;
      playerRecoverUntil = performance.now() + 260;
      updateBattleHud();
      resumeHeldMovement();
    };

    if (!playerBattleAnimator.play(animType, onFinish, onImpact)) return;
    isActionBusy = true;
    playerMana = Math.min(100, Math.max(0, playerMana - cost + (skillIndex < 0 ? 24 : 8)));
    if (skillIndex >= 0) {
      skillCooldownUntil[skillIndex] = now + SKILL_COOLDOWN_MS[skillIndex];
      skillCooldowns[skillIndex] = Math.ceil(SKILL_COOLDOWN_MS[skillIndex] / 1000);
    }
    actor?.classList.remove("is-attacking", "is-special");
    void actor?.offsetWidth;
    actor?.classList.add("is-attacking");
    if (animType === "special") actor?.classList.add("is-special");
    setText("hudStatusEvent", `${hero.name} is using ${actionLabel}…`);
    updateBattleHud();
  }

  function resumeHeldMovement() {
    if (!battleActive || battleOutcome || !heldKeys.size) return;
    heldKeys.forEach(k => movementKeys.add(k));
    if (!movementRaf) {
      lastMovementTime = 0;
      movementRaf = requestAnimationFrame(animateHeldMovement);
    }
  }

  // ---------- REAL-TIME BATTLE LOOP (Mortal Kombat style) ----------
  // You control your hero. The opponent fights on its own: it walks up to you,
  // attacks, uses its own special skill, and sometimes backs off.
  function startBattleLoop() {
    clearInterval(battleTickTimer);
    lastTickAt = performance.now();
    enemyAttackReadyAt = lastTickAt + 1600;
    enemySpecialReadyAt = lastTickAt + 5000;
    battleTickTimer = setInterval(battleTick, 40);
    setText("hudStatusEvent", "FIGHT!");
  }

  function battleTick() {
    if (!battleActive || currentView !== "battle") return;
    const now = performance.now();
    const dt = Math.min(100, now - lastTickAt);
    lastTickAt = now;
    if (battleOutcome) return;

    let changed = false;
    if (playerMana < 100) {
      manaAcc += dt * 0.004; // +4 mana per second
      if (manaAcc >= 1) {
        const gain = Math.floor(manaAcc);
        playerMana = Math.min(100, playerMana + gain);
        manaAcc -= gain;
        changed = true;
      }
    } else manaAcc = 0;
    for (let i = 0; i < skillCooldowns.length; i++) {
      const remaining = Math.max(0, Math.ceil((skillCooldownUntil[i] - now) / 1000));
      if (remaining !== skillCooldowns[i]) { skillCooldowns[i] = remaining; changed = true; }
    }

    if (isAutoBattle && !isActionBusy) autoTick(dt);
    enemyAiTick(now, dt);
    if (changed) updateBattleHud();
  }

  function autoTick(dt) {
    const distance = getCombatDistance();
    if (distance > 208) {
      setPlayerPosition(playerPosition + dt * 0.29);
      if (playerBattleAnimator && playerBattleAnimator.anim !== "walk") playerBattleAnimator.play("walk");
    } else {
      if (playerBattleAnimator?.anim === "walk") playerBattleAnimator.play("idle");
      autoNextMove();
    }
  }

  function enemyAiTick(now, dt) {
    if (enemyActing || battleOutcome) return;
    const distance = getCombatDistance();
    const canSpecial = Boolean(enemyBattleAnimator) && now >= enemySpecialReadyAt;

    // Sometimes step back after attacking
    if (now < enemyRetreatUntil) {
      setEnemyPosition(enemyPosition + dt * ENEMY_SPEED * 0.8);
      if (enemyBattleAnimator && enemyBattleAnimator.anim !== "walk") enemyBattleAnimator.play("walk");
      return;
    }

    if (distance > ENEMY_RANGE) {
      // Cast the special from a distance if it is ready
      if (canSpecial && distance <= ENEMY_SPECIAL_RANGE && now >= enemyAttackReadyAt) {
        enemyAttack(true);
        return;
      }
      setEnemyPosition(enemyPosition - dt * ENEMY_SPEED);
      if (enemyBattleAnimator && enemyBattleAnimator.anim !== "walk") enemyBattleAnimator.play("walk");
      return;
    }

    if (enemyBattleAnimator?.anim === "walk") enemyBattleAnimator.play("idle");
    if (now >= enemyAttackReadyAt) enemyAttack(canSpecial && Math.random() < 0.6);
  }

  function enemyAttack(useSpecial) {
    if (!battleActive || enemyActing || battleOutcome) return;
    const actor = document.getElementById("fighterStageRight");
    const botHero = enemyBattleAnimator
      ? HEROES.find(h => h.id === enemyBattleAnimator.heroId)
      : null;
    const range = useSpecial ? ENEMY_SPECIAL_RANGE : ENEMY_RANGE;
    const hit = Math.floor((220 + battleLevel * 14 + Math.random() * 65) * ENEMY_DAMAGE_MULT * (useSpecial ? 1.35 : 1));
    let landed = false;
    enemyActing = true;
    actor?.classList.remove("is-attacking", "is-special");
    void actor?.offsetWidth;
    actor?.classList.add("is-attacking");
    if (useSpecial) actor?.classList.add("is-special");
    setText("hudStatusEvent", `${battleEnemyName} is attacking!`);

    const onImpact = (frame) => {
      if (frame !== 2 || landed || !battleActive) return;
      landed = true;
      if (battleOutcome) return;
      if (getCombatDistance() > range + 25) {
        showBattleHit("player", 0, "MISS");
        addBattleLog(`${battleEnemyName} missed!`);
        return;
      }
      playerHp = Math.max(0, playerHp - hit);
      playerMana = Math.min(100, playerMana + 10);
      showBattleHit("player", hit);
      triggerVfx(null, botHero?.color || "#ee756a", "player");
      playSound("attack");
      audioManager.playVoice(battleEnemyHeroId, useSpecial ? "skill" : "attack");
      audioManager.playVoice(battlePlayerHeroId, "hurt");
      addBattleLog(`${battleEnemyName} ${useSpecial ? "unleashed a special for" : "hit you for"} ${hit} damage!`);
      updateBattleHud();
      if (playerHp <= 0) {
        battleOutcome = "lose";
        scheduleBattle(() => endBattle(false), 450);
      }
    };
    const onFinish = () => {
      actor?.classList.remove("is-attacking", "is-special");
      enemyActing = false;
      if (!battleActive) return;
      if (!landed) onImpact(2);
      const now = performance.now();
      enemyAttackReadyAt = now + 1000 + Math.random() * 900;
      if (useSpecial) enemySpecialReadyAt = now + 7000 + Math.random() * 3000;
      if (Math.random() < 0.4) enemyRetreatUntil = now + 450;
    };

    if (enemyBattleAnimator) {
      if (!enemyBattleAnimator.play(useSpecial ? "special" : "attack", onFinish, onImpact)) {
        enemyActing = false;
        actor?.classList.remove("is-attacking", "is-special");
      }
    } else {
      // Story monsters have an image, not a hero sheet. Move that existing art.
      scheduleBattle(() => onImpact(2), 350);
      scheduleBattle(onFinish, 740);
    }
  }

  function triggerVfx(vfxUrl, color = "#ff874e", target = "enemy") {
    const vfxLayer = document.getElementById("battleVfxLayer");
    if (!vfxLayer) return;
    if (vfxTimer) clearTimeout(vfxTimer);
    // The source sheet already contains its own weapon/magic effect. Aeron
    // additionally uses his supplied PNG; other heroes receive a color flash.
    vfxLayer.style.backgroundImage = vfxUrl ? `url('${vfxUrl}')`
      : `radial-gradient(circle, ${color}bb 0%, ${color}66 30%, transparent 72%)`;
    vfxLayer.style.left = target === "player" ? "25%" : "59%";
    vfxLayer.style.animation = "none";
    vfxLayer.classList.remove("hidden");
    void vfxLayer.offsetWidth;
    vfxLayer.style.removeProperty("animation");
    vfxTimer = setTimeout(() => {
      vfxLayer.classList.add("hidden");
      vfxTimer = 0;
    }, 790);
  }

  function useBattlePotion() {
    if (!battleActive || isActionBusy) return;
    if (playerState.potions <= 0) {
      showToast("No healing potions left in bag!", "🧪");
      return;
    }
    if (playerHp >= playerMaxHp) {
      showToast("Your hero is already at full health!");
      return;
    }
    playerState.potions--;
    const heal = Math.floor(playerMaxHp * 0.38);
    playerHp = Math.min(playerMaxHp, playerHp + heal);
    saveState();
    playSound("click");
    addBattleLog(`Drank potion and recovered ${heal} HP.`);
    updateBattleHud();
  }

  function autoNextMove() {
    if (!battleActive || isActionBusy || !isAutoBattle) return;
    if (playerMana >= 65 && skillCooldowns[2] === 0) executePlayerAction("skill3");
    else if (playerMana >= 42 && skillCooldowns[1] === 0) executePlayerAction("skill2");
    else if (playerMana >= 22 && skillCooldowns[0] === 0) executePlayerAction("skill1");
    else executePlayerAction("normal");
  }

  let resultAction = "default";

  function proceedToNextBattle() {
    const chapter = CHAPTERS.find(ch => ch.number === battleState.chapter) || CHAPTERS[0];
    battleState.battle += 1;
    battleState.globalLevel = (chapter.number - 1) * 5 + battleState.battle;
    battleState.isBoss = battleState.battle === 5;
    battleState.encounterName = battleState.isBoss ? chapter.boss : chapter.mobs[battleState.battle - 1];
    const pool = HEROES.filter(hero => hero.id !== battleState.playerHero && hero.id !== battleState.opponentHero);
    battleState.opponentHero = pool[Math.floor(Math.random() * pool.length)].id;
    document.getElementById("battleResultModal")?.classList.add("hidden");
    startStoryBattle(true);
  }

  function returnToAdventure(chapterNum = null) {
    document.getElementById("battleResultModal")?.classList.add("hidden");
    if (chapterNum) selectedChapterNum = chapterNum;
    renderAdventureChapters();
    switchView("adventure", "Adventure Mode");
  }

  function endBattle(victory) {
    if (!battleActive) return;
    battleActive = false;
    battleSequence++;
    clearBattleTimers();
    stopPlayerMovement();
    isActionBusy = false;
    isAutoBattle = false;
    document.getElementById("battleVfxLayer")?.classList.add("hidden");
    document.getElementById("fighterStageLeft")?.classList.remove("is-attacking", "is-special");
    document.getElementById("fighterStageRight")?.classList.remove("is-attacking", "is-special");
    updateBattleHud();

    let goldEarned = 0;
    let xpEarned = 0;
    let rpEarned = 0;

    if (victory) {
      playSound("victory");
      audioManager.playVoice(battlePlayerHeroId, "victory");
      playerState.wins++;
      goldEarned = 150 + battleLevel * 30 + (battleIsBoss ? 300 : 0);
      xpEarned = 80 + battleLevel * 15;
      rpEarned = 28;

      if (battleMode === "story") {
        if (battleLevel >= playerState.highestLevel) {
          playerState.highestLevel = Math.min(50, battleLevel + 1);
        }
      } else {
        playerState.arenaRating += rpEarned;
      }
    } else {
      audioManager.playVoice(battleEnemyHeroId, "victory");
      playerState.losses++;
      goldEarned = 30;
      xpEarned = 20;
      rpEarned = -14;
      if (battleMode === "arena") {
        playerState.arenaRating = Math.max(0, playerState.arenaRating + rpEarned);
      }
    }

    playerState.coins += goldEarned;
    playerState.xp += xpEarned;
    playerState.level = Math.floor(playerState.xp / 300) + 1;
    saveState();

    // Show modal
    const modal = document.getElementById("battleResultModal");
    setText("resultTitle", victory ? "VICTORY" : "DEFEAT");
    setText("resultSubtitle", victory ? "A LEGEND IN THE MAKING" : "THE JOURNEY CONTINUES");
    setText("resultMessage", victory ? `${battleEnemyName} has fallen! Your legend grows stronger.` : "Even legends stumble. Gather your strength and rise again.");
    setText("resGold", `+${goldEarned}`);
    setText("resXp", `+${xpEarned}`);
    setText("resRating", victory ? `+${rpEarned}` : `${rpEarned}`);
    setText("resultEmblem", victory ? "🏆" : "🛡️");

    resultAction = "default";
    const continueBtn = document.getElementById("btnResultContinue");
    const secondaryBtn = document.getElementById("btnResultSecondary");
    const ratingCell = document.getElementById("resRating")?.parentElement;
    secondaryBtn?.classList.add("hidden");
    ratingCell?.classList.remove("hidden");
    if (continueBtn) continueBtn.textContent = "CONTINUE JOURNEY ➔";
    if (battleMode === "story" && victory) {
      battleState.totalGold = (battleState.totalGold || 0) + goldEarned;
      battleState.totalXp = (battleState.totalXp || 0) + xpEarned;
      battleState.totalRating = (battleState.totalRating || 0) + rpEarned;
      if (!battleIsBoss && battleState.battle < 5) {
        resultAction = "nextBattle";
        setText("resultSubtitle", `BATTLE ${battleState.battle} OF 5 CLEARED`);
        setText("resultMessage", "Enemy Defeated");
        ratingCell?.classList.add("hidden");
        if (continueBtn) continueBtn.textContent = battleState.battle === 4 ? "BOSS BATTLE →" : "NEXT BATTLE →";
        secondaryBtn?.classList.remove("hidden");
      } else {
        resultAction = "chapterComplete";
        const chapter = CHAPTERS.find(ch => ch.number === battleState.chapter) || CHAPTERS[0];
        setText("resultSubtitle", "CHAPTER COMPLETE");
        setText("resultMessage", chapter.name.toUpperCase());
        setText("resGold", `+${battleState.totalGold}`);
        setText("resXp", `+${battleState.totalXp}`);
        setText("resRating", `+${battleState.totalRating}`);
        const hasNext = CHAPTERS.some(ch => ch.number === battleState.chapter + 1);
        if (continueBtn) continueBtn.textContent = hasNext ? "NEXT CHAPTER →" : "RETURN TO ADVENTURE MODE";
        if (hasNext) secondaryBtn?.classList.remove("hidden");
      }
    }

    if (modal) modal.classList.remove("hidden");
    audioManager.syncView("result");
  }

  function stopBattle() {
    battleActive = false;
    battleSequence++;
    clearBattleTimers();
    stopPlayerMovement();
    isActionBusy = false;
    isAutoBattle = false;
    playerBattleAnimator?.stop();
    enemyBattleAnimator?.stop();
    playerBattleAnimator = null;
    enemyBattleAnimator = null;
    document.getElementById("battleVfxLayer")?.classList.add("hidden");
    for (const id of ["fighterStageLeft", "fighterStageRight"]) {
      const actor = document.getElementById(id);
      actor?.classList.remove("is-attacking", "is-special", "is-hit");
      actor?.querySelector(".battle-damage-pop")?.remove();
    }
    const modal = document.getElementById("battleResultModal");
    if (modal) modal.classList.add("hidden");
  }

  // ==========================================
  // 12. SUMMONING PORTAL
  // ==========================================
  function performSummon() {
    if (playerState.coins < 600) {
      showToast("Need 600 Gold! Win battles to earn more.", "🪙");
      return;
    }
    playerState.coins -= 600;
    playSound("special");

    const locked = HEROES.filter(h => !playerState.unlockedHeroes.includes(h.id));
    const pool = (locked.length > 0 && Math.random() < 0.85) ? locked : HEROES;
    const picked = pool[Math.floor(Math.random() * pool.length)];

    const isDuplicate = playerState.unlockedHeroes.includes(picked.id);
    if (!isDuplicate) {
      playerState.unlockedHeroes.push(picked.id);
    } else {
      playerState.coins += 200; // refund duplicate
    }
    saveState();

    // Show reveal modal
    const modal = document.getElementById("summonRevealModal");
    setText("revealTag", isDuplicate ? "A FAMILIAR SOUL RETURNS" : "A NEW DESTINY AWAKENED");
    setText("revealRarity", `${picked.rarity.toUpperCase()} · ${picked.element.toUpperCase()}`);
    setText("revealName", picked.name);
    setText("revealTitle", picked.title);
    setText("revealDesc", isDuplicate ? "Duplicate summon! Converted into 200 Gold." : "A new champion has joined your collection!");

    const rCanvas = document.getElementById("revealCanvas");
    if (rCanvas) {
      if (!summonHeroAnimator) {
        summonHeroAnimator = new CanvasSpriteAnimator(rCanvas, picked.id, "right", "idle");
        summonHeroAnimator.start();
      } else {
        summonHeroAnimator.setHero(picked.id);
        summonHeroAnimator.play("idle");
      }
    }

    if (modal) modal.classList.remove("hidden");
  }

  // ==========================================
  // 13. INVENTORY & DAILY REWARD
  // ==========================================
  function buyPotion() {
    if (playerState.coins < 180) {
      showToast("Need 180 Gold to purchase a Potion!", "🪙");
      return;
    }
    playerState.coins -= 180;
    playerState.potions++;
    saveState();
    playSound("click");
    showToast("Healing Potion added to your bag!", "🧪");
  }

  function buyEnergy() {
    if (playerState.gems < 60) {
      showToast("Need 60 Gems for energy refill!", "💎");
      return;
    }
    if (playerState.energy >= MAX_ENERGY) {
      showToast("Your energy is already full!");
      return;
    }
    playerState.gems -= 60;
    playerState.energy = MAX_ENERGY;
    saveState();
    playSound("click");
    showToast("Energy fully restored!", "⚡");
  }

  function claimDaily() {
    const today = new Date().toISOString().slice(0, 10);
    if (playerState.lastDailyClaim === today) {
      showToast("Daily gift already claimed! Come back tomorrow.", "🎁");
      return;
    }
    playerState.lastDailyClaim = today;
    playerState.coins += 300;
    playerState.potions += 1;
    saveState();
    playSound("victory");
    showToast("Claimed Daily Gift: +300 Gold & +1 Potion!", "🎁");
  }

  // ==========================================
  // 14. ACHIEVEMENTS & LEADERBOARD
  // ==========================================
  function renderAchievements() {
    const box = document.getElementById("achievementsList");
    if (!box) return;
    box.innerHTML = "";

    const stagesCleared = Math.min(50, playerState.highestLevel - 1);
    ACHIEVEMENTS.forEach(ach => {
      let current = 0;
      if (ach.id === "first_blood") current = playerState.wins;
      if (ach.id === "allies") current = playerState.unlockedHeroes.length;
      if (ach.id === "gatekeeper") current = stagesCleared;
      if (ach.id === "arena_veteran") current = playerState.wins;
      if (ach.id === "chosen_ten") current = playerState.unlockedHeroes.length;
      if (ach.id === "last_eclipse") current = stagesCleared;

      const isDone = current >= ach.target;
      const card = document.createElement("div");
      card.className = `achievement-item ${isDone ? "unlocked" : ""}`;
      card.innerHTML = `
        <div class="ach-icon">${ach.icon}</div>
        <div class="ach-text">
          <strong>${ach.name} ${isDone ? "✓" : ""}</strong>
          <small>${ach.desc} (${Math.min(current, ach.target)} / ${ach.target})</small>
        </div>
      `;
      box.appendChild(card);
    });
  }

  function renderLeaderboard() {
    const table = document.getElementById("leaderboardTable");
    if (!table) return;
    table.innerHTML = `
      <div class="lb-row head">
        <span>RANK</span>
        <span>HERO</span>
        <span>CHAMPION</span>
        <span>RATING</span>
      </div>
    `;

    // Simulated top adventurers + current player
    const ranks = [
      { name: "Solaris_God", hero: "aeron", rp: 2450 },
      { name: "FrostBite", hero: "lyra", rp: 2180 },
      { name: "ShadowDancer", hero: "kael", rp: 1940 },
      { name: "TitanIron", hero: "brutus", rp: 1720 },
      { name: playerState.username, hero: playerState.selectedHero, rp: playerState.arenaRating, isYou: true }
    ];

    ranks.sort((a, b) => b.rp - a.rp);

    ranks.forEach((r, idx) => {
      const row = document.createElement("div");
      row.className = `lb-row ${r.isYou ? "lb-row--you" : ""}`;
      row.innerHTML = `
        <span class="lb-rank">#${idx + 1}</span>
        <strong>${r.name} ${r.isYou ? "(YOU)" : ""}</strong>
        <span style="color: var(--gold-light);">${r.hero.toUpperCase()}</span>
        <b>${r.rp.toLocaleString()} RP</b>
      `;
      table.appendChild(row);
    });
  }

  // ==========================================
  // 15. INITIALIZATION & EVENT LISTENERS
  // ==========================================
  function initGame() {
    const loggedIn = loadState();
    updateAllHud();

    // 1. Loading screen: a calm ~6-second reveal that also preloads real art.
    // At 92% it waits for assets; a timeout ensures missing files never hang it.
    const stages = [
      "Awakening the realm...",
      "Gathering the ten champions...",
      "Preparing the battle arenas...",
      "Restoring your adventure...",
      "Opening the Ashen Gate...",
      "Your destiny awaits!"
    ];
    const preloadPaths = [
      "images/main-menu-citadel.jpg",
      ...HEROES.map(hero => `assets/characters/${hero.id.toUpperCase()}/spritesheet.png`),
      ...HEROES.map(hero => `images/heroes/${hero.id}.jpg`),
      ...ARENA_STAGES.map(arena => arena.image)
    ];
    let assetsReady = false;
    Promise.allSettled(preloadPaths.map(src => new Promise(resolve => {
      const image = new Image();
      image.onload = resolve;
      image.onerror = resolve; // Missing optional art should not freeze loading.
      image.src = src;
    }))).then(() => { assetsReady = true; });

    const fill = document.getElementById("loadingFill");
    const track = document.getElementById("loadingTrack");
    const pText = document.getElementById("loadingPercent");
    const stageText = document.getElementById("loadingStageText");
    const stars = document.querySelectorAll(".lm-star");
    const loadingScreen = document.getElementById("loadingScreen");
    const startedAt = performance.now();
    const steadyPhaseMs = 5300;
    const finalPhaseMs = 850;
    const maxAssetWaitMs = 12000;
    let finishingAt = null;
    let lastProgress = -1;

    function showLoadingFrame(now) {
      const elapsed = now - startedAt;
      let progress = Math.min(92, Math.floor(92 * elapsed / steadyPhaseMs));
      if (elapsed >= steadyPhaseMs && (assetsReady || elapsed >= maxAssetWaitMs)) {
        if (finishingAt === null) finishingAt = now;
        progress = Math.min(100, 92 + Math.floor(8 * (now - finishingAt) / finalPhaseMs));
      }

      if (progress !== lastProgress) {
        lastProgress = progress;
        if (fill) fill.style.width = `${progress}%`;
        if (track) track.setAttribute("aria-valuenow", String(progress));
        if (pText) pText.innerHTML = `${String(progress).padStart(2, "0")}<small>%</small>`;
        if (stageText) stageText.textContent = stages[progress >= 100 ? 5 : Math.min(4, Math.floor(progress / 23))];
        const lit = Math.floor(progress / 10);
        stars.forEach((star, idx) => star.classList.toggle("active", idx < lit));
      }

      if (progress < 100) {
        requestAnimationFrame(showLoadingFrame);
        return;
      }
      if (loadingScreen) {
        loadingScreen.style.opacity = "0";
        setTimeout(() => loadingScreen.classList.add("hidden"), 750);
      }
      window.parent.postMessage({ type: "quest-of-ten:loading-complete" }, window.location.origin);
      audioManager.syncView("menu");
      // No saved account -> ask to create/log in right after loading. Saved account -> straight to menu.
      if (!getSession() || !currentEmail) setTimeout(() => openAuth(true), 400);
    }
    requestAnimationFrame(showLoadingFrame);

    // 2. Main Menu 6 Buttons
    wireBtn("btnPlay", () => switchView("adventure", "Adventure Mode"));
    wireBtn("btnCharacters", () => switchView("characters", "Champions"));
    wireBtn("btnProfile", () => switchView("profile", "Profile"));
    wireBtn("btnAchievements", () => switchView("achievements", "Achievements"));
    wireBtn("btnLeaderboard", () => switchView("leaderboard", "Leaderboard"));
    wireBtn("btnSettings", () => switchView("settings", "Settings"));

    // Quick Actions
    wireBtn("btnQuickArena", () => switchView("arenaLobby", "Bot Arena"));
    wireBtn("btnQuickSummon", () => switchView("summon", "Summon Portal"));
    wireBtn("btnQuickInventory", () => switchView("inventory", "Inventory"));
    wireBtn("btnDownloadZip", () => {
      window.location.href = "quest-of-ten-vscode-menu-fixed.zip";
    });

    // Topbar
    wireBtn("btnReturnMenu", () => switchView("menu"));
    wireBtn("btnDailyTopbar", claimDaily);
    wireBtn("btnSoundToggle", () => {
      const controls = document.getElementById("audioQuickControls");
      controls?.classList.toggle("hidden");
      document.getElementById("btnSoundToggle")?.setAttribute("aria-expanded", String(!controls?.classList.contains("hidden")));
      if (audioManager.settings.muted) audioManager.toggleMute();
      else audioManager.playCurrent();
    });
    wireBtn("btnAudioPlay", audioManager.playCurrent);
    wireBtn("btnAudioPause", audioManager.pauseCurrent);
    wireBtn("btnAudioVolumeDown", () => audioManager.changeMusicVolume(-0.1));
    wireBtn("btnAudioVolumeUp", () => audioManager.changeMusicVolume(0.1));
    wireBtn("btnAudioMute", audioManager.toggleMute);

    // Roster Filters
    document.querySelectorAll(".filter-btn").forEach(b => {
      b.onclick = () => {
        document.querySelectorAll(".filter-btn").forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        rosterFilter = b.dataset.filter;
        refreshCharactersRoster();
      };
    });

    // Animation Toggles in Character Detail
    document.querySelectorAll(".anim-tab").forEach(tab => {
      tab.onclick = () => {
        document.querySelectorAll(".anim-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        if (hdAnimator) {
          hdAnimator.play(tab.dataset.anim);
        }
      };
    });

    // Bot Arena
    wireBtn("btnStartArenaDuel", startArenaBattle);
    wireBtn("btnRerollRival", () => {
      const candidates = HEROES.filter(h => h.id !== playerState.selectedHero && h.id !== arenaRivalId);
      arenaRivalId = candidates[Math.floor(Math.random() * candidates.length)].id;
      playSound("click");
      renderArenaLobby();
    });

    // Battle Actions
    wireBtn("btnActionAttack", () => executePlayerAction("normal"));
    wireBtn("btnMainAttackAction", () => executePlayerAction("normal"));
    wireBtn("btnActionWalk", () => executePlayerAction("walk"));
    wireBtn("btnActionSkill1", () => executePlayerAction("skill1"));
    wireBtn("btnActionSkill2", () => executePlayerAction("skill2"));
    wireBtn("btnActionSkill3", () => executePlayerAction("skill3"));
    wireBtn("btnBattlePotion", useBattlePotion);
    wireBtn("btnBattleAuto", () => {
      isAutoBattle = !isAutoBattle;
      const b = document.getElementById("btnBattleAuto");
      if (b) b.textContent = isAutoBattle ? "⏸ Stop Auto" : "▶ Auto";
      if (isAutoBattle) autoNextMove();
    });
    wireBtn("btnBattleFlee", () => askConfirm("Flee from this battle? It will count as a defeat.", () => {
      endBattle(false);
    }));
    wireBtn("btnResultContinue", () => {
      if (resultAction === "nextBattle") return proceedToNextBattle();
      if (resultAction === "chapterComplete") {
        const next = CHAPTERS.find(ch => ch.number === battleState.chapter + 1);
        return returnToAdventure(next ? next.number : null);
      }
      switchView(battleMode === "story" ? "adventure" : "arenaLobby", battleMode === "story" ? "Adventure Mode" : "Bot Arena");
    });
    wireBtn("btnResultSecondary", () => returnToAdventure());
    wireBtn("btnLogout", () => askConfirm("Log out of this account? Your progress stays saved.", () => {
      saveState();
      try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
      currentEmail = null;
      playerState = { ...DEFAULT_PROGRESS };
      updateAllHud();
      switchView("menu");
      showToast("Logged out. Progress was saved to your account.");
      openAuth(true);
    }));
    wireBtn("btnHeroSelectBack", () => switchView("adventure", "Adventure Mode"));
    wireBtn("btnConfirmHero", () => {
      if (!battleState.playerHero) return;
      battleState.opponentHero = null;
      renderBattleSelection("opponent");
      switchView("opponentSelect", "Select Your Opponent");
    });
    wireBtn("btnOpponentSelectBack", () => {
      renderBattleSelection("hero");
      switchView("heroSelect", "Select Your Hero");
    });
    wireBtn("btnConfirmOpponent", () => {
      if (!battleState.opponentHero) return;
      switchView("matchupPreview", "Matchup Preview");
      renderStoryMatchup();
    });
    wireBtn("btnMatchupBack", () => {
      storyPlayerPreviewAnimator?.stop();
      storyOpponentPreviewAnimator?.stop();
      renderBattleSelection("opponent");
      switchView("opponentSelect", "Select Your Opponent");
    });
    wireBtn("btnStartStoryMatch", startStoryBattle);

    // Keyboard shortcuts share the exact same actions as the existing buttons.
    window.addEventListener("keydown", (e) => {
      if (currentView !== "battle" || !battleActive) return;
      if (e.target instanceof HTMLElement && e.target.closest("input, textarea, select")) return;
      const key = e.key.toLowerCase();
      if (["a", "d", "arrowleft", "arrowright"].includes(key)) {
        e.preventDefault();
        heldKeys.add(key);
        if (!isActionBusy) {
          movementKeys.add(key);
          if (!movementRaf) {
            lastMovementTime = 0;
            movementRaf = requestAnimationFrame(animateHeldMovement);
          }
        }
        return;
      }
      if (isActionBusy || e.repeat) return;
      if (key === " " || key === "enter" || key === "q") {
        e.preventDefault();
        executePlayerAction("normal");
      } else if (key === "w") executePlayerAction("skill1");
      else if (key === "e") executePlayerAction("skill2");
      else if (key === "r") executePlayerAction("skill3");
      else if (key === "p") useBattlePotion();
    });
    window.addEventListener("keyup", (e) => {
      const key = e.key.toLowerCase();
      if (!["a", "d", "arrowleft", "arrowright"].includes(key)) return;
      heldKeys.delete(key);
      movementKeys.delete(key);
      if (!movementKeys.size) stopPlayerMovement();
    });
    window.addEventListener("blur", () => { heldKeys.clear(); stopPlayerMovement(); });

    // Summoning
    wireBtn("btnPerformSummon", performSummon);
    wireBtn("btnRevealClose", () => {
      const modal = document.getElementById("summonRevealModal");
      if (modal) modal.classList.add("hidden");
    });

    // Inventory
    wireBtn("btnBuyPotion", buyPotion);
    wireBtn("btnBuyEnergy", buyEnergy);
    wireBtn("btnClaimDailyReward", claimDaily);

    // Settings
    wireBtn("setSoundBtn", () => {
      audioManager.setEnabled("sfx", !audioManager.settings.sfxEnabled);
      playerState.soundOn = audioManager.settings.sfxEnabled;
      saveState();
    });

    for (const kind of ["music", "voice", "sfx"]) {
      const slider = document.getElementById(`${kind}Volume`);
      if (slider) slider.oninput = () => audioManager.setVolume(kind, Number(slider.value) / 100);
      wireBtn(`${kind}EnabledBtn`, () => audioManager.setEnabled(kind, !audioManager.settings[`${kind}Enabled`]));
    }
    audioManager.syncControls();

    wireBtn("setMotionBtn", () => {
      const b = document.getElementById("setMotionBtn");
      b.classList.toggle("active");
      document.body.classList.toggle("reduce-motion", b.classList.contains("active"));
    });

    wireBtn("btnResetProgress", () => askConfirm("Reset all game data to starting level 1, 3,000 gold?", () => {
      playerState = { ...DEFAULT_PROGRESS, username: playerState.username };
      saveState();
      showToast("Game progress reset to default!");
      switchView("menu");
    }));

    // Auth modal
    wireBtn("btnAccountOpen", () => {
      if (currentEmail) switchView("profile", "Profile");
      else openAuth(true);
    });
    wireBtn("btnAuthClose", () => {
      if (!currentEmail) return; // must log in / create account first
      document.getElementById("authModal")?.classList.add("hidden");
    });

    const tabLogin = document.getElementById("tabAuthLogin");
    const tabRegister = document.getElementById("tabAuthRegister");
    const nameGroup = document.getElementById("authUsernameGroup");
    const errBox = document.getElementById("authErrorMessage");
    let isRegisterMode = false;

    function showAuthError(msg) {
      if (!errBox) return;
      errBox.textContent = msg;
      errBox.style.color = "";
      errBox.classList.toggle("hidden", !msg);
    }
    function setMode(register) {
      isRegisterMode = register;
      tabRegister?.classList.toggle("active", register);
      tabLogin?.classList.toggle("active", !register);
      nameGroup?.classList.toggle("hidden", !register);
      const nameEl = document.getElementById("authUsernameInput");
      if (nameEl) nameEl.required = register;
      setText("authFormTitle", register ? "Create Your Account" : "Your Story Continues");
      setText("authFormDesc", register ? "Create an account to save your champions and battle progress." : "Log in to continue your saved progress.");
      showAuthError("");
    }
    openAuth = (force) => {
      const modal = document.getElementById("authModal");
      if (!modal) return;
      const hasAccounts = Object.keys(getAccounts()).length > 0;
      setMode(!hasAccounts);
      document.getElementById("authForm")?.reset();
      document.getElementById("btnAuthClose")?.classList.toggle("hidden", !currentEmail);
      modal.classList.remove("hidden");
    };
    if (tabLogin && tabRegister) {
      tabLogin.onclick = () => setMode(false);
      tabRegister.onclick = () => setMode(true);
    }

    const authForm = document.getElementById("authForm");
    if (authForm) {
      authForm.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById("authEmailInput").value.trim().toLowerCase();
        const password = document.getElementById("authPasswordInput").value;
        const nameInput = document.getElementById("authUsernameInput").value.trim();
        const accounts = getAccounts();

        if (isRegisterMode) {
          if (accounts[email]) return showAuthError("This email already has an account. Use Log In.");
          if (nameInput.length < 2) return showAuthError("User name needs at least 2 characters.");
          const fresh = { ...DEFAULT_PROGRESS, username: nameInput };
          accounts[email] = { password: hashPw(password), username: nameInput, progress: fresh };
          setAccounts(accounts);
          // Do NOT auto-login: send the player to Log In so they sign in themselves.
          setMode(false);
          document.getElementById("authEmailInput").value = email;
          document.getElementById("authPasswordInput").value = "";
          if (errBox) {
            errBox.textContent = "Account created! Please log in to continue.";
            errBox.style.color = "#6fe39a";
            errBox.classList.remove("hidden");
          }
          showToast("Account created! Now log in.");
          return;
        } else {
          const acc = accounts[email];
          if (!acc) return showAuthError("No account found. Create one first.");
          if (acc.password !== hashPw(password)) return showAuthError("Wrong password.");
        }

        try { localStorage.setItem(SESSION_KEY, email); } catch (err) {}
        loadState();
        updateAllHud();
        document.getElementById("authModal").classList.add("hidden");
        switchView("menu");
        showToast(`Welcome, ${playerState.username}! Progress is saved to your account.`);
      };
    }
  }

  // In-page confirm dialog (browser confirm() can be blocked, which made buttons look dead)
  function askConfirm(message, onYes) {
    const m = document.getElementById("confirmModal");
    if (!m) { if (window.confirm(message)) onYes(); return; }
    document.getElementById("confirmModalText").textContent = message;
    m.classList.remove("hidden");
    document.getElementById("btnConfirmYes").onclick = () => { m.classList.add("hidden"); onYes(); };
    document.getElementById("btnConfirmNo").onclick = () => m.classList.add("hidden");
  }

  function wireBtn(id, handler) {
    const el = document.getElementById(id);
    if (el) el.onclick = handler;
  }

  // Boot on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGame);
  } else {
    initGame();
  }

})();
