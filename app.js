
// getting data and creating dinamic url
const getData = () => {


    const searchArea = document.getElementById('inputField');
    const searchText = searchArea.value;
    if (searchText !== '') {
        document.getElementById('noResult').style.display = 'none';
        spinnerOn();
        document.getElementById('bookContainer').textContent = '';
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        searchArea.value = '';
        const searchResult = document.getElementById('searchResult');
        searchResult.style.display = 'none';
        fetch(url)
            .then(res => res.json())
            .then(data => displayBook(data.docs.slice(0, 50)))
    }

}


//spinner on and off while searching
const spinnerOn = () => {
    const spiner = document.getElementById('spinner');
    spiner.innerHTML = `<div class="spinner-border" role="status">
    <span class="visually-hidden ">Loading...</span>
  </div>
  <p><small>Processing....</small></p>
  `
}
const spinnerOff = () => {
    const spiner = document.getElementById('spinner');
    spiner.textContent = '';
}

//display search result

const displayBook = books => {
    let noResult = document.getElementById('noResult');
    let container = document.getElementById('bookContainer');
    //handling null input field
    if (books.length === 0) {
        spinnerOff();
        noResult.style.display = 'block';
        noResult.innerText = "No Result Found"
        container.textContent = '';


    }
    //display searched content
    else {
        noResult.style.display = 'none';
        // container.textContent = '';
        books.forEach(book => {
            if (book.cover_i) {
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `<div class="card h-100">
        <img class="img-fluid" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg

        " class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${book.text[2]}</h5>
            <p><span class="fw-bold">Author Name:</span>${book.author_name}</p>
            <p><span class="fw-bold">First Published:</span>${book.first_publish_year}</p>
            <p class="card-text"><span class="fw-bold">Publisher:</span>${book.publisher?.slice(0, 5)}</p>

        </div>
    </div>`
                container.appendChild(div);
                spinnerOff();
                const searchResult = document.getElementById('searchResult');
                searchResult.style.display = 'block';
                searchResult.innerText = `Search Result:${books.length}`;
            }




        })
    }
}