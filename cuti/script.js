// Fungsi untuk menginisialisasi canvas tanda tangan
function initializeCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    let drawing = false;

    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    canvas.addEventListener('mousedown', () => { drawing = true; });
    canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
    canvas.addEventListener('mousemove', draw);

    function draw(event) {
        if (!drawing) return;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';
        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    }
}

// Fungsi untuk menghapus tanda tangan
function clearSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Inisialisasi semua canvas
initializeCanvas('canvas1');
initializeCanvas('canvas2');
initializeCanvas('canvas3');

// Pengolahan formulir
document.getElementById('leaveForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah pengiriman formulir secara default

    const signature1 = document.getElementById('canvas1').toDataURL();
    const signature2 = document.getElementById('canvas2').toDataURL();
    const signature3 = document.getElementById('canvas3').toDataURL();

    // Ambil data formulir
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        department: formData.get('department'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        reason: formData.get('reason'),
        contact: formData.get('contact'),
        signature1: signature1,
        signature2: signature2,
        signature3: signature3
    };

    // Validasi tanda tangan
    if (signature1 && signature2 && signature3) {
        displayResult(data);
        document.getElementById('responseMessage').innerText = 'Formulir berhasil dikirim!';
    } else {
        document.getElementById('responseMessage').innerText = 'Anda harus mendapatkan tanda tangan dari semua pihak.';
    }
});

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Data Cuti</h2>
        <p><strong>Nama:</strong> ${data.name}</p>
        <p><strong>Departemen:</strong> ${data.department}</p>
        <p><strong>Tanggal Mulai Cuti:</strong> ${data.startDate}</p>
        <p><strong>Tanggal Selesai Cuti:</strong> ${data.endDate}</p>
        <p><strong>Alasan Cuti:</strong> ${data.reason}</p>
        <p><strong>Kontak Selama Cuti:</strong> ${data.contact}</p>
        <h2>Tanda Tangan Persetujuan</h2>
        <p><strong>Persetujuan 1:</strong></p>
        <img src="${data.signature1}" alt="Tanda Tangan 1">
        <p><strong>Persetujuan 2:</strong></p>
        <img src="${data.signature2}" alt="Tanda Tangan 2">
        <p><strong>Persetujuan 3:</strong></p>
        <img src="${data.signature3}" alt="Tanda Tangan 3">
    `;
}
