import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainStateService {
  constructor() {}

  posts: any = [];
  currentChatHeads: string[] = [
    'chat1',
    'chat2',
    'chat1',
    'chat2',
    'chat1',
    'chat2',
  ];
}
