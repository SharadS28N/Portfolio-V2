import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false,
          zIndex: -1
        },
        background: {
          color: {
            value: 'transparent'
          }
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: '#FFD700'
          },
          links: {
            enable: false
          },
          move: {
            enable: true,
            direction: 'none',
            outModes: {
              default: 'bounce'
            },
            random: true,
            speed: 1,
            straight: false
          },
          number: {
            density: {
              enable: true,
              area: 800
            },
            value: 25
          },
          opacity: {
            value: 0.8
          },
          shape: {
            type: 'circle'
          },
          size: {
            value: { min: 1, max: 3 }
          },
          shadow: {
            blur: 5,
            color: {
              value: '#FFD700'
            },
            enable: true
          },
          glow: {
            enable: true,
            frequency: 1,
            intensity: 3
          }
        },
        detectRetina: true
      }}
      className="absolute inset-0 -z-10"
    />
  );
}