import { Canvas } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { Leva, useControls } from "leva";
import "./App.css";
import { Cursor } from "./components/Cursor";
import { Experience } from "./components/Experience";
import { Interface } from "./components/Interface";

function App() {
  document.addEventListener("DOMContentLoaded", function () {
    const snowContainer = document.querySelector(".snow-container");

    const particlesPerThousandPixels = 0.1;
    const fallSpeed = 1.25;
    const pauseWhenNotActive = true;
    const maxSnowflakes = 200;
    const snowflakes = [];

    let snowflakeInterval;
    let isTabActive = true;

    function resetSnowflake(snowflake) {
        const size = Math.random() * 5 + 1;
        const viewportWidth = window.innerWidth - size; // Adjust for snowflake size
        const viewportHeight = window.innerHeight;

        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * viewportWidth}px`; // Constrain within viewport width
        snowflake.style.top = `-${size}px`;

        const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
        snowflake.style.animationDuration = `${animationDuration}s`;
        snowflake.style.animationTimingFunction = "linear";
        snowflake.style.animationName =
            Math.random() < 0.5 ? "fall" : "diagonal-fall";

        setTimeout(() => {
            if (parseInt(snowflake.style.top, 10) < viewportHeight) {
                resetSnowflake(snowflake);
            } else {
                snowflake.remove(); // Remove when it goes off the bottom edge
            }
        }, animationDuration * 1000);
    }

    function createSnowflake() {
        if (snowflakes.length < maxSnowflakes) {
            const snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            snowflakes.push(snowflake);
            snowContainer.appendChild(snowflake);
            resetSnowflake(snowflake);
        }
    }

    function generateSnowflakes() {
        const numberOfParticles =
            Math.ceil((window.innerWidth * window.innerHeight) / 1000) *
            particlesPerThousandPixels;
        const interval = 5000 / numberOfParticles;

        clearInterval(snowflakeInterval);
        snowflakeInterval = setInterval(() => {
            if (isTabActive && snowflakes.length < maxSnowflakes) {
                requestAnimationFrame(createSnowflake);
            }
        }, interval);
    }

    function handleVisibilityChange() {
        if (!pauseWhenNotActive) return;

        isTabActive = !document.hidden;
        if (isTabActive) {
            generateSnowflakes();
        } else {
            clearInterval(snowflakeInterval);
        }
    }

    // generateSnowflakes();

    // window.addEventListener("resize", () => {
    //     clearInterval(snowflakeInterval);
    //     setTimeout(generateSnowflakes, 1000);
    // });

    // document.addEventListener("visibilitychange", handleVisibilityChange);
  });

  const { focusDistance, focalLength, bokehScale } = useControls(
    {
      focusDistance: {
        min: 0,
        max: 0.2,
        value: 0.02,
      },
      focalLength: {
        min: 0,
        max: 1,
        value: 0.06,
      },
      bokehScale: {
        min: 0,
        max: 10,
        value: 2,
      },
    },
    {}
  );
  return (
    <>
      <div class="snow-container">
      <Cursor />
      <Canvas
        shadows
        camera={{ position: [0, 2, 20], fov: 42 }}
        gl={{ alpha: false }}
      >
        <fog attach="fog" args={["#679652", 30, 50]} />
        <color attach="background" args={["#222222"]} />
        <Experience />
        <EffectComposer multisampling={4}>
          <Bloom mipmapBlur luminanceThreshold={1} />
          <DepthOfField
            focusDistance={focusDistance}
            focalLength={focalLength}
            bokehScale={bokehScale}
            height={480}
          />
          <Vignette opacity={0.3} />
        </EffectComposer>
      </Canvas>
      </div>

      <Leva collapsed hidden />
    </>
  );
}

export default App;
