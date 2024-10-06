import { Component } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-status-picker',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './status-picker.component.html',
  styleUrl: './status-picker.component.scss',
})
export class StatusPickerComponent {
  statuses: { name: string; emoji: string }[] = [
    { name: 'Feeling Happy', emoji: '😊' },
    { name: 'Feeling Sad', emoji: '😢' },
    { name: 'Feeling Excited', emoji: '🤩' },
    { name: 'Feeling Loved', emoji: '❤️' },
    { name: 'Feeling Angry', emoji: '😠' },
    { name: 'Feeling Tired', emoji: '😴' },
    { name: 'Feeling Sick', emoji: '🤒' },
    { name: 'Feeling Anxious', emoji: '😟' },
    { name: 'Feeling Confident', emoji: '😎' },
    { name: 'Feeling Lonely', emoji: '😔' },
    { name: 'Feeling Grateful', emoji: '🙏' },
    { name: 'Feeling Proud', emoji: '🏅' },
    { name: 'Feeling Stressed', emoji: '😫' },
    { name: 'Feeling Relaxed', emoji: '😌' },
    { name: 'Feeling Bored', emoji: '😐' },
    { name: 'Feeling Curious', emoji: '🧐' },
    { name: 'Feeling Motivated', emoji: '💪' },
    { name: 'Feeling Inspired', emoji: '✨' },
    { name: 'Feeling In Love', emoji: '😍' },
    { name: 'Feeling Heartbroken', emoji: '💔' },
    { name: 'Feeling Lucky', emoji: '🍀' },
    { name: 'Feeling Adventurous', emoji: '🌍' },
    { name: 'Feeling Hopeful', emoji: '🌟' },
    { name: 'Feeling Energetic', emoji: '⚡' },
    { name: 'Feeling Peaceful', emoji: '☮️' },
    { name: 'Feeling Determined', emoji: '🎯' },
    { name: 'Celebrating', emoji: '🎉' },
    { name: 'Partying', emoji: '🥳' },
    { name: 'Working', emoji: '💼' },
    { name: 'Studying', emoji: '📚' },
    { name: 'Gaming', emoji: '🎮' },
    { name: 'Exercising', emoji: '🏋️‍♂️' },
    { name: 'Shopping', emoji: '🛍️' },
    { name: 'Cooking', emoji: '🍳' },
    { name: 'Traveling', emoji: '✈️' },
    { name: 'On Vacation', emoji: '🏖️' },
    { name: 'Sleeping', emoji: '😴' },
    { name: 'Watching a Movie', emoji: '🎬' },
    { name: 'Listening to Music', emoji: '🎧' },
    { name: 'Eating', emoji: '🍽️' },
    { name: 'Drinking Coffee', emoji: '☕' },
    { name: 'Drinking', emoji: '🍻' },
    { name: 'Thinking', emoji: '🤔' },
    { name: 'Missing Someone', emoji: '💔' },
    { name: 'Laughing', emoji: '😂' },
    { name: 'Crying', emoji: '😭' },
    { name: 'Dancing', emoji: '💃' },
    { name: 'Singing', emoji: '🎤' },
    { name: 'Meditating', emoji: '🧘‍♂️' },
    { name: 'Reading', emoji: '📖' },
  ];

  currentStatuses = structuredClone(this.statuses);

  SearchStatus(text: string) {


    const lowerCaseText = text.toLowerCase();
    this.currentStatuses = this.statuses.filter((status) =>
      status.name.toLowerCase().includes(lowerCaseText)
    );
  }
}
