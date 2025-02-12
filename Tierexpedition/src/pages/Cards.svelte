<script>
import { fetchAnimalExcerpt } from "../js/functions";
import Card from '../components/Card.svelte';
import animalData from "../assets/data/animaldata.js";
  import { div } from "three/tsl";

let apianswer = "";
let filteredAnimals = [];
filteredAnimals = animalData.filter(animal => animal.name.toLowerCase() === 'scorpion');

function init() {
    const apicontent = document.querySelector('.apicontent');
    apicontent.innerHTML = apianswer;
    fetchAnimalExcerpt("Scorpion").then(data => {
        apianswer = data.extract;
        apicontent.innerHTML = apianswer;
    });
}

</script>

<main>
    <!-- <button class="button" on:click={async () => {
        const data = await fetchAnimalExcerpt("Scorpion");
        apianswer = data.extract; // Aktualisiere die globale Variable
    }}>Scorpion</button> -->
    <!-- svelte-ignore component_name_lowercase -->
    <div class="animalcard"> 
    {#each filteredAnimals as animal}
        <Card class={animal.groupname.replace(/\s+/g, '')} name={animal.name} groupnumber={animal.group_number} group={animal.group} imagename={animal.name.toLowerCase()} size={animal.max_length} weight={animal.max_weight} age={animal.max_age} deaths={animal.deaths} speed={animal.top_speed} litter_size={animal.litter_size} trivia={animal.trivia}/>
    {/each}</div>
        <!-- svelte-ignore component_name_lowercase -->
        <div class="information">
            <h2>You discovered a</h2>
            <h2>Scorpion</h2>
            <div class="contentframe">
                <div class="contentselectors">Description</div>
                <div class="apicontent">{apianswer}</div>
            </div>
        
        </div>
</main>

<style>
main{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 20rem;
}
.animalcard {
    height: 70vh;
    width: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
}
.information {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}
.contentframe {
    width: 100%;
    height: 100rem;
    background-color: #4c4c4c;
}
h2, .apicontent {
    font-size: 10rem;
    font-weight: 400;
    color: #000000;
    margin: 0;
}
</style>