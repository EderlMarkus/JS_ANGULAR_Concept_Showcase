import { ElementRef } from "@angular/core";
import { canAlert } from "../mixins/alert";

class NotifierMixinBase {
    constructor() { }
}

const _NotifierMixinBase = canAlert(NotifierMixinBase)

export class Notifier extends _NotifierMixinBase {
    constructor() {
        super();
    }
}