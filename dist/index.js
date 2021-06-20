"use strict";
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostTemplate = document.getElementById("app");
        // access html context stream
        const importedNodeStream = document.importNode(this.templateElement.content, true);
        this.elements = importedNodeStream.firstElementChild;
        this.titleInputElement = this.elements.querySelector("#title");
        this.descInputElement = this.elements.querySelector("#description");
        this.peopleInputElement = this.elements.querySelector("#people");
        this.configure();
        this.attach();
    }
    validate(data) {
        let isValid = true;
        if (data.required) {
            isValid = isValid && data.value.toString().trim().length !== 0;
        }
        if (data.minLength != null && typeof data.value === 'string') {
            isValid = isValid && data.value.length >= data.minLength;
        }
        if (data.min && typeof data.value === 'number') {
            isValid = isValid && data.value >= data.min;
        }
        if (data.max && typeof data.value === "number") {
            isValid = isValid && data.value <= data.max;
        }
        return isValid;
    }
    gatherInputFields() {
        const titleInput = this.titleInputElement.value;
        const descInput = this.descInputElement.value;
        const peopleInput = this.peopleInputElement.value;
        const titleValidationInput = {
            value: titleInput,
            required: true
        };
        const descValidationInput = {
            value: descInput,
            required: true,
            minLength: 5
        };
        const peopleValidationInput = {
            value: peopleInput,
            required: true,
            min: 1,
            max: 10
        };
        if (!this.validate(titleValidationInput) ||
            !this.validate(descValidationInput) ||
            !this.validate(peopleValidationInput)) {
            alert("Please enter correct detail");
        }
        else {
            return [titleInput, descInput, peopleInput];
        }
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherInputFields();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
        }
    }
    configure() {
        this.elements.addEventListener("submit", this.submitHandler.bind(this));
    }
    attach() {
        this.hostTemplate.insertAdjacentElement("afterbegin", this.elements);
    }
}
const obj = new ProjectInput();
