/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Player {
  id: string;
  name: string;
}

export interface GameSettings {
  category: string;
  spyCount: number;
  timerSeconds: number;
  showSpyHint: boolean;
}

export interface RoundData {
  secretWord: string;
  spyHint: string;
  spyIndices: number[];
  players: Player[];
  currentPlayerIndex: number;
  categoryName: string;
}

export type GameStep = 
  | 'home' 
  | 'player_setup' 
  | 'pass_phone' 
  | 'reveal_word' 
  | 'in_round' 
  | 'voting' 
  | 'results';
