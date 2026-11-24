"use client";

import { useEffect, useRef, useState } from "react";
import type { Material, Mesh, Object3D } from "three";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/**
 * A throwaway lab: a real GLB head on a WebGL canvas, turned by the pointer.
 *
 * It exists to answer one question — does a 3D object actually feel smooth at
 * the display's refresh rate, with none of the video scrub's seeks, cuts or
 * two-faces-on-screen? The model is a placeholder; the behaviour is not.
 */
export function HeadLab() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spinRef = useRef<(() => void) | null>(null);
  const resetRef = useRef<(() => void) | null>(null);

  const [fps, setFps] = useState(0);
  const [yaw, setYaw] = useState(0);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    let disposed = false;
    let raf = 0;
    let teardown: (() => void) | null = null;

    (async () => {
      try {
        const THREE = await import("three");
        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
        if (disposed) return;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.02;
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
        camera.position.set(0, 0, 15);

        scene.add(new THREE.HemisphereLight(0xdce8ff, 0x0b0c0a, 0.7));

        const key = new THREE.DirectionalLight(0xfff1e0, 2.6);
        key.position.set(5, 7, 9);
        scene.add(key);

        const rim = new THREE.DirectionalLight(0x4ec27f, 3.4);
        rim.position.set(-6, 2, -7);
        scene.add(rim);

        const fill = new THREE.DirectionalLight(0x7ed6a4, 0.9);
        fill.position.set(6, -3, 5);
        scene.add(fill);

        const pivot = new THREE.Group();
        scene.add(pivot);

        const loader = new GLTFLoader();
        const modelUrl = new URLSearchParams(window.location.search).get("m") || "/models/amr-tex.glb";
        const [gltf, colorTex, normalTex] = await Promise.all([
          loader.loadAsync(modelUrl),
          new THREE.TextureLoader().loadAsync("/models/head-color.jpg"),
          new THREE.TextureLoader().loadAsync("/models/head-normal.jpg"),
        ]);
        if (disposed) return;

        colorTex.colorSpace = THREE.SRGBColorSpace;
        colorTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

        // Any model without its own texture gets the placeholder maps; the
        // scanned test mesh is shown as clay so its shape is easy to judge.
        const isPlaceholder = modelUrl.includes("head.glb");
        gltf.scene.traverse((o: Object3D) => {
          const m = o as Mesh;
          if (!m.isMesh) return;
          const original = Array.isArray(m.material) ? m.material[0] : m.material;
          const ownMap = original && "map" in original && (original as { map?: unknown }).map;
          const hasColour = Boolean(m.geometry?.getAttribute("color"));
          if (ownMap) return;
          if (hasColour) {
            // TripoSR bakes colour into the vertices; keep it, but calm the PBR.
            m.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.72, metalness: 0.02 });
            return;
          }
          m.material = isPlaceholder
            ? new THREE.MeshStandardMaterial({
                map: colorTex,
                normalMap: normalTex,
                normalScale: new THREE.Vector2(0.7, 0.7),
                roughness: 0.62,
                metalness: 0.02,
              })
            : new THREE.MeshStandardMaterial({ color: 0xd9c7b4, roughness: 0.58, metalness: 0.02 });
        });

        // Normalise every model to the same height, so the framing holds no
        // matter what scale the source mesh arrives at.
        const rawBox = new THREE.Box3().setFromObject(gltf.scene);
        const rawSize = rawBox.getSize(new THREE.Vector3());
        gltf.scene.scale.setScalar(9.2 / Math.max(rawSize.y, 1e-6));

        // Centre the head on the origin so it turns about its own axis, and drop
        // the bust a little so the skull keeps some headroom.
        const box = new THREE.Box3().setFromObject(gltf.scene);
        gltf.scene.position.sub(box.getCenter(new THREE.Vector3()));
        gltf.scene.position.y -= 1.0;
        pivot.add(gltf.scene);

        // ---- pointer → yaw / pitch -------------------------------------
        // The pointer's x maps across the arc the hero actually uses: dead
        // front at the centre, a strong three-quarter turn (~75°) at each
        // edge — far enough to read the profile, never the back of the head.
        const LIMIT_YAW = 1.3; // ~75° each way
        const LIMIT_PITCH = 0.34; // ~20°
        let targetYaw = 0;
        let targetPitch = 0;
        let currentYaw = 0;
        let currentPitch = 0;
        let idle = true;

        const onMove = (e: PointerEvent) => {
          const r = host.getBoundingClientRect();
          const nx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2), -1, 1);
          const ny = clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2), -1, 1);
          targetYaw = nx * LIMIT_YAW;
          // Pointer above the middle looks up, which is a negative X tilt.
          targetPitch = ny * LIMIT_PITCH;
          idle = false;
        };
        window.addEventListener("pointermove", onMove, { passive: true });

        // ---- a demo swing: front → side → front → side → front ---------
        let swinging = false;
        let swingT = 0;
        spinRef.current = () => {
          swinging = true;
          swingT = 0;
          idle = false;
        };
        resetRef.current = () => {
          targetYaw = 0;
          targetPitch = 0;
          idle = false;
        };

        // ---- sizing ----------------------------------------------------
        const resize = () => {
          const w = host.clientWidth || 1;
          const h = host.clientHeight || 1;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(host);

        // ---- frame loop -------------------------------------------------
        let last = performance.now();
        let frames = 0;
        let since = last;

        const tick = (now: number) => {
          raf = requestAnimationFrame(tick);
          const dt = Math.min(0.05, (now - last) / 1000);
          last = now;

          const k = 1 - Math.exp(-dt / 0.09);
          currentYaw += (targetYaw - currentYaw) * k;
          currentPitch += (targetPitch - currentPitch) * k;

          // A slow drift until the pointer takes over, so the first thing you
          // see is continuous motion.
          if (idle) {
            currentYaw += dt * 0.38;
            targetYaw = currentYaw;
          }

          let extra = 0;
          if (swinging) {
            swingT = Math.min(1, swingT + dt / 3.6);
            // One full sine period: front → one side → front → other side → front.
            extra = Math.sin(swingT * Math.PI * 2) * LIMIT_YAW;
            if (swingT >= 1) {
              swinging = false;
              extra = 0;
            }
          }

          pivot.rotation.y = currentYaw + extra;
          pivot.rotation.x = currentPitch;

          renderer.render(scene, camera);

          frames++;
          if (now - since > 400) {
            setFps(Math.round((frames * 1000) / (now - since)));
            setYaw(Math.round((((pivot.rotation.y * 180) / Math.PI) % 360 + 360) % 360));
            frames = 0;
            since = now;
          }
        };
        raf = requestAnimationFrame(tick);
        setState("ready");

        teardown = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          window.removeEventListener("pointermove", onMove);
          renderer.dispose();
          colorTex.dispose();
          normalTex.dispose();
          gltf.scene.traverse((o: Object3D) => {
            const m = o as Mesh;
            if (!m.isMesh) return;
            m.geometry.dispose();
            (m.material as Material).dispose();
          });
        };
      } catch {
        if (!disposed) setState("error");
      }
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <div className="relative overflow-hidden rounded-[26px] border border-line bg-black">
        <div
          ref={hostRef}
          className="relative aspect-[4/5] w-full"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 34%, rgba(78,194,127,0.16), transparent 70%), #050605",
            cursor: "crosshair",
          }}
        >
          <canvas ref={canvasRef} className="size-full" />
          {/* Fade the bust into the card so the crop at the bottom is not a hard line. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
            style={{ background: "linear-gradient(to top, #050605 8%, transparent 100%)" }}
          />
          {state === "loading" && (
            <div className="pointer-events-none absolute inset-0 grid place-items-center font-mono text-xs text-muted">
              loading model…
            </div>
          )}
          {state === "error" && (
            <div className="pointer-events-none absolute inset-0 grid place-items-center font-mono text-xs text-muted">
              could not load the model
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line bg-black/70 px-4 py-2.5 font-mono text-xs text-muted">
            <span className="tabular-nums">yaw · {yaw}°</span>
            <span className="flex items-center gap-1.5 tabular-nums">
              <span className="size-1.5 rounded-full bg-accent" />
              {fps} fps
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => spinRef.current?.()}
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-[#14140f] transition-opacity hover:opacity-90"
        >
          Swing front ↔ side
        </button>
        <button
          type="button"
          onClick={() => resetRef.current?.()}
          className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-line-strong"
        >
          Face front
        </button>
      </div>
    </div>
  );
}