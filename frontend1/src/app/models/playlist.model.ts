export interface Playlist {
  id?: number;
  name: string;
  description?: string;
  tracks?: number[];
  created_by?: number;
  created_at?: Date;
  is_public?: boolean;
} 