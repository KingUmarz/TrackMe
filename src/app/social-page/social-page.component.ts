import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Achievement {
  title: string;
  description: string;
  createdAt: string; // Pastikan ini sesuai dengan format tanggal yang dikirim oleh backend
}

@Component({
  selector: 'app-social-page',
  templateUrl: './social-page.component.html',
  styleUrls: ['./social-page.component.css']
})
export class SocialPageComponent {
  // Properties
  friends: string[] = [];
  newFriend: string = '';
  selectedFriend: string | null = null;
  randomPosts: { author: string; content: string; date: string }[] = [];
  showFriendList: boolean = false;

  constructor(private http: HttpClient) {
    this.loadInitialPosts();
    this.fetchFriends();
  }

  // Add a new friend
  addFriend() {
    if (this.newFriend.trim()) {
      const friendName = this.newFriend.trim();
      this.http.post('http://localhost:5000/api/friends/add', { name: friendName })
        .subscribe(
          (response: any) => {
            this.friends.push(response); // Add to `friends` array
            this.newFriend = '';
            alert('Sucessfull Added.')
          },
          (error) => {
            alert('Error adding friend: ' + error.message);
          }
        );
    } else {
      alert('Friend name cannot be empty.');
    }
  }
  
  fetchFriends() {
    this.http.get<any[]>('http://localhost:5000/api/friends')
      .subscribe(
        (response) => {
          this.friends = response; // Simpan daftar teman dari backend
        },
        (error) => {
          console.error('Error fetching friends:', error);
        }
      );
  }

  toggleFriendList() {
    this.showFriendList = !this.showFriendList;
  }


  // Load initial random posts (now including achievements from the backend)
  loadInitialPosts() {
    this.http.get<Achievement[]>('http://localhost:5000/api/achievements')
      .subscribe(
        (achievements) => {
          // Adding achievements above random posts
          const newPosts = achievements.map((achievement) => ({
            author: 'You',
            content: `${achievement.title}: ${achievement.description}`,
            date: new Date(achievement.createdAt).toLocaleDateString()
          }));

          // Combine initial random posts with fetched achievements, with achievements at the top
          this.randomPosts = [...newPosts, 
            { author: 'Alika', content: 'My Private vehicle usage is 60% of total emissions', date: '2025-01-06' },
            { author: 'Bobo', content: 'My Electricity usage 30% of total emissions', date: '2025-01-05' },
            { author: 'Peter', content: 'I eat quite a lot of high-calorie foods :)', date: '2025-01-04' }
          ];
        },
        (error) => {
          console.error('Error loading posts:', error);
        }
      );
  }

  // Load more random posts
  loadMorePosts() {
    const newPosts = [
      { author: 'David', content: 'I like being a vegan !!!', date: '2025-01-03' },
      { author: 'Eve', content: 'I really enjoy walking so I can reduce my carbon footprint', date: '2025-01-02' },
    ];
    this.randomPosts = [...this.randomPosts, ...newPosts];
  }
}