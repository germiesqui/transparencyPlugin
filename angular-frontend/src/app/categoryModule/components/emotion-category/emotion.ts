export interface IEmotion {
  emotion: {
    anger: number;
    anticipation: number;
    disgust: number;
    fear: number;
    joy: number;
    negative: number;
    positive: number;
    sadness: number;
    surprise: number;
    trust: number;
  };
  polarity: number;
  subjectivity: number;
  warning: boolean;
}
