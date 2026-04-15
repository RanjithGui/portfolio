import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import './horizon-hero-section.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * HorizonHero — full-page scroll experience.
 * Props:
 *   sections  – array of { title, line1, line2 }   (at least 1 required)
 */
export const HorizonHero = ({ sections = [] }) => {
  const containerRef    = useRef(null);
  const canvasRef       = useRef(null);
  const titleRef        = useRef(null);
  const subtitleRef     = useRef(null);
  const scrollProgressRef = useRef(null);
  const menuRef         = useRef(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });

  const [scrollProgress, setScrollProgress]   = useState(0);
  const [currentSection, setCurrentSection]   = useState(0);
  const [isReady, setIsReady]                 = useState(false);

  const totalSections = sections.length;

  const threeRefs = useRef({
    scene: null, camera: null, renderer: null, composer: null,
    stars: [], nebula: null, mountains: [], animationId: null,
    locations: [],
    targetCameraX: 0, targetCameraY: 30, targetCameraZ: 300,
  });

  // ── Three.js init ───────────────────────────────────────────────────────────
  useEffect(() => {
    const refs = threeRefs.current;

    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

    refs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    refs.camera.position.set(0, 20, 100);

    refs.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.5;

    refs.composer = new EffectComposer(refs.renderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    refs.composer.addPass(new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight), 0.8, 0.4, 0.85
    ));

    createStarField(refs);
    createNebula(refs);
    createMountains(refs);
    createAtmosphere(refs);
    cacheLocations(refs);
    animate(refs);

    setIsReady(true);

    const handleResize = () => {
      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', handleResize);
      refs.stars.forEach(s => { s.geometry.dispose(); s.material.dispose(); });
      refs.mountains.forEach(m => { m.geometry.dispose(); m.material.dispose(); });
      if (refs.nebula) { refs.nebula.geometry.dispose(); refs.nebula.material.dispose(); }
      if (refs.renderer) refs.renderer.dispose();
    };
  }, []);

  // ── GSAP entry animation ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isReady) return;

    gsap.set([menuRef.current, titleRef.current, subtitleRef.current, scrollProgressRef.current],
      { visibility: 'visible' });

    const tl = gsap.timeline();

    if (menuRef.current) {
      tl.from(menuRef.current, { x: -100, opacity: 0, duration: 1, ease: 'power3.out' });
    }
    if (titleRef.current) {
      tl.from(titleRef.current.querySelectorAll('.hhero-char'), {
        y: 200, opacity: 0, duration: 1.5, stagger: 0.05, ease: 'power4.out'
      }, '-=0.5');
    }
    if (subtitleRef.current) {
      tl.from(subtitleRef.current.querySelectorAll('.hhero-sub-line'), {
        y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out'
      }, '-=0.8');
    }
    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, { opacity: 0, y: 50, duration: 1, ease: 'power2.out' }, '-=0.5');
    }

    return () => tl.kill();
  }, [isReady]);

  // ── Scroll handler ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollY    = window.scrollY;
      const maxScroll  = document.documentElement.scrollHeight - window.innerHeight;
      const progress   = Math.min(scrollY / maxScroll, 1);

      setScrollProgress(progress);

      const refs = threeRefs.current;
      const total         = progress * totalSections;
      const secIdx        = Math.floor(total);
      const secProgress   = total % 1;

      setCurrentSection(secIdx);

      const camPositions = [
        { x: 0, y: 30, z: 300 },
        { x: 0, y: 40, z: -50 },
        { x: 0, y: 50, z: -700 },
      ];
      const cur  = camPositions[secIdx]        || camPositions[0];
      const next = camPositions[secIdx + 1]    || cur;

      refs.targetCameraX = cur.x + (next.x - cur.x) * secProgress;
      refs.targetCameraY = cur.y + (next.y - cur.y) * secProgress;
      refs.targetCameraZ = cur.z + (next.z - cur.z) * secProgress;

      refs.mountains.forEach((mountain, i) => {
        if (progress > 0.7) {
          mountain.position.z = 600000;
        } else {
          mountain.position.z = refs.locations[i];
          mountain.position.z += scrollY * (1 + i * 0.9) * 0.5;
        }
      });

      if (refs.nebula) {
        refs.nebula.position.z = refs.mountains[3]?.position.z ?? -1050;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSections]);

  // ── Render ──────────────────────────────────────────────────────────────────
  const first = sections[0] || { title: 'HORIZON', line1: '', line2: '' };

  return (
    <div ref={containerRef} className="horizon-root">
      <canvas ref={canvasRef} className="hhero-canvas" />

      {/* Side tag */}
      <div ref={menuRef} className="hhero-side-menu" style={{ visibility: 'hidden' }}>
        <div className="hhero-menu-icon"><span /><span /><span /></div>
        <div className="hhero-vertical-text">SCROLL</div>
      </div>

      {/* First-section fixed title */}
      <div className="hhero-content">
        <h1 ref={titleRef} className="hhero-title">
          {first.title.split('').map((c, i) => (
            <span key={i} className="hhero-char">{c}</span>
          ))}
        </h1>
        <div ref={subtitleRef} className="hhero-subtitle">
          <p className="hhero-sub-line">{first.line1}</p>
          <p className="hhero-sub-line">{first.line2}</p>
        </div>
      </div>

      {/* Scroll progress bar */}
      <div ref={scrollProgressRef} className="hhero-scroll-progress" style={{ visibility: 'hidden' }}>
        <div className="hhero-scroll-text">SCROLL</div>
        <div className="hhero-progress-track">
          <div className="hhero-progress-fill" style={{ width: `${scrollProgress * 100}%` }} />
        </div>
        <div className="hhero-section-counter">
          {String(currentSection + 1).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
        </div>
      </div>

      {/* Remaining scroll-through sections */}
      <div className="hhero-scroll-sections">
        {sections.slice(1).map((sec, i) => (
          <section key={i} className="hhero-content-section">
            <h1 className="hhero-title">
              {sec.title.split('').map((c, j) => (
                <span key={j} className="hhero-char">{c}</span>
              ))}
            </h1>
            <div className="hhero-subtitle">
              <p className="hhero-sub-line">{sec.line1}</p>
              <p className="hhero-sub-line">{sec.line2}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

// ── Three.js helpers (module-level, no hooks) ─────────────────────────────────

function createStarField(refs) {
  for (let layer = 0; layer < 3; layer++) {
    const count = 5000;
    const geo   = new THREE.BufferGeometry();
    const pos   = new Float32Array(count * 3);
    const col   = new Float32Array(count * 3);
    const sz    = new Float32Array(count);

    for (let j = 0; j < count; j++) {
      const r     = 200 + Math.random() * 800;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(Math.random() * 2 - 1);
      pos[j*3]   = r * Math.sin(phi) * Math.cos(theta);
      pos[j*3+1] = r * Math.sin(phi) * Math.sin(theta);
      pos[j*3+2] = r * Math.cos(phi);

      const c   = new THREE.Color();
      const rnd = Math.random();
      if (rnd < 0.7)        c.setHSL(0, 0, 0.8 + Math.random() * 0.2);
      else if (rnd < 0.9)   c.setHSL(0.08, 0.5, 0.8);
      else                  c.setHSL(0.6, 0.5, 0.8);
      col[j*3] = c.r; col[j*3+1] = c.g; col[j*3+2] = c.b;
      sz[j] = Math.random() * 2 + 0.5;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sz, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, depth: { value: layer } },
      vertexShader: `
        attribute float size; attribute vec3 color; varying vec3 vColor;
        uniform float time; uniform float depth;
        void main() {
          vColor = color;
          vec3 p = position;
          float a = time * 0.05 * (1.0 - depth * 0.3);
          mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
          p.xy = rot * p.xy;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = size * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          gl_FragColor = vec4(vColor, 1.0 - smoothstep(0.0, 0.5, d));
        }`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(geo, mat);
    refs.scene.add(stars);
    refs.stars.push(stars);
  }
}

function createNebula(refs) {
  const geo = new THREE.PlaneGeometry(8000, 4000, 100, 100);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      time:    { value: 0 },
      color1:  { value: new THREE.Color(0x0033ff) },
      color2:  { value: new THREE.Color(0xff0066) },
      opacity: { value: 0.3 },
    },
    vertexShader: `
      varying vec2 vUv; varying float vElevation; uniform float time;
      void main() {
        vUv = uv;
        vec3 p = position;
        float el = sin(p.x*0.01+time)*cos(p.y*0.01+time)*20.0;
        p.z += el; vElevation = el;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: `
      uniform vec3 color1; uniform vec3 color2; uniform float opacity; uniform float time;
      varying vec2 vUv; varying float vElevation;
      void main() {
        float mix_ = sin(vUv.x*10.0+time)*cos(vUv.y*10.0+time);
        vec3 col = mix(color1, color2, mix_*0.5+0.5);
        float alpha = opacity*(1.0-length(vUv-0.5)*2.0);
        alpha *= 1.0+vElevation*0.01;
        gl_FragColor = vec4(col, alpha);
      }`,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.z = -1050;
  refs.scene.add(mesh);
  refs.nebula = mesh;
}

function createMountains(refs) {
  const layers = [
    { distance: -50,  height: 60,  color: 0x1a1a2e, opacity: 1   },
    { distance: -100, height: 80,  color: 0x16213e, opacity: 0.8 },
    { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
    { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 },
  ];

  layers.forEach((layer, idx) => {
    const points = [];
    for (let i = 0; i <= 50; i++) {
      const x = (i / 50 - 0.5) * 1000;
      const y = Math.sin(i * 0.1) * layer.height +
                Math.sin(i * 0.05) * layer.height * 0.5 +
                Math.random() * layer.height * 0.2 - 100;
      points.push(new THREE.Vector2(x, y));
    }
    points.push(new THREE.Vector2(5000, -300));
    points.push(new THREE.Vector2(-5000, -300));

    const geo  = new THREE.ShapeGeometry(new THREE.Shape(points));
    const mat  = new THREE.MeshBasicMaterial({
      color: layer.color, transparent: true, opacity: layer.opacity, side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.z = layer.distance;
    mesh.position.y = layer.distance;
    mesh.userData   = { baseZ: layer.distance, index: idx };
    refs.scene.add(mesh);
    refs.mountains.push(mesh);
  });
}

function createAtmosphere(refs) {
  const mat = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      varying vec3 vNormal; uniform float time;
      void main() {
        float i = pow(0.7 - dot(vNormal, vec3(0,0,1)), 2.0);
        vec3 atm = vec3(0.3,0.6,1.0)*i*(sin(time*2.0)*0.1+0.9);
        gl_FragColor = vec4(atm, i*0.25);
      }`,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
  });
  refs.scene.add(new THREE.Mesh(new THREE.SphereGeometry(600, 32, 32), mat));
}

function cacheLocations(refs) {
  refs.locations = refs.mountains.map(m => m.position.z);
}

function animate(refs) {
  refs.animationId = requestAnimationFrame(() => animate(refs));
  const time = Date.now() * 0.001;

  refs.stars.forEach(s => {
    if (s.material.uniforms) s.material.uniforms.time.value = time;
  });
  if (refs.nebula?.material.uniforms) refs.nebula.material.uniforms.time.value = time * 0.5;

  if (refs.camera) {
    const k = 0.05;
    smoothCameraPos_module.x += (refs.targetCameraX - smoothCameraPos_module.x) * k;
    smoothCameraPos_module.y += (refs.targetCameraY - smoothCameraPos_module.y) * k;
    smoothCameraPos_module.z += (refs.targetCameraZ - smoothCameraPos_module.z) * k;

    refs.camera.position.x = smoothCameraPos_module.x + Math.sin(time * 0.1) * 2;
    refs.camera.position.y = smoothCameraPos_module.y + Math.cos(time * 0.15) * 1;
    refs.camera.position.z = smoothCameraPos_module.z;
    refs.camera.lookAt(0, 10, -600);
  }

  refs.mountains.forEach((m, i) => {
    const f = 1 + i * 0.5;
    m.position.x = Math.sin(time * 0.1) * 2 * f;
    m.position.y = 50 + Math.cos(time * 0.15) * f;
  });

  if (refs.composer) refs.composer.render();
}

// Module-level camera smoothing state (shared across the single canvas)
const smoothCameraPos_module = { x: 0, y: 30, z: 100 };
