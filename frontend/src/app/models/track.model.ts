export interface Track {
  id?: number;
  title: string;
  artist?: number;  // Keep for backward compatibility
  artist_id?: number;
  artist_name?: string;
  genre?: number;  // Keep for backward compatibility
  genre_id?: number;
  genre_name?: string;
  duration?: string;
  release_date?: Date | string;
  audio_file?: string | File;
  created_by?: number;
  created_at?: Date;
} 