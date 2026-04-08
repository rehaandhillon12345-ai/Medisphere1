// ===== USER DATA =====
        var currentUser = null;
        var reminders = [];
        var records = [
            { name: "Blood Test Report", date: "2026-01-15", doctor: "Dr. Sharma" },
            { name: "X-Ray Chest", date: "2025-11-20", doctor: "Dr. Mehta" },
            { name: "Prescription - Fever", date: "2026-03-10", doctor: "Dr. Gupta" }
        ];

        // ===== DOCTORS DATA =====
        var doctors = [
            { name: "Dr. Priya Sharma", spec: "general", specialization: "General Physician", available: true, queue: 3, wait: 15 },
            { name: "Dr. Amit Patel", spec: "cardiology", specialization: "Cardiology", available: true, queue: 5, wait: 30 },
            { name: "Dr. Sneha Reddy", spec: "dermatology", specialization: "Dermatology", available: false, queue: 0, wait: 0 },
            { name: "Dr. Raj Kumar", spec: "orthopedics", specialization: "Orthopedics", available: true, queue: 2, wait: 10 },
            { name: "Dr. Kavita Singh", spec: "general", specialization: "General Physician", available: true, queue: 7, wait: 45 },
            { name: "Dr. Vikram Joshi", spec: "cardiology", specialization: "Cardiology", available: false, queue: 0, wait: 0 }
        ];

        // ===== MEDICINES DATA =====
        var medicines = [
            { branded: "Crocin", generic: "Paracetamol 500mg", brandPrice: 30, genPrice: 8, savings: 73 },
            { branded: "Dolo 650", generic: "Paracetamol 650mg", brandPrice: 32, genPrice: 10, savings: 69 },
            { branded: "Combiflam", generic: "Ibuprofen + Paracetamol", brandPrice: 42, genPrice: 12, savings: 71 },
            { branded: "Azithral", generic: "Azithromycin 500mg", brandPrice: 120, genPrice: 35, savings: 71 },
            { branded: "Shelcal", generic: "Calcium + Vitamin D3", brandPrice: 180, genPrice: 55, savings: 69 },
            { branded: "Pan 40", generic: "Pantoprazole 40mg", brandPrice: 85, genPrice: 18, savings: 79 },
            { branded: "Allegra", generic: "Fexofenadine 120mg", brandPrice: 150, genPrice: 40, savings: 73 }
        ];

        // ===== PAGE NAVIGATION =====
        function showPage(page) {
            // hide everything
            document.getElementById('landingPage').style.display = 'none';
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('signupPage').style.display = 'none';
            document.getElementById('dashboardPage').style.display = 'none';
            document.getElementById('scannerPage').style.display = 'none';
            document.getElementById('doctorsPage').style.display = 'none';
            document.getElementById('medicinesPage').style.display = 'none';
            document.getElementById('remindersPage').style.display = 'none';
            document.getElementById('recordsPage').style.display = 'none';
            document.getElementById('profilePage').style.display = 'none';

            // show the right page
            if (page === 'landing') {
                if (currentUser) {
                    showPage('dashboard');
                    return;
                }
                document.getElementById('landingPage').style.display = 'block';
                updateNav(false);
            }
            else if (page === 'login') {
                document.getElementById('loginPage').style.display = 'flex';
                updateNav(false);
            }
            else if (page === 'signup') {
                document.getElementById('signupPage').style.display = 'flex';
                updateNav(false);
            }
            else if (page === 'dashboard') {
                if (!currentUser) { showPage('login'); return; }
                document.getElementById('dashboardPage').style.display = 'block';
                document.getElementById('welcomeMsg').textContent = 'Welcome, ' + currentUser.name + '! 👋';
                updateNav(true);
            }
            else if (page === 'scanner') {
                if (!currentUser) { showPage('login'); return; }
                document.getElementById('scannerPage').style.display = 'block';
                document.getElementById('scanResult').style.display = 'none';
                updateNav(true);
            }
            else if (page === 'doctors') {
                if (!currentUser) { showPage('login'); return; }
                document.getElementById('doctorsPage').style.display = 'block';
                renderDoctors(doctors);
                updateNav(true);
            }
            else if (page === 'medicines') {
                if (!currentUser) { showPage('login'); return; }
                document.getElementById('medicinesPage').style.display = 'block';
                document.getElementById('medicineResults').innerHTML = '';
                updateNav(true);
            }
            else if (page === 'reminders') {
                if (!currentUser) { showPage('login'); return; }
                document.getElementById('remindersPage').style.display = 'block';
                renderReminders();
                updateNav(true);
            }
            else if (page === 'records') {
                if (!currentUser) { showPage('login'); return; }
                document.getElementById('recordsPage').style.display = 'block';
                renderRecords();
                updateNav(true);
            }
            else if (page === 'profile') {
                if (!currentUser) { showPage('login'); return; }
                document.getElementById('profilePage').style.display = 'block';
                renderProfile();
                updateNav(true);
            }

            // scroll to top
            window.scrollTo(0, 0);
        }

        function updateNav(loggedIn) {
            if (loggedIn) {
                document.getElementById('navButtons').innerHTML =
                    '<button class="btn-login" onclick="showPage(\'dashboard\')">Dashboard</button>' +
                    '<button class="btn-logout" onclick="handleLogout()">Logout</button>';
            } else {
                document.getElementById('navButtons').innerHTML =
                    '<button class="btn-login" onclick="showPage(\'login\')">Login</button>' +
                    '<button class="btn-signup" onclick="showPage(\'signup\')">Get Started</button>';
            }
        }

        // ===== AUTH =====
        function handleLogin(e) {
            e.preventDefault();
            var email = document.getElementById('loginEmail').value;
            var password = document.getElementById('loginPassword').value;

            if (!email || !password) {
                showToast('Please fill in all fields', true);
                return;
            }

            // demo login - accept anything
            currentUser = {
                name: email.split('@')[0],
                email: email,
                age: 25,
                bloodGroup: 'O+',
                conditions: ['hypertension'],
                allergies: ['Penicillin']
            };

            showToast('Welcome back, ' + currentUser.name + '!');
            showPage('dashboard');
        }

        function handleSignup(e) {
            e.preventDefault();
            var name = document.getElementById('signupName').value;
            var email = document.getElementById('signupEmail').value;
            var password = document.getElementById('signupPassword').value;
            var age = document.getElementById('signupAge').value;
            var blood = document.getElementById('signupBlood').value;

            if (!name || !email || !password || !age || !blood) {
                showToast('Please fill in all required fields', true);
                return;
            }

            if (password.length < 6) {
                showToast('Password must be at least 6 characters', true);
                return;
            }

            // get selected conditions
            var condSelect = document.getElementById('signupConditions');
            var conditions = [];
            for (var i = 0; i < condSelect.options.length; i++) {
                if (condSelect.options[i].selected) {
                    conditions.push(condSelect.options[i].value);
                }
            }

            // get allergies
            var allergiesText = document.getElementById('signupAllergies').value;
            var allergies = allergiesText ? allergiesText.split(',').map(function(a) { return a.trim(); }) : [];

            currentUser = {
                name: name,
                email: email,
                age: parseInt(age),
                bloodGroup: blood,
                conditions: conditions,
                allergies: allergies
            };

            showToast('Account created! Welcome, ' + name + '!');
            showPage('dashboard');
        }

        function handleLogout() {
            currentUser = null;
            reminders = [];
            showToast('Logged out successfully');
            showPage('landing');
        }

        // ===== CAMERA SCANNER =====
        function scanItem(item) {
            var result = document.getElementById('scanResult');
            var status, statusClass, titleClass, details;

            // check based on user health conditions
            var hasDiabetes = currentUser.conditions.indexOf('diabetes') !== -1;
            var hasBP = currentUser.conditions.indexOf('hypertension') !== -1;
            var hasHeart = currentUser.conditions.indexOf('heartDisease') !== -1;
            var hasAllergyPenicillin = false;
            for (var i = 0; i < currentUser.allergies.length; i++) {
                if (currentUser.allergies[i].toLowerCase().indexOf('penicillin') !== -1) {
                    hasAllergyPenicillin = true;
                }
            }

            if (item === 'Coca-Cola (High Sugar)') {
                if (hasDiabetes) {
                    status = '⚠️ NOT SAFE'; statusClass = 'danger'; titleClass = 'result-danger';
                    details = 'High sugar content (39g per can). Not recommended for diabetes.';
                } else {
                    status = '⚡ CAUTION'; statusClass = 'warning'; titleClass = 'result-warning';
                    details = 'High sugar content. Consume in moderation.';
                }
            }
            else if (item === 'Paracetamol 500mg') {
                status = '✅ SAFE'; statusClass = 'safe'; titleClass = 'result-safe';
                details = 'Safe for general use. Standard dosage for fever and pain relief.';
            }
            else if (item === 'Salted Chips (High Sodium)') {
                if (hasBP || hasHeart) {
                    status = '⚠️ NOT SAFE'; statusClass = 'danger'; titleClass = 'result-danger';
                    details = 'Very high sodium (480mg per serving). Avoid with hypertension/heart conditions.';
                } else {
                    status = '⚡ CAUTION'; statusClass = 'warning'; titleClass = 'result-warning';
                    details = 'High sodium content. Eat in moderation.';
                }
            }
            else if (item === 'Amoxicillin 250mg') {
                if (hasAllergyPenicillin) {
                    status = '🚫 DANGEROUS'; statusClass = 'danger'; titleClass = 'result-danger';
                    details = 'You have a Penicillin allergy! Amoxicillin is a penicillin-type antibiotic. DO NOT take this.';
                } else {
                    status = '✅ SAFE'; statusClass = 'safe'; titleClass = 'result-safe';
                    details = 'Antibiotic safe for you. Take as prescribed by your doctor.';
                }
            }
            else if (item === 'Green Salad') {
                status = '✅ SAFE'; statusClass = 'safe'; titleClass = 'result-safe';
                details = 'Healthy choice! Low calorie, high fiber. Good for all health conditions.';
            }

            result.className = 'scan-result ' + statusClass;
            result.innerHTML =
                '<div class="result-title ' + titleClass + '">' + status + '</div>' +
                '<p><strong>Item:</strong> ' + item + '</p>' +
                '<p><strong>Analysis:</strong> ' + details + '</p>';
            result.style.display = 'block';
        }

        // ===== DOCTOR QUEUE =====
        function renderDoctors(list) {
            var html = '';
            for (var i = 0; i < list.length; i++) {
                var d = list[i];
                html += '<div class="doctor-card">' +
                    '<div class="doctor-info">' +
                        '<h3>' + d.name + '</h3>' +
                        '<p>' + d.specialization + '</p>' +
                    '</div>' +
                    '<div class="doctor-status">' +
                        '<p class="' + (d.available ? 'status-available' : 'status-busy') + '">' +
                            (d.available ? '● Available' : '● Not Available') +
                        '</p>' +
                        (d.available ? '<p style="font-size:12px;color:#666">' + d.queue + ' in queue · ~' + d.wait + ' min wait</p>' : '') +
                    '</div>' +
                    '<button class="book-btn" ' + (d.available ? 'onclick="bookDoctor(\'' + d.name + '\')"' : 'disabled') + '>' +
                        (d.available ? 'Book Appointment' : 'Unavailable') +
                    '</button>' +
                '</div>';
            }
            document.getElementById('doctorList').innerHTML = html;
        }

        function filterDoctors() {
            var search = document.getElementById('doctorSearch').value.toLowerCase();
            var filter = document.getElementById('doctorFilter').value;

            var filtered = doctors.filter(function(d) {
                var matchSearch = d.name.toLowerCase().indexOf(search) !== -1 ||
                                  d.specialization.toLowerCase().indexOf(search) !== -1;
                var matchFilter = filter === 'all' || d.spec === filter;
                return matchSearch && matchFilter;
            });

            renderDoctors(filtered);
        }

        function bookDoctor(name) {
            showToast('Appointment booked with ' + name + '!');
        }

        // ===== GENERIC MEDICINE FINDER =====
        function searchMedicine() {
            var query = document.getElementById('medicineSearch').value.toLowerCase().trim();
            if (!query) {
                showToast('Please enter a medicine name', true);
                return;
            }

            var results = medicines.filter(function(m) {
                return m.branded.toLowerCase().indexOf(query) !== -1 ||
                       m.generic.toLowerCase().indexOf(query) !== -1;
            });

            var html = '';
            if (results.length === 0) {
                html = '<p style="color:#666; text-align:center; padding:20px;">No results found. Try searching for "Crocin", "Dolo", "Combiflam", etc.</p>';
            } else {
                for (var i = 0; i < results.length; i++) {
                    var m = results[i];
                    html += '<div class="medicine-result">' +
                        '<h3>' + m.branded + ' → ' + m.generic + '</h3>' +
                        '<div class="price-compare">' +
                            '<div class="price-box price-branded">Branded: ₹' + m.brandPrice + '</div>' +
                            '<div class="price-box price-generic">Generic: ₹' + m.genPrice + '</div>' +
                        '</div>' +
                        '<p class="savings">💰 You save ' + m.savings + '%!</p>' +
                    '</div>';
                }
            }
            document.getElementById('medicineResults').innerHTML = html;
        }

        // ===== PILL REMINDER =====
        function addReminder() {
            var name = document.getElementById('pillName').value.trim();
            var time = document.getElementById('pillTime').value;
            var freq = document.getElementById('pillFrequency').value;

            if (!name || !time) {
                showToast('Please enter medicine name and time', true);
                return;
            }

            reminders.push({ name: name, time: time, frequency: freq, taken: false });
            document.getElementById('pillName').value = '';
            document.getElementById('pillTime').value = '';
            renderReminders();
            showToast('Reminder added for ' + name);
        }

        function renderReminders() {
            var html = '';
            if (reminders.length === 0) {
                html = '<p style="color:#666; text-align:center; padding:20px;">No reminders yet. Add one above!</p>';
            }
            for (var i = 0; i < reminders.length; i++) {
                var r = reminders[i];
                html += '<li class="reminder-item ' + (r.taken ? 'taken' : '') + '">' +
                    '<div>' +
                        '<strong>' + r.name + '</strong>' +
                        '<span style="margin-left:10px; color:#666; font-size:13px;">' + r.time + ' · ' + r.frequency + '</span>' +
                    '</div>' +
                    '<div>' +
                        (r.taken
                            ? '<span style="color:#22c55e; font-size:13px;">✅ Taken</span>'
                            : '<button class="take-btn" onclick="takeReminder(' + i + ')">Mark Taken</button>') +
                        '<button class="delete-btn" onclick="deleteReminder(' + i + ')">✕</button>' +
                    '</div>' +
                '</li>';
            }
            document.getElementById('reminderList').innerHTML = html;
        }

        function takeReminder(index) {
            reminders[index].taken = true;
            renderReminders();
            showToast(reminders[index].name + ' marked as taken ✅');
        }

        function deleteReminder(index) {
            var name = reminders[index].name;
            reminders.splice(index, 1);
            renderReminders();
            showToast(name + ' reminder deleted');
        }

        // ===== MEDICAL RECORDS =====
        function renderRecords() {
            var html = '';
            for (var i = 0; i < records.length; i++) {
                var r = records[i];
                html += '<div class="record-card">' +
                    '<h3>📄 ' + r.name + '</h3>' +
                    '<p class="doctor-name">Doctor: ' + r.doctor + '</p>' +
                    '<p class="date">Date: ' + r.date + '</p>' +
                '</div>';
            }
            document.getElementById('recordsList').innerHTML = html;
        }

        function uploadRecord(event) {
            var file = event.target.files[0];
            if (file) {
                records.unshift({
                    name: file.name,
                    date: new Date().toISOString().split('T')[0],
                    doctor: 'Self Upload'
                });
                renderRecords();
                showToast('Document "' + file.name + '" uploaded!');
            }
        }

        // ===== PROFILE =====
        function renderProfile() {
            document.getElementById('profileName').textContent = currentUser.name;
            document.getElementById('profileEmail').textContent = currentUser.email;
            document.getElementById('profileAge').textContent = currentUser.age;
            document.getElementById('profileBlood').textContent = currentUser.bloodGroup;

            var condHtml = '';
            if (currentUser.conditions.length === 0) {
                condHtml = '<span class="health-tag">No conditions reported</span>';
            } else {
                for (var i = 0; i < currentUser.conditions.length; i++) {
                    condHtml += '<span class="health-tag">' + currentUser.conditions[i] + '</span>';
                }
            }
            document.getElementById('profileConditions').innerHTML = condHtml;

            var allergyHtml = '';
            if (currentUser.allergies.length === 0) {
                allergyHtml = '<span class="health-tag">No allergies reported</span>';
            } else {
                for (var i = 0; i < currentUser.allergies.length; i++) {
                    allergyHtml += '<span class="health-tag">' + currentUser.allergies[i] + '</span>';
                }
            }
            document.getElementById('profileAllergies').innerHTML = allergyHtml;
        }

        // ===== TOAST =====
        function showToast(message, isError) {
            var toast = document.getElementById('toast');
            toast.textContent = message;
            toast.className = 'toast' + (isError ? ' error' : '');
            toast.style.display = 'block';
            setTimeout(function() {
                toast.style.display = 'none';
            }, 3000);
        }

        // ===== START =====
        showPage('landing');
