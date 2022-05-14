import { LightningElement, api, track } from 'lwc';

export default class Modal extends LightningElement {

    @api name;
    //表示フラグ
    @track _isModalOpen;
    //タイトル
    @track _title;
    //コンテンツ
    @track _content;

    @api
    openModal() {
        this._isModalOpen = true;
    }

    /**
     * クローズ
     */
    closeModal(e) {
        e.preventDefault();
        this._isModalOpen = false;
        let changenEvent = new CustomEvent("confirm", {
            detail: false,
            composed: true,
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(changenEvent);
    }

    /**
     * 「はい」ボタン押下
     */
    confirmHandle(e) {
        e.preventDefault();
        this._isModalOpen = false;
        let changenEvent = new CustomEvent("confirm", {
            detail: true,
            composed: true,
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(changenEvent);
    }

    @api
    get title() {
        return this._title;
    }

    set title(val) {
        this._title = val;
    }

    @api
    get content() {
        return this._content;
    }

    set content(val) {
        this._content = val;
    }
}