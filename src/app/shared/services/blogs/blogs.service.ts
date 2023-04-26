import { Injectable } from '@angular/core';
import { IBlogs } from '../../interfaces/blogs/blogs.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private blogs: Array<IBlogs> = [
    {
      id: 1,
      postedBy: 'admin',
      topic: 'First post',
      date: '10:00, 22.05.2020',
      message: 'Sign up to create your account and start to use Angular Blog',
    },
  ];

  constructor() {}

  getBlogs() {
    return this.blogs;
  }

  addPost(post: IBlogs): void {
    this.blogs.push(post);
  }

  updateBlog(blog: IBlogs, id: number): void {
    const index = this.blogs.findIndex((blog) => blog.id === id);
    this.blogs.splice(index, 1, blog);
  }

  deleteBlog(id: number): void {
    const index = this.blogs.findIndex((blog) => blog.id === id);
    this.blogs.splice(index, 1);
  }
}
