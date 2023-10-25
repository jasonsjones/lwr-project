import { LightningElement } from 'lwc';
import { octoPath, twitterPath } from './symbols';

function generateExternalPageRef(url) {
    return {
        type: 'external_webpage',
        attributes: {
            url
        }
    };
}

export default class Footer extends LightningElement {
    get githubLogo() {
        return octoPath;
    }

    get twitterLogo() {
        return twitterPath;
    }

    get githubPageRef() {
        return generateExternalPageRef('https://github.com/jasonsjones');
    }

    get twitterPageRef() {
        return generateExternalPageRef('https://twitter.com/_jasonsjones');
    }
}
