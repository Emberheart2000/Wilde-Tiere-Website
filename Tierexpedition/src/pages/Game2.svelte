<script>
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
  import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
  import { directionToColor, instancedMesh, log } from "three/tsl";
  import { load } from "three/examples/jsm/libs/opentype.module.js";

  let scene, camera, renderer, controls, particleSystem, raycaster, mouse;
  let floor, model;
  let moveForward = false,
    moveBackward = false,
    moveLeft = false,
    moveRight = false;
  let rotateLeft = false,
    rotateRight = false;
  let distance = 0;

  const GroupArray = [];

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.id = "three-canvas";
    document.body.appendChild(renderer.domElement);

    controls = new PointerLockControls(camera, renderer.domElement);

    // Event-Listener für Pointer Lock
    document.addEventListener("click", () => {
      //controls.lock();
    });

    camera.position.set(0, 5, 5); // Kamera leicht über dem Boden positionieren
    camera.lookAt(0, 0, -10000); // Kamera auf den Ursprung ausrichten

    // Hintergrundfarbe setzen
    renderer.setClearColor(0x87ceeb); // Himmelblau

    // Hintergrundtextur laden
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("desert_sky2.jpg", (texture) => {
      scene.background = texture;
    });

    // Lichtquellen hinzufügen
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Weiches Umgebungslicht
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Richtungslicht
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Raycaster und Maus
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Initiale Textur und Modell laden
    loadFloorTexture("desert.jpg");
    loadModel("/scorpion/scene.gltf", 0.003, 0, 0, 0);

    // Staubpartikel hinzufügen
    addDustParticles();

    // SVG-Illustrationen laden und zur Szene hinzufügen
    //loadSVG(5, 'pyramid.svg', 0.05, 100,4,50);
    // loadSVG(10, "stone.svg", 0.03, 100, 3, 100);
    // loadSVG(10, "acazia.svg", 0.1, 100, 13.5, 100);
    // loadSVG(10, "bush.svg", 0.04, 100, 5.5, 100);
    // loadSVG(10, "cactus.svg", 0.03, 100, 2.6, 100);
    // loadSVG(1, "termites.svg", 0.03, 0, 2.8, 15);
    loadSVGInstances(10, "stone.svg", 0.03);

    const map = new THREE.TextureLoader().load("stone.png")
    const material = new THREE.SpriteMaterial({ map });
    const sprite = new THREE.Sprite(material);
   
    console.log(camera.getWorldPosition(new THREE.Vector3()));
    scene.add(sprite)

    animate();
  }

  function loadFloorTexture(texturePath, texturescale = 3) {
    const floorGeometry = new THREE.PlaneGeometry(200, 100);
    const textureLoader = new THREE.TextureLoader();
    const floorTexture = textureLoader.load(
      texturePath, // Pfad zur Textur
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(texturescale, texturescale); // Skalierung der Textur anpassen
        console.log("Textur erfolgreich geladen");
      },
      undefined,
      (err) => {
        console.error("Fehler beim Laden der Textur:", err);
      }
    );
    const floorMaterial = new THREE.MeshBasicMaterial({
      map: floorTexture,
      side: THREE.DoubleSide,
    });
    if (floor) {
      scene.remove(floor);
    }
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2; // Boden horizontal ausrichten
    floor.position.y = 0; // Boden auf y=0 setzen
    scene.add(floor);
  }

  function loadModel(modelPath, scale = 1, posx = 0, posy = 0, posz = 0) {
    const loader = new GLTFLoader();
    loader.load(
      modelPath, // Pfad zu Ihrem 3D-Modell
      (gltf) => {
        if (model) {
          scene.remove(model);
        }
        model = gltf.scene;
        model.position.set(posx, posy, posz); // Setzen Sie die Position des Modells
        model.scale.set(scale, scale, scale); // Skalierung des Modells
        scene.add(model);
        console.log("Modell erfolgreich geladen");
      },
      undefined,
      (error) => {
        console.error("Fehler beim Laden des Modells:", error);
      }
    );
  }

  function loadSVGInstances(count, texturePath, scale) {
  const map = new THREE.TextureLoader().load(texturePath);
  const material = new THREE.SpriteMaterial({ map });
  const geometry = new THREE.PlaneGeometry(scale, scale);
  const instancedMesh = new THREE.InstancedMesh(geometry, material, count);

  for (let i = 0; i < count; i++) {
    const matrix = new THREE.Matrix4();
    matrix.setPosition(new THREE.Vector3(0, 0, 0)); // Positionen anpassen, um die Instanzen zu verteilen
    instancedMesh.setMatrixAt(i, matrix);
  }

  scene.add(instancedMesh);
}

  function addDustParticles() {
    const particleCount = 100;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = Math.random() * 200 - 100; // x-Position
      positions[i * 3 + 1] = Math.random() * 50; // y-Position
      positions[i * 3 + 2] = Math.random() * 200 - 100; // z-Position
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc2b280,
      size: 0.3,
      transparent: true,
      opacity: 0.5,
    });

    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
  }

  function onMouseClick(event) {
    // Mausposition normalisieren
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycaster aktualisieren
    raycaster.setFromCamera(mouse, camera);

    // Überprüfen, ob der Skorpion getroffen wurde
    const intersects = raycaster.intersectObject(model, true);
    if (intersects.length > 0) {
      console.log("Skorpion angeklickt!");
      // Aktionen ausführen, wenn der Skorpion angeklickt wird
      window.location.hash = "#/";
    }
  }

  // Animationsschleife
  function animate() {
    requestAnimationFrame(animate);

    const step = 0.3;
    if (moveForward) controls.moveForward(step);
    if (moveBackward) controls.moveForward(-step);
    if (moveLeft) controls.moveRight(-step);
    if (moveRight) controls.moveRight(step);

    // Drehung der Kamera
    if (rotateLeft) camera.rotation.y += 0.02;
    if (rotateRight) camera.rotation.y -= 0.02;

    // Partikelbewegung aktualisieren
    const positions = particleSystem.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= 0.1; // y-Position verringern (Staub fällt nach unten)
      positions[i] += Math.random() * 0.5 - 0.1; // x-Position zufällig ändern
      if (positions[i + 1] < 0 || positions[i] > 100) {
        positions[i + 1] = 50; // Partikel zurück nach oben setzen, wenn sie den Boden erreichen
        positions[i] = Math.random() * 200 - 100; // x-Position zufällig setzen
      }
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;

    controls.update(); // Dämpfung anwenden
    renderer.render(scene, camera);
  }

  // Initialisierung beim Laden der Komponente
  onMount(() => {
    init();

    // Kontextmenü deaktivieren
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    // Tastatursteuerung hinzufügen
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "w":
          moveForward = true;
          break;
        case "s":
          moveBackward = true;
          break;
        case "a":
          moveLeft = true;
          break;
        case "d":
          moveRight = true;
          break;
        case "q":
          rotateLeft = true;
          break;
        case "e":
          rotateRight = true;
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "w":
          moveForward = false;
          break;
        case "s":
          moveBackward = false;
          break;
        case "a":
          moveLeft = false;
          break;
        case "d":
          moveRight = false;
          break;
        case "q":
          rotateLeft = false;
          break;
        case "e":
          rotateRight = false;
          break;
      }
    });

    // Mausklick-Event hinzufügen
    document.addEventListener("click", onMouseClick);
  });

  onDestroy(() => {
    // Entfernen Sie den Renderer und alle Event-Listener
    renderer.dispose();
    document.body.removeChild(renderer.domElement);
    window.removeEventListener("resize", onWindowResize);
  });

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function changeHints() {
    const overlay = document.getElementById("overlay");
    overlay.innerHTML =
      '<p class="h3 hint">Hinweis: Das Tier das gesucht wird ist eher klein';
    setTimeout(() => {
      overlay.innerHTML =
        '<p class="h3 hint">Hinweis: Das Tier das gesucht wird hält sich gerne in der Nähe von Termitenhügeln auf, da es seine natürliche Nahrungsquelle ist.</p>';
    }, 10000);
    if (distance.toFixed(2) < 5) {
      overlay.innerHTML =
        '<p class="h3 hint">Hinweis: Das Tier das gesucht wird ist sehr nah!</p>';
    }
  }

  window.addEventListener("resize", onWindowResize);
</script>

<main>
  <span class="functions">
    <button
      class="button"
      on:click={() => loadFloorTexture("rainforest.jpg", 10)}
      >Neue Bodentextur laden</button
    >
    <button class="button" on:click={() => loadModel("poison_frog.glb", 0.05)}
      >Neues Modell laden</button
    >
    <p>Abstand zur Kamera: {distance.toFixed(2)} Einheiten</p>
  </span>

  <div id="overlay">
    <p class="h3 hint">
      Hinweis: Verwenden Sie die WASD-Tasten, um sich zu bewegen. Mit q und e
      können Sie sich drehen
    </p>
    <button class="button" on:click={changeHints}>Hinweise anzeigen</button>
  </div>
</main>

<style>
  #overlay {
    position: absolute;
    top: 100px;
    right: 10px;
    width: 20vw;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 1; /* Setze einen höheren Z-Index, damit das Overlay über dem Canvas liegt */
    pointer-events: auto; /* Erlaube Interaktionen mit dem Overlay */
  }

  .functions {
    pointer-events: none;
    display: none;
  }
</style>
