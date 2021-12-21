'use strict';

/**
 * @class Contains a list of ready to use static masking functions
 */
class ApplyMask {
	/**
	 * @description Applies the CPF mask to a string. 000.000.000-00
	 * @param {String} unformatedValue An unformated string containing the full or partial CPF
	 * @returns The formatted CPF
	 */
	static toCPF = (unformatedValue) => {
		const extractedNumbers = this.numbersOnly(unformatedValue);
		return extractedNumbers
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d{1,2})/, "$1-$2")
			.replace(/(-\d{2})\d+?$/, "$1");
	};

	/**
	 * @description Applies the CNPJ mask to a string. 00.000.000/0000-00
	 * @param {String} unformatedValue An unformated string containing the full or partial CNPJ
	 * @returns The formatted CNPJ
	 */
	static toCNPJ = (unformatedValue) => {
		const extractedNumbers = this.numbersOnly(unformatedValue);
		return extractedNumbers
			.replace(/(\d{2})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d)/, "$1/$2")
			.replace(/(\d{4})(\d{1,2})/, "$1-$2")
			.replace(/(-\d{1})\d+?$/, "$1");
	};

	/**
	 * @description Applies the Phone mask to a string. (00)00000-0000
	 * @param {String} unformatedValue An unformated string containing the full or partial CPF
	 * @returns The formatted CPF
	 */
	static toPhone = (unformatedValue) => {
		const extractedNumbers = this.numbersOnly(unformatedValue);
		return extractedNumbers
			.replace(/(\d{2})(\d)/, "($1) $2")
			.replace(/(\d{5})(\d{4})(\d)/, "$1-$2")
			.replace(/(-\d{4})\d+?$/, "$1");
	};

	/**
	 * @description Applies the Phone mask to a string. 00000-000
	 * @param {String} unformatedValue An unformated string containing the full or partial CPF
	 * @returns The formatted CPF
	 */
	static toCEP = (unformatedValue) => {
		const extractedNumbers = this.numbersOnly(unformatedValue);
		return extractedNumbers.replace(/(\d{5})(\d{3})/, "$1-$2")
			.replace(/(-\d{3})\d+?$/, "$1");
	};

	/**
	 * @description Applies the Phone mask to a string. DD/MM/YYYY
	 * @param {String} unformatedValue An unformated string containing the full or partial Date
	 * @returns The formatted Date
	 */
	static toDate = (unformatedValue) => {
		const extractedNumbers = this.numbersOnly(unformatedValue);
		return extractedNumbers
			.replace(/(\d{2})(\d)/, "$1/$2")
			.replace(/(\d{2})(\d)/, "$1/$2")
			.replace(/(\d{4})(\d)/, "$1")
			.replace(/(-\d{4})\d+?$/, "$1");;
	};

	/**
	 * @description Filters out all numbers
	 * @param {String} unformatedValue An unformated string
	 * @returns Only the letters and special characters contained in the unformatted string
	 */
	static charactersOnly = (unformatedValue) => {
		return unformatedValue.replace(/[0-9]+/g, "");
	}

	/**
	 * @description Filters out all but the letters
	 * @param {String} unformatedValue An unformated string
	 * @returns Only the letters contained in the unformatted string
	 */
	static nonSpecialCharactersOnly = (unformatedValue) => {
		return unformatedValue.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "");
	};

	/**
	 * @description Filters out all but the numbers
	 * @param {String} unformatedValue An unformated string
	 * @returns Only the numbers contained in the unformatted string
	 */
	static numbersOnly = (unformatedValue) => {
		return unformatedValue.replace(/\D/g, "");
	};
}

/**
 * @class Adds the events for the masks
 */
class CustomMask {
	constructor() {
		const elementsToMask = Array.from(document.querySelectorAll("[data-custom-mask]"));

		elementsToMask.forEach((element) => {
			const customMaskType = element.getAttribute("data-custom-mask");
			this.#maskingActions[customMaskType](element);
		});
	}

	/**
	 * @description Object mapping all data-custom-mask values to their formatting functions
	 */
	#maskingActions = {
		"cpf": (element) => this.applyMaskingEvents(element, ApplyMask.toCPF),
		"cnpj": (element) => this.applyMaskingEvents(element, ApplyMask.toCNPJ),
		"phone": (element) => this.applyMaskingEvents(element, ApplyMask.toPhone),
		"cep": (element) => this.applyMaskingEvents(element, ApplyMask.toCEP),
		"date": (element) => this.applyMaskingEvents(element, ApplyMask.toDate),
		"numbers": (element) => this.applyMaskingEvents(element, ApplyMask.numbersOnly),
		"characters": (element) => this.applyMaskingEvents(element, ApplyMask.charactersOnly),
		"non-special-characters": (element) => this.applyMaskingEvents(element, ApplyMask.charactersOnly),
	};

	/**
	 * @description Applies all the appropriate event to keep the defined mask
	 * @param {HTMLElement} element The Elememnt/Tag to be masked
	 * @param {Function} maskFunction The masking function
	 */
	applyMaskingEvents(element, maskFunction) {
		const elementStringContainer = element.value != undefined ? "value" : "textcontent";
		setElementWithMask(elementStringContainer);
		element.addEventListener("change", setElementWithMask);
		element.addEventListener("keydown", setElementWithMask);
		element.addEventListener("keyup", setElementWithMask);

		function setElementWithMask() {
			const elementValue = element[elementStringContainer]
			element[elementStringContainer] = maskFunction(elementValue);
		}
	}
}

window.addEventListener('load', (e) => new CustomMask());