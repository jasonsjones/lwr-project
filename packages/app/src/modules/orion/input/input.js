import { api, LightningElement } from 'lwc';

export default class Input extends LightningElement {
    _value;
    _type;

    @api get value() {
        return this._value || '';
    }
    set value(val) {
        this._value = val;
        this.syncValue(this._value);
    }

    @api label;
    @api inputId = 'unknown';

    @api
    get type() {
        return this._type || 'text';
    }
    set type(value) {
        this._type = value;
        this.setAttribute('type', this._type);
    }

    @api focus() {
        this.input?.focus();
    }

    get input() {
        return this.template.querySelector('input');
    }

    syncValue(val) {
        if (this.input) {
            this.input.value = val;
        }
    }

    handleChange(event) {
        event.stopPropagation();
        this.dispatchEvent(
            new CustomEvent('change', {
                composed: true,
                bubbles: true,
                detail: {
                    value: this.value
                }
            })
        );
    }

    handleInput(event) {
        const target = event.target;
        if (target) {
            this._value = target.value;
        }
    }
}
