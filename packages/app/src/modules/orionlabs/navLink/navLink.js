import { api, LightningElement, wire } from 'lwc';
import { CurrentPageReference, NavigationContext, generateUrl, navigate } from 'lwr/navigation';

export default class NavLink extends LightningElement {
    url;
    _currentPageRef;

    @wire(CurrentPageReference)
    currentPageRef(pageRef) {
        this._currentPageRef = pageRef;
    }

    @wire(NavigationContext)
    navContext;

    @api label;
    @api pageReference;

    get isActiveLink() {
        return (
            this._currentPageRef?.attributes?.pageName === this.pageReference?.attributes?.pageName
        );
    }

    get computeClass() {
        return `text-lg pb-1 hover:text-white ${
            this.isActiveLink ? 'border-b-2 hover:border-white' : ''
        }`;
    }

    handleClick(event) {
        event.preventDefault();
        if (this.navContext) {
            navigate(this.navContext, this.pageReference);
        }
    }

    connectedCallback() {
        if (this.navContext) {
            this.url = generateUrl(this.navContext, this.pageReference);
        }
    }
}
