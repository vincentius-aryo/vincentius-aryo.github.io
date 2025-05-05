document.addEventListener('DOMContentLoaded', () => {
  const role = localStorage.getItem('simrsRole');
  if (!role && !window.location.href.includes('index.html')) {
    window.location.href = 'index.html';
    return;
  }
  if (document.getElementById('userRole')) {
    document.getElementById('userRole').textContent = 'Login sebagai: ' + role;
  }

  const allowed = {
    Admin: ["Dashboard", "Rekam Medis", "Pasien", "Dokter", "Klaim BPJS", "Laporan", "Farmasi", "Admin"],
    Dokter: ["Dokter", "Input Diagnosa"],
    Pasien: ["Buat Janji"],
    RekamMedis: ["Dashboard", "Rekam Medis", "Klaim BPJS", "Laporan"],
    Farmasi: ["Dashboard", "Farmasi"],
    Manajemen: ["Dashboard", "Laporan"]
  };

  document.querySelectorAll('[data-label]').forEach(link => {
    if (!allowed[role]?.includes(link.dataset.label)) {
      link.style.display = 'none';
    } else {
      link.classList.remove('hidden');
    }
  });

  const allowedPages = {
    RekamMedis: ['dashboard.html', 'rekam-medis.html', 'dashboard-rekam.html', 'klaim-rekam.html', 'laporan-rekam.html'],
    Dokter: ['dokter.html', 'input-diagnosa.html'],
    Pasien: ['pasien.html'],
    Admin: ['dashboard-admin.html', 'klaim-admin.html', 'laporan-admin.html', 'farmasi-admin.html', 'admin.html'],
    Farmasi: ['farmasi.html', 'dashboard-farmasi.html'],
    Manajemen: ['laporan-manajemen.html', 'dashboard-manajemen.html']
  };

  const currentPage = location.pathname.split('/').pop();
  if (role && allowedPages[role] && !allowedPages[role].includes(currentPage)) {
    alert('Akses ditolak. Anda tidak memiliki izin membuka halaman ini.');
    window.location.href = 'dashboard.html';
  }
});

function logout() {
  localStorage.removeItem('simrsRole');
  window.location.href = 'index.html';
}