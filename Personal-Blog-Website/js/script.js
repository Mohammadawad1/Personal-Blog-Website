function createBlogPostElement(post) {
    const blogPostElement = document.createElement("div");
    blogPostElement.classList.add("home-article");

    const excerpt = post.content.substring(0, 200) + '...';

    blogPostElement.innerHTML = `
        <div class="home-article-content font1">
            <a href="/blogpost.html?id=${post.id}">
                <h3>${post.title}</h3>
            </a>
            <div>Author: ${post.author}</div>
            <p>${excerpt}</p>
            <span>${getCurrentDate()} | ${calculateReadTime(post.content)} min read</span>
            <button class="read-more-btn btn" data-id="${post.id}">Read More</button>
            <button class="edit-btn btn" data-id="${post.id}">Edit</button>
            <button class="delete-btn btn" data-id=${post.id}>Delete</button>

        </div>
    `;

    return blogPostElement;
}

function getBlogPostsFromStorage() {
    const blogPostsJSON = localStorage.getItem("blogPosts");
    return JSON.parse(blogPostsJSON);
}


function getCurrentDate() {
    const options = { day: "numeric", month: "short" };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
}

function calculateReadTime(article) {
    const wordsPerMinute = 200;
    const wordCount = article.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime;
}
document.addEventListener("DOMContentLoaded", function () {
    const featuredArticles = document.getElementById("featured-articles");

    const blogPosts = getBlogPostsFromStorage();

    if (blogPosts) {
        blogPosts.forEach((post) => {
            const blogPostElement = createBlogPostElement(post);
            featuredArticles.appendChild(blogPostElement);

            // Add click event listener to "Read More" buttons
            const readMoreButton = blogPostElement.querySelector('.read-more-btn');
            readMoreButton.addEventListener('click', () => {
                const postId = readMoreButton.getAttribute('data-id');
                window.location.href = `/blogpost.html?id=${postId}`;
            });
// Add click event listener to "Edit" buttons
const editButton = blogPostElement.querySelector('.edit-btn');
editButton.addEventListener('click', () => {
    const postId = editButton.getAttribute('data-id');
    const post = blogPosts.find(post => post.id === postId);
    if (post) {
        deleteBlogPost(postId);
        window.location.href = `editor.html?id=${postId}&title=${encodeURIComponent(post.title)}&content=${encodeURIComponent(post.content)}&author=${encodeURIComponent(post.author)}`;
    }
});


            // Add click event listener to "Delete" buttons
            const deleteButton = blogPostElement.querySelector('.delete-btn');
            deleteButton.addEventListener('click', () => {
                const postId = deleteButton.getAttribute('data-id');
                deleteBlogPost(postId);
                featuredArticles.removeChild(blogPostElement);
            });
        });
    }
});


function deleteBlogPost(postId) {
    const blogPosts = getBlogPostsFromStorage();
    const updatedBlogPosts = blogPosts.filter(post => post.id !== postId);
    localStorage.setItem("blogPosts", JSON.stringify(updatedBlogPosts));
}

