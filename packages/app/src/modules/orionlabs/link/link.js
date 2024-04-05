import { LightningElement, api, wire } from 'lwc';
import { NavigationContext, navigate, generateUrl } from 'lwr/navigation';

const PageType = {
    EXTERNAL: 'external_webpage'
};

const Target = {
    BLANK: '_blank',
    SELF: '_self'
};

export default class Link extends LightningElement {
    _url;

    @wire(NavigationContext)
    navContext;

    @api
    navigateTo;

    @api
    openInNewTab;

    @api
    relationship;

    handleClick(event) {
        event.preventDefault();
        if (this.navigateTo.type === PageType.EXTERNAL) {
            const target = this.openInNewTab ? Target.BLANK : Target.SELF;
            window.open(this.navigateTo.attributes.url, target)?.focus();
            return;
        }

        if (this.navContext) {
            navigate(this.navContext, this.navigateTo);
        }
    }

    async computerUrl() {
        if (this.navigateTo.type === PageType.EXTERNAL) {
            this._url = this.navigateTo.attributes.url;
        } else if (this.navContext) {
            this._url = await generateUrl(this.navContext, this.navigateTo);
        }
    }

    connectedCallback() {
        this.computerUrl();
    }
}
