<script>
</script>

<main>
  <section class="hero">
    <h1><span class="highlight">FIND</span>&nbsp;ALL ANIMALS</h1>
    <p class="subtext">EXPLORE THE ANIMAL KINGDOM</p>
    <p class="description">
      The animals are located in their natural habitats. If you are a real
      explorer, I'm sure you can find them.
    </p>
    <button class="button searchbutton" on:click={() => window.location.href = '#/game'}>Go on search</button>
  </section>
  <section class="image-section">
    <img
      class="frogbranch"
      src="/frogbranch.png"
      alt="poison dart frog sitting on a branch"
    />
  </section>
  <footer></footer>
</main>

<style>
  .hero {
    display: flex;
    grid-column: 2 / span 5;
    flex-direction: column;
    padding: 0;
    text-align: left;
  }
  .hero h1 .highlight {
    font-size: 35rem;
    color: #f4b400;
    /* Gelb für "FIND" */
  }
  .image-section {
    position: absolute;
    /* Sicherstellen, dass z-index funktioniert */
    /* width: 1200px;
    height: 1200px; */
    width: 60vw;
    height: 60vw;
    bottom: 5%;
    right: 5%;
    align-content: end;
    z-index: -1;
  }

  .frogbranch {
    z-index: 0;
    object-fit: cover;
    width: 100%;
    height: auto;
  }

  .subtext {
    margin-top: 5rem;
    font-size: 5rem;
    font-weight: bold;
}

.description {
    margin-top: 5rem;
    max-width: 35%;
    font-size: 5rem;
    min-width: 50%;
}

/* Stile für Handys */
@media (max-width: 600px) {
    .searchbutton {
        max-width: 80%;
        min-width: 70%;
        font-size: 3rem;
    }
    .description {
      min-width: 80%;
    }
  
}

/* Stile für Tablets */
@media (min-width: 601px) and (max-width: 1200px) {
    .searchbutton {
        max-width: 50%;
        min-width: 40%;
        font-size: 4rem;
    }
    .description {
      min-width: 60%;
    }
}

/* Stile für Desktops */
@media (min-width: 1200px) {
    .searchbutton {
        max-width: 30%;
        min-width: 25%;
        font-size: 5rem;
    }
    .description {
      min-width: 40%;
    }
}
</style>


