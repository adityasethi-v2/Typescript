interface ValidateFields {
    value: string | number;
    required?: boolean;
    minLength?: number;
    min?: number;
    max?: number;
}
class ProjectInput {
    templateElement: HTMLTemplateElement; // access template
    hostTemplate: HTMLDivElement; // access rendering location
    elements: HTMLElement; // access elements

    titleInputElement: HTMLInputElement; // access title
    descInputElement: HTMLInputElement; // access desc
    peopleInputElement: HTMLInputElement; // access people

    constructor() {
        this.templateElement = document.getElementById(
            "project-input"
        ) as HTMLTemplateElement;
        this.hostTemplate = document.getElementById("app") as HTMLDivElement;
        
        // access html context stream
        const importedNodeStream = document.importNode(
            this.templateElement.content,
            true
        );
  
        this.elements = importedNodeStream.firstElementChild as HTMLElement;

        this.titleInputElement = this.elements.querySelector(
            "#title"
        ) as HTMLInputElement;
        this.descInputElement = this.elements.querySelector(
            "#description"
        ) as HTMLInputElement;
        this.peopleInputElement = this.elements.querySelector(
            "#people"
        ) as HTMLInputElement;

        this.configure();
        this.attach();
    }

    validate(data: ValidateFields) {
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

    gatherInputFields(): [string, string, number] | void {
        const titleInput = this.titleInputElement.value;
        const descInput = this.descInputElement.value;
        const peopleInput = this.peopleInputElement.value;

        const titleValidationInput: ValidateFields = {
            value: titleInput,
            required: true
        }

        const descValidationInput: ValidateFields = {
            value: descInput,
            required: true,
            minLength: 5
        }

        const peopleValidationInput: ValidateFields = {
            value: peopleInput,
            required: true,
            min: 1,
            max: 10
        }

        if(
            !this.validate(titleValidationInput) ||
            !this.validate(descValidationInput) ||
            !this.validate(peopleValidationInput)
        ) {
            alert("Please enter correct detail")
        } else {
            return [titleInput, descInput, peopleInput];
        }
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherInputFields();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
        }
    }

    private configure() {
        this.elements.addEventListener("submit", this.submitHandler.bind(this));
    }
    
    attach() {
        this.hostTemplate.insertAdjacentElement("afterbegin", this.elements);
    }
}

const obj = new ProjectInput();