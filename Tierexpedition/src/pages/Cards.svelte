<script>
import { fetchAnimalExcerpt } from "../js/functions";
let apianswer = "";

function init() {
    const apicontent = document.querySelector('.Apicall');
    apicontent.innerHTML = apianswer;
}
</script>

<main>
    <button class="button" on:click={async () => {
        const data = await fetchAnimalExcerpt("Cheetah")
        let apianswer = data.extract;
        alert(data.extract);
        // animalExcerpt = data.extract;
        }}
        >Scorpion</button>

    <div class="Apicall"></div>
</main>