import {LLM} from "./llm.js/llm.js";

const progress_bar = document.getElementById("progress_bar");
const prompt_input = document.getElementById("prompt");
const ask_button = document.getElementById("ask_button");
const chat_container = document.getElementById("chat_container");
let loaded = false;
let last_response;
let text_prompt = "### Instruction: "+prompt_input.value+"### Response:";

const on_loaded = () => {
    loaded = true;
    prompt_input.disabled = false;
    progress_bar.hidden = true;
    ask_button.disabled = false;
}

const result_write = (text) => {last_response=text};

const completed = () => {chat_container.textContent += "<p class='chatbox_incoming'>AI: "+last_response.split("<|endoftext|>")[0]+"</p>"};

const model = new LLM(
    "GGUF_CPU",
    "./model.gguf",
    on_loaded,
    result_write,
    completed
);

//Disable inputs and show loading bar
progress_bar.hidden = false;
ask_button.disabled = true;
prompt_input.disabled = true;

model.load_worker();

function ask_button_clicked(){
    text_prompt = "### Instruction: "+prompt_input.value+"### Response:";
    chat_container.textContent += "<p class='chatbox_outgoing'>You: "+prompt_input.value+"<p>";
    prompt_input.value = "";
    if(loaded){
        model.run({
            prompt: text_prompt,
            top_k: 1
        });
    }
}
<<<<<<< HEAD

ask_button.addEventListener("click", ask_button_clicked);
=======
>>>>>>> 4f470b0ee930315788fcce8a872c0973e6410ea8
