import { Component, Input, DoCheck } from '@angular/core';
import { BlogsService } from '../../../shared/services/blogs/blogs.service';
import { IBlogs } from 'src/app/shared/interfaces/blogs/blogs.interface';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements DoCheck {
  public title!: string;
  public text!: string;
  public postedBy!: string;
  public adminPosts!: IBlogs[];
  public post: boolean = true;

  @Input() username!: string;

  constructor(private BlogsService: BlogsService) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  ngDoCheck(): void {
    this.checkPost();
  }

  getBlogs(): void {
    this.adminPosts = this.BlogsService.getBlogs();
  }

  addPost(): void {
    const newPost = {
      id: 1,
      postedBy: this.username,
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

    if (this.adminPosts.length > 0) {
      const id = this.adminPosts.slice(-1)[0].id;
      newPost.id = id + 1;
    }

    this.BlogsService.addPost(newPost);
    this.resetForm();
  }

  dateFormat = (date) => (date < 10 ? '0' + date : date);

  resetForm(): void {
    this.title = '';
    this.text = '';
  }

  checkPost(): void {
    if (this.title && this.text) {
      this.post = false;
    } else {
      this.post = true;
    }
  }
}
