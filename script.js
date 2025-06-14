document.addEventListener('DOMContentLoaded', () => {
    // Das Canvas-Element aus dem HTML holen
    const canvas = document.getElementById('confetti-canvas');
    
    // Konfetti-Funktion an das Canvas binden
    const myConfetti = confetti.create(canvas, {
        resize: true, // Die Größe des Konfettis an die Fenstergröße anpassen
        useWorker: true // Verbessert die Leistung
    });

    // Startet eine große Konfetti-Explosion in der Mitte
    function initialBurst() {
        const duration = 5 * 1000; // 5 Sekunden
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // Da die Seite geladen ist, starten wir von oben
            myConfetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    // Funktion für einen kontinuierlichen, sanften Konfetti-Regen
    function gentleConfettiRain() {
        const duration = 15 * 1000; // Läuft für 15 Sekunden im Hintergrund
        const animationEnd = Date.now() + duration;

        (function frame() {
            if (Date.now() > animationEnd) return;

            myConfetti({
                particleCount: 2,
                angle: 270,
                spread: 90,
                origin: { x: Math.random(), y: -0.1 },
                colors: ['#f8b195', '#f67280', '#c06c84', '#6c5b7b', '#ffffff']
            });

            requestAnimationFrame(frame);
        }());
    }

    // Starte die Animationen
    initialBurst();
    
    // Nach 3 Sekunden einen sanfteren Regen starten
    setTimeout(gentleConfettiRain, 3000);
});
