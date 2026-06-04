// DOM Elements
const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");
const toggleIcon = document.getElementById("toggleIcon");
const form = document.getElementById("deliveryForm");
const deliveryCards = document.getElementById("deliveryCards");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const modalOverlay = document.getElementById("modalOverlay");
const newDeliveryBtn = document.getElementById("newDeliveryBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalTitle = document.getElementById("modalTitle");

// Nav
const navDashboard = document.getElementById("navDashboard");
const navServices = document.getElementById("navServices");
const navReports = document.getElementById("navReports");
const dashboardView = document.getElementById("dashboardView");
const servicesView = document.getElementById("servicesView");
const reportsView = document.getElementById("reportsView");
const reportsContainer = document.getElementById("reportsContainer");

// Services
const addServiceBtn = document.getElementById("addServiceBtn");
const serviceModalOverlay = document.getElementById("serviceModalOverlay");
const closeServiceModal = document.getElementById("closeServiceModal");
const serviceForm = document.getElementById("serviceForm");
const serviceNotes = document.getElementById("serviceNotes");

// Theme
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

// State
let deliveries = JSON.parse(localStorage.getItem("deliveries")) || [];
let editIndex = -1;

// Pre-populated delivery services from user reference
let serviceProviders = JSON.parse(localStorage.getItem("serviceProviders")) || null;
if (!serviceProviders) {
    serviceProviders = [
        // Zone A
        { name: "ရွှေသဲ Deli Service", address: "", location: "Chan Aye Thar Zan", zone: "Zone A", phone: "09-786606604, 09-402276495", notes: ["အစားအသောက်နဲ့ urgent ရ", "ေျဖးနှဲးသင့်", "Rider များစွာနဲ့ပို"] },
        { name: "Me Me Deli Service", address: "32St, Bet 62~63", location: "Chan Aye Thar Zan", zone: "Zone A", phone: "09-779888747, 09-680243555", notes: ["အစားအစာ|Urgent", "ေျဖးသက်သာ|မြန်မြန်ပို", "တာဝန်ယူ| rider များ"] },
        { name: "Mandalay Thar Deli", address: "No.11A, 63 street between 30&31", location: "Chan Aye Thar Zan", zone: "Zone A", phone: "09-269199847, 09-269199848", notes: ["အစားအစာ အဆင်ပြေ", "Rider အသင့်အတင့်ရှိ", "၂သိန်းအထိ (ပေးာက်/ပူက်) တာဝန်ယူ"] },

        // Zone B
        { name: "Lo Thone Deli Service", address: "68A & 38A (Mandalay)", location: "Mahar Aung Myay", zone: "Zone B", phone: "09-785604768, 09-429791762", notes: ["အစားအသောက်| urgent ပို့လို ရ", "၃ဝမိနစ် အရောက်ပို့ ရှိ", "တာဝန်ယူ", "ေျဖးသက်သာ"] },
        { name: "Taurus Deli Service", address: "69street 107A corner", location: "Chan Mya Thar Si", zone: "Zone B", phone: "09-780785815, 09-774337648", notes: ["အစားအသောက်| urgent ပို့လို့ ရ", "ပါဆယ်ကြိုးလဲအဆင်ပြေ", "တာဝန်ယူ|ေျဖးရှိ|"] },
        { name: "မိုက်ကလေး Delivery Service", address: "67 & 42 Corner", location: "Mahar Aung Myay", zone: "Zone B", phone: "09-954952004", notes: ["အစားအသောက်| urgent ပို့လို့ ရ", "လိုအပ်တာဝယ်ပေး|ဘောဆင်ပေး ရ", "မနက် ၈ မှ ညနေ ၆ ထိ ရ"] },

        // Zone C
        { name: "APK Delivery", address: "Pathein Gyi", location: "Pathein Gyi", zone: "Zone C", phone: "09-980070255, 09-777726803", notes: ["အစားအသောက်| urgent ရ", "မနက် ၈မှ ညနေ၄ထိ order များကို နေ့ချင်းပို့", "တာဝန်ယူ"] },
        { name: "MK Deli Service", address: "Ah Ma Ya Pu Ya", location: "Ah Ma Ya Pu Ya", zone: "Zone C", phone: "09458747766, 09981195550", notes: ["Urgent ရ", "ေျဖးချို|တာဝန်ယူ ရှိ", "Rider များစွာနဲ့ ချိတ်ပို"] },
        { name: "အဂ္ဂ Delivery Service", address: "Pyi Gyi Ta Khon", location: "Pyi Gyi Ta Khon", zone: "Zone C", phone: "09952257083, 09794200187", notes: ["အစားအသောက်| urgent အဆင်ပြေ", "လိုအပ်တာ ဝယ်ပေး", "အမှန်ဆုံး ပို့ပေး", "ညနေးဆောင့်ရွက်လို့ ရ"] }
    ];
    localStorage.setItem("serviceProviders", JSON.stringify(serviceProviders));
}

// ===== INIT =====
function init() {
    loadTheme();
    renderDeliveryCards();
    renderServiceTables();
    setupEventListeners();
    switchView('dashboard');
}

function saveData() {
    localStorage.setItem("deliveries", JSON.stringify(deliveries));
}

function generateID() {
    const ts = Date.now().toString().slice(-4);
    const rn = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `#DEL-${ts}${rn}`;
}

// ===== THEME =====
function loadTheme() {
    applyTheme(localStorage.getItem("deliTheme") || "light");
}
function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark");
        themeIcon.setAttribute("data-lucide", "moon");
        themeLabel.textContent = "Night Mode";
    } else {
        document.body.classList.remove("dark");
        themeIcon.setAttribute("data-lucide", "sun");
        themeLabel.textContent = "Day Mode";
    }
    localStorage.setItem("deliTheme", theme);
    if (window.lucide) lucide.createIcons();
}
function toggleTheme() {
    applyTheme(document.body.classList.contains("dark") ? "light" : "dark");
}

