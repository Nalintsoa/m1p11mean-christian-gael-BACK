const generateCreditCardNumber = () => {
    const prefix = '4';
    const length = 16;
    let number = prefix;

    for (let i = prefix.length + 1; i <= length; i++) {
        const digit = Math.floor(Math.random() * 10);
        number += digit;
        if (i % 4 === 0 && i !== length) {
            number += ' ';
        }
    }

    return number;
}

module.exports = generateCreditCardNumber;
