const { SUCCESS, ERROR_SERVER, ERROR_PARAM, ERROR_EMPTY } = require('../../../const');
const mongoose = require('mongoose');
const { blogSchema } = require('../../../models/blog');

const categories = [
  { label: 'Themes', value: 'themes' },
  { label: 'Security', value: 'security' },

];

function getSlugFromTitle(title) {
  return title.replace(/\s+/g, '_').toLowerCase();
}

module.exports.createBlog = async (blog) => {
  try {


    if (!blog.title) {
      return { result: ERROR_PARAM, message: '' };
    }
    blog.slug = getSlugFromTitle(blog.title);
    const Blogs = mongoose.model('blogs', blogSchema);
    const test = new Blogs(blog);
    const response = await test.save();
    return { result: SUCCESS, message: response };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

};

module.exports.getAllBlogs = async () => {

  try {
    const Blogs = mongoose.model('blogs', blogSchema);
    const response = await Blogs.find();
    if (!response) {
      return { result: ERROR_EMPTY, data: '' };
    }
    return { result: SUCCESS, data: response };

  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

};


module.exports.getBlog = async (id) => {
  try {
    console.log(id)
    const Blogs = mongoose.model('blogs', blogSchema);
    const response = await Blogs.find({ '_id': id });

    if (response?.length == 0) {
      return { result: ERROR_EMPTY, data: '' };
    }
    return { result: SUCCESS, data: response[0] };

  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }
};

module.exports.getCategorizedBlogs = async () => {
  const Blogs = mongoose.model('blogs', blogSchema);
  const articles = await Blogs.find();
  const categorizedArticles = categories.map(category => {
    const articleByCategory = articles.filter(article => (article.category === category.value));
    category.articles = articleByCategory;
    return category;
  });
  return categorizedArticles;
};

module.exports.updateBlog = async (id, blog) => {

  try {

    if (!id || !blog.title) {
      return { result: ERROR_PARAM, data: blog };
    }
    blog.slug = getSlugFromTitle(blog.title);
    const Blogs = mongoose.model('blogs', blogSchema);
    const response = await Blogs.updateOne({ id: id }, { $set: blog });
    return { result: SUCCESS, message: response };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

};


module.exports.deleteBlog = async (id) => {

  try {
    if (!id) {
      return { result: ERROR_PARAM, data: '' };
    }
    const Blogs = mongoose.model('blogs', blogSchema);
    const response = await Blogs.deleteOne({ _id: id });
    return { result: SUCCESS, data: response };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

};




