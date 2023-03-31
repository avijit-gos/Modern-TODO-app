/** @format */
import CryptoJS from "crypto-js";

function decryptText(value) {
  console.log(value);
  var bytes = CryptoJS.AES.decrypt(value, "_0FabogEAHpmg6NFRCT00niu2EI");
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  console.log(originalText);
}

export default decryptText;
