import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainStateService {
  constructor() {}

  isChatActive = false;
  posts: any = [];
  currentChatHeads: string[] = [
    'chat1',
    'chat2',
    'chat1',
    'chat2',
    'chat1',
    'chat2',
  ];

  friends: string[] = [
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
  ];
}
