const alphabet = {
    A:0,
    B:1,
    C:2,
    D:3,
    E:4,
    F:5,
    G:6,
    H:7,
    I:8,
    J:9,
    K:10,
    L:11,
    M:12,
    N:13,
    O:14,
    P:15,
    Q:16,
    R:17,
    S:18,
    T:19,
    U:20,
    V:21,
    W:22,
    X:23,
    Y:24,
    Z:25
};

const vigenereRadioButton = document.getElementById('vigenere');
const caesarRadioButton = document.getElementById('caesar');
const shiftsOrKeyLabel = document.getElementById('shifts-or-key-label');

const encryptButton  = document.getElementById('encrypt-button');
const shiftsOrKeyInput = document.getElementById('shifts-or-key');
const encryptionAbout = document.getElementById('encryption-about');
const aboutHeader = document.getElementById('about-header');
const howItWorks = document.getElementById('how-vigenere');

caesarRadioButton.addEventListener('change', function() {
    if (caesarRadioButton.checked) {
        console.log("Caesar radio checked");
        shiftsOrKeyLabel.textContent = "Shift[0-25]";
        // Create an anchor element
        const link = document.createElement('a');
        link.href = 'https://en.wikipedia.org/wiki/Caesar_cipher'; // Replace with the URL you want to link to
        link.target = '_blank'; // Open the link in a new tab or window

        // Create and set the text content for the anchor
        const linkText = document.createTextNode('Caesar encryption');
        link.appendChild(linkText);

        // Set the inner HTML of the paragraph
        encryptionAbout.innerHTML = '';
        encryptionAbout.appendChild(link);

        // Continue with the rest of your content
        encryptionAbout.innerHTML += ' is a simple substitution cipher that shifts each letter in the plaintext by a fixed number of positions down the alphabet.<br>It\'s a form of symmetric-key encryption where the same key (shift value) is used for both encryption and decryption.<br>Caesar encryption is not secure and can be easily broken with modern cryptanalysis techniques.'
        aboutHeader.textContent = 'About Caesar Encryption';

        howItWorks.innerHTML = 'Suppose we have the plaintext message: "HELLO" and a fixed shift value of 3.<br>' +
    'We assign numerical values to each letter, where A=0, B=1, C=2, and so on:<br>' +
    'HELLO -> 7 4 11 11 14<br>' +
    'Now, we shift each letter in the plaintext by the fixed shift value of 3:<br>' +
    'H -> 10 (H shifted 3 positions to the right)<br>' +
    'E -> 7 (E shifted 3 positions to the right)<br>' +
    'L -> 0 (L shifted 3 positions to the left, wrapping around the alphabet)<br>' +
    'L -> 0<br>' +
    'O -> 17 (O shifted 3 positions to the right)<br>' +
    'Finally, we convert the shifted numbers back to letters:<br>' +
    'K -> 10 (A=0, B=1, C=2, ...)<br>' +
    'H -> 7<br>' +
    'C -> 2<br>' +
    'C -> 2<br>' +
    'R -> 17<br>' +
    'So, the encrypted message is "KHCCR."<br>' +
    'To decrypt the message, the recipient uses the same fixed shift value of 3 to reverse the process and reveal the original plaintext, "HELLO."';


    }
    
});



vigenereRadioButton.addEventListener('change', function() {
    if (vigenereRadioButton.checked) {
        console.log("Vigenere radio checked");
        shiftsOrKeyLabel.textContent = "Key";
        
        // Create an anchor element
        const link = document.createElement('a');
        link.href = 'https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher'; // Replace with the URL you want to link to
        link.target = '_blank'; // Open the link in a new tab or window

        // Create and set the text content for the anchor
        const linkText = document.createTextNode('Vigenere encryption');
        link.appendChild(linkText);

        // Set the inner HTML of the paragraph
        encryptionAbout.innerHTML = '';
        encryptionAbout.appendChild(link);

        // Continue with the rest of your content
        encryptionAbout.innerHTML += ' is a polyalphabetic substitution cipher where each letter in the plaintext is shifted according to a keyword,<br>creating a more complex and secure encryption than the simple Caesar cipher.<br>It uses a keyword to determine the amount of shift for each character,<br>allowing different parts of the message to be shifted by different amounts, making it harder to decrypt without the keyword.<br>The result is a more secure form of encryption compared to Caesar ciphers.'
        aboutHeader.textContent = 'About Vigenere Encryption';
    }
});


encryptButton.addEventListener('click', function () {
    const inputElement = document.getElementById('text-to-encrypt');
    const inputValue = inputElement.value;
    console.log('Input Value:', inputValue);

    const output = document.getElementById('output');

    if (caesarRadioButton.checked) {
        // Perform Caesar encryption based on shiftsOrKeyInput value
        const caesarShift = parseInt(shiftsOrKeyInput.value);
        const encryptedText = caesarEncrypt(inputValue, caesarShift);
        output.textContent = encryptedText;
    } else if (vigenereRadioButton.checked) {
        // Perform Vigenere encryption based on a Vigenere key
        const vigenereKey = shiftsOrKeyInput.value;
        const encryptedText = vigenereEncrypt(inputValue, vigenereKey);
        output.textContent = encryptedText;
    } else {
        // Handle a case where neither radio button is checked
        output.textContent = "Select an encryption method.";
    }
});

function vigenereEncrypt(text, key) {
    // Remove spaces and convert the key to uppercase for consistency
    key = key.replace(/\s/g, '').toUpperCase();
    let keyIndex = 0; // Initialize the key index to 0

    // Define a function to get the next character from the key cyclically
    function getNextKeyChar() {
        const char = key[keyIndex];
        keyIndex = (keyIndex + 1) % key.length; // Update key index cyclically
        return char;
    }

    let encryptedText = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (/[a-zA-Z]/.test(char)) {
            const isUpperCase = char === char.toUpperCase();
            const charKey = char.toUpperCase();
            const charIndex = alphabet[charKey];
            const keyChar = getNextKeyChar().toUpperCase();
            const keyIndex = alphabet[keyChar];
            const shiftedIndex = (charIndex + keyIndex) % 26;
            const shiftedChar = Object.keys(alphabet)[shiftedIndex];

            if (isUpperCase) {
                encryptedText += shiftedChar;
            } else {
                encryptedText += shiftedChar.toLowerCase();
            }
        } else {
            encryptedText += char;
        }
    }

    return encryptedText;
}
function caesarEncrypt(text, shift) {
    let encryptedText = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (/[a-zA-Z]/.test(char)) {
            const isUpperCase = char === char.toUpperCase();
            const charKey = char.toUpperCase();
            const charIndex = alphabet[charKey];
            const shiftedIndex = (charIndex + shift) % 26;
            const shiftedChar = Object.keys(alphabet)[shiftedIndex];

            if (isUpperCase) {
                encryptedText += shiftedChar;
            } else {
                encryptedText += shiftedChar.toLowerCase();
            }
        } else {
            encryptedText += char;
        }
    }

    return encryptedText;
}