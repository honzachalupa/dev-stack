export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      sample: {
        Row: {
          createdDate: string | null
          key: string
          value: string
        }
        Insert: {
          createdDate?: string | null
          key: string
          value: string
        }
        Update: {
          createdDate?: string | null
          key?: string
          value?: string
        }
      }
      users: {
        Row: {
          firstName: string | null
          id: string
          lastName: string | null
        }
        Insert: {
          firstName?: string | null
          id: string
          lastName?: string | null
        }
        Update: {
          firstName?: string | null
          id?: string
          lastName?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
