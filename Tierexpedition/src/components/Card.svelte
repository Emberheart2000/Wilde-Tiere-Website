<script>
    export let name;
    export let group;
    export let groupnumber;
    export let imagename;
    export let size;
    export let weight;
    export let age;
    export let speed;
    export let deaths;
    export let litter_size;
    export let trivia;
</script>

<div id="animal" class="animalCard">
    <img id="animal-image" src="/images/{imagename}.png" alt="Tierbild" class="Tierbild">
    <div class="cardHeader">
        <div id="group" class="group">{group}{groupnumber}</div>
        <h4 id="animalName">{name}</h4>
    </div>
    <div class="stats">
        <div id="sizeIconBox" class="iconBox">
            <img id="sizeIcon" src="src/assets/icons/ruler.png" alt="Size Icon" class="Icon sizeIcon">
            <div id="size" class="Kategorie">{size}</div>
        </div>
        <div id="weightIconBox" class="iconBox">
            <img id="weightIcon" src="src/assets/icons/weighing-machine.png" alt="Weight Icon" class="Icon">
            <div id="weight" class="Kategorie">{weight}</div>
        </div>
        <div id="ageIconBox" class="iconBox">
            <img id="ageIcon" src="src/assets/icons/hourglass.png" alt="Age Icon" class="Icon ageIcon">
            <div id="age" class="Kategorie">{age}</div>
        </div>
        <div id="speedIconBox" class="iconBox">
            <img id="speedIcon" src="src/assets/icons/deadline.png" alt="Speed Icon" class="Icon speedIcon">
            <div id="speed" class="Kategorie">{speed}</div>
        </div>
        <div id="deathsIconBox" class="iconBox">
            <img id="deathsIcon" src="src/assets/icons/skull-and-bones.png" alt="Deaths Icon" class="Icon deathIcon">
            <div id="deaths" class="Kategorie">{deaths}</div>
        </div>
        <div id="litterIconBox" class="iconBox">
            <img id="litterIcon" src="src/assets/icons/animal.png" alt="Litter Icon" class="Icon litterIcon">
            <div id="litter" class="Kategorie">{litter_size}</div>
        </div>
    </div>
    <div class="trivia"><p id="trivia" class="triviaContent">{trivia}</p></div>
</div>

<style>
.cardHeader,
.stats,
.trivia,
.Tierbild {
    width: 25vw;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
}

.cardHeader {
    background-color: #96714b;
    display: flex;
    justify-content: flex-start;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.stats {
    background-color: #ddbd97;
    height: 20vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: left;
}

.trivia {
    background-color: #96714b;
    height: 12em;
    display: flex;
    justify-content: center;
    text-align: center;
    border-radius: 0 0 8em 8em;
    box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

h4 {
    display: flex;
    font-size: 4.8rem;
    text-transform: uppercase;
    color: #4e3714;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    align-self: center;
}

div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-inline-start: 0;
    margin-inline-end: 0;
}

p {
    display: flex;
    margin-block-start: 0;
    margin-block-end: 0;
}

.Tierbild {
    height: 80em;
    /* Höhe des Bildes */
    object-fit: cover;
    /* Bild wird zugeschnitten, um den Container zu füllen */
    object-position: 50% 75%;
    /* Bild wird zentriert */
    border-radius: 8em 8em 0 0;
    /* Abgerundete Ecken */
}

.Kategorie {
    box-sizing: border-box;
    font-size: 4.8rem;
    color: #4e3714;
    padding-block-start: 0.5em;
    padding-block-end: 0.5em;
    padding-left: 1.5em;
    padding-right: 0.5em;
    justify-content: flex-start;

}

.group {
    font-size: 6.1em;
    font-weight: 800;
    color: #4e3714;
    background-color: #ff8c00;
    padding-left: 1.5em;
    min-width: 12em;
    height: 100%
}

.triviaContent {
    font-family: 'Helvetica', sans-serif;
    font-size: 3.4em;
    font-weight: 600;
    font-stretch: condensed;
    color: #e8b480;
    padding: 0.5em;
}

.Icon {
    width: 30px;
    height: 30px;
    display: block;
    /* Stellt sicher, dass das Icon als Block-Element behandelt wird */
    object-fit: cover;
    align-self: left;
    /* transform: rotate(90deg); */
}

.sizeIcon {
    transform: rotate(90deg);
}

.speedIcon {
    transform: scale(1.5);
}

.iconBox {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.5px solid #926828;
    flex-basis: 50%;
    box-sizing: border-box;
    height: 33.333333%;
}

.animalCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1em;
    height: 120em;
}
</style>

