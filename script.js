const zodiacSigns = [
    'Aries (Mesha)', 'Taurus (Vrishabha)', 'Gemini (Mithuna)', 
    'Cancer (Karka)', 'Leo (Simha)', 'Virgo (Kanya)',
    'Libra (Tula)', 'Scorpio (Vrishchika)', 'Sagittarius (Dhanu)',
    'Capricorn (Makara)', 'Aquarius (Kumbha)', 'Pisces (Meena)'
];

const nakshatras = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
    "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
    "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
    "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

function getNakshatra(absDegree) {
    const segment = 13 + (20 / 60); // 13°20' = 13.333...
    const index = Math.floor(absDegree / segment);
    return nakshatras[index];
}

function calculateBhriguBindu(rahuSign, rahuDegree, moonSign, moonDegree) {
    const rahuAbsolute = (parseInt(rahuSign) * 30) + parseFloat(rahuDegree);
    const moonAbsolute = (parseInt(moonSign) * 30) + parseFloat(moonDegree);
    
    let midpoint = (rahuAbsolute + moonAbsolute) / 2;
    const difference = Math.abs(rahuAbsolute - moonAbsolute);
    if (difference > 180) {
        midpoint = (rahuAbsolute + moonAbsolute + 360) / 2;
        if (midpoint >= 360) midpoint -= 360;
    }

    const bhriguSign = Math.floor(midpoint / 30);
    const bhriguDegree = midpoint % 30;
    const nakshatra = getNakshatra(midpoint);

    return {
        sign: bhriguSign,
        degree: bhriguDegree.toFixed(2),
        signName: zodiacSigns[bhriguSign],
        nakshatra: nakshatra
    };
}

function formatDegree(degree) {
    const deg = Math.floor(degree);
    const minutes = Math.floor((degree - deg) * 60);
    const seconds = Math.round(((degree - deg) * 60 - minutes) * 60);
    return `${deg}° ${minutes}' ${seconds}"`;
}

document.getElementById('bhriguForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const rahuSign = document.getElementById('rahuSign').value;
    const rahuDegree = document.getElementById('rahuDegree').value;
    const moonSign = document.getElementById('moonSign').value;
    const moonDegree = document.getElementById('moonDegree').value;

    if (!rahuSign || !rahuDegree || !moonSign || !moonDegree) {
        alert('Please fill in all fields');
        return;
    }

    if (parseFloat(rahuDegree) < 0 || parseFloat(rahuDegree) > 29.99) {
        alert('Rahu degree must be between 0 and 29.99');
        return;
    }

    if (parseFloat(moonDegree) < 0 || parseFloat(moonDegree) > 29.99) {
        alert('Moon degree must be between 0 and 29.99');
        return;
    }

    const result = calculateBhriguBindu(rahuSign, rahuDegree, moonSign, moonDegree);

    const resultText = `
        <strong>Sign:</strong> ${result.signName}<br>
        <strong>Degree:</strong> ${result.degree}° (${formatDegree(parseFloat(result.degree))})<br>
        <strong>Nakshatra:</strong> ${result.nakshatra}<br><br>
        <em>This is your Bhrigu Bindu position in the zodiac.</em>
    `;

    document.getElementById('resultText').innerHTML = resultText;
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('rahuDegree').addEventListener('input', function () {
    const value = parseFloat(this.value);
    this.style.borderColor = (value < 0 || value > 29.99) ? '#e53e3e' : '#e2e8f0';
});

document.getElementById('moonDegree').addEventListener('input', function () {
    const value = parseFloat(this.value);
    this.style.borderColor = (value < 0 || value > 29.99) ? '#e53e3e' : '#e2e8f0';
});