import { LightningElement } from 'lwc';

const PREFECTURES = [
  "北海道",
  "青森",
  "岩手",
  "宮城",
  "秋田",
  "山形",
  "福島",
  "茨城",
  "栃木",
  "群馬",
  "埼玉",
  "千葉",
  "東京",
  "神奈川",
  "新潟",
  "富山",
  "石川",
  "福井",
  "山梨",
  "長野",
  "岐阜",
  "静岡",
  "愛知",
  "三重",
  "滋賀",
  "京都",
  "大阪",
  "兵庫",
  "奈良",
  "和歌山",
  "鳥取",
  "島根",
  "岡山",
  "広島",
  "山口",
  "徳島",
  "香川",
  "愛媛",
  "高知",
  "福岡",
  "佐賀",
  "長崎",
  "熊本",
  "大分",
  "宮崎",
  "鹿児島",
  "沖縄"
];

export default class AddressForm extends LightningElement {
  postalCode;
  address;

  async handlePostalCodeChange(event) {
    this.postalCode = event.target.value;
    if(!this.postalCode || !event.target.checkValidity()) {
      return;
    }
    const response = await fetch(`https://yubinbango.github.io/yubinbango-data/data/${this.postalCode.substring(0,3)}.js`);
    const addressFunctionText = await response.text();
    const addressMap = JSON.parse(addressFunctionText.replace('$yubin(','').replace(');',''));
    const addressData = addressMap[this.postalCode];
    if(addressData) {
      const prefecture = PREFECTURES[addressData[0] - 1];
      this.address = prefecture + addressData.slice(1).join('');
    }
  }
}