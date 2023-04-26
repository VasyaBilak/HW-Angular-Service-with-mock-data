import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { BlogsService } from '../../shared/services/blogs/blogs.service';
import { IBlogs } from '../../shared/interfaces/blogs/blogs.interface';
import { faClock } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, DoCheck {
  public userBlogs: Array<IBlogs> = [];
  public signIn: boolean = false;
  public title!: string;
  public text!: string;
  public editID!: number;
  public post: boolean = true;
  faClock = faClock;

  constructor(private blogsService: BlogsService) {}

  @Input() userName!: string;

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.userBlogs = this.blogsService.getBlogs();
  }

  ngDoCheck(): void {
    if (this.userName === 'admin') this.signIn = true;
    else this.signIn = false;
    this.checkPost();
  }

  editBlog(blog: IBlogs): void {
    this.title = blog.topic;
    this.text = blog.message;
    this.editID = blog.id;
  }

  saveBlog(): void {
    const updateBlog = {
      id: this.editID,
      postedBy: this.userName,
      topic: this.title,
      date:
        this.dateFormat(new Date().getHours()) +
        ':' +
        this.dateFormat(new Date().getMinutes()) +
        ',' +
        ' ' +
        this.dateFormat(new Date().getDate()) +
        '.' +
        this.dateFormat(new Date().getMonth() + 1) +
        '.' +
        new Date().getFullYear().toString(),
      message: this.text,
    };
    this.blogsService.updateBlog(updateBlog, this.editID);
  }

  dateFormat = (date) => (date < 10 ? '0' + date : date);

  deleteBlog(blog: IBlogs): void {
    this.blogsService.deleteBlog(blog.id);
  }

  checkPost(): void {
    if (this.title && this.text) {
      this.post = false;
    } else {
      this.post = true;
    }
  }
}
