import { LightningElement } from 'lwc';
import { octoPath, twitterPath } from './symbols';

export default class Footer extends LightningElement {
    get githubLogo() {
        return octoPath;
    }

    get twitterLogo() {
        return twitterPath;
    }
}
