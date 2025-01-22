import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Profile = {
  id: string;
  username: string;
  avatar_url?: string;
  status: 'online' | 'offline';
  last_seen: string;
};

export type Message = {
  id: string;
  content: string;
  user_id: string;
  conversation_id: string;
  created_at: string;
  attachment_url?: string;
  attachment_type?: 'image' | 'video' | 'document' | 'audio';
};

export type Conversation = {
  id: string;
  created_at: string;
  last_message?: string;
  last_message_at?: string;
};

export type ConversationParticipant = {
  conversation_id: string;
  user_id: string;
  joined_at: string;
};