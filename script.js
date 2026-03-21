import {LLM} from "./llm.js/llm.js";

let loaded = false;
let text_prompt = "### Instruction: "+document.getElementById("prompt").value+"### Response:";
console.log("App started.");
let last_response;
let progress_bar = document.getElementById("progress_bar");

progress_bar.hidden = false;
document.getElementById("ask_button").disabled = true;
document.getElementById("prompt").disabled = true;

const on_loaded = () => {
    loaded = true;
    document.getElementById("prompt").disabled = false;
    progress_bar.hidden = true;
    ask_button.disabled = false;
}
const result_write = (text) => {last_response=text};
const completed = () => {document.getElementById("chat_container").innerHTML += "<p class='chatbox_incoming'>AI: "+last_response.split("<|endoftext|>")[0]+"</p>"};
const ask_button = document.getElementById("ask_button");

const model = new LLM(
    "GGUF_CPU",
    "./model.gguf",
    on_loaded,
    result_write,
    completed
);

model.load_worker();

ask_button.addEventListener("click", function() {
    text_prompt = "### Instruction: "+document.getElementById("prompt").value+"### Response:";
    document.getElementById("chat_container").innerHTML += "<p class='chatbox_outgoing'>You: "+document.getElementById("prompt").value+"<p>";
    document.getElementById("prompt").value = "";
    if(loaded){

        model.run({
            prompt: text_prompt,
            top_k: 1
        });
    }
})
