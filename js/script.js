const menuBar = document.querySelector(".menu-bar");
const menuNav = document.querySelector(".menu");

menuBar.addEventListener("click", () => {
  menuNav.classList.toggle("menu-active");
});

// scroll navbar
const navBar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  console.log(window.scrollY);
  const windowPosition = window.scrollY > 0;
  navBar.classList.toggle("scrolling-active", windowPosition);
});

// cari button
const btnCari = document.getElementById("btnCari");
const dropdownMenu = document.getElementById("dropdownMenu");

// Toggle dropdown saat tombol diklik
btnCari.addEventListener("click", function () {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
});

// Tutup dropdown kalau klik di luar
window.addEventListener("click", function (e) {
  if (!btnCari.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.style.display = "none";
  }
});

// swiper ulasan
var swiper = new Swiper(".ulasan-slider", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// detailkost
// Ambil semua tombol dengan class "detail-btn"
const detailButtons = document.querySelectorAll(".detail-btn");

// Loop setiap tombol
detailButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = document.getElementById("kostModal");

    // Isi data modal berdasarkan atribut data di tombol
    document.getElementById("modalImg").src = btn.dataset.img;
    document.getElementById("modalNama").textContent = btn.dataset.nama;
    document.getElementById("modalFasilitas").textContent =
      btn.dataset.fasilitas;
    document.getElementById("modalHarga").textContent = btn.dataset.harga;
    document.getElementById("modalLayanan").textContent = btn.dataset.layanan;
    document.getElementById("modalAlamat").textContent = btn.dataset.alamat;
    document.getElementById("modalJenis").textContent = btn.dataset.jenis;
    document.getElementById("modalWa").href = btn.dataset.wa;
    document.getElementById("modalIg").href = btn.dataset.ig;
    document.getElementById("modalMaps").href = btn.dataset.maps;

    // Tampilkan modal
    modal.classList.add("show");
  });
});

// Tutup modal saat klik tombol X
const closeModal = document.querySelector(".close");

if (closeModal) {
  closeModal.addEventListener("click", () => {
    document.getElementById("kostModal").classList.remove("show");
  });
}

// Tutup modal saat klik di luar area konten
window.addEventListener("click", (e) => {
  const modal = document.getElementById("kostModal");
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

// === FUNGSI DAFTARKAN KOST ===
// === Validasi Form dan Aktifkan Tombol ===
const form = document.getElementById("formKost");
const checkbox = document.getElementById("confirmCheck");
const buttons = document.querySelectorAll(".tombol-daftar button");

function validasiForm() {
  const nama = form.nama.value.trim();
  const namakost = form.namakost.value.trim();
  const alamat = form.alamat.value.trim();
  const whatsappUser = form.whatsapp.value.trim();
  const pernyataan = document.getElementById("pernyataan").value.trim();
  const buktiFile = form.bukti.files[0];
  const check = checkbox.checked;

  let validFile = false;
  if (buktiFile) {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    validFile = allowedTypes.includes(buktiFile.type);
  }

  const semuaTerisi =
    nama && namakost && alamat && whatsappUser && pernyataan && validFile;

  // Aktifkan tombol jika semua valid + checkbox dicentang
  buttons.forEach((btn) => (btn.disabled = !(semuaTerisi && check)));
}

// Event listener input & checkbox
form.addEventListener("input", validasiForm);
checkbox.addEventListener("change", validasiForm);

// === Fungsi bantu sebelum klik tombol ===
function cekSebelumKlik(func) {
  const nama = form.nama.value.trim();
  const namakost = form.namakost.value.trim();
  const alamat = form.alamat.value.trim();
  const whatsappUser = form.whatsapp.value.trim();
  const pernyataan = document.getElementById("pernyataan").value.trim();
  const buktiFile = form.bukti.files[0];
  const check = checkbox.checked;

  let validFile = false;
  if (buktiFile) {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    validFile = allowedTypes.includes(buktiFile.type);
  }

  if (
    !nama ||
    !namakost ||
    !alamat ||
    !whatsappUser ||
    !pernyataan ||
    !validFile ||
    !check
  ) {
    alert(
      "Form belum lengkap atau file tidak valid. Mohon lengkapi semua field dan centang checkbox."
    );
    return false;
  }
  func();
}

// === Tombol GForm ===
function bukaGForm() {
  cekSebelumKlik(() => {
    const gformLink = "https://forms.gle/VQSU6VHQup3i7wYb8"; // ganti dengan link Google Form
    window.open(gformLink, "_blank");
  });
}

// === Tombol WhatsApp ke Admin Carikost ===
function kirimWhatsApp() {
  cekSebelumKlik(() => {
    const adminNomor = "62085600949910"; // ganti dengan nomor WA admin
    const pesan = `
Halo Admin Carikost 
Saya ingin mendaftarkan kost baru.

Nama Kost: ${form.namakost.value}
Alamat: ${form.alamat.value}
Nomor WA Pemilik: ${form.whatsapp.value}
Pemilik: ${form.nama.value}

Mohon proses pendaftaran selanjutnya. Terima kasih
`;
    const linkWA = `https://wa.me/${adminNomor}?text=${encodeURIComponent(
      pesan
    )}`;
    window.open(linkWA, "_blank");
  });
}

// === Tombol Email ===
function kirimEmail() {
  cekSebelumKlik(() => {
    const subject = "Pendaftaran Kost Baru - Carikost";
    const body = `Halo Admin Carikost,

Saya telah mengirim data pendaftaran kost melalui website.

Nama Pemilik: ${form.nama.value}
Nama Kost: ${form.namakost.value}
Alamat: ${form.alamat.value}
Nomor WhatsApp: ${form.whatsapp.value}

Terima kasih,
${form.nama.value}`;

    const mailto = `mailto:carikosst@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}
