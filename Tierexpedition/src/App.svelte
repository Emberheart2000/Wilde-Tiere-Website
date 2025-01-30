<script>
  import Router from "svelte-spa-router";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Game from "./pages/Game.svelte";
  import Cards from "./pages/Cards.svelte";
  import Tierquartett from "./pages/Tierquartett.svelte";
  import { fetchAnimalExcerpt } from "./js/functions";

  const routes = {
    "/": Home,
    "/about": About,
    "/game": Game,
    "/quartett": Tierquartett,
    "/cards": Cards,
  };

  // let animalExcerpt = "";
</script>

<nav>
  <header>
    <section class="logocontainer">
      <img class="logo" src="./public/wwf_logo.png" alt="WWF Logo" />
    </section>
    <ul>
      <li><a href="#/">Home</a></li>
      <li><a href="#/about">About Us</a></li>
      <li><a href="#/quartett">Quartett</a></li>
      <li><a href="#/cards">Cards</a></li>
      <li><button class="button" on:click={() => window.location.href = '#/game'}>Explore</button></li>
            <li>
        <button class="button" on:click={async () => {
          const data = await fetchAnimalExcerpt("Cheetah")
          console.log(data);
          alert(data.extract);
          // animalExcerpt = data.extract;
          }}
          >Cheetah</button>
      </li>
    </ul>
  </header>
</nav>

<Router {routes} />

<style>
  header {
    display: grid;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    grid-template-columns: repeat(12, 1fr);
    gap: 10px;
    padding: 20px 0;
  }
  ul {
    grid-column: 6 / span 4;
  }
  .logocontainer {
    grid-column: 2 / span 1;
    height: 15rem;
    /* 60px */
    width: 15rem;
    /* 60px */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  nav {
    grid-column: 7 / span 4;
  }

  nav ul {
    display: flex;
    list-style: none;
    justify-content: space-between;
    align-items: center;
  }

  nav ul li a {
    text-decoration: none;
    color: #333;
  }

  .logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
