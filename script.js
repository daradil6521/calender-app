 document.addEventListener('DOMContentLoaded', function() {
    const days = document.querySelector('.days');
    const selectedDate = document.getElementById('selected-date');
    const search = document.getElementById('search');
    const searchResults = document.getElementById('search-results');
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');
    const addBirthdayForm = document.getElementById('add-birthday-form');
    
    let birthdays = [
        { name: "Anna Apple", profession: "American writer", date: "2023-02-03" },
        { name: "Annie Asparagus", profession: "Dutch chef", date: "2023-02-03" },
        { name: "Bob Banana", profession: "Canadian architect", date: "2023-05-14" },
        { name: "Shirley Shrimp", profession: "South African chef", date: "2023-05-14" },
        { name: "David Dill-Pickle", profession: "Canadian hockey player", date: "2023-08-22" }
    ];

    // Function to get the number of days in a month
    function getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    // Function to populate the days in the calendar
    function populateDays(month, year) {
        days.innerHTML = '';
        const totalDays = getDaysInMonth(month, year);
        for (let i = 1; i <= totalDays; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.addEventListener('click', function() {
                selectedDate.textContent = `${monthSelect.options[monthSelect.selectedIndex].text} ${i}`;
                updateSearchResults(`${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`);
            });
            days.appendChild(dayDiv);
        }
    }

    // Handle search input
    search.addEventListener('input', function() {
        const searchTerm = search.value.toLowerCase();
        const results = Array.from(searchResults.children);
        results.forEach(result => {
            if (result.textContent.toLowerCase().includes(searchTerm)) {
                result.style.display = '';
            } else {
                result.style.display = 'none';
            }
        });
    });

    // Update search results based on the selected date
    function updateSearchResults(date) {
        const results = birthdays.filter(birthday => birthday.date === date);
        searchResults.innerHTML = results.map(result => 
            `<p><span class="star">&#9733;</span> ${result.name}, ${result.profession}</p>`
        ).join('');
    }

    // Handle adding new birthday
    addBirthdayForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const profession = document.getElementById('profession').value;
        const date = document.getElementById('birthday-date').value;

        birthdays.push({ name, profession, date });
        updateBirthdayList();
        updateSearchResults(date);

        addBirthdayForm.reset();
    });

    // Update the birthday list displayed in the favourite birthdays section
    function updateBirthdayList() {
        const birthdayList = document.getElementById('birthday-list');
        birthdayList.innerHTML = '';

        const groupedByDate = birthdays.reduce((acc, birthday) => {
            if (!acc[birthday.date]) {
                acc[birthday.date] = [];
            }
            acc[birthday.date].push(birthday);
            return acc;
        }, {});

        Object.keys(groupedByDate).forEach(date => {
            const [year, month, day] = date.split('-');
            const monthName = monthSelect.options[parseInt(month) - 1].text;
            const birthdayMonthDiv = document.createElement('div');
            birthdayMonthDiv.classList.add('birthday-month');
            birthdayMonthDiv.innerHTML = `<h3>${monthName} ${day}</h3>`;

            groupedByDate[date].forEach(birthday => {
                birthdayMonthDiv.innerHTML += `<p>${birthday.name}, ${birthday.profession}</p>`;
            });

            birthdayList.appendChild(birthdayMonthDiv);
        });
    }

    // Initial call to populate the calendar for the current month and year
    populateDays(monthSelect.value, yearSelect.value);

    // Update the calendar when month or year is changed
    monthSelect.addEventListener('change', function() {
        populateDays(monthSelect.value, yearSelect.value);
    });

    yearSelect.addEventListener('change', function() {
        populateDays(monthSelect.value, yearSelect.value);
    });

    // Initial call to populate the search results for February 3
    updateSearchResults('2023-02-03');
    updateBirthdayList();
}); 
