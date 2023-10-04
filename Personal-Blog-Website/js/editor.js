function saveBlogPost(title, content,author) {
    const blogPosts = getBlogPostsFromStorage() || [];

    const id = Date.now().toString();

    const blogPost = {
        id,
        title,
        content,
        author,
    };

    blogPosts.push(blogPost);

    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));

    alert("Blog published successfully!");
    window.location.href = `index.html`;
}

function getBlogPostsFromStorage() {
    const blogPostsJSON = localStorage.getItem("blogPosts");
    return JSON.parse(blogPostsJSON);
}

const publishBtn = document.querySelector('.publish-btn');
const blogTitleField = document.querySelector('.title');
const articleFeild = document.querySelector('.article');
const authorFeild = document.querySelector('.author');
publishBtn.addEventListener('click', () => {
    const title = blogTitleField.value.trim();
    const article = articleFeild.value.trim();
    const author = authorFeild.value.trim();
    if (title !== "" && article !== "" && author!== "") {
        saveBlogPost(title, article, author);

        blogTitleField.value = "";
        articleFeild.value = "";
        authorFeild.value = "";
    } else {
        alert("Please fill the title , article and the author fields .");
    }
});
        function getQueryParameters() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            return {
                id: urlParams.get('id'),
                title: decodeURIComponent(urlParams.get('title')),
                content: decodeURIComponent(urlParams.get('content')),
                author: decodeURIComponent(urlParams.get('author'))
            };
        }

        function populateTextareas() {
            const queryParameters = getQueryParameters();
            const titleTextarea = document.querySelector('.title');
            const articleTextarea = document.querySelector('.article');
            const authorTextarea = document.querySelector('.author');

            if (queryParameters.id && queryParameters.title && queryParameters.content && queryParameters.author) {
                titleTextarea.value = queryParameters.title;
                articleTextarea.value = queryParameters.content;
                authorTextarea.value = queryParameters.author;
            }
        }

        function editBlogPost() {
            const queryParameters = getQueryParameters();
            const updatedTitle = document.querySelector('.title').value;
            const updatedContent = document.querySelector('.article').value;
            const updatedAuthor = document.querySelector('.author').value;
            window.location.href = "index.html";
        }

        populateTextareas();