import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Friend {
  name: string;
  id: number;
}

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})

export class FriendListComponent {
  friends: Friend[] = [
    { name: 'Alice', id: 1 },
    { name: 'Bob', id: 2 },
    { name: 'Charlie', id: 3 },
  ];
  selectedFriend: Friend | null = null;
  messages: string[] = [];
  newMessage: string = '';


  constructor(private http: HttpClient) {
    this.fetchFriends();
  }

  fetchFriends() {
    this.http.get<any[]>('http://localhost:5000/api/friends')
      .subscribe(
        (response) => {
          this.friends = response.map(friend => ({ name: friend.name, id: friend._id }));
        },
        (error) => {
          console.error('Error fetching friends:', error);
        }
      );
  }

  selectFriend(friend: Friend): void {
    this.selectedFriend = friend;
    this.messages = []; // Reset messages ketika teman berubah
  
    const sender = 'You'; // Ganti dengan username pengirim
    const receiver = friend.name;
  
    // Gunakan generic untuk menentukan tipe respons
    this.http.get<any[]>(`http://localhost:5000/api/messages/${sender}/${receiver}`)
      .subscribe(
        (response) => {
          this.messages = response.map(msg => `${msg.sender}: ${msg.content}`); // Format pesan
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
  }

  sendMessage(message: string): void {
    if (message.trim() && this.selectedFriend) {
      const sender = 'You'; // Ganti dengan username pengirim (misalnya dari session)
      const receiver = this.selectedFriend.name;
  
      this.http.post('http://localhost:5000/api/messages/send', { sender, receiver, content: message })
        .subscribe(
          (response) => {
            this.messages.push(message); // Tambahkan ke UI
            this.newMessage = ''; // Kosongkan input
          },
          (error) => {
            console.error('Error sending message:', error);
          }
        );
    }
  }
}
