import { Renderer } from './render/Renderer';
import { Jar } from './render/Jar';
import { Ghost } from './render/Ghost';
import { BlockInstancer } from './render/BlockInstancer';
import { WorldStore } from './world/WorldStore';
import { Particles } from './fx/Particles';
import { AudioEngine } from './audio/AudioEngine';
import { createHaptics } from './audio/haptics';
import { InteractionController } from './interact/InteractionController';
import { SimLoop } from './sim/SimLoop';
import { Hud } from './ui/Hud';

/**
 * TERRARIUM — M1 boot. Wires the World Store, renderer, feel systems and input
 * into a single rAF loop. Sim runs on its own fixed-tick accumulator; visuals
 * spring toward store state so the two never couple (architecture doc §R3).
 */
function boot(): void {
  const container = document.getElementById('app');
  if (!container) throw new Error('#app container missing');

  // --- core systems ---
  const renderer = new Renderer(container);
  const store = new WorldStore();
  const jar = new Jar(renderer.scene);
  const instancer = new BlockInstancer(renderer.scene);
  const ghost = new Ghost(renderer.scene);
  const particles = new Particles(renderer.scene);
  const audio = new AudioEngine();
  const haptics = createHaptics();
  const sim = new SimLoop();

  // Renderer consumes store diffs via the single InstancedMesh.
  store.onDiff((diffs) => instancer.applyDiffs(diffs));

  const interaction = new InteractionController(
    renderer.canvas,
    renderer.scene,
    renderer.rig,
    store,
    instancer,
    ghost,
    jar,
    particles,
    audio,
    haptics,
  );

  // --- quiet HUD ---
  const hud = new Hud(container, {
    onToggleSound: (muted) => audio.setMuted(muted),
    onToggleHaptics: (enabled) => haptics.setEnabled(enabled),
  });
  interaction.onFirstPlace = () => hud.dismissHint();

  // --- resize ---
  const onResize = (): void => renderer.resize(container.clientWidth, container.clientHeight);
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  // --- pause audio work when tab hidden (calm + battery) ---
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) audio.setMuted(true);
  });

  // --- main loop ---
  let last = performance.now();
  const frame = (now: number): void => {
    const dt = Math.min((now - last) / 1000, 1 / 20);
    last = now;
    const elapsed = now / 1000;

    sim.advance(dt);
    interaction.update(dt);
    ghost.update(dt);
    particles.update(dt);
    jar.update(dt, elapsed);
    renderer.rig.update(dt);

    renderer.render();
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

boot();
