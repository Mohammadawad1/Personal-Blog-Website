 document.addEventListener("DOMContentLoaded", function () {
            const urlParams = new URLSearchParams(window.location.search);
            const postId = urlParams.get('id');

            const blogPost = getBlogPostByIdFromStorage(postId);

            if (blogPost) {
                const postTitleElement = document.getElementById('post-title');
                const postContentElement = document.getElementById('post-content');
                const postAuthorElement = document.getElementById('post-author');

                postTitleElement.textContent = blogPost.title;
                postContentElement.textContent = blogPost.content;
                postAuthorElement.textContent = `Author: ${blogPost.author}`;
            }
        });

        function getBlogPostByIdFromStorage(postId) {
            const blogPosts = getBlogPostsFromStorage();
            return blogPosts.find(post => post.id === postId);
        }

        function getBlogPostsFromStorage() {
            const blogPostsJSON = localStorage.getItem("blogPosts");
            return JSON.parse(blogPostsJSON);
        }