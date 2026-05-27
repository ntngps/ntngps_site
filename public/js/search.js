(function () {
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var wrapper = document.getElementById('search-wrapper');
  if (!input) return;

  var posts = [];

  fetch('/search.json')
    .then(function (r) { return r.json(); })
    .then(function (data) { posts = data; });

  input.addEventListener('input', function () {
    var q = this.value.trim().toLowerCase();
    if (!q) { results.hidden = true; return; }

    var matches = posts.filter(function (p) {
      return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q);
    }).slice(0, 8);

    results.innerHTML = matches.length
      ? matches.map(function (p) {
          return '<li><a href="' + p.url + '">' +
            '<span class="search-result-title">' + p.title + '</span>' +
            '<span class="search-result-date">' + p.date + '</span>' +
            '</a></li>';
        }).join('')
      : '<li class="search-no-results">No results found.</li>';

    results.hidden = false;
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { results.hidden = true; this.value = ''; }
  });

  document.addEventListener('click', function (e) {
    if (!wrapper.contains(e.target)) results.hidden = true;
  });
})();
