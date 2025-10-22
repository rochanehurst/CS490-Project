// Toggle individual student
function toggleStudent(header) {
    const item = header.parentElement;
    item.classList.toggle('expanded');
}

// Toggle individual learning objective
function toggleObjective(header) {
    const item = header.parentElement;
    item.classList.toggle('expanded');
}

// Expand/Collapse all students
function expandAllStudents() {
    document.querySelectorAll('.student-item').forEach(item => {
        item.classList.add('expanded');
    });
}

function collapseAllStudents() {
    document.querySelectorAll('.student-item').forEach(item => {
        item.classList.remove('expanded');
    });
}

// Expand/Collapse all learning objectives
function expandAllObjectives() {
    document.querySelectorAll('.lo-item').forEach(item => {
        item.classList.add('expanded');
    });
}

function collapseAllObjectives() {
    document.querySelectorAll('.lo-item').forEach(item => {
        item.classList.remove('expanded');
    });
}

// Switch between views
function switchView(view) {
    const studentsView = document.getElementById('studentsView');
    const objectivesView = document.getElementById('objectivesView');
    const searchInput = document.getElementById('searchInput');

    if (view === 'students') {
        studentsView.classList.remove('hidden');
        objectivesView.classList.add('hidden');
        searchInput.placeholder = 'Search for Student';
    } else {
        studentsView.classList.add('hidden');
        objectivesView.classList.remove('hidden');
        searchInput.placeholder = 'Search for Learning Objectives';
    }
    
    // Clear search when switching views
    searchInput.value = '';
    handleSearch();
}

// Search functionality
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const studentsView = document.getElementById('studentsView');
    const objectivesView = document.getElementById('objectivesView');

    // Check which view is active
    if (!studentsView.classList.contains('hidden')) {
        // Search in Students View
        const studentItems = document.querySelectorAll('.student-item');
        
        studentItems.forEach(item => {
            const studentName = item.querySelector('.student-header span').textContent.toLowerCase();
            
            if (studentName.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    } else {
        // Search in Learning Objectives View
        const loItems = document.querySelectorAll('.lo-item');
        
        loItems.forEach(item => {
            const loName = item.querySelector('.lo-header span').textContent.toLowerCase();
            const studentRows = item.querySelectorAll('.student-row');
            let hasMatch = false;

            // Check if LO name matches
            if (loName.includes(searchTerm)) {
                item.style.display = '';
                // Show all student rows within this LO
                studentRows.forEach(row => {
                    row.style.display = '';
                });
                return;
            }

            // Check if any student name within this LO matches
            studentRows.forEach(row => {
                const studentName = row.querySelector('.student-name').textContent.toLowerCase();
                
                if (studentName.includes(searchTerm)) {
                    row.style.display = '';
                    hasMatch = true;
                } else {
                    row.style.display = 'none';
                }
            });

            // Show the LO item if any student matched, otherwise hide it
            if (hasMatch || searchTerm === '') {
                item.style.display = '';
                
                // Also check mastery groups - hide empty ones
                const masteryGroups = item.querySelectorAll('.mastery-group');
                masteryGroups.forEach(group => {
                    const visibleRows = Array.from(group.querySelectorAll('.student-row'))
                        .filter(row => row.style.display !== 'none');
                    
                    if (visibleRows.length === 0 && searchTerm !== '') {
                        group.style.display = 'none';
                    } else {
                        group.style.display = '';
                    }
                });
            } else {
                item.style.display = 'none';
            }
        });
    }
}