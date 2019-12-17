// Globals
const studentList = document.querySelectorAll("li.student-item");
const itemsPerPage = 10;
const container = document.querySelector('div.page');

// helper function that updates active page number
const updateActiveLink = (page) => {
   const paginationLinks = document.querySelectorAll('.pagination ul li a');
   for (let i = 0; i < paginationLinks.length; i++) {
      paginationLinks[i].className = '';
   }
   paginationLinks[page - 1].className = 'active';
}

// displays set of students
const showPage = (list, page) => {
   updateActiveLink(page);

   const startIdx = (page * itemsPerPage) - (itemsPerPage);
   const endIdx = (page * itemsPerPage);

   for (let i = 0; i < list.length; i++) {
      const li = list[i];
      if (i >= startIdx && i < endIdx) {
         li.style.display = '';
      } else {
         li.style.display = 'none';
      }
   }
}

// adds page numbers to bottom
const appendPageLinks = (list) => {
   const div = document.createElement('div');
   div.className = 'pagination';
   const ul = document.createElement('ul');

   const totalLi = Math.ceil(list.length / itemsPerPage);
   for (let i = 1; i <= totalLi; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = i;
      li.appendChild(a);
      ul.appendChild(li);
   }

   div.appendChild(ul);
   container.appendChild(div);

   // runs showPage when a page number is clicked 
   div.addEventListener('click', (e) => {
      if (event.target.tagName === "A") {
         const a = event.target;
         const pageNumber = a.textContent;
         showPage(studentList, pageNumber);
      }
   });
}


// set page header
const pageHeader = container.firstElementChild;
// create div
const div = document.createElement('div');
// set div's class
div.className = 'page-header';
// create input
// set input's placeholder
// create button
// set button's textContent
// append

// <div class="page">
//       <div class="page-header cf">
//         <h2>Students</h2>
        
//         <!-- student search HTML to add dynamically -->
//         <div class="student-search">
//           <input placeholder="Search for students...">
//           <button>Search</button>
//         </div>
//         <!-- end search --></div>

// initialize app
appendPageLinks(studentList);
showPage(studentList, 1);