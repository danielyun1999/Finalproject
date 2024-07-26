function calculateTotal() {
    const checkin = new Date(document.getElementById('checkin').value);
    const checkout = new Date(document.getElementById('checkout').value);
    const roomType = document.getElementById('roomType').value;

    // 날짜가 유효한지 확인
    if (isNaN(checkin) || isNaN(checkout) || checkin >= checkout) {
        document.getElementById('totalPrice').innerText = "Please select valid dates.";
        return;
    }

    // 날짜 차이를 일 단위로 계산
    const nights = (checkout - checkin) / (1000 * 60 * 60 * 24);
    
    let roomPricePerNight;
    if (roomType === 'standard') {
        roomPricePerNight = 100000;
    } else if (roomType === 'deluxe') {
        roomPricePerNight = 150000;
    } else if (roomType === 'suite') {
        roomPricePerNight = 250000;
    }

    const totalPriceKRW = nights * roomPricePerNight;
    const exchangeRate = 0.0008; // 1 KRW ≈ 0.0008 USD
    const totalPriceUSD = totalPriceKRW * exchangeRate;

    document.getElementById('totalPrice').innerText = `Total Price: ${totalPriceKRW.toLocaleString()} KRW (approx. ${totalPriceUSD.toFixed(2)} USD)`;
}

document.addEventListener('DOMContentLoaded', () => {
    const dateInputs = document.querySelectorAll('input[type="text"][placeholder="YYYY-MM-DD"]');
    dateInputs.forEach(input => {
        input.addEventListener('focus', (event) => {
            event.target.type = 'date';
        });
        input.addEventListener('blur', (event) => {
            if (!event.target.value) {
                event.target.type = 'text';
            }
        });
    });
});