// ===== RENDER DELIVERY CARDS (Excel-style) =====
function renderDeliveryCards() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = statusFilter.value;

    const filtered = deliveries.filter(d => {
        const s =
            (d.id && d.id.toLowerCase().includes(searchTerm)) ||
            (d.fromName && d.fromName.toLowerCase().includes(searchTerm)) ||
            (d.toName && d.toName.toLowerCase().includes(searchTerm)) ||
            (d.fromAddress && d.fromAddress.toLowerCase().includes(searchTerm)) ||
            (d.toAddress && d.toAddress.toLowerCase().includes(searchTerm)) ||
            (d.zone && d.zone.toLowerCase().includes(searchTerm));
        const f = filterValue === "all" || d.status === filterValue;
        return s && f;
    });

    deliveryCards.innerHTML = "";

    if (filtered.length === 0) {
        deliveryCards.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--text-muted);font-size:0.95rem;">No delivery records found.</div>`;
        updateSummary();
        return;
    }

    filtered.forEach(d => {
        const realIndex = deliveries.indexOf(d);
        const statusClass = (d.status || 'Pending').toLowerCase();
        const card = document.createElement("div");
        card.className = "delivery-card";
        card.innerHTML = `
            <div class="delivery-card-header">
                <span class="card-id">${d.id || '#DEL-OLD'}</span>
                <div class="card-actions">
                    <span class="badge badge-${statusClass}" style="margin-right:0.5rem;">${d.status || 'Pending'}</span>
                    <button class="btn-icon" data-action="edit" data-index="${realIndex}" title="Edit">
                        <i data-lucide="edit-2"></i>
                    </button>
                    <button class="btn-icon btn-danger-icon" data-action="delete" data-index="${realIndex}" title="Delete">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            </div>
            <div class="delivery-card-grid">
                <div class="card-field">
                    <div class="card-field-label">Date</div>
                    <div class="card-field-value">${d.date || '—'}</div>
                </div>
                <div class="card-field">
                    <div class="card-field-label">Zone</div>
                    <div class="card-field-value">${d.zone || 'N/A'}</div>
                </div>
                <div class="card-field">
                    <div class="card-field-label">Delivery Speed</div>
                    <div class="card-field-value">${d.deliType || 'Normal'}</div>
                </div>
                <div class="card-field">
                    <div class="card-field-label">Payment Method</div>
                    <div class="card-field-value">${d.paymentMethod || 'COD'}</div>
                </div>
                <div class="card-field">
                    <div class="card-field-label">Sender Name</div>
                    <div class="card-field-value">${d.fromName || '—'}</div>
                </div>
                <div class="card-field">
                    <div class="card-field-label">Sender Address</div>
                    <div class="card-field-value">${d.fromAddress || '—'}</div>
                </div>
                <div class="card-field">
                    <div class="card-field-label">Sender Phone</div>
                    <div class="card-field-value">${d.fromPhone || '—'}</div>
                </div>
                <div class="card-field">
                    <div class="card-field-label">Weight</div>
                    <div class="card-field-value">${d.kg || '0'} KG</div>
                </div>
                <div class="card-field">
                    <div class="card-field-label">Receiver Name</div>
                    <div class="card-field-value">${d.toName || '—'}</div>
                </div>
                <div class="card-field">
                    <div class="card-field-label">Receiver Address</div>
                    <div class="card-field-value">${d.toAddress || '—'}</div>
                </div>
                <div class="card-field">
                    <div class="card-field-label">Receiver Phone</div>
                    <div class="card-field-value">${d.toPhone || '—'}</div>
                </div>
                <div class="card-field">
                    <div class="card-field-label">Payer</div>
                    <div class="card-field-value">${d.payer || '—'}</div>
                </div>
                ${d.serviceName ? `<div class="card-field"><div class="card-field-label">Service</div><div class="card-field-value">${d.serviceName}</div></div>` : ''}
                ${d.comments ? `<div class="card-field" style="grid-column: span 3;"><div class="card-field-label">Notes</div><div class="card-field-value">${d.comments}</div></div>` : ''}
            </div>
        `;
        deliveryCards.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
    updateSummary();
}

// ===== SERVICES =====
function renderServiceTables() {
    const zones = { "Zone A": [], "Zone B": [], "Zone C": [] };
    serviceProviders.forEach(s => {
        if (zones[s.zone]) zones[s.zone].push(s);
    });

    fillZoneTable("zoneABody", zones["Zone A"]);
    fillZoneTable("zoneBBody", zones["Zone B"]);
    fillZoneTable("zoneCBody", zones["Zone C"]);
    renderServiceNotes();
}

function fillZoneTable(containerId, items) {
    const tbody = document.getElementById(containerId);
    if (!tbody) return;
    tbody.innerHTML = "";
    items.forEach((s, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td style="text-align:center;font-weight:600;">${i + 1}</td>
            <td style="font-weight:600;">${s.name}</td>
            <td>${s.address || '—'}</td>
            <td>${s.location || '—'}</td>
            <td>${s.phone || '—'}</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderServiceNotes() {
    serviceNotes.innerHTML = "";
    serviceProviders.forEach(s => {
        if (!s.notes || s.notes.length === 0) return;
        const card = document.createElement("div");
        card.className = "service-note-card";
        card.innerHTML = `
            <div class="service-note-card-header">${s.name}</div>
            <div class="service-note-card-body">
                <ul>${s.notes.map(n => `<li>${n}</li>`).join('')}</ul>
            </div>
        `;
        serviceNotes.appendChild(card);
    });
}

// ===== SUMMARY =====
function updateSummary() {
    let p = 0, c = 0, x = 0;
    deliveries.forEach(d => {
        if (d.status === "Pending") p++;
        if (d.status === "Complete") c++;
        if (d.status === "Cancelled") x++;
    });
    document.getElementById("pendingCount").innerText = p;
    document.getElementById("completeCount").innerText = c;
    document.getElementById("cancelledCount").innerText = x;
}

// ===== REPORTS =====
function renderReports() {
    reportsContainer.innerHTML = "";
    if (deliveries.length === 0) {
        reportsContainer.innerHTML = `<div class="reports-empty"><i data-lucide="inbox" style="width:48px;height:48px;"></i><p>No delivery data to report.</p></div>`;
        if (window.lucide) lucide.createIcons();
        updateReportSummary();
        return;
    }
    const grouped = {};
    deliveries.forEach(d => {
        const date = d.date || 'Unknown';
        if (!grouped[date]) grouped[date] = { pending: 0, complete: 0, cancelled: 0, cod: 0 };
        if (d.status === "Pending") grouped[date].pending++;
        if (d.status === "Complete") grouped[date].complete++;
        if (d.status === "Cancelled") grouped[date].cancelled++;
        if (d.paymentMethod === "COD") grouped[date].cod++;
    });
    const sorted = Object.keys(grouped).sort((a, b) => {
        if (a === 'Unknown') return 1;
        if (b === 'Unknown') return -1;
        return new Date(b) - new Date(a);
    });
    const grid = document.createElement("div");
    grid.className = "reports-grid";
    sorted.forEach(date => {
        const g = grouped[date];
        const total = g.pending + g.complete + g.cancelled;
        const card = document.createElement("div");
        card.className = "report-card";
        card.innerHTML = `
            <div class="report-card-header">
                <i data-lucide="calendar" style="width:16px;height:16px;"></i>
                ${date} &mdash; <span style="font-weight:400;color:var(--text-muted);">${total} deliveries</span>
            </div>
            <div class="report-card-body">
                <div class="report-stat"><div class="report-stat-value pending">${g.pending}</div><div class="report-stat-label">Pending</div></div>
                <div class="report-stat"><div class="report-stat-value complete">${g.complete}</div><div class="report-stat-label">Complete</div></div>
                <div class="report-stat"><div class="report-stat-value cancelled">${g.cancelled}</div><div class="report-stat-label">Cancelled</div></div>
                <div class="report-stat"><div class="report-stat-value cod">${g.cod}</div><div class="report-stat-label">COD</div></div>
            </div>
        `;
        grid.appendChild(card);
    });
    reportsContainer.appendChild(grid);
    if (window.lucide) lucide.createIcons();
    updateReportSummary();
}

// ===== REPORT SUMMARY =====
function updateReportSummary() {
    let pending = 0, complete = 0, cancelled = 0, cod = 0;
    deliveries.forEach(d => {
        if (d.status === "Pending") pending++;
        if (d.status === "Complete") complete++;
        if (d.status === "Cancelled") cancelled++;
        if (d.paymentMethod === "COD") cod++;
    });
    document.getElementById("summaryPending").textContent = pending;
    document.getElementById("summaryComplete").textContent = complete;
    document.getElementById("summaryCancelled").textContent = cancelled;
    document.getElementById("summaryCOD").textContent = cod;
}

// ===== EXPORT PDF (Print-based, works offline) =====
function exportReportPDF() {
    // Build grouped data
    const grouped = {};
    let totalP = 0, totalC = 0, totalX = 0, totalCOD = 0;
    deliveries.forEach(d => {
        const date = d.date || 'Unknown';
        if (!grouped[date]) grouped[date] = { pending: 0, complete: 0, cancelled: 0, cod: 0, total: 0 };
        grouped[date].total++;
        if (d.status === "Pending") { grouped[date].pending++; totalP++; }
        if (d.status === "Complete") { grouped[date].complete++; totalC++; }
        if (d.status === "Cancelled") { grouped[date].cancelled++; totalX++; }
        if (d.paymentMethod === "COD") { grouped[date].cod++; totalCOD++; }
    });

    const sortedDates = Object.keys(grouped).sort((a, b) => {
        if (a === 'Unknown') return 1;
        if (b === 'Unknown') return -1;
        return new Date(b) - new Date(a);
    });

    // Date-wise rows
    const dateRows = sortedDates.map(date => {
        const g = grouped[date];
        return `<tr><td>${date}</td><td>${g.total}</td><td>${g.pending}</td><td>${g.complete}</td><td>${g.cancelled}</td><td>${g.cod}</td></tr>`;
    }).join('');

    // Detail rows
    const detailRows = deliveries.map(d => `
        <tr>
            <td>${d.id || '—'}</td>
            <td>${d.date || '—'}</td>
            <td>${d.zone || '—'}</td>
            <td>${d.fromName || '—'}</td>
            <td>${d.toName || '—'}</td>
            <td>${(d.kg || '0')} KG</td>
            <td>${d.status || '—'}</td>
            <td>${d.paymentMethod || '—'}</td>
        </tr>
    `).join('');

    const now = new Date().toLocaleString();

    const html = `<!DOCTYPE html>
<html>
<head>
<title>DeliService Report</title>
<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; padding: 30px; color: #1e293b; font-size: 12px; }
    h1 { font-size: 22px; color: #1e40af; margin-bottom: 4px; }
    .sub { color: #64748b; font-size: 11px; margin-bottom: 24px; }
    h2 { font-size: 14px; color: #334155; margin: 20px 0 8px; padding-bottom: 4px; border-bottom: 2px solid #2563eb; display: inline-block; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th { background: #2563eb; color: #fff; padding: 8px 10px; text-align: center; font-size: 11px; font-weight: 600; }
    td { padding: 7px 10px; border: 1px solid #e2e8f0; text-align: center; font-size: 11px; }
    tr:nth-child(even) { background: #f8fafc; }
    .summary-grid { display: flex; gap: 12px; margin-bottom: 24px; }
    .summary-box { flex: 1; text-align: center; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 8px; background: #f8fafc; }
    .summary-box .val { font-size: 24px; font-weight: 800; }
    .summary-box .lbl { font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-top: 2px; }
    .pending { color: #ca8a04; }
    .complete { color: #16a34a; }
    .cancelled { color: #dc2626; }
    .cod { color: #2563eb; }
    .footer { margin-top: 20px; text-align: center; color: #94a3b8; font-size: 10px; border-top: 1px solid #e2e8f0; padding-top: 10px; }
    @media print { body { padding: 15px; } }
</style>
</head>
<body>
    <h1>DeliService — Delivery Report</h1>
    <p class="sub">Generated: ${now} &nbsp;|&nbsp; Total Records: ${deliveries.length}</p>

    <h2>Date-wise Summary</h2>
    <table>
        <thead><tr><th>Date</th><th>Total</th><th>Pending</th><th>Complete</th><th>Cancelled</th><th>COD</th></tr></thead>
        <tbody>${dateRows || '<tr><td colspan="6">No data</td></tr>'}</tbody>
    </table>

    <h2>Overall Summary</h2>
    <div class="summary-grid">
        <div class="summary-box"><div class="val">${deliveries.length}</div><div class="lbl">Total</div></div>
        <div class="summary-box"><div class="val pending">${totalP}</div><div class="lbl">Pending</div></div>
        <div class="summary-box"><div class="val complete">${totalC}</div><div class="lbl">Complete</div></div>
        <div class="summary-box"><div class="val cancelled">${totalX}</div><div class="lbl">Cancelled</div></div>
        <div class="summary-box"><div class="val cod">${totalCOD}</div><div class="lbl">COD</div></div>
    </div>

    <h2>Detailed Records</h2>
    <table>
        <thead><tr><th>ID</th><th>Date</th><th>Zone</th><th>From</th><th>To</th><th>Weight</th><th>Status</th><th>Payment</th></tr></thead>
        <tbody>${detailRows || '<tr><td colspan="8">No records</td></tr>'}</tbody>
    </table>

    <div class="footer">DeliService Report &mdash; ${now}</div>

    <script>window.onload = function() { window.print(); }<\/script>
</body>
</html>`;

    const printWin = window.open('', '_blank', 'width=900,height=700');
    printWin.document.write(html);
    printWin.document.close();
}

// ===== VIEW SWITCHING =====
function switchView(view) {
    dashboardView.style.display = 'none';
    servicesView.style.display = 'none';
    reportsView.style.display = 'none';
    navDashboard.classList.remove('active');
    navServices.classList.remove('active');
    navReports.classList.remove('active');

    if (view === 'dashboard') {
        dashboardView.style.display = 'block';
        navDashboard.classList.add('active');
    } else if (view === 'services') {
        servicesView.style.display = 'block';
        navServices.classList.add('active');
        renderServiceTables();
    } else if (view === 'reports') {
        reportsView.style.display = 'block';
        navReports.classList.add('active');
        renderReports();
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Sidebar
    toggleSidebar.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        const col = sidebar.classList.contains("collapsed");
        toggleIcon.setAttribute("data-lucide", col ? "chevron-right" : "chevron-left");
        if (window.lucide) lucide.createIcons();
    });

    // Theme
    themeToggle.addEventListener("click", toggleTheme);

    // Nav
    navDashboard.addEventListener("click", e => { e.preventDefault(); switchView('dashboard'); });
    navServices.addEventListener("click", e => { e.preventDefault(); switchView('services'); });
    navReports.addEventListener("click", e => { e.preventDefault(); switchView('reports'); });

    // Export PDF
    document.getElementById("exportPdfBtn").addEventListener("click", exportReportPDF);

    // Delivery modal
    newDeliveryBtn.addEventListener("click", () => {
        editIndex = -1;
        modalTitle.innerText = "New Delivery Registration";
        form.reset();
        document.getElementById("editIndex").value = "";
        modalOverlay.style.display = "flex";
    });
    closeModalBtn.addEventListener("click", () => { modalOverlay.style.display = "none"; });
    modalOverlay.addEventListener("click", e => { if (e.target === modalOverlay) modalOverlay.style.display = "none"; });

    // Service modal
    addServiceBtn.addEventListener("click", () => { serviceForm.reset(); serviceModalOverlay.style.display = "flex"; });
    closeServiceModal.addEventListener("click", () => { serviceModalOverlay.style.display = "none"; });
    serviceModalOverlay.addEventListener("click", e => { if (e.target === serviceModalOverlay) serviceModalOverlay.style.display = "none"; });

    // Search & Filter
    searchInput.addEventListener("input", renderDeliveryCards);
    statusFilter.addEventListener("change", renderDeliveryCards);

    // Table action delegation (Edit / Delete)
    deliveryCards.addEventListener("click", e => {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;
        const action = btn.getAttribute("data-action");
        const index = parseInt(btn.getAttribute("data-index"), 10);
        if (action === "edit") editDelivery(index);
        else if (action === "delete") deleteDelivery(index);
    });

    // Delivery form submit
    form.addEventListener("submit", e => {
        e.preventDefault();
        const data = {
            id: editIndex === -1 ? generateID() : deliveries[editIndex].id,
            date: document.getElementById("date").value,
            zone: document.getElementById("zone").value,
            fromName: document.getElementById("fromName").value,
            fromAddress: document.getElementById("fromAddress").value,
            fromPhone: document.getElementById("fromPhone").value,
            toName: document.getElementById("toName").value,
            toAddress: document.getElementById("toAddress").value,
            toPhone: document.getElementById("toPhone").value,
            payer: document.getElementById("payer").value,
            kg: document.getElementById("kg").value,
            paymentMethod: document.getElementById("paymentMethod").value,
            deliType: document.getElementById("deliType").value,
            serviceName: document.getElementById("serviceName").value,
            status: document.getElementById("status").value,
            comments: document.getElementById("comments").value
        };
        const idx = document.getElementById("editIndex").value;
        if (idx !== "") deliveries[parseInt(idx)] = data;
        else deliveries.push(data);
        saveData();
        renderDeliveryCards();
        modalOverlay.style.display = "none";
        form.reset();
    });

    // Service form submit
    serviceForm.addEventListener("submit", e => {
        e.preventDefault();
        const svc = {
            name: document.getElementById("svcName").value,
            address: document.getElementById("svcAddress").value,
            zone: document.getElementById("svcZone").value,
            location: document.getElementById("svcLocation").value,
            phone: document.getElementById("svcPhone").value,
            notes: document.getElementById("svcNotes").value.split('\n').filter(l => l.trim())
        };
        serviceProviders.push(svc);
        localStorage.setItem("serviceProviders", JSON.stringify(serviceProviders));
        renderServiceTables();
        serviceModalOverlay.style.display = "none";
        serviceForm.reset();
    });
}

// ===== EDIT & DELETE =====
function editDelivery(index) {
    const d = deliveries[index];
    if (!d) return;
    editIndex = index;
    modalTitle.innerText = `Edit Delivery - ${d.id || 'N/A'}`;
    document.getElementById("editIndex").value = index;
    document.getElementById("date").value = d.date || '';
    document.getElementById("zone").value = d.zone || "Zone A";
    document.getElementById("fromName").value = d.fromName || '';
    document.getElementById("fromAddress").value = d.fromAddress || '';
    document.getElementById("fromPhone").value = d.fromPhone || '';
    document.getElementById("toName").value = d.toName || '';
    document.getElementById("toAddress").value = d.toAddress || '';
    document.getElementById("toPhone").value = d.toPhone || '';
    document.getElementById("payer").value = d.payer || 'Sender';
    document.getElementById("kg").value = d.kg || '';
    document.getElementById("paymentMethod").value = d.paymentMethod || 'COD';
    document.getElementById("deliType").value = d.deliType || 'Normal';
    document.getElementById("serviceName").value = d.serviceName || '';
    document.getElementById("status").value = d.status || 'Pending';
    document.getElementById("comments").value = d.comments || '';
    modalOverlay.style.display = "flex";
}

function deleteDelivery(index) {
    if (index < 0 || index >= deliveries.length) return;
    if (confirm("Are you sure you want to permanently delete this delivery record?")) {
        deliveries.splice(index, 1);
        saveData();
        renderDeliveryCards();
    }
}

// Start
init();